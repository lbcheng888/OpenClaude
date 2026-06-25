// @ts-nocheck
import {nt as q_} from "../../vendor/m127.ts";
import {K2e as OCH,qvn as vj6} from "./2604_ISSUES_EXPLAINER.ts";
import {getPromptId as s$_,getEventLogger as cs6,bufferPendingOTelEvent as ds6,lt as w_} from "../session/0132_sent.ts";
import {logForDebugging as N,qe as FH} from "./0236_setHasFormattedOutput.ts";
import {l7e as Sl_,Xd as WO,Fb as LM,Ct as L_} from "../../vendor/m197.ts";
import {b as L} from "../../runtime.ts";
import {dn as A6} from "./0137_namespace.ts";
/**
 * Core structured OTel log-event emitter and per-event-type helpers.
 *
 * `emitOtelLogEvent` is the single point of emission for every named
 * telemetry event produced by Claude Code.  Higher-level helpers
 * (`emitPermissionModeChangedEvent`, `emitCompactionEvent`, …) wrap it
 * with typed payloads.
 *
 * Cross-module imported symbols (q_, OCH, s$_, cs6, ds6, Sl_, WO, LM,
 * N, w_, FH, A6, L_, vj6) are kept as-is to preserve linkage.
 */

/** Returns true when the OTEL_LOG_USER_PROMPTS env var is truthy. */
function isLoggingUserPromptsEnabled(): boolean {
  return q_(process.env.OTEL_LOG_USER_PROMPTS);
}

/**
 * Returns the original string when user-prompt logging is enabled,
 * otherwise returns the literal string `"<REDACTED>"`.
 */
function maybeRedactUserContent(content: string): string {
  return isLoggingUserPromptsEnabled() ? content : "<REDACTED>";
}

/**
 * Emits a single structured OTel log event.
 *
 * Merges base resource attributes from `OCH()`, attaches `event.name`,
 * `event.timestamp`, `event.sequence`, and optionally `prompt.id` and
 * `workspace.host_paths`.  Then fans out to the OTel event logger
 * (`cs6()`) when available, or the pre-init disk buffer (`ds6()`), and
 * logs a one-time warning if neither sink is initialised.
 *
 * @param eventName  - Telemetry event name (e.g. `"permission_mode_changed"`).
 * @param attributes - Additional event-specific attributes.
 */
async function emitOtelLogEvent(eventName: string, attributes: Record<string, unknown> = {}): Promise<void> {
  let eventAttributes: Record<string, unknown> = {
      ...OCH(),
      "event.name": eventName,
      "event.timestamp": new Date().toISOString(),
      "event.sequence": otelEventSequence++
    },
    currentPromptId = s$_();
  if (currentPromptId) eventAttributes["prompt.id"] = currentPromptId;
  let workspaceHostPaths = process.env.CLAUDE_CODE_WORKSPACE_HOST_PATHS;
  if (workspaceHostPaths) eventAttributes["workspace.host_paths"] = workspaceHostPaths.split("|");
  for (let [key, value] of Object.entries(attributes)) if (value !== void 0) eventAttributes[key] = value;
  let now = new Date(),
    logRecord: {
      timestamp: Date;
      observedTimestamp: Date;
      body: string;
      attributes: Record<string, unknown>;
    } = {
      timestamp: now,
      observedTimestamp: now,
      body: `claude_code.${eventName}`,
      attributes: eventAttributes
    },
    otelLogger = cs6();
  if (otelLogger) {
    otelLogger.emit(logRecord);
    return;
  }
  if (!ds6(logRecord) && !hasWarnedAboutMissingLogger) hasWarnedAboutMissingLogger = !0, N(`[3P telemetry] Event dropped (no event logger initialized): ${eventName}`, {
    level: "warn"
  });
}

/**
 * Emits a `permission_mode_changed` event when the permission mode
 * transitions from one value to another.  No-ops when `from === to`.
 */
