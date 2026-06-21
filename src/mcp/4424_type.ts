// @ts-nocheck
import {HOOK_EVENTS as Uy,cnn as rt_} from "../../vendor/m718.ts";
import {Fv as Y2,bC as sM} from "../session/2784_uuid.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
/**
 * Hook lifecycle event streaming for the MCP / agent subsystem.
 *
 * Hooks are user-configured scripts (command or HTTP) that run at well-known
 * points in a Claude Code session. This module decides which hook events are
 * surfaced as `system` stream events to consumers (the SDK / `--output-format
 * stream-json` clients) and emits the `hook_started` / `hook_progress` /
 * `hook_response` events for them, plus a debug log of every hook outcome.
 *
 * By default only a small allow-list of hook events streams (`HOOK_STREAM_ALWAYS`).
 * In remote/headless mode every hook event is streamed; that mode is toggled
 * via `WiK` (see `setStreamAllHookEvents` below) and gated by `streamAllHookEvents`.
 *
 * Also re-exports the long computer-use MCP usage guidance prompt (`XiK`),
 * which lives here purely as a shared string constant.
 *
 * Cross-module identifiers kept under their original (already-wired) names so
 * references in other modules stay valid:
 *   - `XiK`  computer-use guidance prompt (used by agent/4397)
 *   - `$m6`  emitHookStarted   (called by tools/5150)
 *   - `Ym6`  startHookProgressPolling (called by tools/5150)
 *   - `CZ`   emitHookResponse  (called by tools/5150)
 *   - `WiK`  setStreamAllHookEvents (called by permissions/5680)
 *   - `Am6`  module initializer (called by tools/5150 & permissions/5680)
 *
 * Free identifiers from the bundle runtime, referenced as-is:
 *   - `Y2`   queue a `system` stream event (session/2761)
 *   - `N`    debug logger
 *   - `L`    lazy CommonJS module initializer (bundler `__esm` helper)
 *   - `rt_`, `FH`, `sM`  dependency module initializers run on first use
 */

/** All hook event names recognized by the runtime (the `HOOK_EVENTS` list). */
declare const Uy: readonly string[];

/** Queues a `system`-typed event onto the active session's stream buffer. */
declare function Y2(event: Record<string, unknown>): void;

/** Debug logger. */
declare function N(message: string): void;

/** Bundler lazy module initializer (`__esm`); runs `factory` once, memoized. */
declare function L(factory: () => void): () => void;

/** Dependency module initializers executed when this module first runs. */
declare function rt_(): void;
declare function FH(): void;
declare function sM(): void;

/** Outcome reported when a hook finishes (or is cancelled / errors). */
type HookOutcome = "success" | "blocked" | "error" | "cancelled" | string;

/** Parameters shared by the `hook_progress` and `hook_response` emitters. */
interface HookProgressEvent {
  /** Unique id for this hook invocation. */
  hookId: string;
  /** Configured hook name. */
  hookName: string;
  /** Lifecycle event that triggered the hook (e.g. `"PreToolUse"`). */
  hookEvent: string;
  /** Captured standard output so far. */
  stdout: string;
  /** Captured standard error so far. */
  stderr: string;
  /** Combined / processed output text. */
  output: string;
}

/** Source the progress poller drains hook output from. */
interface HookOutputSource {
  hookId: string;
  hookName: string;
  hookEvent: string;
  /** Resolves with the hook's current captured output. */
  getOutput(): Promise<{ stdout: string; stderr: string; output: string }>;
  /** Polling interval in milliseconds (defaults to 1000). */
  intervalMs?: number;
}

/** Parameters for the terminal `hook_response` event. */
interface HookResponseEvent extends HookProgressEvent {
  /** Process exit code, when the hook was an external command. */
  exitCode?: number;
  /** Final outcome of the hook. */
  outcome: HookOutcome;
}

/**
 * Computer-use MCP usage guidance prompt.
 *
 * Injected into the system prompt when the computer-use MCP server is
 * available; explains tool selection tiers, access flow, tier restrictions,
 * link-safety rules, and financial-action limits.
 */
