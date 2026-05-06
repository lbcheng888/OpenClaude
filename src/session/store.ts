import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { randomUUID } from "crypto";
import { homedir } from "os";
import { dirname, join } from "path";
import type { ApiMessage, ApiMessageContent } from "../api/client.js";

const MAX_SANITIZED_LENGTH = 200;
const VERSION = "2.1.128";
const MAX_TOMBSTONE_REWRITE_BYTES = 50 * 1024 * 1024;

export interface SessionData {
  id: string;
  title?: string;
  messages: SessionMessage[];
  createdAt: number;
  updatedAt: number;
  permissionMode: string;
  cwd?: string;
  transcriptPath?: string;
  parentUuid?: string | null;
  summary?: string;
  customTitle?: string;
  tag?: string;
  agentName?: string;
  agentColor?: string;
  agentSetting?: string;
}

export type SessionMessage = {
  role: ApiMessage["role"];
  content: ApiMessageContent;
  timestamp: number;
};

// Complete entry types matching official schema
type TranscriptMessageEntry = {
  parentUuid: string | null;
  logicalParentUuid?: string | null;
  isSidechain: boolean;
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
  agentId?: string;
  teamName?: string;
  agentName?: string;
  agentColor?: string;
  promptId?: string;
};

type SummaryMessageEntry = { type: "summary"; leafUuid: string; summary: string };
type CustomTitleEntry = { type: "custom-title"; sessionId: string; customTitle: string };
type AiTitleEntry = { type: "ai-title"; sessionId: string; aiTitle: string };
type LastPromptEntry = { type: "last-prompt"; sessionId: string; lastPrompt: string };
type TaskSummaryEntry = { type: "task-summary"; sessionId: string; summary: string; timestamp: string };
type TagEntry = { type: "tag"; sessionId: string; tag: string };
type AgentNameEntry = { type: "agent-name"; sessionId: string; agentName: string };
type AgentColorEntry = { type: "agent-color"; sessionId: string; agentColor: string };
type AgentSettingEntry = { type: "agent-setting"; sessionId: string; agentSetting: string };
type PRLinkEntry = {
  type: "pr-link";
  sessionId: string;
  prNumber: number;
  prUrl: string;
  prRepository: string;
  timestamp: string;
};
type QueueOperationEntry = {
  type: "queue-operation";
  operation: "enqueue" | "dequeue" | "remove";
  timestamp: string;
  sessionId: string;
  content?: string;
};
type AttributionSnapshotEntry = {
  type: "attribution-snapshot";
  messageId: string;
  surface: string;
  fileStates: unknown[];
  timestamp: string;
};
type FileHistorySnapshotEntry = {
  type: "file-history-snapshot";
  messageId: string;
  snapshot: unknown;
  isSnapshotUpdate?: boolean;
};
type ModeEntry = { type: "mode"; sessionId: string; mode: "coordinator" | "normal" };
type WorktreeStateEntry = { type: "worktree-state"; sessionId: string; worktreeSession: unknown };
type ContentReplacementEntry = {
  type: "content-replacement";
  sessionId: string;
  agentId?: string;
  replacements: Array<{ original: string; replacement: string }>;
};
type CompactBoundaryEntry = {
  type: "system";
  subtype: "compact_boundary";
  parentUuid: null;
  logicalParentUuid?: string;
  message: ApiMessage;
  uuid: string;
  timestamp: string;
  sessionId: string;
  compactMetadata?: {
    trigger: "manual" | "auto";
    preTokens?: number;
    preservedSegment?: {
      headUuid: string;
      tailUuid: string;
      anchorUuid: string;
    };
  };
};

type TranscriptEntry =
  | TranscriptMessageEntry
  | LastPromptEntry
  | SummaryMessageEntry
  | CustomTitleEntry
  | AiTitleEntry
  | TaskSummaryEntry
  | TagEntry
  | AgentNameEntry
  | AgentColorEntry
  | AgentSettingEntry
  | PRLinkEntry
  | QueueOperationEntry
  | AttributionSnapshotEntry
  | FileHistorySnapshotEntry
  | ModeEntry
  | WorktreeStateEntry
  | ContentReplacementEntry
  | CompactBoundaryEntry
  | Record<string, unknown>;

