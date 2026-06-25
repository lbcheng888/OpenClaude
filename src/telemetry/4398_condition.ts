// @ts-nocheck
import {Cd as n5,lr as P8} from "../../vendor/m233.ts";
import {vxe as jGH,vY as tx} from "../../vendor/m4097.ts";
import {B2 as iI,Zse as tqH,zM as Pv} from "../../vendor/m2240.ts";
import {getIsNonInteractiveSession as u8,getSessionId as v_,getTotalOutputTokens as JJ,lt as w_} from "../session/0132_sent.ts";
import {checkHasTrustDialogAccepted as QO,tr as T8} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Pt as n_,He as vH,mn as M6} from "./0600_feature_name.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Ve as O_} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
/**
 * Goal condition management for the `/goal` slash command.
 *
 * Exposes helpers to set, clear, and inspect session-scoped Stop hook goals.
 * Telemetry events: `tengu_stop_hook_added`, `tengu_stop_hook_removed`,
 * `tengu_goal_restored_on_resume`.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Attachment message carrying a goal_status payload. */
interface GoalStatusAttachmentMessage {
  type: "attachment";
  uuid: string;
  timestamp: string;
  attachment: {
    type: "goal_status";
    met: boolean;
    sentinel: boolean;
    condition: string;
  };
}

/** Snapshot of a fulfilled (met) goal extracted from the transcript. */
interface MetGoalSnapshot {
  condition: string;
  iterations: number;
  durationMs: number;
  tokens: number;
}

/** Error result returned by goal gate checks. */
interface GoalGateError {
  message: string;
  code: "hooks_gate" | "trust_gate";
}

// ---------------------------------------------------------------------------
// Keyword detection
// ---------------------------------------------------------------------------

/**
 * Returns `true` when `word` is one of the reserved goal-clear keywords
 * (e.g. "clear", "stop", "off", "reset", "none", "cancel").
 */
function isGoalClearCommand(word: string): boolean {
  return GOAL_CLEAR_KEYWORDS.has(word.toLowerCase());
}

// ---------------------------------------------------------------------------
// Transcript helpers
// ---------------------------------------------------------------------------

/**
 * Walks `messages` backwards and returns the first met (non-sentinel)
 * `goal_status` attachment's statistics, or `null` if none found.
 */
function findMetGoalStatus(messages: unknown[]): MetGoalSnapshot | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    let msg = messages[i] as any;
    if (msg?.type !== "attachment" || msg.attachment.type !== "goal_status") continue;
    let attachment = msg.attachment;
    if (!attachment.met || attachment.sentinel) continue;
    return {
      condition: attachment.condition,
      iterations: attachment.iterations,
      durationMs: attachment.durationMs,
      tokens: attachment.tokens
    };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Label formatting
// ---------------------------------------------------------------------------

/**
 * Formats a "Last check: <condition>" status label by passing the trimmed
 * condition through the `n5` string formatter.
 */
function formatLastCheckLabel(condition: string): string {
  return `Last check: ${n5(condition.trim())}`;
}

// ---------------------------------------------------------------------------
// Hook helpers
// ---------------------------------------------------------------------------

/**
 * Returns all prompt-type Stop hooks registered for the current session that
 * have no skill root and an empty matcher (i.e. plain goal hooks).
 *
 * @param appState  - Current application state.
 * @param sessionId - Session identifier used to scope the hook lookup.
 */
function getGoalStopHooks(appState: unknown, sessionId: string): Array<{
  type: "prompt";
  prompt: string;
}> {
  let promptHooks: Array<{
    type: "prompt";
    prompt: string;
  }> = [];
  for (let entry of jGH(appState, sessionId, "Stop").get("Stop") ?? []) {
    if (entry.matcher !== "" || entry.skillRoot !== void 0) continue;
    for (let hook of entry.hooks) if (hook.type === "prompt") promptHooks.push(hook);
  }
  return promptHooks;
}

// ---------------------------------------------------------------------------
// Gate check
// ---------------------------------------------------------------------------

/**
 * Checks whether `/goal` is currently allowed to run.
 *
 * Returns a `GoalGateError` when hooks are restricted (`disableAllHooks` or
 * `allowManagedHooksOnly` policy is active) or when the workspace is not
 * trusted. Returns `null` when the gate passes.
 */
function checkGoalGate(): GoalGateError | null {
  if (iI() || tqH()) return {
    message: HOOKS_GATE_MESSAGE,
    code: "hooks_gate"
  };
  if (!u8() && !QO()) return {
    message: TRUST_GATE_MESSAGE,
    code: "trust_gate"
  };
  return null;
}

// ---------------------------------------------------------------------------
// Set / clear goal
// ---------------------------------------------------------------------------

/**
 * Sets a session-scoped Stop hook goal with `condition`.
 *
 * Registers a prompt-type Stop hook on `context.sessionHooksRegistry`, stores
 * the active goal on app state, appends a sentinel goal_status attachment to
 * the transcript, and fires `tengu_stop_hook_added` telemetry.
 *
 * @param condition - Natural-language condition string the model should satisfy.
 * @param context   - Session context carrying appState, sessionHooksRegistry, and applyMessageOp.
 * @returns `null` on success, or an error message string when a gate blocks the operation.
 */
