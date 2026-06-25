// @ts-nocheck
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Le as tH} from "../../vendor/m5.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {getLoopConsecutiveKeepalives as vd_,setLoopConsecutiveKeepalives as g$_,getLoopChainStartedAt as Bt6,setLoopChainStartedAt as Vd_,addSessionCronTask as hkH,setScheduledTasksEnabled as va,getSessionCronTasks as vR,removeSessionCronTasks as I6H,getLoopTickInFlightPrompt as F$_,setLoopTickInFlightPrompt as sgH,deleteLoopChainStartedAt as yd_,lt as w_} from "../session/0132_sent.ts";
import {logForDebugging as N,qe as FH} from "./0236_setHasFormattedOutput.ts";
import {getCronJitterConfig as DPH,iMt as ML_} from "../telemetry/2698_getCronJitterConfig.ts";
import {Pt as n_,He as vH,mn as M6} from "../telemetry/0600_feature_name.ts";
import {rMt as JL_,iW as kp} from "../../vendor/m2696.ts";
import {b as L,oo as b8} from "../../runtime.ts";
import {dn as A6} from "./0137_namespace.ts";
import {k$e as uCH,w$e as xCH} from "../session/2702_resolveLoopFileFire.ts";
/**
 * Loop scheduling — dynamic wakeup scheduling, keepalive fallback, and loop cancellation.
 *
 * Responsible for:
 *  - Computing clamped/rounded cron delays for the Kairos loop scheduler
 *  - Scheduling session-only "loop" cron tasks via hkH/I6H
 *  - Emitting telemetry for loop lifecycle events
 *
 * Cross-module API (names preserved for linkage):
 *   IeH  – emitLoopEnded
 *   mzH  – isDynamicLoopEnabled
 *   _h7  – isKeepaliveEnabled
 *   qh7  – scheduleDynamicWakeup
 *   Kh7  – scheduleKeepaliveWakeup
 *   bD6  – hasLoopWakeupScheduled
 *   ID6  – cancelAllLoopWakeups
 */

/** Emit a `tengu_loop_ended` analytics event with the given reason and extra fields. */
function IeH(reason: string, extra?: Record<string, unknown>): void {
  c("tengu_loop_ended", {
    reason: tH(reason),
    ...extra
  });
}

/** Returns true when the `tengu_kairos_loop_dynamic` feature flag is enabled (dynamic/self-paced loop mode). */
function mzH(): boolean {
  return Y_("tengu_kairos_loop_dynamic", !1);
}

/** Returns true when the loop keepalive mechanism is enabled (via env var or feature flag). */
function _h7(): boolean {
  if (q_(process.env.CLAUDE_CODE_LOOP_KEEPALIVE)) return !0;
  return Y_("tengu_kairos_loop_keepalive", !1);
}

/**
 * Schedule a dynamic (non-keepalive) loop wakeup.
 * @param delaySeconds - Requested delay in seconds
 * @param prompt - The prompt to fire at wakeup time
 * @param reason - Optional human-readable reason for the chosen delay
 */
function qh7(delaySeconds: number, prompt: string, reason?: string): {
  scheduledFor: number;
  clampedDelaySeconds: number;
  wasClamped: boolean;
} | null {
  return Oh7(delaySeconds, prompt, {
    viaKeepalive: !1,
    reason: reason
  });
}

/**
 * Schedule a keepalive fallback wakeup when the model failed to reschedule.
 * Returns null if dynamic mode is off or the keepalive budget is exhausted.
 * @param prompt - The prompt to fire at wakeup time
 */
function Kh7(prompt: string): {
  scheduledFor: number;
  clampedDelaySeconds: number;
  wasClamped: boolean;
} | null {
  if (!mzH()) return IeH("gate_off"), null;
  if (vd_() >= Cz3) return N("[loop] keepalive budget exhausted (model declined to reschedule twice) — ending loop"), IeH("model_stopped", {
    via_keepalive: !0
  }), null;
  return Oh7(Sz3, prompt, {
    viaKeepalive: !0
  });
}

/**
 * Internal: compute the cron schedule and register the session cron task.
 * @param delaySeconds - Requested delay in seconds (may be Infinity or NaN)
 * @param prompt - The prompt to enqueue at fire time
 * @param options - Scheduling options (viaKeepalive, optional reason)
 */