// ---- Session save/load ----

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

  let entries: TranscriptEntry[];
  if (shouldAppend) {
    entries = [
      ...existing,
      ...buildTranscriptEntries({
        session,
        messages: messages.slice(prefixLength),
        startingParentUuid: getLastChainUuid(existingMessages),
      }),
    ];
  } else {
    entries = buildTranscriptEntries({ session, messages, startingParentUuid: null });
  }

  // Persist metadata alongside messages
  const finalEntries = [
    ...entries.filter(e => e.type !== "last-prompt"),
    buildLastPromptEntry(session.id, messages),
  ];

  // Append summary if present
  if (session.summary) {
    finalEntries.push({
      type: "summary",
      leafUuid: messages.length > 0 ? finalEntries.filter(isTranscriptMessageEntry).at(-1)?.uuid || "" : "",
      summary: session.summary,
    } as SummaryMessageEntry);
  }

  // Append metadata entries
  if (session.customTitle) {
    finalEntries.push({
      type: "custom-title",
      sessionId: session.id,
      customTitle: session.customTitle,
    } as CustomTitleEntry);
  }
  if (session.tag) {
    finalEntries.push({ type: "tag", sessionId: session.id, tag: session.tag } as TagEntry);
  }
  if (session.agentName) {
    finalEntries.push({
      type: "agent-name",
      sessionId: session.id,
      agentName: session.agentName,
    } as AgentNameEntry);
  }
  if (session.agentColor) {
    finalEntries.push({
      type: "agent-color",
      sessionId: session.id,
      agentColor: session.agentColor,
    } as AgentColorEntry);
  }
  if (session.agentSetting) {
    finalEntries.push({
      type: "agent-setting",
      sessionId: session.id,
      agentSetting: session.agentSetting,
    } as AgentSettingEntry);
  }

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

export function listSessions(): Array<{
  id: string;
  title?: string;
  createdAt: number;
  messageCount: number;
  summary?: string;
  customTitle?: string;
  tag?: string;
}> {
  const sessions = listTranscriptSessions();
  const legacy = listLegacySessions().filter(
    item => !sessions.some(session => session.id === item.id),
  );
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
    parentUuid: null,
  };
}

// ---- Queue operations ----

export function recordQueueOperation(
  sessionId: string,
  operation: "enqueue" | "dequeue" | "remove",
  content?: string,
): void {
  const transcriptPath = findTranscriptPath(sessionId) || getTranscriptPath(sessionId);
  mkdirSync(dirname(transcriptPath), { recursive: true });
  const entries = existsSync(transcriptPath) ? readTranscriptFile(transcriptPath) : [];
  entries.push({
    type: "queue-operation",
    operation,
    timestamp: new Date().toISOString(),
    sessionId,
    ...(content ? { content } : {}),
  } as QueueOperationEntry);
  writeJsonlAtomically(transcriptPath, entries);
}

// ---- Tombstone (remove message by UUID) ----

export function removeTranscriptMessage(sessionId: string, targetUuid: string): boolean {
  const transcriptPath = findTranscriptPath(sessionId);
  if (!transcriptPath) return false;

  const stat = statSync(transcriptPath);
  if (stat.size > MAX_TOMBSTONE_REWRITE_BYTES) {
    // For large files, try fast path: check last 64KB
    const fd = readFileSync(transcriptPath, "utf8");
    const lastNewline = fd.lastIndexOf("\n", fd.length - 65536);
    const tail = lastNewline >= 0 ? fd.slice(lastNewline + 1) : fd;
    if (!tail.includes(targetUuid)) return false;
  }

  const entries = readTranscriptFile(transcriptPath);
  const filtered = entries.filter(entry => {
    if (isTranscriptMessageEntry(entry)) return entry.uuid !== targetUuid;
    return true;
  });
  if (filtered.length === entries.length) return false;
  writeJsonlAtomically(transcriptPath, filtered);
  return true;
}

