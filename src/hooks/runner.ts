import { exec } from "node:child_process";
import { readClaudeSettings, type ClaudeSettings, type HookCommand } from "../config/claude-settings.js";

export const HOOK_EVENTS = [
  "PreToolUse",
  "PostToolUse",
  "PostToolUseFailure",
  "Notification",
  "UserPromptSubmit",
  "SessionStart",
  "SessionEnd",
  "Stop",
  "StopFailure",
  "SubagentStart",
  "SubagentStop",
  "PreCompact",
  "PostCompact",
  "PermissionRequest",
  "PermissionDenied",
  "Setup",
  "TeammateIdle",
  "TaskCreated",
  "TaskCompleted",
  "Elicitation",
  "ElicitationResult",
  "ConfigChange",
  "WorktreeCreate",
  "WorktreeRemove",
  "InstructionsLoaded",
  "CwdChanged",
  "FileChanged",
] as const;

export type HookEventName = (typeof HOOK_EVENTS)[number];

export type HookInput = {
  hook_event_name?: HookEventName;
  session_id?: string;
  transcript_path?: string;
  effort?: { level?: unknown };
  cwd?: string;
  permission_mode?: string;
  agent_id?: string;
  agent_type?: string;
  // PreToolUse / PostToolUse / PostToolUseFailure / PermissionRequest
  tool_name?: string;
  tool_input?: Record<string, unknown>;
  tool_use_id?: string;
  tool_response?: unknown;
  is_error?: boolean;
  // PostToolUseFailure
  error?: string;
  is_interrupt?: boolean;
  // UserPromptSubmit
  prompt?: string;
  // SessionStart
  source?: "startup" | "resume" | "clear" | "compact";
  model?: string;
  // SessionEnd
  reason?: string;
  // Stop / SubagentStop
  stop_hook_active?: boolean;
  last_assistant_message?: string;
  // SubagentStart / SubagentStop
  agent_transcript_path?: string;
  // StopFailure
  error_details?: string;
  // Notification
  message?: string;
  title?: string;
  notification_type?: string;
  // PreCompact / PostCompact
  trigger?: "manual" | "auto";
  custom_instructions?: string | null;
  compact_summary?: string;
  // PermissionRequest
  permission_suggestions?: unknown[];
  // PermissionDenied
  // TeammateIdle
  teammate_name?: string;
  team_name?: string;
  // TaskCreated / TaskCompleted
  task_id?: string;
  task_subject?: string;
  task_description?: string;
  // Elicitation
  mcp_server_name?: string;
  mode?: string;
  url?: string;
  elicitation_id?: string;
  requested_schema?: Record<string, unknown>;
  action?: string;
  content?: Record<string, unknown>;
  // WorktreeCreate
  name?: string;
  // WorktreeRemove
  worktree_path?: string;
  // CwdChanged
  old_cwd?: string;
  new_cwd?: string;
  // FileChanged
  file_path?: string;
  event?: string;
  // InstructionsLoaded
  load_reason?: string;
  globs?: string[];
  trigger_file_path?: string;
  parent_file_path?: string;
  memory_type?: string;
  // ConfigChange
  [key: string]: unknown;
};

export type HookOutcome = {
  blocked: boolean;
  message?: string;
  permissionBehavior?: "allow" | "deny" | "ask" | "passthrough";
  permissionDecision?: {
    behavior: "allow" | "deny";
    updatedInput?: Record<string, unknown>;
    message?: string;
  };
  permissionDecisionReason?: string;
  preventContinuation?: boolean;
  stopReason?: string;
  updatedInput?: Record<string, unknown>;
  additionalContext: string[];
  notifications: string[];
  systemMessage?: string;
  suppressOutput?: boolean;
  initialUserMessage?: string;
  watchPaths?: string[];
  retry?: boolean;
};

export type HookRunner = (
  event: HookEventName,
  input: HookInput,
  signal?: AbortSignal,
) => Promise<HookOutcome>;

