// @ts-nocheck
import {she as jAe,zwn as cwn,sN as J1,fP as mP} from "../api/2741_actualTokens.ts";
import {GRe as u2e,Yw as Gw,vz as cz} from "../session/2725_iFi.ts";
import {E0 as S0,Om as Um} from "../config/2215_level.ts";
import {Fh as Bh,Fr as Lr,Ql as Xl} from "../../vendor/m4405.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue,fromEnumOpt as us} from "../../vendor/m5.ts";
import {Fg as qg,fFe as GBe} from "../agent/2188_kind.ts";
import {bnt as snt,RRn as qwn} from "../../vendor/m2770.ts";
import {SC as hC,oN as z1} from "../core/2729_input_tokens.ts";
import {Nv as Dv,Z5 as M5} from "../api/4416_type.ts";
import {executePreCompactHooks as zY,executePostCompactHooks as c0e} from "../../vendor/m5155.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {Kwe as Dwe,uS as rS} from "../config/2594_event_name.ts";
import {xE as kC,g4t as z3t,lo} from "../tools/5190_userPromptCount.ts";
import {nne as Vte,Vdt as bdt} from "../../vendor/m4364.ts";
import {q2e as T2e,hnt as Ztt} from "../../vendor/m2756.ts";
import {DRn as Kwn,j5r as Q8r} from "../agent/2775_content.ts";
import {pOt as jPt,TFi as fBi,ch as uh} from "../../vendor/m2727.ts";
import {hq as nq,Y2e as R2e} from "../../vendor/m2769.ts";
import {isTmuxControlMode as Bt,Oe as Pe,Ie as He,ln as cn} from "./0594_feature_name.ts";
import {eOt as IPt,xk as Ck} from "../../vendor/m2715.ts";
import {$2e as y2e} from "../../vendor/m2753.ts";
import {Iz as Az,IOt as aOt,oxe as URe} from "../mcp/2763_pendingChanges.ts";
import {markPostCompaction as gWe,lt as ct} from "../session/0131_sent.ts";
import {reAppendSessionMetadata as Edt,ja as za} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {extractDiscoveredToolNames as WY,Hz as fz} from "../tools/4414_summarizeByServerPrefix.ts";
import {WAo as Mfo,c_e as zge,Pqn as V4n,Dqn as G4n,Nqn as J4n,Oqn as K4n,Mqn as Y4n,Lqn as z4n,fee as oee} from "../permissions/4409_prompt.ts";
import {pRn as Rwn,dRn as wwn,h5r as v8r} from "../core/2756_toolRequests.ts";
import {getDeferredToolsDeltaAttachment as Jge,getAgentListingDeltaAttachment as l0e,getMcpInstructionsDeltaAttachment as A6e,createAttachmentMessage as fi,Bv as Pv} from "../agent/4429_tryGetPDFReference.ts";
import {nW as U5,lxe as WRe} from "../../vendor/m2768.ts";
import {b} from "../../runtime.ts";
import {yp as Tp} from "../tools/5171_shouldSkipHookDueToTrust.ts";
import {nN as V1} from "../../vendor/m4410.ts";
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

export {isAssistantMessageWithTokens as rQa,isAssistantMessageWithMarker as $Ao,shouldTriggerReactiveCompact as qAo,initSideQuestionModule as Hqn,doSummarizeWithHooks as jAo,buildCompactResult as Iqn,zeroOutTokensForAssistantMsg as k4e,buildPostCompactAttachments as K2p,reactiveCompactLazyInit as H4e};
