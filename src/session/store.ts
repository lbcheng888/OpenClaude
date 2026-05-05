import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  statSync,
  writeFileSync,
} from "fs";
import { randomUUID } from "crypto";
import { homedir } from "os";
import { dirname, join } from "path";
import type { ApiMessage, ApiMessageContent } from "../api/client.js";

const MAX_SANITIZED_LENGTH = 200;
const VERSION = "2.1.128";

export interface SessionData {
  id: string;
  title?: string;
  messages: SessionMessage[];
  createdAt: number;
  updatedAt: number;
  permissionMode: string;
  cwd?: string;
  transcriptPath?: string;
}

export type SessionMessage = {
  role: ApiMessage["role"];
  content: ApiMessageContent;
  timestamp: number;
};

type TranscriptEntry = TranscriptMessageEntry | LastPromptEntry | Record<string, unknown>;

type TranscriptMessageEntry = {
  parentUuid: string | null;
  isSidechain: false;
  type: ApiMessage["role"];
  message: ApiMessage;
  uuid: string;
  timestamp: string;
  permissionMode?: string;
  userType: string;
  entrypoint: string;
  cwd: string;
  sessionId: string;
  version: string;
  gitBranch?: string;
};

type LastPromptEntry = {
  type: "last-prompt";
  lastPrompt: string;
  sessionId: string;
};

export function saveSession(session: SessionData): void {
  session.updatedAt = Date.now();
  const transcriptPath = getTranscriptPath(session.id, session.cwd || process.cwd());
  const existing = existsSync(transcriptPath) ? readTranscriptFile(transcriptPath) : [];
  const existingMessages = existing.filter(isTranscriptMessageEntry);
  const messages = session.messages.map(message => ({
    role: message.role,
    content: cloneContent(message.content),
    timestamp: message.timestamp,
  }));

  const prefixLength = matchingPrefixLength(existingMessages, messages);
  const shouldAppend = prefixLength === existingMessages.length && prefixLength <= messages.length;
  const entries = shouldAppend
    ? [
        ...existing,
        ...buildTranscriptEntries({
          session,
          messages: messages.slice(prefixLength),
          startingParentUuid: getLastChainUuid(existingMessages),
        }),
      ]
    : buildTranscriptEntries({ session, messages, startingParentUuid: null });

  const finalEntries = [
    ...entries.filter(entry => entry.type !== "last-prompt"),
    buildLastPromptEntry(session.id, messages),
  ];

  mkdirSync(dirname(transcriptPath), { recursive: true });
  writeJsonlAtomically(transcriptPath, finalEntries);
}

export function loadSession(id: string): SessionData | null {
  const transcriptPath = findTranscriptPath(id);
  if (transcriptPath) {
    return loadTranscriptSession(id, transcriptPath);
  }

  const legacy = loadLegacySession(id);
  if (!legacy) return null;
  return legacy;
}

export function listSessions(): Array<{ id: string; title?: string; createdAt: number; messageCount: number }> {
  const sessions = listTranscriptSessions();
  const legacy = listLegacySessions().filter(item => !sessions.some(session => session.id === item.id));
  return [...sessions, ...legacy].sort((a, b) => b.createdAt - a.createdAt);
}

export function createSession(title?: string): SessionData {
  const now = Date.now();
  const id = randomUUID();
  return {
    id,
    title,
    messages: [],
    createdAt: now,
    updatedAt: now,
    permissionMode: "default",
    cwd: process.cwd(),
    transcriptPath: getTranscriptPath(id, process.cwd()),
  };
}

export function getClaudeConfigDir(): string {
  return process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude");
}

export function getProjectsDir(): string {
  return join(getClaudeConfigDir(), "projects");
}

export function getProjectDir(cwd = process.cwd()): string {
  return join(getProjectsDir(), sanitizePath(cwd));
}

export function getTranscriptPath(sessionId: string, cwd = process.cwd()): string {
  return join(getProjectDir(cwd), `${sessionId}.jsonl`);
}

export function sanitizePath(name: string): string {
  const sanitized = name.replace(/[^a-zA-Z0-9]/g, "-");
  if (sanitized.length <= MAX_SANITIZED_LENGTH) return sanitized;
  return `${sanitized.slice(0, MAX_SANITIZED_LENGTH)}-${Math.abs(djb2Hash(name)).toString(36)}`;
}