function emitPermissionModeChangedEvent(change: {
  from: string;
  to: string;
  trigger?: string;
}): void {
  if (change.from === change.to) return;
  emitOtelLogEvent("permission_mode_changed", {
    from_mode: change.from,
    to_mode: change.to,
    ...(change.trigger && {
      trigger: change.trigger
    })
  });
}

/**
 * Emits a `compaction` event capturing the outcome of a context
 * compaction operation, including token counts and error details when
 * available.
 */
function emitCompactionEvent(compaction: {
  trigger: string;
  success: boolean;
  durationMs: number;
  preTokens?: number;
  postTokens?: number;
  error?: string;
  precomputeReuse?: string;
}): void {
  emitOtelLogEvent("compaction", {
    trigger: compaction.trigger,
    success: String(compaction.success),
    duration_ms: String(Math.round(compaction.durationMs)),
    ...(compaction.preTokens !== void 0 && {
      pre_tokens: String(compaction.preTokens)
    }),
    ...(compaction.postTokens !== void 0 && {
      post_tokens: String(compaction.postTokens)
    }),
    ...(compaction.error && {
      error: compaction.error
    }),
    ...(compaction.precomputeReuse && {
      precompute_reuse: compaction.precomputeReuse
    })
  });
}

/**
 * Emits an `internal_error` event for unexpected runtime errors.
 * A reentrancy guard (`isEmittingInternalError`) prevents recursive
 * emission when `emitOtelLogEvent` itself triggers an error.
 */
function emitInternalErrorEvent(err: Error): void {
  if (isEmittingInternalError) return;
  isEmittingInternalError = !0;
  try {
    let errorName = err.name !== "Error" ? err.name : err.constructor?.name || "Error";
    emitOtelLogEvent("internal_error", {
      error_name: Sl_(errorName) ?? "Error",
      error_code: WO(err)
    });
  } finally {
    isEmittingInternalError = !1;
  }
}

/** Emits an `at_mention` event tracking @-mention usage and success. */
function emitAtMentionEvent(mention: {
  mentionType: string;
  success: boolean;
}): void {
  emitOtelLogEvent("at_mention", {
    mention_type: mention.mentionType,
    success: String(mention.success)
  });
}

/**
 * Emits an `auth` event capturing the action, success flag, auth method,
 * and a coarse error category (kind + optional HTTP status code) when
 * the operation failed.
 */
function emitAuthEvent(auth: {
  action: string;
  success: boolean;
  authMethod: string;
  error?: unknown;
}): void {
  let errorCategory = auth.error !== void 0 ? LM(auth.error) : null;
  emitOtelLogEvent("auth", {
    action: auth.action,
    success: String(auth.success),
    auth_method: auth.authMethod,
    ...(errorCategory && {
      error_category: errorCategory.kind,
      ...(errorCategory.status !== void 0 && {
        status_code: String(errorCategory.status)
      })
    })
  });
}

/** Monotonically increasing sequence number stamped on every OTel event. */
var otelEventSequence: number = 0;

/** Guards against the first (and only) "no event logger" warning being repeated. */
var hasWarnedAboutMissingLogger: boolean = !1;

/** Reentrancy guard for `emitInternalErrorEvent`. */
var isEmittingInternalError: boolean = !1;

/** Lazy-init block: initialises all dependencies for this module. */
var _j = L(() => {
  w_();
  FH();
  A6();
  L_();
  vj6();
});
export {isLoggingUserPromptsEnabled as Gvd,maybeRedactUserContent as KOt,emitOtelLogEvent as bu,emitPermissionModeChangedEvent as Bhe,emitCompactionEvent as Iwe,emitInternalErrorEvent as vNi,emitAtMentionEvent as n1,emitAuthEvent as z2e,otelEventSequence as Wvd,hasWarnedAboutMissingLogger as RNi,isEmittingInternalError as I8r,_j as oS};