type HookExecResult = {
  exitCode: number;
  stdout: string;
  stderr: string;
};

export type HookJSONOutput = {
  continue?: boolean;
  suppressOutput?: boolean;
  stopReason?: string;
  decision?: "approve" | "block";
  reason?: string;
  systemMessage?: string;
  // async hook response
  async?: boolean;
  asyncTimeout?: number;
  hookSpecificOutput?: {
    hookEventName?: HookEventName | string;
    // PreToolUse
    permissionDecision?: "allow" | "deny" | "ask";
    permissionDecisionReason?: string;
    updatedInput?: Record<string, unknown>;
    additionalContext?: string;
    // UserPromptSubmit / SessionStart / SubagentStart / PostToolUse / PostToolUseFailure / Notification
    // PermissionDenied
    retry?: boolean;
    // Notification
    // PermissionRequest
    decision?: {
      behavior?: "allow" | "deny";
      updatedInput?: Record<string, unknown>;
      updatedPermissions?: unknown[];
      message?: string;
      interrupt?: boolean;
    };
    // SessionStart
    initialUserMessage?: string;
    watchPaths?: string[];
    // PostToolUse
    updatedMCPToolOutput?: unknown;
    // Elicitation / ElicitationResult
    action?: "accept" | "decline" | "cancel";
    content?: Record<string, unknown>;
    // WorktreeCreate
    worktreePath?: string;
  };
};

export function createSettingsHookRunner(settings = readClaudeSettings()): HookRunner | undefined {
  if (!settings?.hooks) return undefined;
  return (event, input, signal) => runSettingsHooks(settings, event, input, signal);
}

export async function runSettingsHooks(
  settings: ClaudeSettings,
  event: HookEventName,
  input: HookInput,
  signal?: AbortSignal,
): Promise<HookOutcome> {
  const matchers = settings.hooks?.[event] || [];
  const outcome = createHookOutcome();

  // Inject effort level from settings into all hook payloads
  if (settings.effortLevel !== undefined) {
    input.effort = { level: settings.effortLevel };
  }

  for (const matcher of matchers) {
    if (!matchesHookMatcherForInput(matcher.matcher, event, input)) continue;

    for (const hook of matcher.hooks || []) {
      if (!matchesHookIfCondition(hook, event, input)) continue;

      // async command hooks run in background, don't block
      if (isCommandHook(hook) && (hook.async || hook.asyncRewake)) {
        void runAsyncCommandHook(hook, event, input, signal).catch(() => undefined);
        continue;
      }

      let result: HookExecResult;
      const hookType = hook.type;
      switch (hookType) {
        case "command":
          result = await runCommandHook(hook as Extract<HookCommand, { type: "command" }>, event, input, signal);
          break;
        case "http":
          result = await runHttpHook(hook as Extract<HookCommand, { type: "http" }>, event, input, signal);
          break;
        case "prompt":
        case "agent":
          result = await runPromptOrAgentHook(hook, event, input, signal);
          break;
        default:
          throw new Error(`Unsupported hook type: ${hookType || "unknown"}`);
      }

      mergeHookOutcome(outcome, processHookResult(result, event, hook));
      if (outcome.blocked) return outcome;
    }
  }

  return outcome;
}

function processHookResult(
  result: HookExecResult,
  event: HookEventName,
  hook: HookCommand,
): HookOutcome {
  const outcome = createHookOutcome();
  const json = parseHookJsonOutput(result.stdout);

  if (json) {
    applyHookJsonOutput(outcome, json, event, hook);
  } else if (result.stdout.trim() && shouldSurfacePlainStdout(event)) {
    outcome.notifications.push(result.stdout.trim());
  }

  // exit code 2 = blocking error
  if (result.exitCode === 2 && !outcome.blocked) {
    outcome.blocked = true;
    outcome.message = result.stderr.trim() || result.stdout.trim() || "Hook blocked continuation";
  }

  // non-zero, non-2 exit codes: show stderr as warning
  if (result.exitCode !== 0 && result.exitCode !== 2 && result.stderr.trim()) {
    outcome.notifications.push(result.stderr.trim());
  }

  return outcome;
}