function loadTranscriptSession(id: string, transcriptPath: string): SessionData {
  const entries = readTranscriptFile(transcriptPath);
  const transcriptMessages = entries.filter(isTranscriptMessageEntry);
  const messages = transcriptMessages.map(entry => ({
    role: entry.message.role,
    content: cloneContent(entry.message.content),
    timestamp: Date.parse(entry.timestamp) || statSync(transcriptPath).mtimeMs,
  }));
  const firstTimestamp = messages[0]?.timestamp ?? statSync(transcriptPath).birthtimeMs;
  const title = getSessionTitle(messages, entries);
  const permissionMode =
    transcriptMessages.find(entry => entry.type === "user" && entry.permissionMode)?.permissionMode ||
    "default";

  return {
    id,
    title,
    messages,
    createdAt: firstTimestamp,
    updatedAt: statSync(transcriptPath).mtimeMs,
    permissionMode,
    cwd: transcriptMessages.find(entry => entry.cwd)?.cwd,
    transcriptPath,
  };
}

function buildTranscriptEntries(input: {
  session: SessionData;
  messages: SessionMessage[];
  startingParentUuid: string | null;
}): TranscriptMessageEntry[] {
  const cwd = input.session.cwd || process.cwd();
  const gitBranch = readGitBranch(cwd);
  let parentUuid = input.startingParentUuid;

  return input.messages.map(message => {
    const uuid = randomUUID();
    const entry: TranscriptMessageEntry = {
      parentUuid,
      isSidechain: false,
      type: message.role,
      message: {
        role: message.role,
        content: cloneContent(message.content),
      },
      uuid,
      timestamp: new Date(message.timestamp || Date.now()).toISOString(),
      userType: process.env.USER_TYPE || "external",
      entrypoint: process.env.CLAUDE_CODE_ENTRYPOINT || "cli",
      cwd,
      sessionId: input.session.id,
      version: VERSION,
      ...(gitBranch ? { gitBranch } : {}),
      ...(message.role === "user" ? { permissionMode: input.session.permissionMode } : {}),
    };
    parentUuid = uuid;
    return entry;
  });
}

function buildLastPromptEntry(sessionId: string, messages: SessionMessage[]): LastPromptEntry {
  const prompt = messages
    .filter(message => message.role === "user" && typeof message.content === "string")
    .map(message => message.content as string)
    .filter(Boolean)
    .at(-1) || "";
  return {
    type: "last-prompt",
    lastPrompt: prompt.replace(/\n/g, " ").trim().slice(0, 200),
    sessionId,
  };
}

function matchingPrefixLength(existing: TranscriptMessageEntry[], messages: SessionMessage[]): number {
  let index = 0;
  while (
    index < existing.length &&
    index < messages.length &&
    messageFingerprint(existing[index].message) === messageFingerprint(messages[index])
  ) {
    index++;
  }
  return index;
}

function getLastChainUuid(entries: TranscriptMessageEntry[]): string | null {
  return entries.at(-1)?.uuid || null;
}

