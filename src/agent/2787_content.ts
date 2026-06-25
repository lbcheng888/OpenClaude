// @ts-nocheck
import {gIn as G26,hIn as Z26,T1t as hk_,bzr as GF8} from "../../vendor/m2785.ts";
import {Mn as F6,xD as Zk,_W as SQ,po as zq} from "../tools/5224_userPromptCount.ts";
import {runForkedAgent as qR,ID as Wk} from "../artifact/4427_withDisallowedCommandTools.ts";
import {Czr as LF8,Azr as hF8,yIn as L26,dee as te} from "../permissions/4431_prompt.ts";
import {q0t as qZ_,WQ as ct,GS as cM} from "../api/2028_used.ts";
import {pge as S$H,rb as nJ} from "../permissions/5211_level.ts";
import {Ce as GH,Ct as G_} from "../../vendor/m197.ts";
import {_1 as qE,yge as E$H,pot as T__,O6i as rE7,OHn as h26,mot as z__,kD as Mk} from "../api/2754_actualTokens.ts";
import {logForDebugging as N,qe as gH} from "../config/0236_setHasFormattedOutput.ts";
import {Ie as CH,vn as C6} from "../session/0621_length.ts";
import {WA as R2,fW as NQ} from "../api/4438_type.ts";
import {Nm as lz,D_ as iw} from "./2784_withFileTypes.ts";
import {gw as eG,fMt as Eh_,$A as hZ} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {zn as i6} from "../api/0465_getOauthConfig.ts";
import {y1t as Lk_,Szr as ZF8} from "../../vendor/m2784.ts";
import {logEvent as c,kt as E_} from "../../vendor/m132.ts";
import {Ve as H_,Bo as Y9} from "../../vendor/m5.ts";
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
export {runReactiveCompact as oFd,computePreserveStep as h8i,computeStepStrategy as sFd,runReactiveCompactDriver as _In,RF8 as Ezr};