// ---- Compact boundary ----

export function writeCompactBoundary(
  sessionId: string,
  cwd: string,
  trigger: "manual" | "auto",
  preTokens?: number,
): void {
  const transcriptPath = getTranscriptPath(sessionId, cwd);
  mkdirSync(dirname(transcriptPath), { recursive: true });
  const entries = existsSync(transcriptPath) ? readTranscriptFile(transcriptPath) : [];

  entries.push({
    type: "system",
    subtype: "compact_boundary",
    parentUuid: null,
    message: {
      role: "user",
      content: `[Conversation compacted at ${new Date().toISOString()}]`,
    },
    uuid: randomUUID(),
    timestamp: new Date().toISOString(),
    sessionId,
    compactMetadata: {
      trigger,
      ...(preTokens !== undefined ? { preTokens } : {}),
    },
  } as CompactBoundaryEntry);

  writeJsonlAtomically(transcriptPath, entries);
}

// ---- Sidechain subagent transcripts ----

export function getAgentTranscriptPath(sessionId: string, agentId: string, cwd?: string): string {
  return join(getProjectDir(cwd || process.cwd()), sessionId, "subagents", `agent-${agentId}.jsonl`);
}

export function getAgentMetadataPath(sessionId: string, agentId: string, cwd?: string): string {
  return getAgentTranscriptPath(sessionId, agentId, cwd).replace(".jsonl", ".meta.json");
}

export function recordSidechainTranscript(
  sessionId: string,
  agentId: string,
  messages: SessionMessage[],
  cwd?: string,
  teamName?: string,
): void {
  const agentPath = getAgentTranscriptPath(sessionId, agentId, cwd);
  mkdirSync(dirname(agentPath), { recursive: true });
  const existing = existsSync(agentPath) ? readTranscriptFile(agentPath) : [];
  const existingMessages = existing.filter(isTranscriptMessageEntry);
  const lastParentUuid = getLastChainUuid(existingMessages);

  const entries = messages.map(message => {
    const uuid = randomUUID();
    const entry: TranscriptMessageEntry = {
      parentUuid: lastParentUuid,
      isSidechain: true,
      type: message.role,
      message: {
        role: message.role,
        content: cloneContent(message.content),
      },
      uuid,
      timestamp: new Date(message.timestamp || Date.now()).toISOString(),
      userType: process.env.USER_TYPE || "external",
      entrypoint: process.env.CLAUDE_CODE_ENTRYPOINT || "cli",
      cwd: cwd || process.cwd(),
      sessionId,
      version: VERSION,
      agentId,
      ...(teamName ? { teamName } : {}),
    };
    return entry;
  });

  writeJsonlAtomically(agentPath, [...existing, ...entries]);
}

export function loadSidechainTranscript(
  sessionId: string,
  agentId: string,
  cwd?: string,
): SessionMessage[] {
  const agentPath = getAgentTranscriptPath(sessionId, agentId, cwd);
  if (!existsSync(agentPath)) return [];
  const entries = readTranscriptFile(agentPath);
  return entries.filter(isTranscriptMessageEntry).map(entry => ({
    role: entry.message.role,
    content: cloneContent(entry.message.content),
    timestamp: Date.parse(entry.timestamp) || 0,
  }));
}

export function listAllSubagentTranscripts(
  sessionId: string,
  cwd?: string,
): Array<{ agentId: string; messageCount: number }> {
  const subagentsDir = join(getProjectDir(cwd || process.cwd()), sessionId, "subagents");
  if (!existsSync(subagentsDir)) return [];
  return readdirSync(subagentsDir, { withFileTypes: true })
    .filter(f => f.isFile() && f.name.startsWith("agent-") && f.name.endsWith(".jsonl"))
    .map(f => {
      const agentId = f.name.slice("agent-".length, -".jsonl".length);
      const entries = readTranscriptFile(join(subagentsDir, f.name));
      return { agentId, messageCount: entries.filter(isTranscriptMessageEntry).length };
    });
}