var XiK = `You have a computer-use MCP available (tools named \`mcp__computer-use__*\`). It lets you take screenshots of the user's desktop and control it with mouse clicks, keyboard input, and scrolling.

**Pick the right tool for the app.** Each tier trades speed/precision against coverage:

1. **Dedicated MCP for the app** — if the task is in an app that has its own MCP (Slack, Gmail, Calendar, Linear, etc.) and that MCP is connected, use it. API-backed tools are fast and precise.
2. **Chrome MCP** (\`mcp__claude-in-chrome__*\`) — if the target is a web app and there's no dedicated MCP for it, use the browser tools. DOM-aware, much faster than clicking pixels. If the Chrome extension isn't connected, ask the user to install it rather than falling through to computer use.
3. **Computer use** — for native desktop apps (Maps, Notes, Finder, Photos, System Settings, any third-party native app) and cross-app workflows. Computer use IS the right tool here — don't decline a native-app task just because there's no dedicated MCP for it.

This is about what's available, not error handling — if a dedicated MCP tool errors, debug or report it rather than silently retrying via a slower tier.

**Look before you assert.** If the user asks about app state (what's open, what's connected, what an app can do), take a screenshot and check before answering. Don't answer from memory — the user's setup or app version may differ from what you expect. If you're about to say an app doesn't support an action, that claim should be grounded in what you just saw on screen, not general knowledge. Similarly, \`list_granted_applications\` or a fresh \`screenshot\` is cheaper than a wrong assertion about what's running.

**Loading via ToolSearch — load in bulk, not one-by-one:** if computer-use tools are in the deferred list, load them ALL in a single ToolSearch call: \`{ query: "computer-use", max_results: 30 }\`. The keyword search matches the server-name substring in every tool name, so one query returns the entire toolkit. Don't use \`select:\` for individual tools — that's one round-trip per tool.

**Access flow:** before any computer-use action you must call \`request_access\` with the list of applications you need. The user approves each application explicitly, and you may need to call it again mid-task if you discover you need another application.

**Tiered apps:** some apps are granted at a restricted tier based on their category — the tier is displayed in the approval dialog and returned in the \`request_access\` response:
- **Browsers** (Safari, Chrome, Firefox, Edge, Arc, etc.) → tier **"read"**: visible in screenshots, but clicks and typing are blocked. You can read what's already on screen. For navigation, clicking, or form-filling, use the claude-in-chrome MCP (tools named \`mcp__claude-in-chrome__*\`; load via ToolSearch if deferred).
- **Terminals and IDEs** (Terminal, iTerm, VS Code, JetBrains, etc.) → tier **"click"**: visible and left-clickable, but typing, key presses, right-click, modifier-clicks, and drag-drop are blocked. You can click a Run button or scroll test output, but cannot type into the editor or integrated terminal, cannot right-click (the context menu has Paste), and cannot drag text onto them. For shell commands, use the Bash tool.
- **Everything else** → tier **"full"**: no restrictions.

The tier is enforced by the frontmost-app check: if a tier-"read" app is in front, \`left_click\` returns an error; if a tier-"click" app is in front, \`type\` and \`right_click\` return errors. The error tells you what tier the app has and what to do instead. \`open_application\` works at any tier — bringing an app forward is a read-level operation.

**Link safety — treat links in emails and messages as suspicious by default.**
- **Never click web links with computer-use tools.** If you encounter a link in a native app (Mail, Messages, a PDF, etc.), do NOT \`left_click\` it. Open the URL via the claude-in-chrome MCP instead.
- **See the full URL before following any link.** Visible link text can be misleading — hover or inspect to get the real destination.
- **Links from emails, messages, or unknown-sender documents are suspicious by default.** If the destination URL is at all unfamiliar or looks off, ask the user for confirmation before proceeding.
- **Inside the Chrome extension** you can click links with the extension's tools, but the suspicion check still applies — verify unfamiliar URLs with the user.

**Financial actions - do not execute trades or move money.** Budgeting and accounting apps (Quicken, YNAB, QuickBooks, etc.) are granted at full tier so you can categorize transactions, generate reports, and help the user organize their finances. But never execute a trade, place an order, send money, or initiate a transfer on the user's behalf - always ask the user to perform those actions themselves.`;

/**
 * Whether the given hook event should be surfaced as a `system` stream event.
 *
 * Events in the always-stream allow-list (`HOOK_STREAM_ALWAYS`) stream
 * unconditionally; every other hook event streams only when the "stream all
 * hook events" mode is enabled (remote/headless).
 */