function applyHookJsonOutput(
  outcome: HookOutcome,
  json: HookJSONOutput,
  event: HookEventName,
  hook: HookCommand,
): void {
  if (json.continue === false) {
    outcome.preventContinuation = true;
    outcome.stopReason = json.stopReason;
  }

  if (json.decision === "block") {
    outcome.blocked = true;
    outcome.message = json.reason || getHookDisplayText(hook) || "Blocked by hook";
  }

  if (json.systemMessage && !json.suppressOutput) {
    outcome.systemMessage = json.systemMessage;
    outcome.notifications.push(json.systemMessage);
  }

  if (json.suppressOutput) {
    outcome.suppressOutput = true;
  }

  const hookOutput = json.hookSpecificOutput;
  if (!hookOutput) return;

  if (hookOutput.hookEventName && hookOutput.hookEventName !== event) {
    outcome.notifications.push(
      `Hook output event mismatch: expected ${event}, got ${hookOutput.hookEventName}`,
    );
    return;
  }

  if (hookOutput.additionalContext) {
    outcome.additionalContext.push(hookOutput.additionalContext);
  }

  if (hookOutput.initialUserMessage) {
    outcome.initialUserMessage = hookOutput.initialUserMessage;
  }

  if (hookOutput.watchPaths) {
    outcome.watchPaths = hookOutput.watchPaths;
  }

  if (hookOutput.retry) {
    outcome.retry = true;
  }

  switch (event) {
    case "PreToolUse":
      if (hookOutput.permissionDecision) {
        outcome.permissionBehavior = hookOutput.permissionDecision;
        outcome.permissionDecisionReason = hookOutput.permissionDecisionReason;
        if (hookOutput.permissionDecision === "deny") {
          outcome.blocked = true;
          outcome.message =
            hookOutput.permissionDecisionReason || "PreToolUse hook denied tool execution";
        }
      }
      if (hookOutput.updatedInput) {
        outcome.updatedInput = hookOutput.updatedInput;
      }
      break;

    case "PermissionRequest":
      if (hookOutput.decision?.behavior) {
        outcome.permissionDecision = {
          behavior: hookOutput.decision.behavior,
          updatedInput: hookOutput.decision.updatedInput,
          message: hookOutput.decision.message,
        };
      }
      break;

    case "PostToolUse":
      if (hookOutput.additionalContext) {
        outcome.additionalContext.push(hookOutput.additionalContext);
      }
      break;

    case "PermissionDenied":
      if (hookOutput.retry) {
        outcome.retry = true;
      }
      break;
  }
}

function createHookOutcome(): HookOutcome {
  return {
    blocked: false,
    additionalContext: [],
    notifications: [],
  };
}

function mergeHookOutcome(target: HookOutcome, source: HookOutcome): void {
  target.notifications.push(...source.notifications);
  target.additionalContext.push(...source.additionalContext);
  target.updatedInput = source.updatedInput ?? target.updatedInput;
  target.permissionBehavior = source.permissionBehavior ?? target.permissionBehavior;
  target.permissionDecision = source.permissionDecision ?? target.permissionDecision;
  target.permissionDecisionReason =
    source.permissionDecisionReason ?? target.permissionDecisionReason;
  target.preventContinuation = source.preventContinuation || target.preventContinuation;
  target.stopReason = source.stopReason ?? target.stopReason;
  target.initialUserMessage = source.initialUserMessage ?? target.initialUserMessage;
  if (source.watchPaths) {
    target.watchPaths = [...(target.watchPaths || []), ...source.watchPaths];
  }
  target.retry = source.retry || target.retry;
  target.suppressOutput = source.suppressOutput || target.suppressOutput;
  target.systemMessage = source.systemMessage ?? target.systemMessage;
  if (source.blocked) {
    target.blocked = true;
    target.message = source.message;
  }
}

