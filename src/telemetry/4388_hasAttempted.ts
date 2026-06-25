// @ts-nocheck
import {yge as jAe,OHn as cwn,_1 as J1,kD as mP} from "../api/2754_actualTokens.ts";
import {Hke as u2e,ev as Gw,Qz as cz} from "../session/2737_V4i.ts";
import {$0 as S0,Cp as Um} from "../config/2223_level.ts";
import {Kh as Bh,Mr as Lr,xl as Xl} from "../../vendor/m4427.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Le as Ue,Bo as us} from "../../vendor/m5.ts";
import {Xg as qg,dUe as GBe} from "../agent/2193_kind.ts";
import {wot as snt,pIn as qwn} from "../../vendor/m2782.ts";
import {CC as hC,g1 as z1} from "../core/2741_input_tokens.ts";
import {WA as Dv,fW as M5} from "../api/4438_type.ts";
import {executePreCompactHooks as zY,executePostCompactHooks as c0e} from "../../vendor/m5188.ts";
import {Ie,vn as wn} from "../session/0621_length.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {Ce as Se,Ct as St} from "../../vendor/m197.ts";
import {Iwe as Dwe,oS as rS} from "../config/2605_event_name.ts";
import {NE as kC,W6t as z3t,po as lo} from "../tools/5224_userPromptCount.ts";
import {jte as Vte,Kmt as bdt} from "../../vendor/m4386.ts";
import {j$e as T2e,bot as Ztt} from "../../vendor/m2768.ts";
import {_In as Kwn,Ezr as Q8r} from "../agent/2787_content.ts";
import {VMt as jPt,aqi as fBi,lh as uh} from "../../vendor/m2739.ts";
import {L4 as nq,t9e as R2e} from "../../vendor/m2781.ts";
import {Pt as Bt,xe as Pe,He,mn as cn} from "./0600_feature_name.ts";
import {PMt as IPt,Gk as Ck} from "../../vendor/m2727.ts";
import {z$e as y2e} from "../../vendor/m2765.ts";
import {ij as Az,u1t as aOt,Gke as URe} from "../mcp/2775_pendingChanges.ts";
import {markPostCompaction as gWe,lt as ct} from "../session/0132_sent.ts";
import {reAppendSessionMetadata as Edt,_a as za} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {extractDiscoveredToolNames as WY,sj as fz} from "../tools/4436_summarizeByServerPrefix.ts";
import {LSo as Mfo,Iye as zge,Q8n as V4n,X8n as G4n,nWn as J4n,Z8n as K4n,tWn as Y4n,eWn as z4n,dee as oee} from "../permissions/4431_prompt.ts";
import {XHn as Rwn,JHn as wwn,Y7r as v8r} from "../core/2768_toolRequests.ts";
import {getDeferredToolsDeltaAttachment as Jge,getAgentListingDeltaAttachment as l0e,getMcpInstructionsDeltaAttachment as A6e,createAttachmentMessage as fi,GA as Pv} from "../agent/4451_tryGetPDFReference.ts";
import {gW as U5,jke as WRe} from "../../vendor/m2780.ts";
import {b} from "../../runtime.ts";
import {Wd as Tp} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {f1 as V1} from "../../vendor/m4432.ts";
// @ts-nocheck
function isAssistantMessageWithTokens(msg) {
  return msg?.type === "assistant" && jAe(msg);
}
function isAssistantMessageWithMarker(msg) {
  return msg?.type === "assistant" && cwn(msg);
}
function shouldTriggerReactiveCompact(params) {
  return !params.hasAttempted && params.querySource !== "compact" && (params.hasPrecomputedSwap === true || !u2e(params.querySource)) && Gw() && cz() && !params.aborted;
}
async function initSideQuestionModule(params) {
  let {
      hasAttempted: hasAttempted,
      querySource: querySource,
      aborted: aborted,
      messages: messages,
      cacheSafeParams: cacheSafeParams,
      precomputed: precomputedData,
      precomputeOutcome: precomputeOutcome,
      initialTokenGap: initialTokenGap,
      thresholdSource: thresholdSource,
      spinnerHintText: hintText
    } = params,
    precomputedKind = precomputeOutcome?.kind,
    precomputedFailureCause = precomputeOutcome?.kind === "failed" ? precomputeOutcome.failure.cause : undefined;
  if (!shouldTriggerReactiveCompact({
    hasAttempted: hasAttempted,
    querySource: querySource,
    aborted: aborted,
    hasPrecomputedSwap: precomputedData !== undefined
  })) return {
    result: null,
    hookBlocked: false
  };
  let {
      toolUseContext: toolUseContext
    } = cacheSafeParams,
    effortLevel = S0(toolUseContext.options.mainLoopModel, Bh(toolUseContext));
  j("tengu_reactive_compact_triggered", {
    ...(effortLevel && {
      effort_level: Ue(effortLevel)
    }),
    querySource: qg(querySource),
    precomputed: precomputedData !== undefined,
    precomputedKind: us(precomputedKind),
    precomputedFailureCause: us(precomputedFailureCause),
    thresholdSource: us(thresholdSource)
  }), snt(Lr(toolUseContext), "summary");
  let X = params.userWaitStartedAt ?? performance.now(),
    {
      hookResult: P,
      summarize: Z
    } = precomputedData ? {
      hookResult: {
        userDisplayMessage: precomputedData.preCompactHookDisplay,
        blockedBy: undefined
      },
      summarize: () => (toolUseContext.onCompactEvent?.({
        type: "sdk_status",
        status: "compacting"
      }), buildCompactResult({
        compactResult: precomputedData.compactResult,
        messagesToPreserve: [...precomputedData.compactResult.messagesToPreserve, ...precomputedData.messagesSince],
        preCompactMessages: messages,
        preCompactTokens: hC(messages),
        startTime: X,
        cacheSafeParams: cacheSafeParams,
        querySource: querySource,
        trigger: "auto",
        thresholdSource: thresholdSource,
        precomputed: true,
        precomputeTelemetry: {
          statusAtPTL: precomputedData.statusAtPTL,
          leadMs: precomputedData.leadMs,
          totalMs: precomputedData.totalMs,
          borrowed: precomputedData.borrowed,
          messagesSinceTokens: Dv(precomputedData.messagesSince)
        }
      }))
    } : await (async () => {
      toolUseContext.onCompactEvent?.({
        type: "compact_progress",
        event: {
          type: "hooks_start",
          hookType: "pre_compact"
        }
      }), toolUseContext.onCompactEvent?.({
        type: "sdk_status",
        status: "compacting"
      });
      let V = await zY({
        trigger: "auto",
        customInstructions: null
      }, toolUseContext.abortController.signal).catch(E => (Ie(E), {}));
      return {
        hookResult: V,
        summarize: () => doSummarizeWithHooks(messages, cacheSafeParams, {
          customInstructions: V.newCustomInstructions,
          userWaitStartedAt: X,
          querySource: querySource,
          initialTokenGap: initialTokenGap,
          precomputedKind: precomputedKind,
          precomputedFailureCause: precomputedFailureCause,
          thresholdSource: thresholdSource
        })
      };
    })();
  if (P.blockedBy) return v(`Reactive compact blocked by PreCompact hook: ${P.blockedBy}`), toolUseContext.onCompactEvent?.({
    type: "compact_progress",
    event: {
      type: "compact_end"
    }
  }), toolUseContext.onCompactEvent?.({
    type: "sdk_status",
    status: null
  }), {
    result: null,
    hookBlocked: true
  };
  toolUseContext.onCompactEvent?.({
    type: "compact_progress",
    event: {
      type: "compact_start",
      hintText: hintText
    }
  });
  let W = await Z().catch(V => {
    let E = Se(V);
    if (J1(E)) v(`Reactive compact API call failed: ${E}`, {
      level: "error"
    });else Ie(V);
    return {
      ok: false,
      reason: "error",
      detail: E
    };
  });
  toolUseContext.onCompactEvent?.({
    type: "compact_progress",
    event: {
      type: "compact_end"
    }
  });
  let G = hC(messages);
  if (!W.ok) {
    let V = W.reason === "error" ? W.detail ?? W.reason : W.reason;
    return Dwe({
      trigger: "auto",
      success: false,
      durationMs: performance.now() - X,
      preTokens: G,
      error: V
    }), toolUseContext.onCompactEvent?.({
      type: "sdk_status",
      status: null,
      metadata: {
        compactResult: "failed",
        compactError: V
      }
    }), {
      result: null,
      hookBlocked: false
    };
  }
  let R = W.result.boundaryMarker;
  if (Dwe({
    trigger: "auto",
    success: true,
    durationMs: performance.now() - X,
    preTokens: G,
    postTokens: kC(R) ? R.compactMetadata.postTokens : undefined
  }), toolUseContext.onCompactEvent?.({
    type: "sdk_status",
    status: null,
    metadata: {
      compactResult: "success"
    }
  }), Vte(querySource, toolUseContext.setAppState, toolUseContext.agentId, cacheSafeParams.stickyBetas), GBe(querySource)) T2e();
  let k = [P.userDisplayMessage, W.result.userDisplayMessage].filter(Boolean).join(`
`) || undefined;
  return {
    result: {
      ...W.result,
      userDisplayMessage: k
    },
    hookBlocked: false
  };
}
async function doSummarizeWithHooks(messages, cacheSafeParams, options) {
  let preTokenCount = hC(messages),
    waitStartedAt = options?.userWaitStartedAt ?? performance.now(),
    querySource = options?.querySource,
    trigger = options?.trigger ?? "auto",
    compactAttempt = await Kwn(messages, cacheSafeParams, {
      customInstructions: options?.customInstructions,
      initialTokenGap: options?.initialTokenGap
    });
  if (!compactAttempt.ok) {
    let effortLevel = S0(cacheSafeParams.toolUseContext.options.mainLoopModel, Bh(cacheSafeParams.toolUseContext)),
      abortKind = compactAttempt.reason === "aborted" ? jPt(cacheSafeParams.toolUseContext.abortController.signal.reason) : undefined;
    if (j("tengu_reactive_compact_failed", {
      ...(effortLevel && {
        effort_level: Ue(effortLevel)
      }),
      querySource: qg(querySource),
      reason: Ue(compactAttempt.reason),
      abortKind: us(abortKind),
      detail: compactAttempt.detail ? nq(compactAttempt.detail).slice(0, 80) : undefined,
      trigger: Ue(trigger),
      preCompactTokens: preTokenCount,
      attempts: compactAttempt.attempts,
      totalGroups: compactAttempt.totalGroups,
      durationMs: Math.round(performance.now() - waitStartedAt),
      precomputedKind: us(options?.precomputedKind),
      precomputedFailureCause: options?.precomputedFailureCause,
      thresholdSource: us(options?.thresholdSource),
      manualPrecomputeReuse: us(options?.manualPrecomputeReuse)
    }), abortKind !== undefined) {
      if (fBi(abortKind)) Bt("compact_reactive", "compact_reactive_aborted");else Pe("compact_reactive", `compact_reactive_aborted_${abortKind}`);
    } else Pe("compact_reactive", `compact_reactive_${compactAttempt.reason}`);
    return {
      ok: false,
      reason: compactAttempt.reason,
      detail: compactAttempt.detail
    };
  }
  return buildCompactResult({
    compactResult: compactAttempt.result,
    messagesToPreserve: compactAttempt.result.messagesToPreserve,
    preCompactMessages: messages,
    preCompactTokens: preTokenCount,
    startTime: waitStartedAt,
    cacheSafeParams: cacheSafeParams,
    querySource: querySource,
    trigger: trigger,
    thresholdSource: options?.thresholdSource,
    precomputed: false,
    manualPrecomputeReuse: options?.manualPrecomputeReuse
  });
}
async function buildCompactResult(params) {
  let {
      compactResult: compactResult,
      preCompactMessages: preMsgs,
      startTime: startTime,
      cacheSafeParams: cacheSafeParams,
      querySource: querySource,
      trigger: trigger,
      thresholdSource: thresholdSource,
      precomputed: precomputed,
      manualPrecomputeReuse: manualPrecomputeReuse,
      precomputeTelemetry: precomputeTelemetry
    } = params,
    {
      toolUseContext: toolUseContext
    } = cacheSafeParams,
    isInteractiveQuery = GBe(querySource),
    preTokenCount = params.preCompactTokens ?? hC(preMsgs),
    savedReadFileState = IPt(toolUseContext.readFileState);
  if (toolUseContext.readFileState.clear(), toolUseContext.loadedNestedMemoryPaths) for (let key of Object.keys(toolUseContext.loadedNestedMemoryPaths)) delete toolUseContext.loadedNestedMemoryPaths[key];
  if (y2e(toolUseContext.memorySelector), Az()) aOt(querySource ?? "compact", toolUseContext.agentId);
  if (isInteractiveQuery) gWe(), Edt();
  let lastPreMsgUuid = preMsgs.at(-1)?.uuid,
    boundaryMarker = z3t(trigger, preTokenCount, lastPreMsgUuid);
  if (boundaryMarker.compactMetadata.durationMs = Math.round(performance.now() - startTime), precomputed) boundaryMarker.compactMetadata.precomputed = true;
  let discoveredTools = WY(preMsgs);
  if (discoveredTools.size > 0) boundaryMarker.compactMetadata.preCompactDiscoveredTools = [...discoveredTools].sort();
  let preservedMessages = params.messagesToPreserve.map(zeroOutTokensForAssistantMsg),
    attachmentResult = await buildPostCompactAttachments(savedReadFileState, toolUseContext, preservedMessages).catch(err => (Ie(err), {
      attachments: [],
      hookResults: []
    }));
  toolUseContext.onCompactEvent?.({
    type: "compact_progress",
    event: {
      type: "hooks_start",
      hookType: "post_compact"
    }
  });
  let postHookResult = await c0e({
      trigger: trigger,
      compactSummary: compactResult.summaryText
    }, toolUseContext.abortController.signal),
    summaryBoundary = Mfo(boundaryMarker, compactResult.summaryMessages.at(-1).uuid, preservedMessages, preMsgs),
    finalOutput = {
      boundaryMarker: summaryBoundary,
      summaryMessages: compactResult.summaryMessages,
      messagesToKeep: preservedMessages,
      attachments: attachmentResult.attachments,
      hookResults: attachmentResult.hookResults,
      userDisplayMessage: postHookResult.userDisplayMessage,
      preCompactTokenCount: preTokenCount
    },
    postTokenCount = Dv(zge(finalOutput));
  summaryBoundary.compactMetadata.postTokens = postTokenCount;
  let metaFields = (() => {
      try {
        return Rwn(wwn(preMsgs));
      } catch (err) {
        return Ie(err), {};
      }
    })(),
    totalUsage = compactResult.totalUsage,
    totalInputTokens = totalUsage.input_tokens + totalUsage.cache_creation_input_tokens + totalUsage.cache_read_input_tokens,
    effortLevel2 = S0(toolUseContext.options.mainLoopModel, Bh(toolUseContext));
  return He("compact_reactive"), j("tengu_reactive_compact_succeeded", {
    ...(effortLevel2 && {
      effort_level: Ue(effortLevel2)
    }),
    querySource: qg(querySource),
    attempts: compactResult.attempt,
    groupsPreserved: compactResult.groupsPreserved,
    totalGroups: compactResult.totalGroups,
    preservedUuidCount: summaryBoundary.compactMetadata.preservedMessages?.uuids.length ?? 0,
    preservedMessageCount: preservedMessages.length,
    forkAssistantMessageCount: compactResult.forkAssistantMessageCount,
    trigger: Ue(trigger),
    thresholdSource: us(thresholdSource),
    preCompactTokens: preTokenCount,
    postCompactTokens: postTokenCount,
    restoredAttachmentCount: attachmentResult.attachments.length + attachmentResult.hookResults.length,
    durationMs: Math.round(performance.now() - startTime),
    userWaitMs: Math.round(performance.now() - startTime),
    precomputed: precomputed,
    manualPrecomputeReuse: us(manualPrecomputeReuse),
    precomputeBorrowed: precomputeTelemetry?.borrowed,
    precomputeStatusAtPTL: us(precomputeTelemetry?.statusAtPTL),
    precomputeLeadMs: precomputeTelemetry ? Math.round(precomputeTelemetry.leadMs) : undefined,
    precomputeTotalMs: precomputeTelemetry ? Math.round(precomputeTelemetry.totalMs) : undefined,
    messagesSincePrecompute: precomputed ? preservedMessages.length - compactResult.messagesToPreserve.length : undefined,
    messagesSinceTokens: precomputeTelemetry?.messagesSinceTokens,
    compactionInputTokens: totalUsage.input_tokens,
    compactionOutputTokens: totalUsage.output_tokens,
    compactionCacheReadTokens: totalUsage.cache_read_input_tokens,
    compactionCacheCreationTokens: totalUsage.cache_creation_input_tokens,
    compactionTotalTokens: totalInputTokens + totalUsage.output_tokens,
    cacheHitRate: totalInputTokens > 0 ? totalUsage.cache_read_input_tokens / totalInputTokens : 0,
    ...metaFields
  }), {
    ok: true,
    result: finalOutput
  };
}
function zeroOutTokensForAssistantMsg(msg) {
  if (msg.type !== "assistant") return msg;
  return {
    ...msg,
    message: {
      ...msg.message,
      usage: {
        ...msg.message.usage,
        input_tokens: 0,
        output_tokens: 0,
        cache_creation_input_tokens: 0,
        cache_read_input_tokens: 0
      }
    }
  };
}
async function buildPostCompactAttachments(savedReadFileState, toolUseContext, preservedMessages) {
  let [fileAttachments, agentListingAttachments] = await Promise.all([V4n(savedReadFileState, toolUseContext, G4n, preservedMessages), J4n(toolUseContext)]),
    agentId = toolUseContext.agentId,
    teammatePendingChanges = K4n(agentId),
    mcpInstructions = await Y4n(toolUseContext),
    worktreeOwnership = z4n(agentId),
    deltaAttachmentMessages = [...Jge(toolUseContext.options.tools, toolUseContext.options.mainLoopModel, preservedMessages, {
      callSite: "reactive_compact"
    }), ...l0e(toolUseContext, preservedMessages), ...A6e(toolUseContext.options.mcpClients, toolUseContext.options.tools, toolUseContext.options.mainLoopModel, preservedMessages)].map(attachment => fi(attachment));
  toolUseContext.onCompactEvent?.({
    type: "compact_progress",
    event: {
      type: "hooks_start",
      hookType: "session_start"
    }
  });
  let sessionStartHookResults = await U5("compact", {
    model: toolUseContext.options.mainLoopModel
  });
  return {
    attachments: [...fileAttachments, ...agentListingAttachments, ...(teammatePendingChanges ? [teammatePendingChanges] : []), ...(mcpInstructions ? [mcpInstructions] : []), ...(worktreeOwnership ? [worktreeOwnership] : []), ...deltaAttachmentMessages],
    hookResults: sessionStartHookResults
  };
}
var reactiveCompactLazyInit = b(() => {
  ct();
  uh();
  Pv();
  v8r();
  Xl();
  je();
  Um();
  St();
  Ck();
  Tp();
  wn();
  lo();
  WRe();
  za();
  rS();
  z1();
  fz();
  cn();
  Ct();
  mP();
  URe();
  R2e();
  qwn();
  M5();
  V1();
  oee();
  Q8r();
  Ztt();
  bdt();
});
export {isAssistantMessageWithTokens as Bol,isAssistantMessageWithMarker as DSo,shouldTriggerReactiveCompact as PSo,initSideQuestionModule as Y8n,doSummarizeWithHooks as OSo,buildCompactResult as J8n,zeroOutTokensForAssistantMsg as d6e,buildPostCompactAttachments as HWp,reactiveCompactLazyInit as p6e};