export function writeAgentMetadata(
  sessionId: string,
  agentId: string,
  metadata: { agentType?: string; worktreePath?: string; description?: string },
  cwd?: string,
): void {
  const metaPath = getAgentMetadataPath(sessionId, agentId, cwd);
  mkdirSync(dirname(metaPath), { recursive: true });
  writeFileSync(metaPath, JSON.stringify(metadata, null, 2), "utf8");
}

// ---- Public API for adding metadata entries to existing session ----

export function setSessionSummary(sessionId: string, summary: string, leafUuid?: string): void {
  appendMetadataEntry(sessionId, {
    type: "summary",
    leafUuid: leafUuid || "",
    summary,
  } as SummaryMessageEntry);
}

export function setSessionCustomTitle(sessionId: string, customTitle: string): void {
  appendMetadataEntry(sessionId, {
    type: "custom-title",
    sessionId,
    customTitle,
  } as CustomTitleEntry);
}

export function setSessionTag(sessionId: string, tag: string): void {
  appendMetadataEntry(sessionId, { type: "tag", sessionId, tag } as TagEntry);
}

export function setSessionAgentName(sessionId: string, agentName: string): void {
  appendMetadataEntry(sessionId, {
    type: "agent-name",
    sessionId,
    agentName,
  } as AgentNameEntry);
}

export function setSessionAgentColor(sessionId: string, agentColor: string): void {
  appendMetadataEntry(sessionId, {
    type: "agent-color",
    sessionId,
    agentColor,
  } as AgentColorEntry);
}

export function recordPRLink(
  sessionId: string,
  prNumber: number,
  prUrl: string,
  prRepository: string,
): void {
  appendMetadataEntry(sessionId, {
    type: "pr-link",
    sessionId,
    prNumber,
    prUrl,
    prRepository,
    timestamp: new Date().toISOString(),
  } as PRLinkEntry);
}

// ---- Path helpers ----

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

// ---- Internal helpers ----