function shouldStreamHookEvent(hookEvent: string): boolean {
  if (HOOK_STREAM_ALWAYS.includes(hookEvent)) return !0;
  return streamAllHookEvents && Uy.includes(hookEvent);
}

/**
 * Emits a `hook_started` system event for the given hook invocation, when the
 * event is one that streams.
 */
function $m6(hookId: string, hookName: string, hookEvent: string): void {
  if (!shouldStreamHookEvent(hookEvent)) return;
  Y2({
    type: "system",
    subtype: "hook_started",
    hook_id: hookId,
    hook_name: hookName,
    hook_event: hookEvent
  });
}

/**
 * Emits a `hook_progress` system event carrying the hook's incremental
 * stdout/stderr/output, when the event is one that streams.
 */
function emitHookProgress(event: HookProgressEvent): void {
  if (!shouldStreamHookEvent(event.hookEvent)) return;
  Y2({
    type: "system",
    subtype: "hook_progress",
    hook_id: event.hookId,
    hook_name: event.hookName,
    hook_event: event.hookEvent,
    stdout: event.stdout,
    stderr: event.stderr,
    output: event.output
  });
}

/**
 * Starts polling a running hook's output and emits `hook_progress` events each
 * time the combined output changes.
 *
 * Returns a stop function that clears the interval. The interval is `unref`'d
 * so it never keeps the process alive on its own. For non-streaming events
 * polling is skipped entirely and the returned stop function is a no-op.
 */
function Ym6(source: HookOutputSource): () => void {
  if (!shouldStreamHookEvent(source.hookEvent)) return () => {};
  let lastOutput = "",
    timer = setInterval(() => {
      source.getOutput().then(({
        stdout: stdout,
        stderr: stderr,
        output: output
      }) => {
        if (output === lastOutput) return;
        lastOutput = output, emitHookProgress({
          hookId: source.hookId,
          hookName: source.hookName,
          hookEvent: source.hookEvent,
          stdout: stdout,
          stderr: stderr,
          output: output
        });
      });
    }, source.intervalMs ?? 1000);
  return timer.unref(), () => clearInterval(timer);
}

/**
 * Records a hook's terminal outcome: logs any captured output for debugging,
 * then emits the final `hook_response` system event for streaming events. The
 * `exit_code` field is only included when an exit code was provided.
 */
function CZ(response: HookResponseEvent): void {
  let combined = response.stdout || response.stderr || response.output;
  if (combined) N(`Hook ${response.hookName} (${response.hookEvent}) ${response.outcome}:
${combined}`);
  if (!shouldStreamHookEvent(response.hookEvent)) return;
  Y2({
    type: "system",
    subtype: "hook_response",
    hook_id: response.hookId,
    hook_name: response.hookName,
    hook_event: response.hookEvent,
    output: response.output,
    stdout: response.stdout,
    stderr: response.stderr,
    ...(response.exitCode !== void 0 && {
      exit_code: response.exitCode
    }),
    outcome: response.outcome
  });
}

/**
 * Enables or disables "stream all hook events" mode. When enabled, every hook
 * event (not just the always-stream allow-list) is surfaced as a `system`
 * stream event. Set on startup in remote/headless mode.
 */
function WiK(enabled: boolean): void {
  streamAllHookEvents = enabled;
}

/** Hook events that always stream regardless of mode; set by the initializer. */
var HOOK_STREAM_ALWAYS: string[],
  /** Whether non-allow-listed hook events should also stream. */
  streamAllHookEvents = !1;

/**
 * Module initializer: runs dependency module initializers and populates the
 * always-stream hook-event allow-list. Memoized via the bundler `L` helper.
 */
var Am6 = L(() => {
  rt_();
  FH();
  sM();
  HOOK_STREAM_ALWAYS = ["SessionStart", "Setup"];
});

export {XiK as Zel,shouldStreamHookEvent as K6n,$m6 as z6n,emitHookProgress as Q3p,Ym6 as Y6n,CZ as tH,WiK as ttl,HOOK_STREAM_ALWAYS as X3p,streamAllHookEvents as etl,Am6 as J6n};
