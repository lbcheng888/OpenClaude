// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {WORKFLOW_TOOL_NAME as bG} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {Mr as I8,Kh as xY,n6n as oS6,xl as c4} from "../../vendor/m4427.ts";
import {Ws as R7,vd as c3} from "../session/1465_promise.ts";
import {Mpt as Q7_,Npt as c7_} from "../core/4210_id.ts";
import {nZ as cs,Cp as dT} from "../config/2223_level.ts";
import {hasSkipWorkflowUsageWarning as Ne_,ao as Yq,br as N8} from "../config/0745_updateSettingsForSource.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
// Module: agent/4061_workflowNeedsUsageConsentPrompt
//
// Decides whether running the multi-agent Workflow tool should first prompt the
// user for a one-time "usage consent" warning (and records that consent once
// accepted). Until the user accepts, auto permission mode prompts before running
// a workflow.
//
// Recovered exports (kept verbatim):
//   - workflowNeedsUsageConsentPrompt
//   - recordWorkflowUsageConsent
//
// 1:1 restoration: only names, types, and comments were added. All control flow,
// operators (incl. !0/!1), string literals, and cross-module references are
// preserved exactly.

// ---------------------------------------------------------------------------
// External symbols referenced by this module (defined in other recovered files).
// Typed/documented here only for clarity; declarations live elsewhere.
// ---------------------------------------------------------------------------

/** esbuild export-binding helper (`__export`); maps export names to getters. */
declare function j_(target: object, getters: Record<string, () => unknown>): void;

/** esbuild lazy module-init helper (`__esm`); returns a thunk that runs `init` once. */
declare function L(init: () => void): () => void;

/** Tool permission context returned by the agent context (`getToolPermissionContext`). */
interface ToolPermissionContext {
  /** When true, the session must not show interactive permission prompts. */
  shouldAvoidPermissionPrompts: boolean;
  [key: string]: unknown;
}

/**
 * Agent tool-use context carrying session options and lifecycle controllers.
 * Only the members touched by this module are described precisely.
 */
interface AgentToolUseContext {
  options: {
    /** True for headless / non-interactive runs (no user to prompt). */
    isNonInteractiveSession: boolean;
    /** Model id used by the agent main loop. */
    mainLoopModel: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/** `WORKFLOW_TOOL_NAME` — the literal tool name "Workflow". */
declare const bG: string;

/** Returns the tool permission context for the given agent context. */
declare function I8(context: AgentToolUseContext): ToolPermissionContext;

/** Returns the current reasoning-effort value for the agent context. */
declare function xY(context: AgentToolUseContext): unknown;

/** Returns whether elevated ("xhigh"/ultra) reasoning effort is permitted for the context. */
declare function oS6(context: AgentToolUseContext): boolean;

/**
 * Returns true when the model is running at ultra / "xhigh" reasoning effort
 * (only when `allowXhigh` is explicitly true). Workflows are skipped from the
 * consent prompt in that mode.
 */
declare function cs(model: string, effort: unknown, allowXhigh: boolean): boolean;

/** True when this is a background ("bg") session. */
declare function R7(): boolean;

/** True when the agent is a non-lead member of a permission-synced team. */
declare function Q7_(): boolean;

/**
 * `hasSkipWorkflowUsageWarning` — true once the user has accepted the workflow
 * usage warning (persisted across settings sources).
 */
declare function Ne_(): boolean;

/**
 * Persists a settings patch to the given source. Returns `{ error }`; `error`
 * is set if the write failed.
 */
declare function Yq(source: string, patch: Record<string, unknown>): {
  error?: {
    message: string;
  };
};

/** Structured logger. */
declare function N(message: string, opts?: {
  level?: string;
}): void;

/** Telemetry/analytics event emitter. */
declare function c(event: string, properties: Record<string, unknown>): void;

// Lazy module-init thunks for this module's dependencies (esbuild `__esm`).
declare const y_: () => void;
declare const c3: () => void;
declare const c4: () => void;
declare const FH: () => void;
declare const dT: () => void;
declare const N8: () => void;
declare const c7_: () => void;

// ---------------------------------------------------------------------------
// Module exports
// ---------------------------------------------------------------------------

var workflowUsageConsentExports = {};
j_(workflowUsageConsentExports, {
  workflowNeedsUsageConsentPrompt: () => workflowNeedsUsageConsentPrompt,
  recordWorkflowUsageConsent: () => recordWorkflowUsageConsent
});

/**
 * Decides whether the agent should show the one-time multi-agent Workflow usage
 * consent prompt before running the given tool.
 *
 * Returns false (no prompt needed) for any tool other than the Workflow tool,
 * for non-interactive sessions, when permission prompts are suppressed, in
 * background sessions, for non-lead team members, when running at ultra/xhigh
 * effort, or once the user has already accepted the warning. Otherwise returns
 * true (a prompt is needed).
 *
 * @param toolName - The name of the tool about to run.
 * @param context  - The agent tool-use context for the current session.
 */
function workflowNeedsUsageConsentPrompt(toolName: string, context: AgentToolUseContext): boolean {
  if (toolName !== bG) return !1;
  if (context.options.isNonInteractiveSession) return !1;
  if (I8(context).shouldAvoidPermissionPrompts) return !1;
  if (R7()) return !1;
  if (Q7_()) return !1;
  if (cs(context.options.mainLoopModel, xY(context), oS6(context))) return !1;
  return !Ne_();
}

/**
 * Records that the user has accepted the multi-agent Workflow usage warning by
 * persisting `skipWorkflowUsageWarning` to user settings, then emits the
 * acceptance telemetry event. No-op if the warning was already accepted. Logs
 * an error and returns early if persistence fails.
 */
function recordWorkflowUsageConsent(): void {
  if (Ne_()) return;
  let {
    error: persistError
  } = Yq("userSettings", {
    skipWorkflowUsageWarning: !0
  });
  if (persistError) {
    N(`Failed to persist skipWorkflowUsageWarning: ${persistError.message}`, {
      level: "error"
    });
    return;
  }
  c("tengu_workflow_usage_warning_accepted", {});
}
var initWorkflowUsageConsentModule = L(() => {
  y_();
  c3();
  c4();
  FH();
  dT();
  N8();
  c7_();
});
export {workflowUsageConsentExports as Sgo,workflowNeedsUsageConsentPrompt,recordWorkflowUsageConsent,initWorkflowUsageConsentModule as bgo};
