// @ts-nocheck
import {l6 as I6,GWn as Mqn,uft as Udt,jpt as Tut,zpt as yut,j$ as i9,dee as oee} from "../permissions/4431_prompt.ts";
import {_1 as J1,kD as mP} from "../api/2754_actualTokens.ts";
import {Ce as Se,EX as fX,Ct as St} from "../../vendor/m197.ts";
import {Zrt as Ott,CC as hC,g1 as z1} from "../core/2741_input_tokens.ts";
import {WA as Dv,fW as M5} from "../api/4438_type.ts";
import {bytesPerTokenForModel as bw,getCanonicalName as qo,Ro as Fo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {$Mt as FPt,Ike as xRe,xke as kRe,aee as eee,pHn as Uvn,JKr as xjr,T$ as B$} from "../config/2739_repl.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {Hke as u2e,ev as Gw,Qz as cz,D4 as Z4} from "./2737_V4i.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {Ne as Ge} from "../../vendor/m583.ts";
import {Pt as Bt,mn as cn} from "../telemetry/0600_feature_name.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Le as Ue} from "../../vendor/m5.ts";
import {Xrt as Dtt} from "../../vendor/m2735.ts";
import {h1 as K1,t7r as Pjr,lh as uh} from "../../vendor/m2739.ts";
import {Y8n as j4n,p6e as i4e} from "../telemetry/4388_hasAttempted.ts";
import {jte as Vte,Kmt as bdt} from "../../vendor/m4386.ts";
import {Ie,vn as wn} from "./0621_length.ts";
import {iE as Zb,GS as eE} from "../api/2028_used.ts";
import {getSdkBetas as NT,lt as ct} from "./0132_sent.ts";
import {formatTokens as gl,Xo as ds} from "../../vendor/m240.ts";
import {b} from "../../runtime.ts";
import {Ir as Or} from "../../vendor/m584.ts";
import {dn as an} from "../config/0137_namespace.ts";
import {f1 as V1} from "../../vendor/m4432.ts";
// @ts-nocheck
function R2p(err) {
  return err instanceof I6 || J1(Se(err)) || fX(err, Mqn) || fX(err, Udt);
}
function vAo(compactionState) {
  return compactionState?.compacted === true && compactionState.turnCounter < UAo ? (compactionState?.consecutiveRapidRefills ?? 0) + 1 : 0;
}
function x2p(messages, modelId, autoCompactWindow, snipTokensFreed = 0) {
  let usage = Ott(messages);
  if (!usage) return null;
  let totalInputTokens = usage.input_tokens + usage.cache_read_input_tokens + usage.cache_creation_input_tokens,
    messagesEstimate = Dv(messages, bw(modelId)),
    prefixTokens = Math.max(0, totalInputTokens - snipTokensFreed - messagesEstimate),
    thresholdTokens = FPt(modelId, autoCompactWindow);
  if (prefixTokens <= thresholdTokens) return null;
  let documentBlockCount = 0,
    imageBlockCount = 0,
    countBlocks = blocks => {
      for (let block of blocks) {
        let typedBlock = block;
        if (typedBlock.type === "document") documentBlockCount++;else if (typedBlock.type === "image") imageBlockCount++;else if (typedBlock.type === "tool_result" && Array.isArray(typedBlock.content)) countBlocks(typedBlock.content);
      }
    };
  for (let msg of messages) {
    let content = msg.message?.content;
    if (Array.isArray(content)) countBlocks(content);
  }
  return {
    prefixTokens: prefixTokens,
    thresholdTokens: thresholdTokens,
    totalInputTokens: totalInputTokens,
    messagesEstimate: messagesEstimate,
    snipTokensFreed: snipTokensFreed,
    documentBlockCount: documentBlockCount,
    imageBlockCount: imageBlockCount
  };
}
function $Ao() {
  return rt(process.env.CLAUDE_CODE_COLD_COMPACT);
}
async function k2p(messages, modelId, autoCompactWindow, querySource, snipTokensFreed = 0) {
  if (querySource === "compact") return false;
  if (u2e(querySource)) return false;
  if (!Gw()) return false;
  if (cz() && !Z4() && !xRe(modelId, autoCompactWindow)) return false;
  let usedTokens = hC(messages, bw(modelId)) - snipTokensFreed,
    compactionLevel = kRe(usedTokens, modelId, autoCompactWindow);
  return v(`autocompact: tokens=${usedTokens} level=${compactionLevel.level} effectiveWindow=${eee(modelId, autoCompactWindow)}`), compactionLevel.level === "compact" || compactionLevel.level === "blocked";
}
async function* yAo(messages, agentContext, apiParams, querySource, compactionState, snipTokensFreed, compactCallback) {
  if (Ge.DISABLE_COMPACT) return {
    wasCompacted: false
  };
  if (compactionState?.consecutiveFailures !== undefined && compactionState.consecutiveFailures >= FAo) return {
    wasCompacted: false
  };
  let mainLoopModel = agentContext.options.mainLoopModel,
    autoCompactWindow = agentContext.options.autoCompactWindow;
  if (!(await k2p(messages, mainLoopModel, autoCompactWindow, querySource, snipTokensFreed))) return {
    wasCompacted: false
  };
  let prefixOverflow = x2p(messages, mainLoopModel, autoCompactWindow, snipTokensFreed);
  if (prefixOverflow) v(`autocompact: fixed prefix ~${prefixOverflow.prefixTokens} > threshold ${prefixOverflow.thresholdTokens} \u2014 compaction cannot help`, {
    level: "warn"
  }), Bt("compact_auto", "compact_auto_prefix_overflow"), j("tengu_auto_compact_prefix_overflow", {
    ...prefixOverflow,
    wouldHaveBlocked: true
  });
  let rapidRefillCount = vAo(compactionState);
  if (rapidRefillCount >= vqn) return v(`autocompact: rapid-refill breaker tripped \u2014 ${rapidRefillCount} consecutive refills within <${UAo} turns each (last was ${compactionState?.turnCounter} turns)`, {
    level: "warn"
  }), Bt("compact_auto", "compact_auto_rapid_refill_breaker"), {
    wasCompacted: false,
    rapidRefillBreakerTripped: true
  };
  let thresholdSource = Uvn(mainLoopModel, autoCompactWindow),
    spinnerHintText = H2p(mainLoopModel, autoCompactWindow);
  if (querySource !== undefined && thresholdSource !== "auto" && cz()) {
    v(`autocompact: routing through reactive (thresholdSource=${thresholdSource})`), j("tengu_auto_compact_routed_reactive", {
      thresholdSource: Ue(thresholdSource)
    });
    let h = performance.now(),
      reactiveStartTime = querySource,
      {
        result: _,
        hookBlocked: reactiveResult
      } = yield* Dtt(async (C, R, k) => {
        let x;
        if (compactCallback) {
          let H = K1(C.abortController),
            P = setTimeout(O => O.abort("recovery-timeout"), Pjr, H);
          P.unref?.();
          try {
            x = await compactCallback({
              toolUseContext: {
                ...C,
                abortController: H
              },
              messages: messages,
              querySource: reactiveStartTime,
              trigger: "threshold",
              detectedAt: h
            });
          } finally {
            clearTimeout(P);
          }
        }
        let I = await j4n({
          hasAttempted: false,
          querySource: reactiveStartTime,
          aborted: C.abortController.signal.aborted,
          messages: messages,
          cacheSafeParams: {
            ...apiParams,
            toolUseContext: C
          },
          precomputed: x?.swap,
          precomputeOutcome: x?.outcome,
          userWaitStartedAt: h,
          thresholdSource: thresholdSource,
          spinnerHintText: spinnerHintText
        });
        if (I.result === null && x?.emittedEarlyCompactStart) C.onCompactEvent?.({
          type: "compact_progress",
          event: {
            type: "compact_end"
          }
        }), C.onCompactEvent?.({
          type: "sdk_status",
          status: null
        });
        return I;
      }, agentContext);
    if (_) return {
      wasCompacted: true,
      compactionResult: _,
      consecutiveFailures: 0,
      consecutiveRapidRefills: rapidRefillCount,
      thresholdSource: thresholdSource,
      routedThroughReactive: true
    };
    if (reactiveResult) return {
      wasCompacted: false,
      thresholdSource: thresholdSource,
      routedThroughReactive: true
    };
    let S = (compactionState?.consecutiveFailures ?? 0) + 1;
    if (S >= FAo) v(`autocompact: circuit breaker tripped after ${S} consecutive failures (reactive path) \u2014 skipping future attempts this session`, {
      level: "warn"
    }), j("tengu_auto_compact_circuit_breaker", {
      consecutiveFailures: S,
      routedThroughReactive: true,
      thresholdSource: Ue(thresholdSource)
    });
    return {
      wasCompacted: false,
      consecutiveFailures: S,
      thresholdSource: thresholdSource,
      routedThroughReactive: true
    };
  }
  let compactionMetadata = {
      isRecompactionInChain: compactionState?.compacted === true,
      turnsSincePreviousCompact: compactionState?.turnCounter ?? -1,
      previousCompactTurnId: compactionState?.turnId,
      autoCompactThreshold: FPt(mainLoopModel, autoCompactWindow),
      querySource: querySource
    },
    isColdCompact = $Ao();
  try {
    let compactionResult = yield* Dtt((toolCtx, retryFn, cancelFn) => Tut(messages, toolCtx, apiParams, true, undefined, true, compactionMetadata, isColdCompact, spinnerHintText, retryFn, cancelFn), agentContext);
    return Vte(querySource, agentContext.setAppState, agentContext.agentId, apiParams.stickyBetas), {
      wasCompacted: true,
      compactionResult: compactionResult,
      consecutiveFailures: 0,
      consecutiveRapidRefills: rapidRefillCount,
      thresholdSource: thresholdSource,
      routedThroughReactive: false
    };
  } catch (compactErr) {
    if (Se(compactErr).startsWith(yut)) return {
      wasCompacted: false
    };
    if (!fX(compactErr, i9)) if (R2p(compactErr)) v(`autocompact failed: ${Se(compactErr)}`, {
      level: "error"
    });else Ie(compactErr);
    let failureCount = (compactionState?.consecutiveFailures ?? 0) + 1;
    if (failureCount >= FAo) v(`autocompact: circuit breaker tripped after ${failureCount} consecutive failures \u2014 skipping future attempts this session`, {
      level: "warn"
    }), j("tengu_auto_compact_circuit_breaker", {
      consecutiveFailures: failureCount
    });
    return {
      wasCompacted: false,
      consecutiveFailures: failureCount
    };
  }
}
function H2p(modelId, autoCompactWindow) {
  let canonicalName = qo(modelId);
  if (xjr(canonicalName) === undefined) return null;
  let {
      source: thresholdSource,
      configured: configuredTokens
    } = B$(modelId, autoCompactWindow),
    sdkMaxTokens = Zb(modelId, NT());
  if (thresholdSource !== "experiment" && thresholdSource !== "clientdata" || configuredTokens >= sdkMaxTokens) return null;
  return `Compacting at auto window (${gl(configuredTokens)} tokens) \xB7 /autocompact to configure`;
}
var FAo = 3,
  UAo = 3,
  vqn = 3,
  EAo;
var qAo = b(() => {
  ct();
  uh();
  eE();
  je();
  Or();
  an();
  St();
  ds();
  wn();
  Fo();
  z1();
  cn();
  Ct();
  mP();
  M5();
  V1();
  oee();
  bdt();
  i4e();
  EAo = `Autocompact is thrashing: the context refilled to the limit within ${UAo} turns of the previous compact, ${vqn} times in a row. A file being read or a tool output is likely too large for the context window. Try reading in smaller chunks, or use /clear to start fresh.`;
});
export {R2p as WVp,vAo as Ebo,x2p as GVp,$Ao as Fbo,k2p as VVp,yAo as gbo,H2p as KVp,FAo as Mbo,UAo as Nbo,vqn as PWn,EAo as Sbo,qAo as Bbo};
