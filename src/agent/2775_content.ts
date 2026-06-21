// @ts-nocheck
import {IRn as G26,HRn as Z26,UOt as hk_,q5r as GF8} from "../../vendor/m2773.ts";
import {Ln as F6,_P as Zk,rW as SQ,lo as zq} from "../tools/5190_userPromptCount.ts";
import {runForkedAgent as qR,gP as Wk} from "../artifact/4405_withDisallowedCommandTools.ts";
import {W5r as LF8,G5r as hF8,PRn as L26,fee as te} from "../permissions/4409_prompt.ts";
import {Akt as qZ_,KQ as ct,jS as cM} from "../api/2023_used.ts";
import {ehe as S$H,rb as nJ} from "../permissions/5178_level.ts";
import {Se as GH,bt as G_} from "../../vendor/m195.ts";
import {sN as qE,she as E$H,ant as T__,qUi as rE7,zwn as h26,lnt as z__,fP as Mk} from "../api/2741_actualTokens.ts";
import {logForDebugging as N,qe as gH} from "../config/0234_setHasFormattedOutput.ts";
import {De as CH,Rn as C6} from "../session/0615_length.ts";
import {Nv as R2,Z5 as NQ} from "../api/4416_type.ts";
import {qf as lz,ry as iw} from "./2772_withFileTypes.ts";
import {ox as eG,MPt as Eh_,Lv as hZ} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {Wn as i6} from "../api/0459_getOauthConfig.ts";
import {FOt as Lk_,$5r as ZF8} from "../../vendor/m2772.ts";
import {logEvent as c,Ct as E_} from "../../vendor/m131.ts";
import {Qe as H_,fromEnumOpt as Y9} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
async function runReactiveCompact(messagesToSummarize, toolUseContextOpts, customInstructions, stripMedia) {
  let compactPromptContent = G26(customInstructions),
    promptMessage = F6({
      content: compactPromptContent
    }),
    forkResult;
  try {
    forkResult = await qR({
      promptMessages: [promptMessage],
      cacheSafeParams: {
        ...toolUseContextOpts,
        forkContextMessages: stripMedia ? LF8(messagesToSummarize) : messagesToSummarize
      },
      canUseTool: hF8(),
      querySource: "compact",
      forkLabel: "reactive-compact",
      maxTurns: 1,
      fallbackModel: L26(toolUseContextOpts.toolUseContext.options.mainLoopModel, toolUseContextOpts.toolUseContext.options.fallbackModel),
      maxOutputTokens: Math.min(qZ_, S$H(toolUseContextOpts.toolUseContext.options.mainLoopModel)),
      skipTranscript: true,
      skipCacheWrite: true
    });
  } catch (err) {
    let errMsg = GH(err);
    if (qE(errMsg)) N(`Reactive compact API call failed: ${errMsg}`, {
      level: "error"
    });else CH(err);
    return {
      ok: false,
      reason: "error",
      detail: errMsg,
      status: undefined,
      isTimeout: false
    };
  }
  if (toolUseContextOpts.toolUseContext.abortController.signal.aborted) return {
    ok: false,
    reason: "aborted"
  };
  let assistantMessage = Zk(forkResult.messages);
  if (!assistantMessage) return CH(Error(`Reactive compact: no assistant message in summarization response (${forkResult.messages.length} messages, types: ${forkResult.messages.map(m => m.type).join(", ")})`)), {
    ok: false,
    reason: "error",
    detail: "no assistant message in summarization response",
    status: undefined,
    isTimeout: false
  };
  if (E$H(assistantMessage)) return {
    ok: false,
    reason: "prompt_too_long",
    tokenGap: T__(assistantMessage)
  };
  if (rE7(assistantMessage)) {
    let tokenGap = R2(messagesToSummarize) - ct;
    return {
      ok: false,
      reason: "prompt_too_long",
      tokenGap: tokenGap > 0 ? tokenGap : undefined,
      viaCreditsBoundary: true
    };
  }
  if (h26(assistantMessage)) return {
    ok: false,
    reason: "media_too_large"
  };
  if (assistantMessage.isApiErrorMessage) {
    let apiErrorMsg = SQ(assistantMessage) ?? "API error";
    return N(`Reactive compact: summarization returned API error: ${apiErrorMsg}`, {
      level: "error"
    }), {
      ok: false,
      reason: "error",
      detail: apiErrorMsg,
      status: assistantMessage.apiErrorStatus,
      isTimeout: apiErrorMsg === z__
    };
  }
  let summaryText = Z26(forkResult.messages);
  if (!summaryText) return CH(Error("Reactive compact: empty summary text in summarization response")), {
    ok: false,
    reason: "error",
    detail: "summarization produced empty response",
    status: undefined,
    isTimeout: false
  };
  let transcriptPath = lz(),
    replContextOverride = eG() && Eh_(toolUseContextOpts.toolUseContext.getReplContexts(), toolUseContextOpts.toolUseContext.agentId);
  return {
    ok: true,
    summaryText: summaryText,
    forkAssistantMessageCount: i6(forkResult.messages, msg => msg.type === "assistant" && !msg.isApiErrorMessage),
    totalUsage: forkResult.totalUsage,
    messages: [F6({
      content: hk_(summaryText, true, transcriptPath, undefined, replContextOverride),
      isCompactSummary: true,
      isVisibleInTranscriptOnly: true
    })]
  };
}
function computePreserveStep(groupTokenCounts, totalGroups, targetTokenGap) {
  let cumulativeTokens = 0,
    groupsToMoveCount = 0;
  for (let idx = totalGroups - 1; idx >= 0; idx--) if (cumulativeTokens += groupTokenCounts[idx], groupsToMoveCount++, cumulativeTokens >= targetTokenGap) break;
  if (groupsToMoveCount >= totalGroups - 1) return Math.max(1, Math.floor(totalGroups / 2));
  return groupsToMoveCount;
}
function computeStepStrategy(tokenGap, groupTokenCounts, groupsToSummarizeCount) {
  if (tokenGap === undefined) return {
    mode: "gap_unparseable",
    step: 1
  };
  return {
    mode: "gap_guided",
    step: computePreserveStep(groupTokenCounts, groupsToSummarizeCount, tokenGap)
  };
}
async function runReactiveCompactDriver(messages, toolUseContextOpts, options) {
  let messageGroups = Lk_(messages),
    totalGroups = messageGroups.length;
  if (totalGroups < 2) return N("Reactive compact: fewer than 2 groups, nothing to compact", {
    level: "info"
  }), {
    ok: false,
    reason: "too_few_groups",
    attempts: 0,
    totalGroups: totalGroups
  };
  let abortSignal = toolUseContextOpts.toolUseContext.abortController.signal,
    preserveFromIndex = 1,
    attemptCount = 0,
    currentStepStrategy = undefined,
    groupTokenCounts,
    didStrip = false,
    hitCreditsBoundary = false;
  if (options?.initialTokenGap !== undefined && totalGroups > 3) {
    groupTokenCounts = messageGroups.map(group => R2(group));
    let remainingGap = options.initialTokenGap - (groupTokenCounts[totalGroups - 1] ?? 0);
    if (remainingGap > 0) {
      let seedStep = computePreserveStep(groupTokenCounts, totalGroups - 1, remainingGap);
      preserveFromIndex = 1 + seedStep, currentStepStrategy = {
        mode: "seeded",
        step: seedStep,
        tokenGap: options.initialTokenGap
      };
    }
  }
  while (preserveFromIndex < totalGroups) {
    if (abortSignal.aborted) return {
      ok: false,
      reason: "aborted",
      attempts: attemptCount,
      totalGroups: totalGroups
    };
    attemptCount++;
    let groupsToSummarizeCount = totalGroups - preserveFromIndex,
      groupsToSummarize = messageGroups.slice(0, groupsToSummarizeCount),
      groupsToPreserve = messageGroups.slice(groupsToSummarizeCount),
      flatMessagesToSummarize = groupsToSummarize.flat();
    if (!flatMessagesToSummarize.some(msg => msg.type === "assistant")) {
      if (N("Reactive compact: no assistant messages in summarize set, bailing", {
        level: "info"
      }), hitCreditsBoundary) c("tengu_compact_credits_clamp_rescue", {
        outcome: H_("failed"),
        attempts: attemptCount - 1
      });
      return {
        ok: false,
        reason: attemptCount > 1 ? "exhausted" : "too_few_groups",
        attempts: attemptCount - 1,
        totalGroups: totalGroups
      };
    }
    c("tengu_reactive_compact_attempt", {
      attempt: attemptCount,
      groupsToSummarize: groupsToSummarize.length,
      groupsToPreserve: groupsToPreserve.length,
      messagesToSummarize: flatMessagesToSummarize.length,
      strippedMedia: didStrip,
      stepMode: Y9(currentStepStrategy?.mode),
      stepSize: currentStepStrategy?.step,
      tokenGap: currentStepStrategy?.tokenGap
    });
    let compactResult = await runReactiveCompact(flatMessagesToSummarize, toolUseContextOpts, options?.customInstructions, didStrip);
    if (compactResult.ok) {
      if (hitCreditsBoundary) c("tengu_compact_credits_clamp_rescue", {
        outcome: H_("ok"),
        attempts: attemptCount
      });
      return {
        ok: true,
        result: {
          summaryMessages: compactResult.messages,
          summaryText: compactResult.summaryText,
          messagesToPreserve: groupsToPreserve.flat(),
          attempt: attemptCount,
          totalUsage: compactResult.totalUsage,
          forkAssistantMessageCount: compactResult.forkAssistantMessageCount,
          groupsPreserved: preserveFromIndex,
          totalGroups: totalGroups
        }
      };
    }
    switch (compactResult.reason) {
      case "aborted":
        return {
          ok: false,
          reason: "aborted",
          attempts: attemptCount,
          totalGroups: totalGroups
        };
      case "error":
        if (hitCreditsBoundary) c("tengu_compact_credits_clamp_rescue", {
          outcome: H_("failed"),
          attempts: attemptCount
        });
        return {
          ok: false,
          reason: "error",
          attempts: attemptCount,
          totalGroups: totalGroups,
          detail: compactResult.detail,
          status: compactResult.status,
          isTimeout: compactResult.isTimeout
        };
      case "media_too_large":
        if (!didStrip) {
          didStrip = true, attemptCount--, N("Reactive compact: summarize hit media-size error, retrying stripped", {
            level: "info"
          });
          continue;
        }
        return {
          ok: false,
          reason: "media_unstrippable",
          attempts: attemptCount,
          totalGroups: totalGroups
        };
      case "prompt_too_long":
        break;
    }
    if (compactResult.viaCreditsBoundary) hitCreditsBoundary = true;
    groupTokenCounts ??= messageGroups.map(group => R2(group));
    let nextStrategy = computeStepStrategy(compactResult.tokenGap, groupTokenCounts, groupsToSummarizeCount);
    currentStepStrategy = {
      ...nextStrategy,
      tokenGap: compactResult.tokenGap
    }, preserveFromIndex += nextStrategy.step, N(`Reactive compact: attempt ${attemptCount} hit prompt-too-long (gap=${compactResult.tokenGap ?? "?"} \u2192 ${nextStrategy.mode} step ${nextStrategy.step}), next preserves ${preserveFromIndex}/${totalGroups}`, {
      level: "info"
    });
  }
  if (hitCreditsBoundary) c("tengu_compact_credits_clamp_rescue", {
    outcome: H_("failed"),
    attempts: attemptCount
  });
  return {
    ok: false,
    reason: "exhausted",
    attempts: attemptCount,
    totalGroups: totalGroups
  };
}
var RF8 = L(() => {
  hZ();
  cM();
  gH();
  G_();
  Wk();
  C6();
  zq();
  iw();
  E_();
  nJ();
  Mk();
  NQ();
  te();
  ZF8();
  GF8();
});

export {runReactiveCompact as _kd,computePreserveStep as C$i,computeStepStrategy as ykd,runReactiveCompactDriver as DRn,RF8 as j5r};