function setGoal(condition: string, context: any): string | null {
  let gateError = checkGoalGate();
  if (gateError !== null) return n_("goal_set", gateError.code), gateError.message;
  let sessionId = v_();
  for (let hook of getGoalStopHooks(context.getAppState(), sessionId)) context.sessionHooksRegistry.remove(sessionId, "Stop", hook);
  context.sessionHooksRegistry.add(sessionId, "Stop", "", {
    type: "prompt",
    prompt: condition
  });
  let activeGoal = {
    condition: condition,
    iterations: 0,
    setAt: Date.now(),
    tokensAtStart: JJ()
  };
  return context.setAppState((state: any) => ({
    ...state,
    activeGoal: activeGoal
  })), context.applyMessageOp({
    type: "append",
    messages: [createGoalStatusAttachment(!1, condition)]
  }), c("tengu_stop_hook_added", {
    promptLength: condition.length,
    via: O_("goal")
  }), vH("goal_set"), null;
}

/**
 * Clears the active session-scoped Stop hook goal.
 *
 * Removes all plain prompt-type Stop hooks, clears `activeGoal` from app
 * state, appends a met goal_status attachment to the transcript, and fires
 * `tengu_stop_hook_removed` telemetry.
 *
 * @param context - Session context carrying appState, sessionHooksRegistry, and applyMessageOp.
 * @returns The cleared condition string, or `null` when no goal was active.
 */
function clearGoal(context: any): string | null {
  let sessionId = v_(),
    promptHooks = getGoalStopHooks(context.getAppState(), sessionId);
  if (promptHooks.length === 0) return null;
  let clearedCondition = promptHooks[0].prompt;
  for (let hook of promptHooks) context.sessionHooksRegistry.remove(sessionId, "Stop", hook);
  return context.setAppState((state: any) => state.activeGoal === void 0 ? state : {
    ...state,
    activeGoal: void 0
  }), context.applyMessageOp({
    type: "append",
    messages: [createGoalStatusAttachment(!0, clearedCondition)]
  }), c("tengu_stop_hook_removed", {
    via: O_("goal")
  }), clearedCondition;
}

// ---------------------------------------------------------------------------
// Attachment factory
// ---------------------------------------------------------------------------

/**
 * Creates a goal_status attachment message to record goal lifecycle events
 * in the conversation transcript.
 *
 * @param met       - `true` when the goal was met/cleared; `false` when first set.
 * @param condition - The goal condition string.
 */
function createGoalStatusAttachment(met: boolean, condition: string): GoalStatusAttachmentMessage {
  return {
    type: "attachment",
    uuid: cryptoModule.randomUUID(),
    timestamp: new Date().toISOString(),
    attachment: {
      type: "goal_status",
      met: met,
      sentinel: !0,
      condition: condition
    }
  };
}

// ---------------------------------------------------------------------------
// Module-level constants
// ---------------------------------------------------------------------------

/** Node `crypto` module — used for UUID generation. */
var cryptoModule: typeof import("crypto");

/** Maximum character length for a goal condition string. */
var GOAL_CONDITION_MAX_LENGTH = 4000;

/** Set of keywords that trigger goal clearing when used as the `/goal` argument. */
var GOAL_CLEAR_KEYWORDS: Set<string>;

/**
 * Builds the system-prompt injection text sent to the model when a goal is
 * activated via `/goal`. Instructs the model to treat the condition as a
 * directive and not to pause for further instructions.
 */
var buildGoalActivationPrompt = (condition: string) => `A session-scoped Stop hook is now active with condition: "${condition}". Briefly acknowledge the goal, then immediately start (or continue) working toward it — treat the condition itself as your directive and do not pause to ask the user what to do. The hook will block stopping until the condition holds. It auto-clears once the condition is met — do not tell the user to run \`/goal clear\` after success; that's only for clearing a goal early.`;

/** Error message shown when `/goal` is blocked because the workspace is not trusted. */
var TRUST_GATE_MESSAGE = "/goal is only available in trusted workspaces. Restart, accept the trust dialog, and try again.";

/** Error message shown when `/goal` is blocked because hooks are restricted by policy (`disableAllHooks` or `allowManagedHooksOnly`). */
var HOOKS_GATE_MESSAGE = "/goal can't run while hooks are restricted (disableAllHooks or allowManagedHooksOnly is set in settings or by policy).";

// ---------------------------------------------------------------------------
// Lazy initializer
// ---------------------------------------------------------------------------

var opH = L(() => {
  w_();
  M6();
  y_();
  T8();
  Pv();
  tx();
  P8();
  cryptoModule = require("crypto"), GOAL_CLEAR_KEYWORDS = new Set(["clear", "stop", "off", "reset", "none", "cancel"]);
});
export {isGoalClearCommand as uWn,findMetGoalStatus as lsl,formatLastCheckLabel as csl,getGoalStopHooks as Jmt,checkGoalGate as KSo,setGoal as Xmt,clearGoal as Qmt,createGoalStatusAttachment as usl,cryptoModule as asl,GOAL_CONDITION_MAX_LENGTH as Ymt,GOAL_CLEAR_KEYWORDS as BWp,buildGoalActivationPrompt as dWn,TRUST_GATE_MESSAGE as UWp,HOOKS_GATE_MESSAGE as $Wp,opH as p8e};
