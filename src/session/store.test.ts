import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import {
  getTranscriptPath,
  listSessions,
  loadSession,
  saveSession,
  type SessionData,
} from "./store.js";

const originalConfigDir = process.env.CLAUDE_CONFIG_DIR;
const originalCwd = process.cwd();
let tempDir = "";

beforeEach(() => {
  tempDir = join(tmpdir(), `claude-session-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(tempDir, { recursive: true });
  process.env.CLAUDE_CONFIG_DIR = join(tempDir, ".claude");
  mkdirSync(join(tempDir, "project"), { recursive: true });
  process.chdir(join(tempDir, "project"));
});

afterEach(() => {
  process.chdir(originalCwd);
  if (originalConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
  else process.env.CLAUDE_CONFIG_DIR = originalConfigDir;
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
});

describe("session store", () => {
  test("writes official project JSONL transcript and loads it", () => {
    const cwd = process.cwd();
    const session = createFixtureSession(cwd);

    saveSession(session);

    const transcriptPath = getTranscriptPath(session.id, cwd);
    expect(existsSync(transcriptPath)).toBe(true);

    const entries = readJsonl(transcriptPath);
    expect(entries[0].type).toBe("user");
    expect(entries[0].parentUuid).toBeNull();
    expect(entries[0].message).toEqual({ role: "user", content: "hello" });
    expect(entries[0].permissionMode).toBe("default");
    expect(entries[1].type).toBe("assistant");
    expect(entries[1].parentUuid).toBe(entries[0].uuid);
    expect(entries[1].message.content).toEqual([{ type: "text", text: "hi there" }]);
    expect(entries[2]).toEqual({ type: "last-prompt", lastPrompt: "hello", sessionId: session.id });

    const loaded = loadSession(session.id);
    expect(loaded?.messages.map(message => message.role)).toEqual(["user", "assistant"]);
    expect(loaded?.messages[0].content).toBe("hello");
    expect(listSessions()[0]).toMatchObject({ id: session.id, title: "hello", messageCount: 2 });
  });

  test("appends new messages while preserving existing transcript metadata", () => {
    const cwd = process.cwd();
    const session = createFixtureSession(cwd);
    session.messages = session.messages.slice(0, 1);

    saveSession(session);
    const transcriptPath = getTranscriptPath(session.id, cwd);
    writeFileSync(
      transcriptPath,
      `${readFileSync(transcriptPath, "utf8")}${JSON.stringify({ type: "ai-title", aiTitle: "Custom title", sessionId: session.id })}\n`,
    );

    session.messages.push({
      role: "assistant",
      content: [{ type: "text", text: "hi there" }],
      timestamp: 1_700_000_001_000,
    });
    saveSession(session);

    const entries = readJsonl(transcriptPath);
    expect(entries.filter(entry => entry.type === "user")).toHaveLength(1);
    expect(entries.filter(entry => entry.type === "assistant")).toHaveLength(1);
    expect(entries.some(entry => entry.type === "ai-title" && entry.aiTitle === "Custom title")).toBe(true);
    expect(loadSession(session.id)?.title).toBe("Custom title");
  });

  test("last-prompt ignores tool_result user messages", () => {
    const cwd = process.cwd();
    const session = createFixtureSession(cwd);
    session.messages.push({
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "tool-1", content: "tool output" }],
      timestamp: 1_700_000_002_000,
    });

    saveSession(session);

    const entries = readJsonl(getTranscriptPath(session.id, cwd));
    expect(entries.at(-1)).toEqual({ type: "last-prompt", lastPrompt: "hello", sessionId: session.id });
  });
});

function createFixtureSession(cwd: string): SessionData {
  return {
    id: "11111111-1111-4111-8111-111111111111",
    title: "hello",
    messages: [
      { role: "user", content: "hello", timestamp: 1_700_000_000_000 },
      {
        role: "assistant",
        content: [{ type: "text", text: "hi there" }],
        timestamp: 1_700_000_001_000,
      },
    ],
    createdAt: 1_700_000_000_000,
    updatedAt: 1_700_000_001_000,
    permissionMode: "default",
    cwd,
  };
}

function readJsonl(path: string): Array<Record<string, any>> {
  return readFileSync(path, "utf8")
    .trim()
    .split("\n")
    .map(line => JSON.parse(line));
}