function parseHookJsonOutput(stdout: string): HookJSONOutput | undefined {
  const trimmed = stdout.trim();
  if (!trimmed.startsWith("{")) return undefined;
  try {
    const parsed = JSON.parse(trimmed);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return undefined;
    return parsed as HookJSONOutput;
  } catch {
    return undefined;
  }
}

function shouldSurfacePlainStdout(event: HookEventName): boolean {
  return (
    event === "PostToolUse" ||
    event === "PostToolUseFailure" ||
    event === "UserPromptSubmit" ||
    event === "SessionStart" ||
    event === "PreCompact" ||
    event === "PostCompact" ||
    event === "Notification" ||
    event === "SubagentStart" ||
    event === "SubagentStop" ||
    event === "Setup" ||
    event === "TaskCreated" ||
    event === "TaskCompleted" ||
    event === "Stop" ||
    event === "StopFailure" ||
    event === "SessionEnd" ||
    event === "ConfigChange" ||
    event === "InstructionsLoaded" ||
    event === "CwdChanged" ||
    event === "FileChanged" ||
    event === "TeammateIdle" ||
    event === "Elicitation" ||
    event === "ElicitationResult" ||
    event === "WorktreeCreate" ||
    event === "WorktreeRemove" ||
    event === "PermissionDenied"
  );
}

function getMatchQuery(event: HookEventName, input: HookInput): string | undefined {
  switch (event) {
    case "PreToolUse":
    case "PostToolUse":
    case "PostToolUseFailure":
    case "PermissionRequest":
    case "PermissionDenied":
      return input.tool_name;
    case "SessionStart":
      return input.source;
    case "Setup":
    case "PreCompact":
    case "PostCompact":
      return input.trigger;
    case "Notification":
      return input.notification_type;
    case "SessionEnd":
      return input.reason;
    case "StopFailure":
      return typeof input.error === "string" ? input.error : undefined;
    case "SubagentStart":
    case "SubagentStop":
      return input.agent_type;
    case "Elicitation":
    case "ElicitationResult":
      return input.mcp_server_name;
    case "ConfigChange":
      return input.source;
    case "InstructionsLoaded":
      return input.load_reason;
    case "FileChanged":
      return input.file_path ? input.file_path.split("/").pop() || input.file_path : undefined;
    default:
      return undefined;
  }
}

function matchesHookMatcherForInput(
  matcher: string | undefined,
  event: HookEventName,
  input: HookInput,
): boolean {
  if (!matcher || matcher === "*") return true;

  if (isToolHookEvent(event)) {
    const match = matcher.trim().match(/^([A-Za-z0-9_.:-]+)\((.*)\)$/);
    if (match) {
      return match[1] === input.tool_name
        && matchGlob(match[2].trim(), getToolMatchValue(input.tool_name || "", input.tool_input || {}));
    }
  }

  return matchesHookMatcher(matcher, getMatchQuery(event, input));
}

function isToolHookEvent(event: HookEventName): boolean {
  return event === "PreToolUse"
    || event === "PostToolUse"
    || event === "PostToolUseFailure"
    || event === "PermissionRequest"
    || event === "PermissionDenied";
}

function matchesHookMatcher(matcher: string | undefined, matchQuery: string | undefined): boolean {
  if (!matcher || matcher === "*") return true;
  if (matchQuery === undefined) return true;

  const rule = matcher.trim();

  // Simple pipe-separated exact match: e.g. "Write|Edit" or "startup|resume"
  if (/^[a-zA-Z0-9_|.-]+$/.test(rule)) {
    if (rule.includes("|")) {
      return rule.split("|").map(s => s.trim()).includes(matchQuery);
    }
    return rule === matchQuery;
  }

  // Regex match
  try {
    return new RegExp(rule).test(matchQuery);
  } catch {
    return false;
  }
}

