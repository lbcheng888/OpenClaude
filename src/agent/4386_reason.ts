// @ts-nocheck
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le,Ve,Bo} from "../../vendor/m5.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {ev,Qz,D4} from "../session/2737_V4i.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {lc,mg} from "../../vendor/m2209.ts";
import {rqi,XKr,pHn} from "../config/2739_repl.ts";
import {CC,g1} from "../core/2741_input_tokens.ts";
import {Xg} from "./2193_kind.ts";
import {executePreCompactHooks as GY} from "../../vendor/m5188.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {_In,Ezr} from "./2787_content.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {Pt,xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {b} from "../../runtime.ts";
import {Wd} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {f1} from "../../vendor/m4432.ts";
// @ts-nocheck
function summarizeCompactFailure(failure, durationMs) {
  let cause = failure.reason === "error" ? failure.isTimeout ? "timeout" : "api_error" : failure.reason;
  return {
    reason: failure.reason,
    cause: cause,
    attempts: failure.attempts,
    status: failure.status,
    detail: failure.detail,
    durationMs: durationMs
  };
}
function logArmGatedOnce(agentId, reason, querySource) {
  let resolvedAgentId = resolveAgentId(agentId),
    dedupeKey = `${resolvedAgentId}:${reason}`;
  if (armGatedLogOnce.has(dedupeKey)) return;
  armGatedLogOnce.add(dedupeKey), W("tengu_precomputed_compact_arm_gated", {
    reason: Le(reason),
    querySource: querySource
  }), A(`precomputed compact: arm gated (${resolvedAgentId}, ${reason})`);
}
function resolveAgentId(agentId) {
  return agentId ?? "main";
}
function isPrecomputeCompactionEnabled() {
  if (!ev()) return false;
  if (!Qz()) return false;
  if (D4()) return false;
  if (!it("tengu_sepia_moth", false)) return false;
  return lc("precomputeCompactionEnabled", true).value;
}
function isExplicitCompactQuery(querySource) {
  if (querySource === "compact") return true;
  return false;
}
function forkToolUseContextForPrecompute(toolUseContext, abortController) {
  return {
    ...toolUseContext,
    abortController: abortController,
    onCompactEvent: undefined
  };
}
function shouldArmPrecompute(turnState) {
  if (turnState.compactionResult !== undefined) return false;
  if (turnState.isPreFirstCompactFork) return false;
  if (turnState.consecutiveFailures !== undefined) return false;
  if (turnState.hasAttemptedReactiveCompact) return false;
  if (turnState.lastTransitionReason === "precomputed_compact_swap") return false;
  if (!isPrecomputeCompactionEnabled()) return false;
  return rqi(turnState.contextTokens, turnState.model, turnState.autoCompactWindow, turnState.querySource);
}
function armPrecompute(request) {
  let {
      querySource: querySource,
      messages: messages,
      cacheSafeParams: cacheSafeParams,
      armTrigger = "estimate",
      estimateGapTokens: estimateGapTokens
    } = request,
    {
      toolUseContext: toolUseContext
    } = cacheSafeParams,
    agentId = resolveAgentId(toolUseContext.agentId);
  if (!isPrecomputeCompactionEnabled()) return false;
  if (isExplicitCompactQuery(querySource)) return false;
  if (($6t.get(agentId) ?? 0) >= Nol) return false;
  let existingEntry = s6.get(agentId);
  if (existingEntry !== undefined && existingEntry.status !== "failed") return false;
  let boundaryUuid = messages.at(-1)?.uuid;
  if (boundaryUuid === undefined) return false;
  let promptScan = querySource === "sdk" ? request.promptScan : undefined;
  if (promptScan !== undefined) {
    let {
        userPromptCount: userPromptCount,
        historyRewritten: historyRewritten
      } = promptScan,
      sdkGateReason = userPromptCount <= 1 && !historyRewritten ? "sdk_single_prompt_gate" : undefined;
    if (sdkGateReason !== undefined) {
      let dedupeKey = `${agentId}:${sdkGateReason}`;
      if (!armGatedLogOnce.has(dedupeKey)) armGatedLogOnce.add(dedupeKey), W("tengu_precomputed_compact_arm_gated", {
        reason: Le(sdkGateReason),
        querySource: Ve("sdk"),
        userPromptCount: userPromptCount,
        preCompactTokens: CC(messages)
      }), A(`precomputed compact: arm gated (${agentId}, ${sdkGateReason}, userPrompts ${userPromptCount})`);
      return false;
    }
  }
  let abortController = new AbortController(),
    startedAt = performance.now(),
    preCompactTokens = CC(messages),
    forkedToolUseContext = forkToolUseContextForPrecompute(toolUseContext, abortController),
    forkedCacheSafeParams = {
      ...cacheSafeParams,
      toolUseContext: forkedToolUseContext
    },
    resolvedQuerySource = Xg(querySource),
    attemptNumber = (CSo.get(agentId) ?? 0) + 1;
  CSo.set(agentId, attemptNumber);
  let armConfig = XKr(toolUseContext.options.mainLoopModel, toolUseContext.options.autoCompactWindow, querySource);
  W("tengu_precomputed_compact_started", {
    armFraction: armConfig.fraction,
    armFractionSource: Le(armConfig.source),
    ...(armConfig.matchedWindowKey !== undefined && {
      armWindowKey: armConfig.matchedWindowKey
    }),
    preCompactTokens: preCompactTokens,
    messageCount: messages.length,
    querySource: resolvedQuerySource,
    precomputeAttemptNumber: attemptNumber,
    ...(promptScan !== undefined && {
      userPromptCount: promptScan.userPromptCount,
      historyRewritten: promptScan.historyRewritten
    }),
    armTrigger: Le(armTrigger),
    ...(estimateGapTokens !== undefined && {
      estimateGapTokens: estimateGapTokens
    }),
    windowSource: Bo(pHn(toolUseContext.options.mainLoopModel, toolUseContext.options.autoCompactWindow))
  }), A(`precomputed compact: started (${agentId}, ${messages.length} msgs, ~${preCompactTokens} tok, attempt ${attemptNumber}, trigger ${armTrigger})`);
  let settled = (async () => {
      let preCompactHookResult = await GY({
        trigger: "auto",
        customInstructions: null
      }, abortController.signal).catch(err => (Ie(err), {}));
      if (preCompactHookResult.blockedBy) {
        A(`Precomputed compact blocked by PreCompact hook: ${preCompactHookResult.blockedBy}`), W8n(agentId, abortController, null);
        return;
      }
      if (abortController.signal.aborted) {
        W8n(agentId, abortController, null);
        return;
      }
      let compactResult = await _In(messages, forkedCacheSafeParams, {
          customInstructions: preCompactHookResult.newCustomInstructions
        }).catch(err => ({
          ok: false,
          reason: "error",
          attempts: 0,
          totalGroups: 0,
          detail: Ce(err),
          status: undefined,
          isTimeout: false
        })),
        durationMs = Math.round(performance.now() - startedAt);
      if (A(`precomputed compact: ${compactResult.ok ? "ready" : `failed (${compactResult.reason})`} (${agentId}, ${durationMs}ms)`), !compactResult.ok) {
        let clearReason = compactResult.reason === "aborted" && typeof abortController.signal.reason === "string" ? abortController.signal.reason : undefined,
          failureSummary = summarizeCompactFailure(compactResult, durationMs);
        if (W("tengu_precomputed_compact_failed", {
          reason: Le(compactResult.reason),
          cause: Le(failureSummary.cause),
          status: failureSummary.status,
          durationMs: durationMs,
          querySource: resolvedQuerySource,
          preCompactTokens: preCompactTokens,
          precomputeAttemptNumber: attemptNumber,
          ...(clearReason !== undefined && {
            clearReason: clearReason
          })
        }), compactResult.reason === "aborted") Pt("compact_precomputed", "compact_precomputed_aborted");else xe("compact_precomputed", `compact_precomputed_${compactResult.reason}`);
        if (compactResult.reason !== "aborted" && failureSummary.cause !== "too_few_groups" && !abortController.signal.aborted) {
          let failureCount = ($6t.get(agentId) ?? 0) + 1;
          if ($6t.set(agentId, failureCount), failureCount === Nol) W("tengu_precomputed_compact_rearm_capped", {
            cause: Le(failureSummary.cause),
            status: failureSummary.status,
            querySource: resolvedQuerySource,
            preCompactTokens: preCompactTokens,
            precomputeAttemptNumber: attemptNumber
          }), A(`precomputed compact: re-arm capped (${agentId}, ${failureCount} consecutive ${failureSummary.cause} failures)`);
        }
        W8n(agentId, abortController, prev => ({
          ...prev,
          status: "failed",
          failure: failureSummary
        }));
        return;
      }
      if (W("tengu_precomputed_compact_ready", {
        durationMs: durationMs,
        attempts: compactResult.result.attempt,
        groupsPreserved: compactResult.result.groupsPreserved,
        totalGroups: compactResult.result.totalGroups,
        querySource: resolvedQuerySource,
        preCompactTokens: preCompactTokens,
        precomputeAttemptNumber: attemptNumber
      }), He("compact_precomputed"), !abortController.signal.aborted) $6t.delete(agentId);
      W8n(agentId, abortController, prev => ({
        ...prev,
        status: "ready",
        result: compactResult.result,
        readyDurationMs: durationMs,
        preCompactHookDisplay: preCompactHookResult.userDisplayMessage
      }));
    })(),
    pendingEntry = {
      status: "pending",
      precomputedAtUuid: boundaryUuid,
      preCompactTokens: preCompactTokens,
      startedAt: startedAt,
      abortController: abortController,
      preCompactHookDisplay: undefined,
      settled: settled
    };
  return s6.set(agentId, pendingEntry), true;
}
function W8n(agentId, abortController, updater) {
  let entry = s6.get(agentId);
  if (entry?.status !== "pending" || entry.abortController !== abortController) return;
  if (updater === null) {
    s6.delete(agentId);
    return;
  }
  s6.set(agentId, updater(entry));
}
function peekPrecompute(agentId) {
  return s6.get(resolveAgentId(agentId));
}
async function borrowPrecompute(agentId, abortSignal) {
  let entry = s6.get(agentId);
  if (entry === undefined || abortSignal.aborted) return null;
  let statusAtPTL = entry.status;
  if (entry.status === "pending") {
    if (A(`precomputed compact: awaiting borrowed in-flight (${agentId})`), await Promise.race([entry.settled.then(() => false), new Promise(resolve => {
      abortSignal.addEventListener("abort", () => resolve(true), {
        once: true
      });
    })])) return A(`precomputed compact: turn aborted while borrowing (${agentId}) \u2014 leaving entry`), {
      kind: "turn_aborted",
      statusAtPTL: statusAtPTL
    };
  }
  let settledEntry = s6.get(agentId);
  return A(`precomputed compact: borrowed (${agentId}, ${settledEntry?.status ?? "gone"})`), settledEntry?.status === "ready" ? {
    kind: "ready",
    ready: settledEntry,
    statusAtPTL: statusAtPTL
  } : null;
}
async function consumePrecompute(agentId, abortSignal) {
  let resolvedAgentId = resolveAgentId(agentId),
    entry = s6.get(resolvedAgentId);
  if (entry === undefined || abortSignal.aborted) return null;
  let statusAtPTL = entry.status;
  if (entry.status === "pending") {
    if (A(`precomputed compact: awaiting in-flight (${resolvedAgentId})`), await Promise.race([entry.settled.then(() => false), new Promise(resolve => {
      abortSignal.addEventListener("abort", () => resolve(true), {
        once: true
      });
    })])) return A(`precomputed compact: turn aborted while awaiting (${resolvedAgentId}) \u2014 leaving entry`), {
      kind: "turn_aborted",
      statusAtPTL: statusAtPTL
    };
  }
  let settledEntry = s6.get(resolvedAgentId);
  switch (s6.delete(resolvedAgentId), A(`precomputed compact: consumed (${resolvedAgentId}, ${settledEntry?.status ?? "gone"})`), settledEntry?.status) {
    case "ready":
      return {
        kind: "ready",
        ready: settledEntry,
        statusAtPTL: statusAtPTL
      };
    case "failed":
      return {
        kind: "failed",
        failure: settledEntry.failure,
        statusAtPTL: statusAtPTL
      };
    case "pending":
    case undefined:
      return null;
  }
}
async function applyPrecompute(request) {
  let {
      toolUseContext: toolUseContext,
      messages: messages,
      detectedAt: detectedAt,
      borrowFrom: borrowFrom,
      querySource: querySource
    } = request,
    resolvedQuerySource = Xg(querySource),
    finalize = (outcome, emittedEarlyCompactStart) => {
      let waitedMs = Math.round(performance.now() - detectedAt);
      return logPrecomputeConsumed(outcome, resolvedQuerySource, waitedMs, request.trigger), {
        outcome: outcome,
        swap: outcome.kind === "applied" ? outcome.swap : undefined,
        emittedEarlyCompactStart: emittedEarlyCompactStart
      };
    };
  if (!(!isExplicitCompactQuery(querySource) && isPrecomputeCompactionEnabled() && (request.trigger === "threshold" || request.isWithheld413 === true && !request.hasAttemptedReactiveCompact)) || request.trigger === "threshold" && peekPrecompute(toolUseContext.agentId) === undefined) return {
    outcome: {
      kind: "none"
    },
    swap: undefined,
    emittedEarlyCompactStart: false
  };
  let abortSignal = toolUseContext.abortController.signal,
    emittedEarlyCompactStart = (borrowFrom !== undefined ? s6.get(borrowFrom) : peekPrecompute(toolUseContext.agentId))?.status === "pending";
  if (emittedEarlyCompactStart) toolUseContext.onCompactEvent?.({
    type: "compact_progress",
    event: {
      type: "compact_start"
    }
  }), toolUseContext.onCompactEvent?.({
    type: "sdk_status",
    status: "compacting"
  });
  let consumed = null,
    borrowed = false;
  if (borrowFrom !== undefined) consumed = await borrowPrecompute(borrowFrom, abortSignal), borrowed = consumed !== null;
  if (consumed ??= await consumePrecompute(toolUseContext.agentId, abortSignal), consumed === null) return finalize({
    kind: "none"
  }, emittedEarlyCompactStart);
  if (consumed.kind === "turn_aborted") return finalize({
    kind: "aborted"
  }, emittedEarlyCompactStart);
  if (consumed.kind === "failed") return finalize({
    kind: "failed",
    failure: consumed.failure,
    statusAtPTL: consumed.statusAtPTL
  }, emittedEarlyCompactStart);
  let messagesSince = sliceMessagesAfterBoundary(messages, consumed.ready.precomputedAtUuid);
  if (messagesSince === null) {
    if (borrowed) W("tengu_precompute_borrow_boundary_miss", {
      querySource: resolvedQuerySource
    });else discardPrecompute(consumed.ready, "boundary_uuid_missing", querySource);
    return finalize({
      kind: "none"
    }, emittedEarlyCompactStart);
  }
  let statusAtPTL = consumed.statusAtPTL === "pending" ? "pending" : "ready";
  return finalize({
    kind: "applied",
    swap: {
      compactResult: consumed.ready.result,
      preCompactHookDisplay: consumed.ready.preCompactHookDisplay,
      messagesSince: messagesSince,
      statusAtPTL: statusAtPTL,
      leadMs: detectedAt - consumed.ready.startedAt,
      totalMs: consumed.ready.readyDurationMs,
      borrowed: borrowed
    }
  }, emittedEarlyCompactStart);
}
function logPrecomputeConsumed(outcome, querySource, waitedMs, trigger) {
  let statusAtPTL = outcome.kind === "applied" ? outcome.swap.statusAtPTL : outcome.kind === "failed" ? outcome.statusAtPTL : undefined;
  W("tengu_precomputed_compact_consumed", {
    kind: Le(outcome.kind),
    querySource: querySource,
    waitedMs: waitedMs,
    statusAtPTL: Bo(statusAtPTL),
    trigger: Le(trigger),
    ...(outcome.kind === "applied" && {
      borrowed: outcome.swap.borrowed,
      precomputeTotalMs: Math.round(outcome.swap.totalMs)
    }),
    ...(outcome.kind === "failed" && {
      failureReason: Le(outcome.failure.reason),
      failureCause: Le(outcome.failure.cause),
      failureStatus: outcome.failure.status,
      failureAttempts: outcome.failure.attempts,
      failureDurationMs: outcome.failure.durationMs
    })
  });
}
function logManualPrecomputeConsumed(kind, outcome, waitedMs) {
  if (!isPrecomputeCompactionEnabled()) return;
  W("tengu_precomputed_compact_consumed", {
    kind: Le(kind),
    trigger: Ve("manual"),
    querySource: Xg(undefined),
    waitedMs: Math.round(waitedMs),
    statusAtPTL: Bo(kind === "applied" || kind === "failed" ? outcome?.statusAtPTL : undefined),
    ...(kind === "applied" && outcome?.kind === "ready" && {
      borrowed: false,
      precomputeTotalMs: outcome.ready.readyDurationMs
    }),
    ...(kind === "failed" && outcome?.kind === "failed" && {
      failureReason: Le(outcome.failure.reason),
      failureCause: Le(outcome.failure.cause),
      failureStatus: outcome.failure.status,
      failureAttempts: outcome.failure.attempts,
      failureDurationMs: outcome.failure.durationMs
    })
  });
}
function sliceMessagesAfterBoundary(messages, boundaryUuid) {
  let boundaryIndex = messages.findIndex(message => message.uuid === boundaryUuid);
  if (boundaryIndex === -1) return null;
  return messages.slice(boundaryIndex + 1).filter(message => message.type !== "progress");
}
function discardPrecompute(entry, reason, querySource) {
  W("tengu_precomputed_compact_discarded", {
    reason: Le(reason),
    ageMs: Math.round(performance.now() - entry.startedAt),
    readyDurationMs: entry.readyDurationMs,
    preCompactTokens: entry.preCompactTokens,
    querySource: Xg(querySource)
  }), A(`precomputed compact: discarded (${reason}, age ${Math.round(performance.now() - entry.startedAt)}ms)`);
}
function clearPrecompute(agentId, reason, querySource) {
  let resolvedAgentId = resolveAgentId(agentId),
    entry = s6.get(resolvedAgentId);
  if (entry?.status === "ready") discardPrecompute(entry, reason, querySource);
  if (entry?.abortController.abort(reason), s6.delete(resolvedAgentId), reason === "subagent_exit") CSo.delete(resolvedAgentId), $6t.delete(resolvedAgentId), armGatedLogOnce.delete(`${resolvedAgentId}:sdk_single_prompt_gate`), armGatedLogOnce.delete(`${resolvedAgentId}:subagent_estimate`), armGatedLogOnce.delete(`${resolvedAgentId}:subagent_final_turn`);
}
var s6,
  CSo,
  $6t,
  Nol = 3,
  armGatedLogOnce;
var j8n = b(() => {
  qe();
  Ct();
  Wd();
  vn();
  mg();
  g1();
  mn();
  jn();
  kt();
  f1();
  Ezr();
  s6 = new Map(), CSo = new Map(), $6t = new Map(), armGatedLogOnce = new Set();
});

export {summarizeCompactFailure as AWp,logArmGatedOnce as ASo,resolveAgentId as q6t,isPrecomputeCompactionEnabled as G8n,isExplicitCompactQuery as V8n,forkToolUseContextForPrecompute as RWp,shouldArmPrecompute as RSo,armPrecompute as vSo,W8n,peekPrecompute as Fol,borrowPrecompute as vWp,consumePrecompute as wSo,applyPrecompute as kSo,logPrecomputeConsumed as wWp,logManualPrecomputeConsumed as Vmt,sliceMessagesAfterBoundary as HSo,discardPrecompute as K8n,clearPrecompute as z8n,s6,CSo,$6t,Nol,armGatedLogOnce as c8e,j8n};