function Oh7(delaySeconds: number, prompt: string, options: {
  viaKeepalive: boolean;
  reason?: string;
}): {
  scheduledFor: number;
  clampedDelaySeconds: number;
  wasClamped: boolean;
} | null {
  let {
    viaKeepalive: isKeepalive,
    reason: reasonText
  } = options;
  if (!isKeepalive) g$_(0);
  let supersededCount = uz3(),
    nowMs = Date.now(),
    loopState = Bt6(prompt),
    isExpiredSinceScheduled = loopState !== void 0 && nowMs > loopState.lastScheduledFor + CD6 * 1000,
    startedAt = loopState === void 0 || isExpiredSinceScheduled ? nowMs : loopState.startedAt,
    recurringMaxAgeMs = DPH().recurringMaxAgeMs;
  if (recurringMaxAgeMs > 0 && nowMs - startedAt >= recurringMaxAgeMs) {
    if (!loopState?.agedOut) Vd_(prompt, {
      startedAt: startedAt,
      lastScheduledFor: nowMs - (CD6 - ZL_) * 1000,
      agedOut: !0
    }), c("tengu_loop_dynamic_wakeup_aged_out", {
      loop_age_ms: nowMs - startedAt,
      max_age_ms: recurringMaxAgeMs
    }), IeH("aged_out", {
      via_keepalive: isKeepalive
    }), n_("loop_schedule_wakeup", "loop_wakeup_aged_out");
    return null;
  }
  let {
      clamped: clampedDelay,
      wasClamped: wasClamped,
      targetMs: targetMs,
      createdAt: createdAt,
      target: targetDate
    } = bz3(delaySeconds),
    cronExpression = `${targetDate.getMinutes()} ${targetDate.getHours()} * * *`;
  if (hkH({
    id: xz3(),
    cron: cronExpression,
    prompt: prompt,
    createdAt: createdAt,
    kind: "loop"
  }), Vd_(prompt, {
    startedAt: startedAt,
    lastScheduledFor: targetMs
  }), va(!0), isKeepalive) return g$_(vd_() + 1), N(`[loop] keepalive armed (model did not reschedule): ${clampedDelay}s fallback`), c("tengu_loop_keepalive_fired", {
    clamped_delay_seconds: clampedDelay,
    prompt_is_sentinel: Ez3.isLoopDefaultSentinel(prompt)
  }), n_("loop_schedule_wakeup", "model_no_reschedule"), {
    scheduledFor: targetMs,
    clampedDelaySeconds: clampedDelay,
    wasClamped: wasClamped
  };
  return N(`[loop] dynamic wakeup scheduled: ${clampedDelay}s${wasClamped ? ` (clamped from ${delaySeconds}s)` : ""}${reasonText !== void 0 ? ` — ${reasonText}` : ""}`), c("tengu_loop_dynamic_wakeup_scheduled", {
    chosen_delay_seconds: Number.isFinite(delaySeconds) ? delaySeconds : 0,
    clamped_delay_seconds: clampedDelay,
    was_clamped: wasClamped,
    reason_length: reasonText?.length ?? 0,
    superseded_count: supersededCount
  }), vH("loop_schedule_wakeup"), {
    scheduledFor: targetMs,
    clampedDelaySeconds: clampedDelay,
    wasClamped: wasClamped
  };
}

/**
 * Clamp and round the requested delay to a valid cron-schedulable target.
 * Returns the clamped delay (seconds), a clamped flag, the rounded target
 * timestamp in ms, and a `createdAt` for the cron task.
 */