function matchesHookIfCondition(
  hook: HookCommand,
  event: HookEventName,
  input: HookInput,
): boolean {
  const condition = "if" in hook ? hook.if : undefined;
  if (!condition) return true;

  // if condition only applies to tool-related events
  if (
    event !== "PreToolUse" &&
    event !== "PostToolUse" &&
    event !== "PostToolUseFailure" &&
    event !== "PermissionRequest"
  ) {
    return true;
  }

  const match = condition.trim().match(/^([A-Za-z0-9_.:-]+)\((.*)\)$/);
  if (!match) return matchGlob(condition.trim(), input.tool_name || "");
  return match[1] === input.tool_name && matchGlob(match[2].trim(), getToolMatchValue(input.tool_name || "", input.tool_input || {}));
}

function getToolMatchValue(toolName: string, input: Record<string, unknown>): string {
  if (toolName === "Bash") return String(input.command || "");
  if (toolName === "Read" || toolName === "Write" || toolName === "Edit" || toolName === "MultiEdit") {
    return String(input.file_path || "");
  }
  if (toolName === "Grep" || toolName === "Glob") return String(input.pattern || "");
  if (toolName === "LS") return String(input.path || "");
  return JSON.stringify(input);
}

function matchGlob(pattern: string, value: string): boolean {
  const source = pattern
    .replace(/\\/g, "/")
    .split("")
    .map(char => {
      if (char === "*") return ".*";
      if (char === "?") return ".";
      return escapeRegExp(char);
    })
    .join("");
  return new RegExp(`^${source}$`).test(value.replace(/\\/g, "/"));
}

function isCommandHook(
  hook: HookCommand,
): hook is Extract<HookCommand, { type: "command" }> {
  return hook.type === "command";
}

async function runAsyncCommandHook(
  hook: Extract<HookCommand, { type: "command" }>,
  event: HookEventName,
  input: HookInput,
  signal?: AbortSignal,
): Promise<void> {
  const payload = JSON.stringify({ ...input, hook_event_name: event });
  const timeout = getHookTimeoutMs(hook.timeout);
  return new Promise((resolve, reject) => {
    const child = exec(
      hook.command,
      {
        timeout,
        maxBuffer: 1024 * 1024,
        shell: hook.shell && hook.shell !== "bash" ? hook.shell : "/bin/bash",
        signal,
        env: {
          ...process.env,
          CLAUDE_HOOK_EVENT: event,
          CLAUDE_HOOK_INPUT: payload,
        },
      },
      (_error: any, _stdout, _stderr) => {
        // async/asyncRewake: fire and forget
        resolve();
      },
    );
    child.stdin?.end(payload);
  });
}

function runCommandHook(
  hook: Extract<HookCommand, { type: "command" }>,
  event: HookEventName,
  input: HookInput,
  signal?: AbortSignal,
): Promise<HookExecResult> {
  const payload = JSON.stringify({ ...input, hook_event_name: event });
  const timeout = getHookTimeoutMs(hook.timeout);
  return new Promise((resolve, reject) => {
    const child = exec(
      hook.command,
      {
        timeout,
        maxBuffer: 1024 * 1024,
        shell: hook.shell && hook.shell !== "bash" ? hook.shell : "/bin/bash",
        signal,
        env: {
          ...process.env,
          CLAUDE_HOOK_EVENT: event,
          CLAUDE_HOOK_INPUT: payload,
        },
      },
      (error: any, stdout, stderr) => {
        if (signal?.aborted) {
          reject(signal.reason instanceof Error ? signal.reason : new Error("Interrupted"));
          return;
        }
        const exitCode = typeof error?.code === "number" ? error.code : 0;
        const timedOut = error?.killed === true || error?.signal === "SIGTERM";
        resolve({
          exitCode,
          stdout: String(stdout || ""),
          stderr: timedOut
            ? appendLine(String(stderr || ""), `Hook timed out after ${formatSeconds(timeout)}`)
            : String(stderr || ""),
        });
      },
    );
    child.stdin?.end(payload);
  });
}

