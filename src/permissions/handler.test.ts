import { afterEach, describe, expect, test } from "bun:test";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { clearClaudeSettingsCache } from "../config/claude-settings.js";
import { PermissionHandler } from "./handler.js";

const originalConfigDir = process.env.CLAUDE_CONFIG_DIR;
const originalManagedPath = process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH;
const originalCwd = process.cwd();
let tempDir: string | null = null;

afterEach(() => {
  clearClaudeSettingsCache();
  if (originalConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
  else process.env.CLAUDE_CONFIG_DIR = originalConfigDir;
  if (originalManagedPath === undefined) delete process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH;
  else process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = originalManagedPath;
  process.chdir(originalCwd);
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("permission handler", () => {
  test("settings allow and deny rules match tool-specific inputs", async () => {
    tempDir = join(tmpdir(), `claude-permissions-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = join(tempDir, "managed");
    writeFileSync(
      join(tempDir, "settings.json"),
      JSON.stringify({
        permissions: {
          allow: ["Bash(git:*)", "Read(/tmp/**)"],
          deny: ["Bash(rm *)"],
        },
      }),
      "utf8",
    );
    process.env.CLAUDE_CONFIG_DIR = tempDir;
    process.chdir(tempDir);
    clearClaudeSettingsCache();

    const handler = new PermissionHandler();

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "git",
      input: { command: "git status" },
    })).resolves.toEqual({ behavior: "allow" });
    await expect(handler.checkPermission({
      toolName: "Read",
      toolUseID: "read",
      input: { file_path: "/tmp/project/a.ts" },
    })).resolves.toEqual({ behavior: "allow" });
    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "rm",
      input: { command: "rm file" },
    })).resolves.toEqual({ behavior: "deny", message: "Denied by rules: Bash" });
  });

  test("permission rules handle escaped parentheses and session remember choices", async () => {
    tempDir = join(tmpdir(), `claude-permissions-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = join(tempDir, "managed");
    writeFileSync(
      join(tempDir, "settings.json"),
      JSON.stringify({
        permissions: {
          allow: ["Bash(python -c \"print\\(1\\)\")"],
        },
      }),
      "utf8",
    );
    process.env.CLAUDE_CONFIG_DIR = tempDir;
    process.chdir(tempDir);
    clearClaudeSettingsCache();

    const handler = new PermissionHandler();

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "escaped",
      input: { command: "python -c \"print(1)\"" },
    })).resolves.toEqual({ behavior: "allow" });

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "ask",
      input: { command: "npm test" },
    })).resolves.toEqual({ behavior: "ask" });

    handler.recordApproval("Bash", { command: "npm test" }, "allow");

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "remembered",
      input: { command: "npm test -- --watch=false" },
    })).resolves.toEqual({ behavior: "allow" });
  });
});