function findTranscriptPath(id: string): string | null {
  const currentPath = getTranscriptPath(id);
  if (existsSync(currentPath)) return currentPath;

  const projectsDir = getProjectsDir();
  if (!existsSync(projectsDir)) return null;
  for (const project of readdirSync(projectsDir, { withFileTypes: true })) {
    if (!project.isDirectory()) continue;
    const candidate = join(projectsDir, project.name, `${id}.jsonl`);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

function listTranscriptSessions(): Array<{ id: string; title?: string; createdAt: number; messageCount: number }> {
  const projectsDir = getProjectsDir();
  if (!existsSync(projectsDir)) return [];

  const sessions: Array<{ id: string; title?: string; createdAt: number; messageCount: number }> = [];
  for (const project of readdirSync(projectsDir, { withFileTypes: true })) {
    if (!project.isDirectory()) continue;
    const dir = join(projectsDir, project.name);
    for (const file of readdirSync(dir, { withFileTypes: true })) {
      if (!file.isFile() || !file.name.endsWith(".jsonl")) continue;
      const transcriptPath = join(dir, file.name);
      const id = file.name.slice(0, -".jsonl".length);
      const entries = readTranscriptFile(transcriptPath);
      const messages = entries.filter(isTranscriptMessageEntry).map(entry => ({
        role: entry.message.role,
        content: cloneContent(entry.message.content),
        timestamp: Date.parse(entry.timestamp) || statSync(transcriptPath).mtimeMs,
      }));
      sessions.push({
        id,
        title: getSessionTitle(messages, entries),
        createdAt: messages[0]?.timestamp ?? statSync(transcriptPath).birthtimeMs,
        messageCount: messages.length,
      });
    }
  }
  return sessions;
}

function readTranscriptFile(transcriptPath: string): TranscriptEntry[] {
  const text = readFileSync(transcriptPath, "utf8");
  return text
    .split(/\n/u)
    .filter(Boolean)
    .map(line => JSON.parse(line) as TranscriptEntry);
}

function writeJsonlAtomically(path: string, entries: TranscriptEntry[]): void {
  const tempPath = `${path}.${process.pid}.${Date.now()}.tmp`;
  writeFileSync(tempPath, entries.map(entry => JSON.stringify(entry)).join("\n") + "\n", "utf8");
  renameSync(tempPath, path);
}

function isTranscriptMessageEntry(entry: TranscriptEntry): entry is TranscriptMessageEntry {
  if (entry.type !== "user" && entry.type !== "assistant") return false;
  const maybe = entry as Partial<TranscriptMessageEntry>;
  return Boolean(
    maybe.message &&
      maybe.uuid &&
      typeof maybe.timestamp === "string" &&
      (maybe.message.role === "user" || maybe.message.role === "assistant"),
  );
}

function getSessionTitle(messages: SessionMessage[], entries: TranscriptEntry[]): string | undefined {
  const aiTitle = entries.findLast(entry => typeof entry.aiTitle === "string")?.aiTitle;
  if (typeof aiTitle === "string" && aiTitle.trim()) return aiTitle.trim();
  const customTitle = entries.findLast(entry => typeof entry.customTitle === "string")?.customTitle;
  if (typeof customTitle === "string" && customTitle.trim()) return customTitle.trim();
  return messages
    .filter(message => message.role === "user" && typeof message.content === "string")
    .map(message => (message.content as string).replace(/\s+/gu, " ").trim())
    .find(Boolean)
    ?.slice(0, 80);
}

function extractText(content: ApiMessageContent): string {
  if (typeof content === "string") return content;
  return content
    .map(block => {
      if (block.type === "text") return block.text;
      if (block.type === "tool_result") return block.content;
      if (block.type === "tool_use") return `${block.name}(${JSON.stringify(block.input)})`;
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

function messageFingerprint(message: ApiMessage | SessionMessage): string {
  return JSON.stringify({
    role: message.role,
    content: message.content,
  });
}

function cloneContent<T extends ApiMessageContent>(content: T): T {
  return JSON.parse(JSON.stringify(content)) as T;
}

function readGitBranch(cwd: string): string | undefined {
  const headPath = join(cwd, ".git", "HEAD");
  if (!existsSync(headPath)) return undefined;
  const head = readFileSync(headPath, "utf8").trim();
  if (head.startsWith("ref: refs/heads/")) return head.slice("ref: refs/heads/".length);
  return head || undefined;
}

function loadLegacySession(id: string): SessionData | null {
  const path = join(getLegacySessionDir(), `${id}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf-8")) as SessionData;
}

function listLegacySessions(): Array<{ id: string; title?: string; createdAt: number; messageCount: number }> {
  const legacySessionDir = getLegacySessionDir();
  if (!existsSync(legacySessionDir)) return [];
  return readdirSync(legacySessionDir)
    .filter(file => file.endsWith(".json"))
    .map(file => {
      const data = JSON.parse(readFileSync(join(legacySessionDir, file), "utf-8")) as SessionData;
      return {
        id: data.id,
        title: data.title,
        createdAt: data.createdAt,
        messageCount: data.messages?.length || 0,
      };
    });
}

function getLegacySessionDir(): string {
  return join(getClaudeConfigDir(), "sessions");
}

function djb2Hash(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index++) {
    hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
  }
  return hash;
}