async function runHttpHook(
  hook: Extract<HookCommand, { type: "http" }>,
  event: HookEventName,
  input: HookInput,
  signal?: AbortSignal,
): Promise<HookExecResult> {
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(
    () => timeoutController.abort(new Error("Hook timed out")),
    getHookTimeoutMs(hook.timeout),
  );
  const abortFromParent = (): void =>
    timeoutController.abort(signal?.reason ?? new Error("Interrupted"));
  if (signal?.aborted) abortFromParent();
  else signal?.addEventListener("abort", abortFromParent, { once: true });

  try {
    const headers: Record<string, string> = {
      "content-type": "application/json",
      ...(hook.headers || {}),
    };
    // Substitute $VAR_NAME in header values
    for (const [key, value] of Object.entries(headers)) {
      headers[key] = value.replace(/\$([A-Z_][A-Z0-9_]*)/g, (_, name) => process.env[name] || "");
    }

    const response = await fetch(hook.url, {
      method: "POST",
      headers,
      body: JSON.stringify({ ...input, hook_event_name: event }),
      signal: timeoutController.signal,
    });
    const text = await response.text();
    return {
      exitCode: response.ok ? 0 : 1,
      stdout: response.ok ? text : "",
      stderr: response.ok ? "" : text || `HTTP ${response.status}`,
    };
  } catch (error) {
    return {
      exitCode: 1,
      stdout: "",
      stderr: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortFromParent);
  }
}

async function runPromptOrAgentHook(
  hook: HookCommand,
  event: HookEventName,
  input: HookInput,
  signal?: AbortSignal,
): Promise<HookExecResult> {
  // prompt and agent hooks execute as command hooks via a subprocess
  // In a full implementation, these would call the API directly
  // For now, they fall through to a command-based approach
  if (hook.type === "prompt" || hook.type === "agent") {
    const timeout = getHookTimeoutMs(
      "timeout" in hook && typeof hook.timeout === "number" ? hook.timeout : undefined,
    );
    const promptContent =
      "prompt" in hook && typeof hook.prompt === "string" ? hook.prompt : "";
    const statusMessage =
      "statusMessage" in hook && typeof hook.statusMessage === "string"
        ? hook.statusMessage
        : undefined;

    // Execute prompt as a command hook that invokes the model via CLI
    const payload = JSON.stringify({ ...input, hook_event_name: event });
    const command = `echo ${JSON.stringify(payload)}`;

    return new Promise(resolve => {
      exec(
        command,
        { timeout, maxBuffer: 1024 * 1024, signal },
        (error: any, stdout, stderr) => {
          resolve({
            exitCode: error?.code ?? 0,
            stdout: String(stdout || ""),
            stderr: String(stderr || ""),
          });
        },
      );
    });
  }

  return { exitCode: 0, stdout: "", stderr: "" };
}

function getHookTimeoutMs(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 60000;
  return Math.max(1, Math.round(value * 1000));
}

function appendLine(value: string, line: string): string {
  return value ? `${value}\n${line}` : line;
}

function formatSeconds(ms: number): string {
  return `${Math.round(ms / 1000)}s`;
}

function getHookDisplayText(hook: HookCommand): string {
  if ("statusMessage" in hook && typeof hook.statusMessage === "string" && hook.statusMessage.trim()) {
    return hook.statusMessage.trim();
  }
  if (hook.type === "command") return hook.command;
  if (hook.type === "http") return hook.url;
  if (hook.type === "prompt" && "prompt" in hook) return String(hook.prompt).slice(0, 80);
  if (hook.type === "agent" && "prompt" in hook) return String(hook.prompt).slice(0, 80);
  return hook.type;
}

function escapeRegExp(value: string): string {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}