function appendMetadataEntry(sessionId: string, entry: TranscriptEntry): void {
  const transcriptPath = findTranscriptPath(sessionId) || getTranscriptPath(sessionId);
  mkdirSync(dirname(transcriptPath), { recursive: true });
  const entries = existsSync(transcriptPath) ? readTranscriptFile(transcriptPath) : [];
  entries.push(entry);
  writeJsonlAtomically(transcriptPath, entries);
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
    transcriptMessages.find(entry => entry.type === "user" && entry.permissionMode)
      ?.permissionMode || "default";

  // Extract metadata from entries
  const summaryEntry = entries.findLast(
    e => (e as SummaryMessageEntry).type === "summary",
  ) as SummaryMessageEntry | undefined;
  const customTitleEntry = entries.findLast(
    e => (e as CustomTitleEntry).type === "custom-title",
  ) as CustomTitleEntry | undefined;
  const tagEntry = entries.findLast(
    e => (e as TagEntry).type === "tag",
  ) as TagEntry | undefined;
  const agentNameEntry = entries.findLast(
    e => (e as AgentNameEntry).type === "agent-name",
  ) as AgentNameEntry | undefined;
  const agentColorEntry = entries.findLast(
    e => (e as AgentColorEntry).type === "agent-color",
  ) as AgentColorEntry | undefined;
  const agentSettingEntry = entries.findLast(
    e => (e as AgentSettingEntry).type === "agent-setting",
  ) as AgentSettingEntry | undefined;

  return {
    id,
    title,
    messages,
    createdAt: firstTimestamp,
    updatedAt: statSync(transcriptPath).mtimeMs,
    permissionMode,
    cwd: transcriptMessages.find(entry => entry.cwd)?.cwd,
    transcriptPath,
    parentUuid: transcriptMessages.at(-1)?.uuid || null,
    summary: summaryEntry?.summary,
    customTitle: customTitleEntry?.customTitle,
    tag: tagEntry?.tag,
    agentName: agentNameEntry?.agentName,
    agentColor: agentColorEntry?.agentColor,
    agentSetting: agentSettingEntry?.agentSetting,
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
  const prompt =
    messages
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

function matchingPrefixLength(
  existing: TranscriptMessageEntry[],
  messages: SessionMessage[],
): number {
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

function listTranscriptSessions(): Array<{
  id: string;
  title?: string;
  createdAt: number;
  messageCount: number;
  summary?: string;
  customTitle?: string;
  tag?: string;
}> {
  const projectsDir = getProjectsDir();
  if (!existsSync(projectsDir)) return [];

  const sessions: Array<{
    id: string;
    title?: string;
    createdAt: number;
    messageCount: number;
    summary?: string;
    customTitle?: string;
    tag?: string;
  }> = [];

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
      const summaryEntry = entries.findLast(
        e => (e as SummaryMessageEntry).type === "summary",
      ) as SummaryMessageEntry | undefined;
      const customTitleEntry = entries.findLast(
        e => (e as CustomTitleEntry).type === "custom-title",
      ) as CustomTitleEntry | undefined;
      const tagEntry = entries.findLast(
        e => (e as TagEntry).type === "tag",
      ) as TagEntry | undefined;

      sessions.push({
        id,
        title: getSessionTitle(messages, entries),
        createdAt: messages[0]?.timestamp ?? statSync(transcriptPath).birthtimeMs,
        messageCount: messages.length,
        summary: summaryEntry?.summary,
        customTitle: customTitleEntry?.customTitle,
        tag: tagEntry?.tag,
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
    .map(line => {
      try {
        return JSON.parse(line) as TranscriptEntry;
      } catch {
        return {} as TranscriptEntry;
      }
    });
}

function writeJsonlAtomically(path: string, entries: TranscriptEntry[]): void {
  const tempPath = `${path}.${process.pid}.${Date.now()}.tmp`;
  writeFileSync(
    tempPath,
    entries.map(entry => JSON.stringify(entry)).join("\n") + "\n",
    "utf8",
  );
  renameSync(tempPath, path);
}

export function isTranscriptMessageEntry(entry: TranscriptEntry): entry is TranscriptMessageEntry {
  if (entry.type !== "user" && entry.type !== "assistant") return false;
  const maybe = entry as Partial<TranscriptMessageEntry>;
  return Boolean(
    maybe.message &&
      maybe.uuid &&
      typeof maybe.timestamp === "string" &&
      (maybe.message.role === "user" || maybe.message.role === "assistant"),
  );
}

function getSessionTitle(
  messages: SessionMessage[],
  entries: TranscriptEntry[],
): string | undefined {
  const aiTitle = findLastStringField(entries, "aiTitle");
  if (aiTitle && aiTitle.trim()) return aiTitle.trim();
  const customTitle = findLastStringField(entries, "customTitle");
  if (customTitle && customTitle.trim()) return customTitle.trim();
  return messages
    .filter(message => message.role === "user" && typeof message.content === "string")
    .map(message => (message.content as string).replace(/\s+/gu, " ").trim())
    .find(Boolean)
    ?.slice(0, 80);
}

function findLastStringField(entries: TranscriptEntry[], field: string): string | undefined {
  const last = entries.findLast(
    entry => typeof (entry as Record<string, unknown>)[field] === "string",
  );
  return last ? (last as Record<string, unknown>)[field] as string : undefined;
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

function listLegacySessions(): Array<{
  id: string;
  title?: string;
  createdAt: number;
  messageCount: number;
}> {
  const legacySessionDir = getLegacySessionDir();
  if (!existsSync(legacySessionDir)) return [];
  return readdirSync(legacySessionDir)
    .filter(file => file.endsWith(".json"))
    .map(file => {
      const data = JSON.parse(
        readFileSync(join(legacySessionDir, file), "utf-8"),
      ) as SessionData;
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