function bz3(requestedDelaySeconds: number): {
  clamped: number;
  wasClamped: boolean;
  targetMs: number;
  createdAt: number;
  target: Date;
} {
  let rawDelay: number;
  if (Number.isNaN(requestedDelaySeconds)) rawDelay = ZL_;else if (requestedDelaySeconds === 1 / 0) rawDelay = CD6;else if (requestedDelaySeconds === -1 / 0) rawDelay = ZL_;else rawDelay = Math.round(requestedDelaySeconds);
  let clampedDelay = Math.max(ZL_, Math.min(CD6, rawDelay)),
    wasClamped = !Number.isFinite(requestedDelaySeconds) || rawDelay !== clampedDelay,
    nowMs = Date.now(),
    unroundedTargetMs = nowMs + clampedDelay * 1000,
    roundedTargetMs = Iz3(unroundedTargetMs),
    cacheLeadMs = DPH().cacheLeadMs;
  if (cacheLeadMs > 0 && clampedDelay * 1000 <= JL_) {
    let maxCacheWindowMs = JL_ - cacheLeadMs;
    while (roundedTargetMs - nowMs > maxCacheWindowMs && roundedTargetMs - 60000 >= nowMs + ZL_ * 1000) roundedTargetMs -= 60000;
  }
  let targetDate = new Date(roundedTargetMs),
    createdAt = unroundedTargetMs < roundedTargetMs ? unroundedTargetMs : roundedTargetMs - 1;
  return {
    clamped: clampedDelay,
    wasClamped: wasClamped,
    targetMs: roundedTargetMs,
    createdAt: createdAt,
    target: targetDate
  };
}

/**
 * Round a timestamp up to the next whole-minute boundary (zeroing seconds and ms).
 * If the timestamp already falls on a minute boundary, it is returned unchanged.
 */
function Iz3(timestampMs: number): number {
  let date = new Date(timestampMs);
  if (date.getSeconds() > 0 || date.getMilliseconds() > 0) date.setMinutes(date.getMinutes() + 1);
  return date.setSeconds(0, 0), date.getTime();
}

/** Generate a random 8-hex-digit ID for a new cron task. */
function xz3(): string {
  return Math.floor(Math.random() * 4294967295).toString(16).padStart(8, "0");
}

/**
 * Cancel all existing "loop" kind session cron tasks (superseded by a new
 * scheduling call) and return the number of tasks cancelled.
 */
function uz3(): number {
  let loopCronIds = vR().filter(cron => cron.kind === "loop").map(cron => cron.id);
  if (loopCronIds.length === 0) return 0;
  return I6H(loopCronIds);
}

/** Returns true when there is at least one "loop" kind cron task in the session store. */
function bD6(): boolean {
  return vR().some(cron => cron.kind === "loop");
}

/**
 * Cancel all "loop" kind cron tasks and any in-flight tick prompt.
 * Also resets the keepalive counter and the pending tick store.
 * @returns The number of loop cron tasks that were cancelled.
 */
function ID6(): number {
  let loopCrons = vR().filter(cron => cron.kind === "loop"),
    inFlightTick = F$_();
  if (sgH(null), g$_(0), loopCrons.length === 0 && inFlightTick === null) return 0;
  I6H(loopCrons.map(cron => cron.id));
  for (let cron of loopCrons) yd_(cron.prompt);
  if (inFlightTick !== null) yd_(inFlightTick);
  return N(`[loop/dynamic] cancelled ${loopCrons.length} pending loop wakeup(s) on user abort${inFlightTick !== null ? " (tick in flight)" : ""}`), IeH("user_abort", {
    loops_cancelled: loopCrons.length
  }), vH("loop_cancel_all"), loopCrons.length;
}

// ---- Module-level constants ----

/** Reference to the loop file / sentinel resolver module (populated at init time). */
var Ez3: {
    isLoopDefaultSentinel(prompt: string): boolean;
  },
  /** Minimum allowed loop delay in seconds (1 minute). */
  ZL_ = 60,
  /** Maximum allowed loop delay in seconds (1 hour). */
  CD6 = 3600,
  /** Keepalive fallback delay in seconds (20 minutes). */
  Sz3 = 1200,
  /** Maximum number of keepalive retries before ending the loop (budget = 1). */
  Cz3 = 1;

// ---- Lazy initializer (cross-module symbol: mCH) ----

/** Lazy module init — resolves cross-module dependencies for loop scheduling. */
var mCH = L(() => {
  w_();
  M6();
  o6();
  y_();
  ML_();
  kp();
  FH();
  A6();
  Ez3 = (uCH(), b8(xCH));
});
export {IeH as Brt,mzH as ige,_h7 as e3i,qh7 as t3i,Kh7 as n3i,Oh7 as r3i,bz3 as qPd,Iz3 as WPd,xz3 as GPd,uz3 as VPd,bD6 as pke,ID6 as Vkn,Ez3 as BPd,ZL_ as uMt,CD6 as Gkn,Sz3 as UPd,Cz3 as $Pd,mCH as age};
