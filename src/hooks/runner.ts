import { exec } from "node:child_process";
import { readClaudeSettings, type ClaudeSettings, type HookCommand } from "../config/claude-settings.js";

export type HookEventName =
  | "PreToolUse"
  | "PostToolUse"
  | "PostToolUseFailure"
  | "PermissionRequest"
  | "Notification"
  | "UserPromptSubmit"
  | "SessionStart"
  | "Stop"
  | "StopFailure"
  | "PreCompact"
  | "PostCompact";

export type HookInput = {
  hook_event_name?: HookEventName;
  tool_name?: string;
  tool_input?: Record<string, unknown>;
  tool_use_id?: string;
  tool_response?: string;
  is_error?: boolean;
  error?: string;
  is_interrupt?: boolean;
  prompt?: string;
  source?: string;
  cwd?: string;
  transcript_path?: string;
  session_id?: string;
  permission_mode?: string;
  notification_type?: string;
  stop_reason?: string | null;
  stop_hook_active?: boolean;
  last_assistant_message?: string;
  message?: string;
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

type HookJSONOutput = {
  continue?: boolean;
  suppressOutput?: boolean;
  stopReason?: string;
  decision?: "approve" | "block";
  reason?: string;
  systemMessage?: string;
  hookSpecificOutput?: {
    hookEventName?: HookEventName | string;
    permissionDecision?: "allow" | "deny" | "ask" | "passthrough";
    permissionDecisionReason?: string;
    updatedInput?: Record<string, unknown>;
    additionalContext?: string;
    decision?: {
      behavior?: "allow" | "deny";
      updatedInput?: Record<string, unknown>;
      message?: string;
    };
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

  for (const matcher of matchers) {
    if (!matchesHookMatcher(matcher.matcher, input)) continue;
    for (const hook of matcher.hooks || []) {
      if (!matchesHookMatcher(hook.if || hook.matcher, input)) continue;

      if (hook.type === "command" && (hook.async || hook.asyncRewake)) {
        void runCommandHook(hook, event, input, signal).catch(() => undefined);
        continue;
      }

      const hookType = (hook as { type?: string }).type;
      if (hookType !== "command" && hookType !== "http") {
        throw new Error(`Unsupported hook type: ${hookType || "unknown"}`);
      }

      const result = hookType === "command"
        ? await runCommandHook(hook as Extract<HookCommand, { type: "command" }>, event, input, signal)
        : await runHttpHook(hook as Extract<HookCommand, { type: "http" }>, event, input, signal);

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

  if (result.exitCode === 2 && !outcome.blocked) {
    outcome.blocked = true;
    outcome.message = result.stderr.trim() || result.stdout.trim() || "Hook blocked continuation";
  }

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
    outcome.notifications.push(json.systemMessage);
  }

  const hookOutput = json.hookSpecificOutput;
  if (!hookOutput) return;

  if (hookOutput.hookEventName && hookOutput.hookEventName !== event) {
    outcome.notifications.push(`Hook output event mismatch: expected ${event}, got ${hookOutput.hookEventName}`);
    return;
  }

  if (hookOutput.additionalContext) {
    outcome.additionalContext.push(hookOutput.additionalContext);
  }

  if (event === "PreToolUse") {
    if (hookOutput.permissionDecision) {
      outcome.permissionBehavior = hookOutput.permissionDecision;
      outcome.permissionDecisionReason = hookOutput.permissionDecisionReason;
      if (hookOutput.permissionDecision === "deny") {
        outcome.blocked = true;
        outcome.message = hookOutput.permissionDecisionReason || "PreToolUse hook denied tool execution";
      }
    }
    if (hookOutput.updatedInput) {
      outcome.updatedInput = hookOutput.updatedInput;
    }
  }

  if (event === "PermissionRequest" && hookOutput.decision?.behavior) {
    outcome.permissionDecision = {
      behavior: hookOutput.decision.behavior,
      updatedInput: hookOutput.decision.updatedInput,
      message: hookOutput.decision.message,
    };
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
  target.permissionDecisionReason = source.permissionDecisionReason ?? target.permissionDecisionReason;
  target.preventContinuation = source.preventContinuation || target.preventContinuation;
  target.stopReason = source.stopReason ?? target.stopReason;
  if (source.blocked) {
    target.blocked = true;
    target.message = source.message;
  }
}

function parseHookJsonOutput(stdout: string): HookJSONOutput | undefined {
  const trimmed = stdout.trim();
  if (!trimmed.startsWith("{")) return undefined;
  const parsed = JSON.parse(trimmed);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return undefined;
  return parsed as HookJSONOutput;
}

function shouldSurfacePlainStdout(event: HookEventName): boolean {
  return (
    event === "PostToolUse" ||
    event === "PostToolUseFailure" ||
    event === "UserPromptSubmit" ||
    event === "SessionStart" ||
    event === "PreCompact" ||
    event === "PostCompact"
  );
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
          stderr: timedOut ? appendLine(String(stderr || ""), `Hook timed out after ${formatSeconds(timeout)}`) : String(stderr || ""),
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
  const timeout = setTimeout(() => timeoutController.abort(new Error("Hook timed out")), getHookTimeoutMs(hook.timeout));
  const abortFromParent = (): void => timeoutController.abort(signal?.reason ?? new Error("Interrupted"));
  if (signal?.aborted) abortFromParent();
  else signal?.addEventListener("abort", abortFromParent, { once: true });

  try {
    const response = await fetch(hook.url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(hook.headers || {}),
      },
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
    return { exitCode: 1, stdout: "", stderr: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abortFromParent);
  }
}

function matchesHookMatcher(matcher: string | undefined, input: HookInput): boolean {
  if (!matcher || matcher === "*") return true;
  const toolName = input.tool_name || "";
  if (!toolName) return true;

  const rule = matcher.trim();
  const match = rule.match(/^([A-Za-z0-9_.:-]+)\((.*)\)$/);
  if (match) {
    return match[1] === toolName && matchGlob(match[2].trim(), getToolMatchValue(toolName, input.tool_input || {}));
  }
  return matchGlob(rule, toolName);
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
  return hook.type;
}

function escapeRegExp(value: string): string {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}
