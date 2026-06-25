// @ts-nocheck
import {Ne} from "../../vendor/m583.ts";
import {Mn,HY,_W,P_,Hl,bbo,_5t,Kk,Gce,ST,Gte,Vce,wc,Pil,po} from "../tools/5224_userPromptCount.ts";
import {Ws,vd} from "../session/1465_promise.ts";
import {eb,Pf} from "../agent/2591_level.ts";
import {getLastCancelledAPIMessageId as eMe,Ere,l0,getStickyBetas as zH,hasFableBridgeDialogTimedOut as Sir,setFableConsentDialogInteracted as Mbe,hasFableConsentDialogInteracted as Eir,setFableBridgeDialogTimedOut as bir,isSdkDialogHostActive as GLe,setMainLoopModelOverride as Bg,getSdkDialogCapabilitySource as fir,latchRefusalFallbackModel as xKe,getMainLoopModelOverride as by,getSessionCronTasks as _R,getSessionId as It,lt} from "../session/0132_sent.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le,Bo,Ve} from "../../vendor/m5.ts";
import {executePostToolBatchHooks as lft} from "../hooks/5200_level.ts";
import {Mr,Q0e,Kh,xil,xl} from "../../vendor/m4427.ts";
import {logForDebugging as A,logAntError as V9,qe} from "../config/0236_setHasFormattedOutput.ts";
import {CDe,MSo} from "../../vendor/m4389.ts";
import {mbo,ail,lil} from "./4415_messages.ts";
import {allTools as R_,Ct} from "../../vendor/m197.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {z8n,V8n,kSo,RSo,ASo,vSo,j8n} from "../agent/4386_reason.ts";
import {He,xe,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {fil,hil} from "../../vendor/m4416.ts";
import {dil,pil} from "../session/4416_sessionId.ts";
import {startRelevantMemoryPrefetch as Cbo,createAttachmentMessage as ti,getAttachmentMessages as X6e,filterDuplicateMemoryAttachments as Abo,GA} from "../agent/4451_tryGetPDFReference.ts";
import {oO,Xg} from "../agent/2193_kind.ts";
import {initKp as kp,osl,d8e} from "../config/4397_kind.ts";
import {fv,V6t} from "../session/4391_turn_number.ts";
import {aia,HI} from "../telemetry/3173_error.ts";
import {recordContentReplacement as T8e,_a} from "./5175_writeRemoteAgentMetadata.ts";
import {_5i,bot} from "../../vendor/m2768.ts";
import {vc} from "../api/3886_level.ts";
import {Dil,OWn,S8e} from "../tools/5207_properties.ts";
import {Sbo,Ebo,PWn} from "../session/4432_prefixTokens.ts";
import {$0,Cp} from "../config/2223_level.ts";
import {n7r,CC,mHn,yae,lee,g1} from "../core/2741_input_tokens.ts";
import {Tbo,Iye,dee} from "./4431_prompt.ts";
import {bytesPerTokenForModel as aE,getRuntimeMainLoopModel as w0,getMainLoopModel as gs,getFableDeclineFallbackModel as Dme,renderModelName as Tp,isModelAllowedUnderActiveEnforcement as dF,isExemptDefaultResolvingPick as XT,swapShrinksContextWindow as LAe,getCanonicalName as So,parseUserSpecifiedModel as Qo,Ro} from "./1458_swapShrinksContextWindow.ts";
import {JQ,Zf,vu} from "../mcp/2200_mcpServerName.ts";
import {rTe,nsl} from "../tools/4396_aborted.ts";
import {kG,Cmt} from "../tools/4326_code.ts";
import {Lyo,Nyo} from "../../vendor/m4324.ts";
import {JMt,aot,vHn} from "../telemetry/2747_base64_size_bytes.ts";
import {gg,t1} from "../telemetry/2542_ignore1mTag.ts";
import {_ot,a5i,Tge,c5i,l5i,yot} from "../../vendor/m2764.ts";
import {Oke,ej} from "../telemetry/2743_raw.ts";
import {T$a,b3t} from "../../vendor/m3970.ts";
import {ev,Qz,Hke} from "../session/2737_V4i.ts";
import {Ike,xke} from "../config/2739_repl.ts";
import {rB,K$e,yge,n1t,H6i,pot,kD} from "../api/2754_actualTokens.ts";
import {iBa,yte} from "../config/3910_claude_haiku_4_5.ts";
import {t6i,tj,n6i,iot,o6i,Zqi,RHn,nj} from "../agent/2746_partialTextChars.ts";
import {Jol,Xol,Qol,lWn} from "../core/4392_fallbacks.ts";
import {j5i,d1t,sIn} from "../telemetry/2776_clearSet.ts";
import {hs,Tu} from "../../vendor/m649.ts";
import {nv,qHe} from "../telemetry/3195_content.ts";
import {ep} from "../../vendor/m2223.ts";
import {Oa,eO} from "../../vendor/m1456.ts";
import {GMt,lqi,lh} from "../../vendor/m2739.ts";
import {VY,z6t} from "../../vendor/m4392.ts";
import {xr} from "../../vendor/m1461.ts";
import {j6t,tsl} from "../telemetry/4395_lane.ts";
import {rl,ri} from "../tools/2235_userFacingName.ts";
import {Bol,DSo,PSo,Y8n,p6e} from "../telemetry/4388_hasAttempted.ts";
import {rN} from "../../vendor/m4429.ts";
import {isLocalAgentTask as hO,f4} from "../telemetry/2522_error_name.ts";
import {Til,_bo} from "../../vendor/m4419.ts";
import {Zol,esl} from "../core/4394_messages.ts";
import {Cil,bil,Eil,Ail} from "../telemetry/4421_Ail.ts";
import {Rp,MO} from "../tools/2710_allErrors.ts";
import {p8i,y1t,Szr} from "../../vendor/m2784.ts";
import {WA,fW} from "../api/4438_type.ts";
import {executeStopFailureHooks as wDe} from "../../vendor/m5197.ts";
import {Xrt} from "../../vendor/m2735.ts";
import {wil,kil} from "../telemetry/4422_index.ts";
import {pFa} from "../config/3883_x0e.ts";
import {$ol,qol} from "../core/4389_tools.ts";
import {react as $h,sge} from "../core/2701_sge.ts";
import {GQ} from "../config/2029_mI.ts";
import {hasHookForEvent as uL,Wd} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {U8i,ef} from "../../vendor/m2794.ts";
import {wI,xot} from "../../vendor/m2793.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {kWn,wWn} from "./4414_worktreeOwnershipFields.ts";
import {oo,b} from "../../runtime.ts";
import {Q3e} from "../api/5225_model.ts";
import {f1} from "../../vendor/m4432.ts";
import {IA} from "../telemetry/2225_names.ts";
import {Ir} from "../../vendor/m584.ts";
import {gil} from "../../vendor/m4418.ts";
/**
 * Lazily resolves and caches the per-session classifier job state.
 * (v185 readable name: `lpt`; backing import `createClassifierJobState`.)
 * @returns the cached classifier job state, or null when unavailable.
 */
function vDe() {
  if (ybo === void 0) ybo = iTe?.().createClassifierJobState() ?? null;
  return ybo;
}
/**
 * Resolves the Fable bridge consent-dialog timeout in milliseconds.
 * Honours the CLAUDE_CODE_FABLE_BRIDGE_DIALOG_TIMEOUT_MS env override when it is
 * a positive number, otherwise defaults to 60_000ms. (v185: `k9p`.)
 */
function dVp() {
  let e = Ne.CLAUDE_CODE_FABLE_BRIDGE_DIALOG_TIMEOUT_MS;
  return e !== void 0 && e > 0 ? e : 60000;
}
/**
 * Emits synthetic error `tool_result` messages for every still-open `tool_use`
 * in the given assistant messages (skipping ids already present in `r`). Used to
 * unwind in-flight tool calls when a query fails. (v185: `H9p`.)
 * @param e assistantMessages — assistant messages to scan for tool_use blocks
 * @param t errorContent — error content attached to each synthetic tool_result
 * @param n deps — optional now()/uuid() providers
 * @param r existingResultIds — tool_use ids already answered (skipped)
 */
function* pVp(e, t, n, r) {
  for (let o of e) {
    let s = o.message.content.filter(i => i.type === "tool_use");
    for (let i of s) {
      if (r?.has(i.id)) continue;
      yield Mn({
        content: [{
          type: "tool_result",
          content: t,
          is_error: !0,
          tool_use_id: i.id
        }],
        toolUseResult: t,
        sourceToolAssistantUUID: o.uuid,
        now: n?.now,
        uuidFn: n?.uuid
      });
    }
  }
}
/**
 * Marks the active classifier turn as aborted, but only for the main-thread REPL
 * query source (not subagents). (v185: `Yce`; import `markTurnAborted`.)
 * @param e toolUseContext (read for `agentId`)
 * @param t querySource string
 */
function zce(e, t) {
  let n = vDe();
  if (!iTe || !n || !Ws() || !t.startsWith("repl_main_thread") || e.agentId) return;
  iTe().markTurnAborted(n, eb());
}
/**
 * For a user/remote cancellation on the main thread, returns the id of the last
 * cancelled API message so it can be threaded through as the interrupted message
 * id; returns undefined for subagents or non-cancel aborts. (v185: `m6n`.)
 * @param e toolUseContext
 */
function g5t(e) {
  if (e.agentId) return;
  let t = e.abortController.signal.reason;
  if (t !== "user-cancel" && t !== "remote-cancel") return;
  return eMe() ?? void 0;
}
/**
 * Finalises a turn that was ended by a tool result or an MCP "end-turn" meta
 * signal (rather than by the model re-invoking). Runs any PostToolBatch hooks
 * (whose blocking results are intentionally discarded — the turn is already
 * over), handles a possible abort, then emits the end-of-turn stream via `mbo`.
 * This path was inlined in v185 (`yield* Tho(...)`) and extracted into its own
 * generator in v190.
 * @param endTurnSource what ended the turn ("tool" | "mcp_meta" | ...)
 */
async function* mVp({
  endTurnSource: e,
  messagesForQuery: t,
  assistantMessages: n,
  toolResults: r,
  toolUseBlocks: o,
  systemPrompt: s,
  userContext: i,
  systemContext: a,
  toolUseContext: l,
  updatedToolUseContext: c,
  querySource: u,
  stopHookActive: d,
  stickyBetas: p,
  queryChainIdForAnalytics: m,
  queryDepth: f,
  deps: h
}) {
  try {
    if (W("tengu_mcp_tool_result_ended_turn", {
      queryChainId: m,
      queryDepth: f,
      source: Le(e)
    }), e === "mcp_meta") zce(l, u);
    let g = new Map();
    for (let _ of r) if (_.type === "user" && Array.isArray(_.message.content)) {
      for (let T of _.message.content) if (T.type === "tool_result") g.set(T.tool_use_id, T.content);
    }
    for await (let _ of lft(o.map(T => ({
      tool_name: T.name,
      tool_input: T.input,
      tool_use_id: T.id,
      tool_response: g.get(T.id)
    })), `hook-${h.uuid()}`, c, Mr(c).mode, c.abortController.signal)) {
      if (_.message) yield _.message;
      if (_.blockingError || _.preventContinuation) A(`[end-turn] PostToolBatch block discarded (turn ended by ${e === "tool" ? "tool result" : "MCP end-turn"}, no model re-invoke): ${_.blockingError?.blockingError ?? _.stopReason ?? "preventContinuation"}`);
    }
    if (c.abortController.signal.aborted) {
      if (!c.agentId) try {
        yield* CDe(c);
      } catch {}
      if (c.abortController.signal.reason !== "interrupt") yield HY({
        toolUse: !1,
        interruptedMessageId: g5t(c),
        now: h.now,
        uuidFn: h.uuid
      });
    }
    yield* mbo(t, n, r, s, i, a, l, u, d, p, vDe(), e);
  } catch (g) {
    if (R_(g)) return;
    Ie(g);
  }
}
/**
 * Records an API failure against the active classifier turn (main-thread REPL
 * only). Fire-and-forget; failures to record are swallowed. (v185: `Jce`;
 * import `markApiFailure`.)
 * @param e toolUseContext
 * @param t querySource string
 * @param n the API-error message (read for `error` / `errorDetails`)
 */
function Kce(e, t, n) {
  let r = vDe();
  if (!iTe || !r || !Ws() || !t.startsWith("repl_main_thread") || e.agentId) return;
  iTe().markApiFailure(r, eb(), n.error, _W(n) ?? n.errorDetails ?? "").catch(() => {});
}
/**
 * True when the message is an assistant message that hit the max_output_tokens
 * API error (used to trigger output-token recovery). (v185: `qZa`.)
 */
function Iil(e) {
  return e?.type === "assistant" && e.apiError === "max_output_tokens";
}
/**
 * Joins the custom system prompt (string or string[]) and an appended system
 * prompt into a single blank-line-separated string, dropping empty parts;
 * returns undefined when nothing remains. (v185: `D9p`.)
 * @param e customSystemPrompt (string | string[] | undefined)
 * @param t appendSystemPrompt (string | undefined)
 */
function hVp(e, t) {
  let r = [typeof e === "string" ? e : Array.isArray(e) ? e.join(`

`) : void 0, t].filter(o => !!o);
  return r.length > 0 ? r.join(`

`) : void 0;
}
/**
 * Public query entry point: wraps the core driver `gVp`, tracks lifecycle of any
 * commands started during the turn, fires a subagent_exit hook on exit, emits
 * `command_lifecycle: completed` events, and records a final turn telemetry
 * outcome (success bucket `He` vs failure bucket `xe`) keyed on the reason.
 * (v185: `caughtError`, core `P9p`.)
 * @param e query input/options object
 */
async function* jq(e) {
  let t = [],
    n;
  try {
    n = yield* gVp(e, t);
  } finally {
    let r = e.toolUseContext.agentId;
    if (r) z8n(r, "subagent_exit", e.querySource);
  }
  for (let r of t) yield {
    type: "command_lifecycle",
    uuid: r,
    state: "completed"
  };
  switch (n.reason) {
    case "completed":
    case "stop_hook_prevented":
    case "hook_stopped":
    case "tool_deferred":
    case "max_turns":
    case "aborted_streaming":
    case "aborted_tools":
    case "background_requested":
      He("turn");
      break;
    case "blocking_limit":
    case "rapid_refill_breaker":
    case "prompt_too_long":
    case "image_error":
    case "model_error":
      xe("turn", n.reason);
      break;
  }
  return n;
}
/**
 * Core query/agent loop driver (v185 readable name: `P9p`).
 *
 * Drives a full multi-turn conversation: per turn it runs autocompaction, the
 * Fable consent dialog, the streaming model call, and tool execution, handling
 * the many fallback/recovery branches:
 *  - rapid-refill auto-compact breaker, blocking PTL limit, reactive PTL/413
 *    compaction and prompt-too-long / image-error surfacing
 *  - server refusal-fallback (mid-stream and full), client refusal-fallback
 *    dialog/retry, streaming fallback, and model fallback chain advancement
 *  - max_output_tokens recovery, malformed-tool-use retry, thinking-only nudge,
 *    Stop/SubagentStop hook blocking with a turn/cap ceiling, and PostToolBatch
 *    hooks.
 * Yields stream events and message/tombstone objects to the caller and returns a
 * `{ reason, ... }` terminal status. `t` accumulates the uuids of commands
 * started this turn so the wrapper (`jq`) can complete their lifecycle.
 *
 * Local single-letter names are kept as in the structure-exact extraction; the
 * inline comments below name the load-bearing ones:
 *  p=deps, m=loop state, g=session gates, _=memory-prefetch handle,
 *  a=querySource, N(O)=toolUseContext, re=messagesForQuery, Te(ie)=assistantMsgs,
 *  he(Ae)=toolResults, ye(ge)=toolUseBlocks, Fe(Me)=tool runner, pt(ot)=model,
 *  h(A)=remaining task budget.
 * @param e query input/options
 * @param t out-param: uuids of started commands (mutated)
 */
async function* gVp(e, t) {
  let {
      systemPrompt: n,
      userContext: r,
      systemContext: o,
      canUseTool: s,
      fallbackModel: i,
      querySource: a,
      spawnedBySkill: l,
      maxTurns: c,
      skipCacheWrite: u,
      forkPointUuid: d
    } = e,
    p = e.deps ?? fil(),
    m = {
      messages: e.messages,
      toolUseContext: e.toolUseContext,
      maxOutputTokensOverride: e.maxOutputTokensOverride,
      compactTracking: void 0,
      stopHookActive: e.stopHookActive ?? !1,
      stopHookBlockingCount: 0,
      maxOutputTokensRecoveryCount: 0,
      hasAttemptedReactiveCompact: !1,
      thinkingOnlyNudged: !1,
      turnCount: 1,
      pendingToolUseSummary: void 0,
      transition: void 0
    },
    f = null,
    h = void 0,
    g = dil();
  using _ = Cbo(m.messages, m.toolUseContext, a, {
    systemPrompt: n,
    userContext: r,
    systemContext: o
  });
  let T = !1,
    y = !1,
    S = !1,
    E,
    R = !1,
    w = Array.isArray(i) ? i : i !== void 0 ? [i] : [],
    H = Q0e(e.toolUseContext),
    k = [H, ...w.filter(N => N !== H)],
    I = 0,
    D,
    O,
    L = a.startsWith("repl_main_thread") || a === "sdk",
    P = oO(a),
    M = e.stickyBetas ?? (P === "main" || P === void 0 ? void 0 : P === "subagent" ? Ere() : l0(zH())),
    B = P === "main" || P === void 0;
  while (!0) {
    if (B && m.toolUseContext.shouldStopBeforeNextApiCall?.()) return {
      reason: "background_requested"
    };
    let {
        toolUseContext: N
      } = m,
      {
        messages: F,
        compactTracking: V,
        maxOutputTokensRecoveryCount: G,
        hasAttemptedReactiveCompact: z,
        thinkingOnlyNudged: J,
        maxOutputTokensOverride: K,
        pendingToolUseSummary: j,
        stopHookActive: X,
        stopHookBlockingCount: ee,
        turnCount: te
      } = m;
    if (yield {
      type: "stream_request_start"
    }, kp("query_fn_entry"), !N.agentId) fv("query_started");
    let ne = N.queryTracking ? {
        chainId: N.queryTracking.chainId,
        depth: N.queryTracking.depth + 1
      } : {
        chainId: p.uuid(),
        depth: 0
      },
      se = ne.chainId;
    N = {
      ...N,
      queryTracking: ne
    };
    let re = [...P_(F)],
      ue = V,
      le = N.precomputeSourceKey !== void 0 && ue?.compacted !== !0 && !V8n(a),
      ce = a.startsWith("agent:") || a.startsWith("repl_main_thread");
    re = await aia(re, N.contentReplacementState, ce ? Et => void T8e(Et, N.agentId).catch(Ie) : void 0, new Set(N.options.tools.filter(Et => !Number.isFinite(Et.maxResultSizeChars)).map(Et => Et.name)));
    let Se = 0;
    _5i();
    let ie = vc(Dil(n, o));
    kp("query_autocompact_start");
    let {
      compactionResult: ae,
      consecutiveFailures: pe,
      consecutiveRapidRefills: me,
      rapidRefillBreakerTripped: _e,
      thresholdSource: de,
      routedThroughReactive: ge
    } = yield* p.autocompact(re, N, {
      systemPrompt: n,
      userContext: r,
      systemContext: o,
      toolUseContext: N,
      forkContextMessages: re,
      stickyBetas: M
    }, a, ue, Se, kSo);
    if (kp("query_autocompact_end"), _e) {
      W("tengu_auto_compact_rapid_refill_breaker", {
        consecutiveRapidRefills: ue?.consecutiveRapidRefills ?? 0,
        turnsSincePreviousCompact: ue?.turnCounter ?? -1,
        queryChainId: se,
        queryDepth: ne.depth
      });
      let Et = Hl({
        content: Sbo,
        error: "invalid_request",
        now: p.now,
        uuid: p.uuid
      });
      return yield Et, Kce(N, a, Et), {
        reason: "rapid_refill_breaker"
      };
    }
    if (ae) {
      let {
          preCompactTokenCount: Et,
          postCompactTokenCount: Ze,
          truePostCompactTokenCount: Gt,
          compactionUsage: en
        } = ae,
        Un = $0(N.options.mainLoopModel, Kh(N));
      if (W("tengu_auto_compact_succeeded", {
        thresholdSource: Bo(de),
        routedThroughReactive: ge,
        originalMessageCount: F.length,
        compactedMessageCount: ae.summaryMessages.length + ae.attachments.length + ae.hookResults.length,
        ...(Un && {
          effort_level: Le(Un)
        }),
        preCompactTokenCount: Et,
        postCompactTokenCount: Ze,
        truePostCompactTokenCount: Gt,
        compactionInputTokens: en?.input_tokens,
        compactionOutputTokens: en?.output_tokens,
        compactionCacheReadTokens: en?.cache_read_input_tokens ?? 0,
        compactionCacheCreationTokens: en?.cache_creation_input_tokens ?? 0,
        compactionTotalTokens: en ? en.input_tokens + (en.cache_creation_input_tokens ?? 0) + (en.cache_read_input_tokens ?? 0) + en.output_tokens : 0,
        queryChainId: se,
        queryDepth: ne.depth
      }), e.taskBudget) {
        let Tt = n7r(re);
        h = Math.max(0, (h ?? e.taskBudget.total) - Tt);
      }
      ue = {
        compacted: !0,
        turnId: p.uuid(),
        turnCounter: 0,
        consecutiveFailures: 0,
        consecutiveRapidRefills: me
      };
      for (let Tt of Tbo(ae)) yield Tt;
      re = Iye(ae);
    } else if (pe !== void 0) ue = {
      ...(ue ?? {
        compacted: !1,
        turnId: "",
        turnCounter: 0
      }),
      consecutiveFailures: pe
    };
    if (RSo({
      compactionResult: ae,
      consecutiveFailures: pe,
      hasAttemptedReactiveCompact: z,
      lastTransitionReason: m.transition?.reason,
      isPreFirstCompactFork: le,
      querySource: a,
      contextTokens: CC(re, aE(N.options.mainLoopModel)) - Se,
      model: N.options.mainLoopModel,
      autoCompactWindow: N.options.autoCompactWindow
    })) if (P === "subagent") ASo(N.agentId, "subagent_estimate", JQ(a));else vSo({
      querySource: a,
      messages: re,
      cacheSafeParams: {
        systemPrompt: n,
        userContext: r,
        systemContext: o,
        toolUseContext: N,
        forkContextMessages: re,
        stickyBetas: M
      },
      ...(a === "sdk" && {
        promptScan: bbo(re)
      })
    });
    N = {
      ...N,
      messages: re,
      turnStartIndex: TVp(re)
    };
    let Te = [],
      he = [],
      ye = [],
      we = !1,
      Oe = !1,
      We = null;
    kp("query_setup_start");
    let Fe = new rTe(N.options.tools, s, N, p.now);
    function* ke() {
      if (N.abortController.signal.aborted) return;
      for (let Et of Fe.getCompletedResults()) {
        if (kG(Et)) {
          yield Et;
          continue;
        }
        if (Et.message) {
          yield Et.message;
          let Ze = Lyo(Et.message);
          if (Ze) Oe = Ze;
          if (!_5t(Et.message)) {
            let Gt = Kk([Et.message], N.options.refreshTools?.() ?? N.options.tools, N.options.mainLoopModel);
            JMt(Gt, gg(N.options.mainLoopModel).maxBase64Size), he.push(...Gt.filter(en => en.type === "user"));
          }
        }
      }
    }
    let Ue = N.getAppState(),
      Ge = Mr(N).mode,
      ht = Ge === "plan" && mHn(re),
      pt = w0({
        permissionMode: Ge,
        mainLoopModel: D ?? O ?? k[I] ?? H,
        exceeds200kTokens: ht
      }),
      Be = w0({
        permissionMode: Ge,
        mainLoopModel: gs(),
        exceeds200kTokens: ht
      });
    if (_ot(pt, N.requestDialog)) {
      let Et = "cancelled",
        Ze = !1,
        Gt = N.getAppState().replBridgeSessionActive === !0,
        en = a5i({
          requestDialog: N.requestDialog,
          isMainThread: L
        }) && !(Gt && Sir()) && !N.abortController.signal.aborted;
      if (en && N.requestDialog) if (Gt) {
        let Tt = new AbortController(),
          Cn = () => Tt.abort();
        N.abortController.signal.addEventListener("abort", Cn, {
          once: !0
        }), Mbe(!1);
        let $n = setTimeout(Nn => {
          if (Eir()) return;
          Ze = !0, bir(), Pt("model_fable_consent", "bridge_dialog_timeout"), Nn.abort();
        }, dVp(), Tt);
        try {
          Et = await N.requestDialog(Tge, {
            overagesEnabled: Oke()
          }, {
            signal: Tt.signal
          });
        } finally {
          clearTimeout($n), N.abortController.signal.removeEventListener("abort", Cn);
        }
      } else Et = await N.requestDialog(Tge, {
        overagesEnabled: Oke()
      }, {
        signal: N.abortController.signal
      });
      let Un = Et === "consent" && (await c5i());
      if (!Un && N.abortController.signal.aborted) {
        let Tt = N.abortController.signal.reason;
        if (Tt !== "interrupt" && Tt !== "refusal-fallback-edit") yield HY({
          toolUse: !1,
          interruptedMessageId: g5t(N),
          now: p.now,
          uuidFn: p.uuid
        });
        return zce(N, a), {
          reason: "aborted_streaming"
        };
      }
      if (en && GLe()) {
        if (Un) He("model_fable_consent");else if (Et === "consent") Pt("model_fable_consent", "overage_enable_deferred");else if (Et === "switch_default") xe("model_fable_consent", "declined");else if (!Ze) Pt("model_fable_consent", "dismissed");
      }
      if (!Un) {
        if (!en && L) Pt("model_fable_consent", "no_dialog_fallback");
        let Tt = Dme();
        if (Tt === null) {
          if (L) xe("model_fable_consent", "no_allowed_fallback");
          let Nn = Hl({
            content: "Your model policy only allows Fable 5, which requires usage credits \xB7 /model to set it up",
            now: p.now,
            uuid: p.uuid
          });
          return yield Nn, Kce(N, a, Nn), {
            reason: "model_error",
            error: Error("Fable consent declined and the model policy allows no non-Fable fallback")
          };
        }
        let Cn = pt,
          $n = !1;
        if (L) {
          if (Et === "switch_default") $n = l5i(Tt);
          N.setAppState(Nn => ({
            ...Nn,
            mainLoopModel: Tt,
            mainLoopModelForSession: null
          })), Bg(Tt);
        }
        if (N.options = {
          ...N.options,
          mainLoopModel: Tt
        }, pt = Tt, O = Tt, L) yield {
          type: "system",
          subtype: "model_consent_fallback",
          content: `Switched to ${Tp(Tt)} ${$n ? "\u2014 now your default model" : "for this session"} \xB7 ${Tp(Cn)} requires usage credits \xB7 /model to change`,
          level: "warning",
          choice: Et,
          originalModel: Cn,
          fallbackModel: Tt,
          persistedAsDefault: $n,
          isMeta: !1,
          timestamp: p.now(),
          uuid: p.uuid()
        };
      }
    }
    kp("query_setup_end");
    let dt = g.gates.isAnt && oO(a) !== "auxiliary" ? T$a(N.agentId ?? g.sessionId) : void 0,
      Dt = !1,
      rt = ev() && Qz() && !Ike(N.options.mainLoopModel, N.options.autoCompactWindow);
    if (!ae && a !== "compact" && !rt && !Dt) {
      if (xke(CC(re, aE(N.options.mainLoopModel)) - Se, N.options.mainLoopModel, N.options.autoCompactWindow).level === "blocked") {
        if (!Hke(a)) W("tengu_ptl_surfaced_to_user", {
          reason: Ve("blocking_limit"),
          querySource: Xg(a),
          wasGatedByPriorAttempt: !1,
          reactiveUnsupported: !Qz()
        });
        let Gt = Hl({
          content: rB,
          error: "invalid_request",
          now: p.now,
          uuid: p.uuid
        });
        return yield Gt, Kce(N, a, Gt), {
          reason: "blocking_limit"
        };
      }
    }
    if (iTe && Ws() && a.startsWith("repl_main_thread") && !N.agentId) {
      let Et = re.findLast(Ze => Ze.type === "user" && !Ze.isMeta && typeof Ze.message.content === "string");
      iTe().markTurnActive(vDe(), eb(), Et?.type === "user" && typeof Et.message.content === "string" && !Gce(Et.message.content) ? Et.message.content : void 0);
    }
    let ot = !0,
      Ht,
      zt,
      Nt;
    kp("query_api_loop_start");
    try {
      while (ot) {
        ot = !1;
        let Et = _Vp(pt, Be) || !Ue.advisorModel || iBa(pt, Ue.advisorModel) ? Ue.advisorModel : void 0;
        if (Ue.advisorModel && Et === void 0) A(`[AdvisorTool] Skipping advisor - ${Ue.advisorModel} cannot advise non-configured attempt model ${pt} (configured: ${Be})`);
        if (E !== void 0) if (R) E = void 0, R = !1;else R = !0;
        let Ze = [],
          Gt = Te.length,
          en,
          Un,
          Tt = [],
          Cn,
          $n = !1;
        try {
          let Nn = !1,
            cr = [],
            Gr = [],
            To = t6i(),
            rn = Le(fir()),
            Dn = N.getAppState().replBridgeSessionActive,
            Io = To || Dn,
            Er = Jol({
              currentModel: pt,
              alreadyUsed: T,
              declined: y,
              suppressionAlreadyLogged: S,
              requestDialog: N.requestDialog,
              isMainThread: L,
              consumerLacksDialogCapability: Io,
              sticky: M ?? zH()
            });
          if (Er.shouldLogSuppression) S = !0, W("tengu_refusal_fallback_suppressed", {
            reason: N.requestDialog === void 0 ? Ve("no_dialog_host_setting_off") : To ? Ve("no_consumer_capability_setting_off") : Ve("remote_controlled_session_setting_off"),
            capability_source: rn
          });
          let Ft = Er.serverLane,
            Wn = Ht;
          Ht = void 0;
          let Pr = zt;
          zt = void 0;
          let Go = Nt;
          Nt = void 0, kp("query_api_streaming_start");
          for await (let wt of osl(p.callModel({
            messages: OWn(re, r),
            systemPrompt: ie,
            thinkingConfig: xil(N),
            tools: N.options.tools,
            signal: N.abortController.signal,
            options: {
              async getToolPermissionContext() {
                return Mr(N);
              },
              model: pt,
              ...(g.gates.fastModeEnabled && {
                fastMode: N.options.fastMode
              }),
              toolChoice: void 0,
              isNonInteractiveSession: N.options.isNonInteractiveSession,
              fallbackModel: k[I + 1],
              refusalFallbackModel: !T && !y && Ft === void 0 ? Er.visibleModel : void 0,
              serverRefusalFallback: Ft,
              fallbackCreditCode: Wn,
              fallbackCreditMintModel: Pr,
              fallbackCreditMintRequestId: Go,
              fallbackCreditLaneArmed: Er.visibleModel !== void 0,
              onStreamingFallback: () => {
                Nn = !0;
              },
              onHintCleared: (xn, gt) => {
                Ze.push({
                  type: "hint_clears",
                  ids: [...xn],
                  contentById: Object.fromEntries(gt)
                });
                for (let to of j5i(re, xn)) N.readFileState.delete(hs(to));
                re = d1t(re, xn, gt);
              },
              querySource: a,
              keepPartialMessageOnAbort: e.keepPartialMessageOnAbort,
              spawnedBySkill: l,
              activeSkill: N.options.activeSkill,
              activeMcpServer: N.options.activeMcpServer,
              activeMcpTool: N.options.activeMcpTool,
              messageClientPlatform: N.options.messageClientPlatform,
              agents: N.options.agentDefinitions.activeAgents,
              allowedAgentTypes: N.options.agentDefinitions.allowedAgentTypes,
              hasAppendSystemPrompt: !!N.options.appendSystemPrompt,
              userSystemPrompt: !N.agentId && nv() ? hVp(N.options.customSystemPrompt, N.options.appendSystemPrompt) : void 0,
              maxOutputTokensOverride: K,
              fetchOverride: dt,
              mcpTools: Ue.mcp.tools,
              promptTooLongIsHandled: !0,
              hasPendingMcpServers: Ue.mcp.clients.some(xn => xn.type === "pending"),
              queryTracking: ne,
              effortValue: Kh(N),
              advisorModel: Et,
              skipCacheWrite: u,
              forkPointUuid: d,
              stickyBetas: M,
              agentId: N.agentId,
              agentContext: N.agentContext,
              onRetryStatus: N.onRetryStatus,
              ...(e.taskBudget && {
                taskBudget: {
                  total: e.taskBudget.total,
                  ...(h !== void 0 && {
                    remaining: h
                  })
                }
              })
            }
          }), () => Fe)) {
            if (wt.type === "tool_drain_tick") {
              yield* ke();
              continue;
            }
            if (Ze.length > 0) yield* Ze, Ze.length = 0;
            if (wt.type === "server_fallback") {
              {
                let Vn = Xol(wt, {
                  isMainThread: L
                });
                if (W("tengu_rotunda_pennant_applied", {
                  reason: Le(Vn.telemetry.reason),
                  mid_stream: Vn.telemetry.midStream,
                  discarded_block_count: Vn.telemetry.discardedBlockCount,
                  tombstoned_had_tool_use: Vn.telemetry.tombstonedHadToolUse,
                  request_id_sha12: Vn.telemetry.requestId !== null ? ep(Vn.telemetry.requestId) : void 0,
                  original_model_scope: Le(Vn.telemetry.originalModelScope),
                  queryChainId: se,
                  queryDepth: ne.depth,
                  querySource: JQ(a),
                  final_stop_reason: Bo(Vn.telemetry.finalStopReason ?? void 0),
                  api_refusal_category: Bo(Vn.telemetry.apiRefusalCategory)
                }), Vn.userVisible) {
                  He("refusal_fallback");
                  let qn = pt,
                    ur = pt === wt.toModel;
                  if (!(dF(wt.toModel) ?? (Oa(wt.toModel) || XT(wt.toModel)))) {
                    A(`Server refusal-fallback target "${wt.toModel}" is not in the availableModels allowlist; declining the swap`, {
                      level: "warn"
                    }), y = !0;
                    let Lr = [];
                    for (let On of wt.discardedMessages) {
                      let Hr = Te.findIndex(Sr => Sr.uuid === On.uuid);
                      if (Hr !== -1) Te.splice(Hr, 1);
                      Lr.push(On);
                    }
                    for (let On = Te.length - 1; On >= 0; On--) {
                      let Hr = Te[On];
                      if (Hr.message.model === wt.toModel) Te.splice(On, 1), Lr.push(Hr);
                    }
                    let Xt = he.slice();
                    he.length = 0, ye.length = 0, cr.length = 0, we = !1, Oe = !1;
                    let kn = Fe.discardAndAbortInFlight(GMt());
                    W("tengu_rotunda_pennant_tools", {
                      lane: Ve("decline"),
                      aborted: kn.aborted,
                      completed_before_event: kn.completedBeforeEvent,
                      queued_never_started: kn.queuedNeverStarted,
                      compensated_removes: kn.toolUseIds.length
                    }), Fe = new rTe(N.options.tools, s, N, p.now);
                    for (let On of Lr) yield {
                      type: "tombstone",
                      message: On
                    };
                    for (let On of Xt) yield {
                      type: "tombstone",
                      message: On
                    };
                    if (kn.toolUseIds.length > 0) yield {
                      type: "set_in_progress_tool_use_ids",
                      op: {
                        action: "remove",
                        ids: kn.toolUseIds
                      }
                    };
                    let Gn = wt.reason === "refusal" ? K$e("refusal", {
                      type: "refusal",
                      category: wt.apiRefusalCategory ?? null,
                      explanation: null
                    }, wt.requestId, pt) : Hl({
                      content: "The server routed this response to a model that is not in your organization\u2019s availableModels allowlist; the response was discarded.",
                      error: "invalid_request",
                      now: p.now,
                      uuid: p.uuid
                    });
                    if (Gn) Te.push(Gn), yield Gn;
                    break;
                  }
                  if (T = !0, D = wt.toModel, pt = wt.toModel, Vn.swapSession) {
                    let Lr = N.getAppState();
                    xKe({
                      fallbackModel: wt.toModel,
                      previousOverride: by(),
                      previousAppStateModel: Lr.mainLoopModel,
                      previousModelForSession: Lr.mainLoopModelForSession
                    }), N.setAppState(Xt => ({
                      ...Xt,
                      mainLoopModel: wt.toModel,
                      mainLoopModelForSession: null
                    })), Bg(wt.toModel), N.options.mainLoopModel = wt.toModel;
                  }
                  let $r = new Set(wt.discardedMessages.map(Lr => Lr.uuid));
                  if ($r.size > 0) {
                    for (let Lr = Te.length - 1; Lr >= 0; Lr--) if ($r.has(Te[Lr].uuid)) Te.splice(Lr, 1);
                  }
                  let vo = [];
                  if (Vn.tombstonedToolUse) {
                    let Lr = Fe.discardAndAbortInFlight(GMt());
                    if (W("tengu_rotunda_pennant_tools", {
                      lane: Ve("accept"),
                      aborted: Lr.aborted,
                      completed_before_event: Lr.completedBeforeEvent,
                      queued_never_started: Lr.queuedNeverStarted,
                      compensated_removes: Lr.toolUseIds.length
                    }), vo = [...he], he.length = 0, ye.length = 0, we = !1, Oe = !1, Fe = new rTe(N.options.tools, s, N, p.now), Lr.toolUseIds.length > 0) yield {
                      type: "set_in_progress_tool_use_ids",
                      op: {
                        action: "remove",
                        ids: Lr.toolUseIds
                      },
                      reason: "fallback_sweep"
                    };
                  }
                  if (wt.midStream) {
                    en = new Set(Te.slice(Gt).map(Xt => Xt.uuid));
                    let Lr = wt.retainedText;
                    if (Lr !== void 0 && Lr.length > 0) Cn = {
                      text: Lr,
                      originals: wt.retainedMessages ?? []
                    };
                  }
                  Tt.push(...wt.discardedMessages, ...vo);
                  for (let Lr of wt.discardedMessages) yield {
                    type: "tombstone",
                    message: Lr,
                    displayOnly: !0
                  };
                  for (let Lr of vo) yield {
                    type: "tombstone",
                    message: Lr,
                    displayOnly: !0
                  };
                  if (Cn !== void 0) $n = !0, yield {
                    type: "refusal_continuation",
                    phase: "begin",
                    salvageText: Cn.text,
                    replacesUuids: Cn.originals.map(Lr => Lr.uuid)
                  };
                  if (Vn.showBanner && !ur) Un = Qol({
                    ...wt,
                    fromModel: qn
                  }, {
                    timestamp: p.now(),
                    uuid: p.uuid()
                  });
                }
              }
              continue;
            }
            if (wt.type === "fallback_request") {
              if (!T && !y && tj()) {
                let Vn = n6i({
                    requestDialog: N.requestDialog,
                    isMainThread: L,
                    consumerLacksDialogCapability: Io
                  }),
                  qn = {
                    original_model: wt.originalModel,
                    fallback_model: wt.fallbackModel,
                    trigger: Le(wt.trigger),
                    request_id: wt.requestId,
                    queryChainId: se,
                    queryDepth: ne.depth,
                    querySource: Xg(a),
                    api_refusal_category: wt.apiRefusalCategory ? Le(iot(wt.apiRefusalCategory)) : void 0,
                    has_api_refusal_explanation: Boolean(wt.apiRefusalExplanation)
                  },
                  ur = [...Te, ...he].flatMap(kn => ST([kn]).filter(Gte).map(Gn => Gn.uuid)),
                  $r = Vn === "no_consumer_capability";
                if ($r) W("tengu_refusal_fallback_dialog_suppressed", {
                  ...qn,
                  reason: To ? Ve("no_consumer_capability") : Ve("remote_controlled_session"),
                  capability_source: rn,
                  retracted_wire_uuid_count: ur.length
                });
                let vo = $r ? "cancelled" : "retry_fallback";
                if (Vn === void 0 && N.requestDialog) {
                  if (W("tengu_refusal_fallback_prompt_shown", {
                    ...qn,
                    capability_source: rn,
                    retracted_wire_uuid_count: ur.length
                  }), vo = await N.requestDialog(VY, {
                    originalModel: wt.originalModel,
                    fallbackModel: wt.fallbackModel,
                    apiRefusalCategory: wt.apiRefusalCategory,
                    retractedMessageUuids: ur,
                    guidanceText: o6i()
                  }, {
                    signal: N.abortController.signal
                  }), vo !== "cancelled") W("tengu_refusal_fallback_prompt_choice", {
                    ...qn,
                    choice: Le(vo)
                  });
                }
                if (vo !== "retry_fallback") {
                  if (y = !0, wt.creditCode !== null) W("tengu_fallback_credit_forfeited", {
                    reason: vo === "cancelled" ? Ve("cancelled") : Ve("dialog_declined"),
                    mint_request_id: xr(wt.requestId),
                    mint_model: Zf(pt)
                  });
                  for (let Gn of Te) yield {
                    type: "tombstone",
                    message: Gn
                  };
                  for (let Gn of he) yield {
                    type: "tombstone",
                    message: Gn
                  };
                  Te.length = 0, he.length = 0, ye.length = 0, cr.length = 0, we = !1, Oe = !1;
                  let kn = j6t(Fe, "refusal_decline");
                  if (Fe = new rTe(N.options.tools, s, N, p.now), kn) yield kn;
                  if (vo === "edit_prompt") N.abortController.abort("refusal-fallback-edit");
                  if (vo === "cancelled" && !N.abortController.signal.aborted) {
                    let Gn = K$e("refusal", {
                      type: "refusal",
                      category: wt.apiRefusalCategory ?? null,
                      explanation: wt.apiRefusalExplanation ?? null
                    }, wt.requestId, wt.originalModel);
                    if (Gn) Te.push(Gn), yield Gn;
                  }
                  break;
                }
                let Lr = Zqi(Te);
                if (T = !0, D = wt.fallbackModel, Ht = wt.creditCode ?? void 0, zt = Ht !== void 0 ? pt : void 0, Nt = Ht !== void 0 ? wt.requestId ?? void 0 : void 0, pt = wt.fallbackModel, ot = !0, E = L && ur.length > 0 ? ur : void 0, R = !1, L) {
                  let kn = N.getAppState();
                  xKe({
                    fallbackModel: wt.fallbackModel,
                    previousOverride: by(),
                    previousAppStateModel: kn.mainLoopModel,
                    previousModelForSession: kn.mainLoopModelForSession
                  }), N.setAppState(Gn => ({
                    ...Gn,
                    mainLoopModel: wt.fallbackModel,
                    mainLoopModelForSession: null
                  })), Bg(wt.fallbackModel), N.options.mainLoopModel = wt.fallbackModel;
                }
                He("refusal_fallback"), W("tengu_refusal_fallback_triggered", {
                  ...qn,
                  retracted_wire_uuid_count: ur.length,
                  prompt_skipped_reason: Bo(Vn),
                  had_partial_text: Lr.partialTextChars > 0,
                  partial_text_chars: Lr.partialTextChars,
                  salvaged_tool_use_count: Lr.toolUseCount,
                  had_empty_input_tool_use: Lr.hadEmptyInputToolUse,
                  credit_minted: wt.creditCode !== null
                });
                for (let kn of Te) yield {
                  type: "tombstone",
                  message: kn
                };
                for (let kn of he) yield {
                  type: "tombstone",
                  message: kn
                };
                Te.length = 0, he.length = 0, ye.length = 0, cr.length = 0, we = !1, Oe = !1;
                let Xt = j6t(Fe, "refusal_retry");
                if (Fe = new rTe(N.options.tools, s, N, p.now), Xt) yield Xt;
                if (L) yield {
                  type: "system",
                  subtype: "model_refusal_fallback",
                  direction: "retry",
                  content: RHn(wt.originalModel, wt.fallbackModel, wt.apiRefusalCategory),
                  level: "warning",
                  trigger: wt.trigger,
                  originalModel: wt.originalModel,
                  fallbackModel: wt.fallbackModel,
                  requestId: wt.requestId,
                  apiRefusalCategory: wt.apiRefusalCategory,
                  apiRefusalExplanation: wt.apiRefusalExplanation,
                  retractedMessageUuids: ur,
                  isMeta: !1,
                  timestamp: p.now(),
                  uuid: p.uuid()
                };
              } else {
                let Vn = K$e("refusal", {
                  type: "refusal",
                  category: wt.apiRefusalCategory ?? null,
                  explanation: wt.apiRefusalExplanation ?? null
                }, wt.requestId, wt.originalModel);
                if (Vn) Te.push(Vn), yield Vn;
              }
              break;
            }
            if (wt.type === "streaming_fallback_began") Nn = !0;
            if (Nn) {
              for (let qn of Te) yield {
                type: "tombstone",
                message: qn
              };
              for (let qn of he) yield {
                type: "tombstone",
                message: qn
              };
              W("tengu_orphaned_messages_tombstoned", {
                orphanedMessageCount: Te.length,
                queryChainId: se,
                queryDepth: ne.depth
              }), Te.length = 0, he.length = 0, ye.length = 0, cr.length = 0, we = !1, Oe = !1;
              let Vn = j6t(Fe, "streaming_fallback");
              if (Fe = new rTe(N.options.tools, s, N, p.now), Vn) yield Vn;
              Nn = !1;
            }
            if (wt.type === "streaming_fallback_began") continue;
            let xn = wt,
              gt,
              to = !1,
              fr;
            if (wt.type === "assistant") {
              let Vn;
              for (let qn = 0; qn < wt.message.content.length; qn++) {
                let ur = wt.message.content[qn];
                if (ur.type === "tool_use" && typeof ur.input === "object" && ur.input !== null) {
                  let $r = rl(N.options.tools, ur.name, N.options.toolAliases);
                  if ($r?.backfillObservableInput) {
                    let vo = ur.input,
                      Lr = {
                        ...vo
                      };
                    if ($r.backfillObservableInput(Lr), Object.keys(Lr).some(kn => !(kn in vo))) Vn ??= [...wt.message.content], Vn[qn] = {
                      ...ur,
                      input: Lr
                    };
                  }
                }
              }
              if (Vn) xn = {
                ...wt,
                message: {
                  ...wt.message,
                  content: Vn
                }
              }, cr.push({
                src: wt.message,
                dst: xn.message
              });
            }
            if (Cn !== void 0 && wt.type === "assistant" && !wt.isApiErrorMessage) {
              let Vn = xn.type === "assistant" ? xn : wt,
                qn = Vn.message.content,
                ur = qn.findIndex(vo => vo.type === "text"),
                $r = ur === -1 ? void 0 : qn[ur];
              if ($r !== void 0 && $r.type === "text" && $r.text.trim().length > 0) {
                let vo = [...qn];
                vo[ur] = {
                  ...$r,
                  text: Cn.text + $r.text
                };
                let Lr = {
                  ...Vn,
                  message: {
                    ...Vn.message,
                    content: vo
                  }
                };
                cr.push({
                  src: wt.message,
                  dst: Lr.message
                });
                {
                  let Xt = Cn.originals,
                    kn = new Set(Xt.map(Gn => Gn.uuid));
                  for (let Gn = Te.length - 1; Gn >= 0; Gn--) if (kn.has(Te[Gn].uuid)) Te.splice(Gn, 1);
                  if (Te.push(Lr), to = !0, fr = Xt, Tt.push(...Xt), L) Lr.supersedesUuids = Xt.flatMap(Gn => ST([Gn]).filter(Gte).map(On => On.uuid)), W("tengu_refusal_fallback_supersedes", {
                    lane: Ve("server_stitch"),
                    count: Lr.supersedesUuids.length
                  });
                  en = new Set([Lr.uuid]), Cn = void 0;
                }
                xn = Lr, gt = Lr;
              }
            }
            if (wt.type === "stream_event" && wt.event.type === "message_delta") {
              We = wt.event.delta.stop_reason;
              for (let {
                src: Vn,
                dst: qn
              } of cr) qn.usage = Vn.usage, qn.stop_reason = Vn.stop_reason, qn.stop_details = Vn.stop_details;
              cr.length = 0;
            }
            let Nr = !1;
            if (Bol(wt)) Nr = !0;
            if (DSo(wt)) Nr = !0, Gr.push(wt);
            if (Iil(wt)) Nr = !0;
            if (!Nr) {
              if (Gr.length > 0) yield* Gr, Gr.length = 0;
              if (E !== void 0 && xn.type === "assistant" && !xn.isApiErrorMessage && ST([xn]).some(Gte)) {
                let Vn = E;
                E = void 0, R = !1, xn = {
                  ...xn,
                  supersedesUuids: Vn
                }, W("tengu_refusal_fallback_supersedes", {
                  lane: Ve("client_retry"),
                  count: Vn.length
                });
              }
              yield xn;
            }
            if (wt.type === "assistant") {
              let Vn = gt ?? wt;
              if (!to) Te.push(Vn);
              let qn = Vn.message.content.filter(ur => ur.type === "tool_use");
              if (qn.length > 0) ye.push(...qn), we = !0;
              if (!N.abortController.signal.aborted) for (let ur of qn) Fe.addTool(ur, Vn);
            }
            if (fr !== void 0) {
              let Vn = fr;
              fr = void 0;
              for (let qn of Vn) yield {
                type: "tombstone",
                message: qn,
                displayOnly: !0
              };
            }
            yield* ke();
          }
          if (kp("query_api_streaming_end"), Ze.length > 0) yield* Ze, Ze.length = 0;
          if (en !== void 0 && (Te.at(-1)?.message.stop_reason ?? We) === "refusal") {
            let wt = [];
            for (let xn = Te.length - 1; xn >= 0; xn--) if (en.has(Te[xn].uuid)) wt.unshift(Te[xn]), Te.splice(xn, 1);
            Tt.push(...wt);
            for (let xn of wt) yield {
              type: "tombstone",
              message: xn
            };
          }
          if ($n) $n = !1, Cn = void 0, yield {
            type: "refusal_continuation",
            phase: "end"
          };
          if (Un !== void 0) {
            if (Tt.length > 0) Un.retractedMessageUuids = Tt.flatMap(wt => ST([wt]).filter(Gte).map(xn => xn.uuid));
            yield Un, Un = void 0;
          }
          {
            let wt = Te.at(-1),
              xn = wt ? yae(wt) : void 0;
            if (xn) {
              let gt = lee(xn);
              if (RSo({
                compactionResult: ae,
                consecutiveFailures: pe,
                hasAttemptedReactiveCompact: z,
                lastTransitionReason: m.transition?.reason,
                isPreFirstCompactFork: le,
                querySource: a,
                contextTokens: gt,
                model: N.options.mainLoopModel,
                autoCompactWindow: N.options.autoCompactWindow
              })) if (P === "subagent" && ye.length === 0) ASo(N.agentId, "subagent_final_turn", JQ(a));else {
                let to = xn.input_tokens + (xn.cache_creation_input_tokens ?? 0) + (xn.cache_read_input_tokens ?? 0),
                  fr = CC(re, aE(N.options.mainLoopModel)) - Se;
                vSo({
                  querySource: a,
                  messages: [...re, ...Te],
                  cacheSafeParams: {
                    systemPrompt: n,
                    userContext: r,
                    systemContext: o,
                    toolUseContext: N,
                    forkContextMessages: re,
                    stickyBetas: M
                  },
                  armTrigger: "api_response",
                  estimateGapTokens: to - fr,
                  ...(a === "sdk" && {
                    promptScan: bbo([...re, ...Te])
                  })
                });
              }
            }
          }
        } catch (Nn) {
          if ($n) $n = !1, Cn = void 0, yield {
            type: "refusal_continuation",
            phase: "end"
          };
          if (Un !== void 0) {
            if (Tt.length > 0) Un.retractedMessageUuids = Tt.flatMap(Gr => ST([Gr]).filter(Gte).map(To => To.uuid));
            yield Un, Un = void 0;
          }
          if (Ze.length > 0) yield* Ze, Ze.length = 0;
          let cr = k[I + 1];
          if (Nn instanceof rN && cr !== void 0) {
            I++, D = void 0, O = void 0;
            let Gr = null,
              To = !1,
              rn = !1,
              Dn = !1;
            while (I < k.length) {
              let Ft = k[I],
                Wn = _ot(Ft, N.requestDialog);
              if (Wn) Dn = !0;
              let Pr = Wn ? Dme() : Ft;
              if (Wn && Pr !== null && a === "compact" && LAe(k[0], Pr)) Pr = null;
              if (Pr === Nn.originalModel) rn = !0;else if (Pr !== null) {
                Gr = Pr, To = Wn;
                break;
              }
              I++;
            }
            let Io = Gr === null && rn && (Nn.reason === "overloaded" || Nn.reason === "server_error");
            if (Io) Gr = Nn.originalModel;
            if (Dn && L) Pt("model_fable_consent", "chain_advance_substituted");
            if (Gr === null) throw Nn.originalError ?? Nn;
            if (To || Io) O = Gr;
            pt = Gr, ot = !0, R = !1;
            for (let Ft of Te) yield {
              type: "tombstone",
              message: Ft
            };
            for (let Ft of he) yield {
              type: "tombstone",
              message: Ft
            };
            Te.length = 0, he.length = 0, ye.length = 0, we = !1, Oe = !1;
            let Er = j6t(Fe, "chain_advance");
            if (Fe = new rTe(N.options.tools, s, N, p.now), Er) yield Er;
            if (N.options.mainLoopModel = pt, Io) {
              A(`chain advance collapsed onto the failed model ${pt}; re-dispatching in place with the full retry budget`);
              continue;
            }
            He("model_fallback"), W("tengu_model_fallback_triggered", {
              original_model: Nn.originalModel,
              fallback_model: pt,
              chain_index: I,
              query_source: Xg(a),
              reason: Le(Nn.reason),
              entrypoint: Ve("cli"),
              queryChainId: se,
              queryDepth: ne.depth
            }), yield {
              type: "system",
              subtype: "model_fallback",
              content: Nn.reason === "model_not_found" || Nn.reason === "permission_denied" || Nn.reason === "model_blocked" ? `Switched to ${Tp(pt)} because ${Tp(Nn.originalModel)} is not available` : yVp(Nn.reason, Tp(Nn.originalModel), Tp(pt), Nn.originalError),
              level: "warning",
              trigger: Nn.reason,
              originalModel: Nn.originalModel,
              fallbackModel: pt,
              isMeta: !1,
              timestamp: p.now(),
              uuid: p.uuid()
            };
            continue;
          }
          throw Nn;
        }
      }
    } catch (Et) {
      let Ze = Et instanceof Error ? Et.message : String(Et);
      if (W("tengu_query_error", {
        assistantMessages: Te.length,
        toolUses: Te.flatMap(Un => Un.message.content.filter(Tt => Tt.type === "tool_use")).length,
        queryChainId: se,
        queryDepth: ne.depth
      }), Et instanceof aot || Et instanceof hO) {
        A(`Query image error: ${Ze}`, {
          level: "error"
        });
        let Un = Hl({
          content: Et.message,
          error: "invalid_request",
          errorDetails: Et.message,
          now: p.now,
          uuid: p.uuid
        });
        return yield Un, Kce(N, a, Un), {
          reason: "image_error"
        };
      }
      if (Et instanceof rN && Et.reason === "model_blocked") {
        let Un = Hl({
          content: `${Tp(Et.originalModel)} is currently unavailable.`,
          error: "rate_limit",
          now: p.now,
          uuid: p.uuid
        });
        return yield Un, Kce(N, a, Un), {
          reason: "model_error",
          error: Et
        };
      }
      Ie(Et);
      let Gt = new Set(he.flatMap(Un => Un.type === "user" && Array.isArray(Un.message.content) ? Un.message.content.filter(Tt => Tt.type === "tool_result").map(Tt => Tt.tool_use_id) : []));
      yield* pVp(Te, Ze, p, Gt);
      let en = Hl({
        content: Ze,
        now: p.now,
        uuid: p.uuid
      });
      return yield en, Kce(N, a, en), V9("Query error", Et), {
        reason: "model_error",
        error: Et
      };
    }
    if (Te.some(Et => Et.message.content.some(Ze => Ze.type === "text" && Til(Ze.text)))) W("tengu_model_response_keyword_detected", {
      is_suggests_break: !0,
      queryChainId: se,
      queryDepth: ne.depth
    });
    if (Te.length > 0) Zol([...re, ...Te], n, r, o, N, a);
    if (N.abortController.signal.aborted) {
      for await (let Ze of Fe.getRemainingResults()) {
        if (kG(Ze)) {
          yield Ze;
          continue;
        }
        if (Ze.message) yield Ze.message;
      }
      if (!N.agentId) try {
        yield* CDe(N);
      } catch {}
      let Et = N.abortController.signal.reason;
      if (Et !== "interrupt" && Et !== "refusal-fallback-edit") yield HY({
        toolUse: !1,
        interruptedMessageId: g5t(N),
        now: p.now,
        uuidFn: p.uuid
      });
      return zce(N, a), {
        reason: "aborted_streaming"
      };
    }
    if (j) {
      let Et = await j;
      if (Et) yield Et;
    }
    if (m.transition?.reason === "malformed_tool_use_retry") {
      let Et = Te.at(-1);
      W("tengu_malformed_tool_use_retry_outcome", {
        model: Zf(pt),
        outcome: Le(Cil(ye.length, Et?.message.stop_reason ?? We, Et?.isApiErrorMessage)),
        clean_retry_enabled: m.transition.cleanRetry
      });
    }
    if (!we) {
      let Tt = function (Nn) {
          for (let cr = Nn.length - 1; cr >= 0; cr--) {
            let Gr = Nn[cr];
            if (Gr.type === "user") {
              if (Gr.isMeta || Vce(Gr)) continue;
              return !1;
            }
            if (Gr.type !== "assistant") continue;
            if (Gr.message.content.some(To => To.type === "tool_use" && To.name === Rp)) return !0;
          }
          return !1;
        },
        Et = Te.at(-1),
        Ze = Et?.type === "assistant" && Et.isApiErrorMessage && yge(Et),
        en = !(Hil !== null && Et?.type === "assistant" && Hil.isToolUseDeniedMessage(Et)) && DSo(Et),
        Un = Ze || en ? {
          ...N,
          abortController: lqi(N.abortController)
        } : N;
      if (Ze || en) {
        let Nn = Ebo(ue);
        if (!z && Nn >= PWn) {
          W("tengu_auto_compact_rapid_refill_breaker", {
            consecutiveRapidRefills: ue?.consecutiveRapidRefills ?? 0,
            turnsSincePreviousCompact: ue?.turnCounter ?? -1,
            queryChainId: se,
            queryDepth: ne.depth,
            reactive: !0
          });
          let Wn = Hl({
            content: Sbo,
            error: "invalid_request",
            now: p.now,
            uuid: p.uuid
          });
          return yield Wn, Kce(N, a, Wn), {
            reason: "rapid_refill_breaker"
          };
        }
        if (Et && PSo({
          hasAttempted: z,
          querySource: a,
          aborted: N.abortController.signal.aborted
        }) && p8i(re)) {
          let Wn = y1t(re),
            Pr = Wn.length,
            Go = en ? "image_error" : "prompt_too_long",
            {
              actualTokens: wt,
              limitTokens: xn
            } = n1t(Et.errorDetails ?? ""),
            gt = WA(Wn.flat()),
            to = wt !== void 0 ? Math.max(0, wt - gt) : void 0;
          W("tengu_ptl_surfaced_to_user", {
            reason: Le(Go),
            querySource: Xg(a),
            wasGatedByPriorAttempt: z,
            reactiveUnsupported: !Qz(),
            precomputedKind: Ve("not_consulted"),
            compactionImpossible: !0,
            totalGroups: Pr,
            overheadTokensEstimate: to
          });
          let fr = Go === "prompt_too_long" ? {
            ...Hl({
              content: H6i({
                actualTokens: wt,
                limitTokens: xn,
                conversationTokensEstimate: gt
              }),
              error: "invalid_request",
              errorDetails: Et.errorDetails,
              now: p.now,
              uuid: p.uuid
            }),
            requestId: Et.requestId,
            apiErrorStatus: Et.apiErrorStatus
          } : Et;
          return yield fr, wDe(fr, N), Kce(N, a, fr), {
            reason: Go
          };
        }
        let cr = performance.now(),
          Gr = Ze && Et ? pot(Et) : void 0,
          {
            outcome: To,
            swap: rn,
            emittedEarlyCompactStart: Dn
          } = yield* Xrt((Wn, Pr, Go) => kSo({
            toolUseContext: Wn,
            messages: re,
            trigger: "ptl",
            isWithheld413: Ze,
            hasAttemptedReactiveCompact: z,
            borrowFrom: le ? N.precomputeSourceKey : void 0,
            detectedAt: cr,
            querySource: a
          }), Un),
          {
            result: Io
          } = yield* Xrt((Wn, Pr, Go) => Y8n({
            hasAttempted: z,
            querySource: a,
            aborted: Un.abortController.signal.aborted,
            messages: re,
            cacheSafeParams: {
              systemPrompt: n,
              userContext: r,
              systemContext: o,
              toolUseContext: Wn,
              forkContextMessages: re,
              stickyBetas: M
            },
            precomputed: rn,
            precomputeOutcome: To,
            userWaitStartedAt: cr,
            initialTokenGap: Gr
          }), Un);
        if (Io) {
          if (e.taskBudget) {
            let Go = n7r(re);
            h = Math.max(0, (h ?? e.taskBudget.total) - Go);
          }
          for (let Go of Tbo(Io)) yield Go;
          let Wn = Iye(Io);
          ue = {
            compacted: !0,
            turnId: p.uuid(),
            turnCounter: 0,
            consecutiveFailures: 0,
            consecutiveRapidRefills: Nn
          }, m = {
            messages: Wn,
            toolUseContext: N,
            compactTracking: ue,
            maxOutputTokensRecoveryCount: G,
            hasAttemptedReactiveCompact: rn === void 0,
            thinkingOnlyNudged: J,
            maxOutputTokensOverride: void 0,
            pendingToolUseSummary: void 0,
            stopHookActive: X,
            stopHookBlockingCount: 0,
            turnCount: te,
            transition: {
              reason: rn ? "precomputed_compact_swap" : "reactive_compact_retry"
            }
          };
          continue;
        }
        if (Dn) yield {
          type: "compact_progress",
          event: {
            type: "compact_end"
          }
        }, yield {
          type: "sdk_status",
          status: null
        };
        let Er = en ? "image_error" : "prompt_too_long",
          Ft = a === "compact" || Hke(a);
        if (!N.abortController.signal.aborted && !Ft) W("tengu_ptl_surfaced_to_user", {
          reason: Le(Er),
          querySource: Xg(a),
          wasGatedByPriorAttempt: z,
          precomputedKind: Le(To.kind),
          precomputedFailureCause: Bo(To.kind === "failed" ? To.failure.cause : void 0),
          reactiveUnsupported: !Qz()
        });
        return yield Et, wDe(Et, N), Kce(N, a, Et), {
          reason: Er
        };
      }
      if (wil(Te, pt), Iil(Et)) {
        if (G < fVp) {
          let Nn = Mn({
            content: "Output token limit hit. Resume directly \u2014 no apology, no recap of what you were doing. " + "Pick up mid-thought if that is where the cut happened. Break remaining work into smaller pieces.",
            isMeta: !0,
            now: p.now,
            uuidFn: p.uuid
          });
          m = {
            messages: [...re, ...Te, Nn],
            toolUseContext: N,
            compactTracking: ue,
            maxOutputTokensRecoveryCount: G + 1,
            hasAttemptedReactiveCompact: z,
            thinkingOnlyNudged: J,
            maxOutputTokensOverride: void 0,
            pendingToolUseSummary: void 0,
            stopHookActive: X,
            stopHookBlockingCount: 0,
            turnCount: te,
            transition: {
              reason: "max_output_tokens_recovery",
              attempt: G + 1
            }
          };
          continue;
        }
        yield Et;
      }
      if ((Et?.message.stop_reason ?? We) === "tool_use" && ye.length === 0 && !Et?.isApiErrorMessage) {
        let Nn = m.transition?.reason !== "malformed_tool_use_retry",
          cr = bil();
        if (W("tengu_malformed_tool_use_response", {
          will_retry: Nn,
          model: pt,
          text_has_leaked_invoke: Eil(Te),
          clean_retry_enabled: cr
        }), Nn) {
          if (cr) for (let rn of Te) yield {
            type: "tombstone",
            message: rn
          };
          let To = Mn({
            content: cr ? "The previous response failed to produce a valid tool call. Please retry the tool call now." : "Your tool call was malformed and could not be parsed. Please retry.",
            isMeta: !0,
            now: p.now,
            uuidFn: p.uuid
          });
          yield To, m = {
            messages: cr ? [...re, To] : [...re, ...Te, To],
            toolUseContext: N,
            compactTracking: ue,
            maxOutputTokensRecoveryCount: 0,
            hasAttemptedReactiveCompact: !1,
            maxOutputTokensOverride: void 0,
            pendingToolUseSummary: void 0,
            stopHookActive: X,
            thinkingOnlyNudged: J,
            stopHookBlockingCount: 0,
            turnCount: te,
            transition: {
              reason: "malformed_tool_use_retry",
              cleanRetry: cr
            }
          };
          continue;
        }
        let Gr = Hl({
          content: "The model's tool call could not be parsed (retry also failed).",
          now: p.now,
          uuid: p.uuid
        });
        return yield Gr, wDe(Gr, N), Kce(N, a, Gr), {
          reason: "completed"
        };
      }
      let Cn = Et?.message.stop_reason ?? We;
      if ((Cn === "end_turn" || Cn === "stop_sequence") && !Et?.isApiErrorMessage && a !== "compact" && !Hke(a) && !pFa(re) && !Te.some(Nn => Nn.message.content.some(cr => cr.type === "text" && cr.text.trim().length > 0)) && !Tt(re)) {
        if (!J) {
          Pt("query_thinking_only_response", "nudged");
          let Nn = Mn({
            content: "[Your previous response had no visible output. Please continue and produce a user-visible response.]",
            isMeta: !0,
            now: p.now,
            uuidFn: p.uuid
          });
          yield Nn, m = {
            messages: [...re, Nn],
            toolUseContext: N,
            compactTracking: ue,
            maxOutputTokensRecoveryCount: G,
            hasAttemptedReactiveCompact: z,
            thinkingOnlyNudged: !0,
            maxOutputTokensOverride: void 0,
            pendingToolUseSummary: void 0,
            stopHookActive: X,
            stopHookBlockingCount: 0,
            turnCount: te,
            transition: {
              reason: "thinking_only_retry"
            }
          };
          continue;
        }
        xe("query_thinking_only_response", "nudge_exhausted");
      } else if (J) He("query_thinking_only_response");
      if (Et?.isApiErrorMessage) {
        if (iTe && vDe() && Ws() && a.startsWith("repl_main_thread") && !N.agentId) {
          let Nn = _W(Et) ?? Et.errorDetails ?? "";
          await iTe().markApiFailure(vDe(), eb(), Et.error, Nn);
        }
        return wDe(Et, N), {
          reason: "completed"
        };
      }
      let $n = yield* ail(re, Te, n, r, o, N, a, X, M, vDe());
      if (ee > 0 && $n.blockingErrors.length === 0) W("tengu_stop_hook_block_count", {
        count: ee,
        is_subagent: Boolean(N.agentId),
        hit_max_turns: !1,
        hit_cap: !1
      });
      if ($n.preventContinuation) return {
        reason: "stop_hook_prevented"
      };
      if ($n.blockingErrors.length > 0) {
        let Nn = te + 1,
          cr = ee + 1;
        if (c && Nn > c) return W("tengu_stop_hook_block_count", {
          count: cr,
          is_subagent: Boolean(N.agentId),
          hit_max_turns: !0,
          hit_cap: !1
        }), yield ti({
          type: "max_turns_reached",
          maxTurns: c,
          turnCount: Nn
        }, p), {
          reason: "max_turns",
          turnCount: Nn
        };
        let Gr = parseInt(process.env.CLAUDE_CODE_STOP_HOOK_BLOCK_CAP ?? "", 10),
          To = Number.isNaN(Gr) ? 8 : Gr;
        if (To > 0 && cr > To) return W("tengu_stop_hook_block_count", {
          count: cr,
          is_subagent: Boolean(N.agentId),
          hit_max_turns: !1,
          hit_cap: !0
        }), yield wc(`A hook blocked the turn from ending ${cr} consecutive times \u2014 overriding and ending turn. ` + "For Stop/SubagentStop hooks, check stop_hook_active in the input and return success while it's true. Set CLAUDE_CODE_STOP_HOOK_BLOCK_CAP to raise this limit.", "warning"), {
          reason: "completed"
        };
        m = {
          messages: [...re, ...Te, ...$n.blockingErrors],
          toolUseContext: N,
          compactTracking: ue,
          maxOutputTokensRecoveryCount: 0,
          hasAttemptedReactiveCompact: z,
          maxOutputTokensOverride: void 0,
          pendingToolUseSummary: void 0,
          stopHookActive: !0,
          thinkingOnlyNudged: J,
          stopHookBlockingCount: cr,
          turnCount: Nn,
          transition: {
            reason: "stop_hook_blocking"
          }
        };
        continue;
      }
      return {
        reason: "completed"
      };
    }
    let _n = !1,
      Rn = !1,
      on = N;
    kp("query_tool_execution_start");
    let En = Fe.getRemainingResults();
    for await (let Et of En) {
      if (kG(Et)) {
        yield Et;
        continue;
      }
      if (Et.message) {
        if (yield Et.message, Et.message.type === "attachment" && Et.message.attachment.type === "hook_stopped_continuation") _n = !0;
        if (Et.message.type === "attachment" && Et.message.attachment.type === "hook_deferred_tool") Rn = !0;
        let Ze = Lyo(Et.message);
        if (Ze) Oe = Ze;
        if (!_5t(Et.message)) {
          let Gt = Kk([Et.message], on.options.refreshTools?.() ?? on.options.tools, N.options.mainLoopModel);
          JMt(Gt, gg(N.options.mainLoopModel).maxBase64Size), he.push(...Gt.filter(en => en.type === "user"));
        }
      }
      if (Et.newContext) on = {
        ...Et.newContext,
        queryTracking: ne
      };
    }
    kp("query_tool_execution_end");
    let Qn;
    if (g.gates.emitToolUseSummaries && ye.length > 0 && !N.abortController.signal.aborted && !N.agentId) {
      let Et = Te.at(-1),
        Ze;
      if (Et) {
        let Un = Et.message.content.filter(Tt => Tt.type === "text");
        if (Un.length > 0) {
          let Tt = Un.at(-1);
          if (Tt && "text" in Tt) Ze = Tt.text;
        }
      }
      let Gt = ye.map(Un => Un.id),
        en = ye.map(Un => {
          let Tt = he.find($n => $n.type === "user" && Array.isArray($n.message.content) && $n.message.content.some(Nn => Nn.type === "tool_result" && Nn.tool_use_id === Un.id)),
            Cn = Tt?.type === "user" && Array.isArray(Tt.message.content) ? Tt.message.content.find($n => $n.type === "tool_result" && $n.tool_use_id === Un.id) : void 0;
          return {
            name: Un.name,
            input: Un.input,
            output: Cn && "content" in Cn ? Cn.content : null
          };
        });
      Qn = $ol({
        tools: en,
        signal: N.abortController.signal,
        isNonInteractiveSession: N.options.isNonInteractiveSession,
        lastAssistantText: Ze,
        agentContext: N.agentContext
      }).then(Un => {
        if (Un) return Pil(Un, Gt);
        return null;
      }).catch(() => null);
    }
    if (N.abortController.signal.aborted) {
      if (!N.agentId) try {
        yield* CDe(N);
      } catch {}
      if (N.abortController.signal.reason !== "interrupt") yield HY({
        toolUse: !0,
        interruptedMessageId: g5t(N),
        now: p.now,
        uuidFn: p.uuid
      });
      let Et = te + 1;
      if (c && Et > c) yield ti({
        type: "max_turns_reached",
        maxTurns: c,
        turnCount: Et
      }, p);
      return zce(N, a), {
        reason: "aborted_tools"
      };
    }
    if (Rn) return zce(N, a), {
      reason: "tool_deferred"
    };
    if (_n) return zce(N, a), {
      reason: "hook_stopped"
    };
    if (Oe) return yield* mVp({
      endTurnSource: Oe,
      messagesForQuery: re,
      assistantMessages: Te,
      toolResults: he,
      toolUseBlocks: ye,
      systemPrompt: n,
      userContext: r,
      systemContext: o,
      toolUseContext: N,
      updatedToolUseContext: on,
      querySource: a,
      stopHookActive: X,
      stickyBetas: M,
      queryChainIdForAnalytics: se,
      queryDepth: ne.depth,
      deps: p
    }), {
      reason: "completed"
    };
    if (ye.length === 1 && ye[0].name === $h && GQ(So(N.options.mainLoopModel))) {
      let Et = ye[0].input.prompt;
      if (_R().some(Ze => Ze.kind === "loop" && Ze.prompt === Et)) return W("tengu_loop_dynamic_wakeup_ends_turn", {
        queryChainId: se,
        queryDepth: ne.depth
      }), zce(N, a), yield* mbo(re, Te, he, n, r, o, N, a, X, M, vDe()), {
        reason: "completed"
      };
    }
    if (ue?.compacted) ue.turnCounter++, W("tengu_post_autocompact_turn", {
      turnId: ue.turnId,
      turnCounter: ue.turnCounter,
      queryChainId: se,
      queryDepth: ne.depth
    });
    if (W("tengu_query_before_attachments", {
      messagesForQueryCount: re.length,
      assistantMessagesCount: Te.length,
      toolResultsCount: he.length,
      queryChainId: se,
      queryDepth: ne.depth
    }), uL("PostToolBatch", on.getAppState(), on.agentId ?? It())) {
      let Et = `hook-${p.uuid()}`,
        Ze = new Map();
      for (let Un of he) if (Un.type === "user" && Array.isArray(Un.message.content)) {
        for (let Tt of Un.message.content) if (Tt.type === "tool_result") Ze.set(Tt.tool_use_id, Tt.content);
      }
      let Gt = !1,
        en;
      for await (let Un of lft(ye.map(Tt => ({
        tool_name: Tt.name,
        tool_input: Tt.input,
        tool_use_id: Tt.id,
        tool_response: Ze.get(Tt.id)
      })), Et, on, Mr(on).mode, on.abortController.signal)) {
        if (Un.message && !(Un.message.type === "attachment" && Un.message.attachment.type === "hook_blocking_error")) yield Un.message;
        if (Un.additionalContexts && Un.additionalContexts.length > 0) {
          let Tt = ti({
            type: "hook_additional_context",
            content: Un.additionalContexts,
            hookName: "PostToolBatch",
            toolUseID: Et,
            hookEvent: "PostToolBatch"
          }, p);
          yield Tt, he.push(Tt);
        }
        if (Un.blockingError) Gt = !0, en ??= Un.blockingError.blockingError;
        if (Un.preventContinuation) Gt = !0, en ??= Un.stopReason;
      }
      if (on.abortController.signal.aborted) {
        if (!on.agentId) try {
          yield* CDe(on);
        } catch {}
        if (on.abortController.signal.reason !== "interrupt") yield HY({
          toolUse: !1,
          interruptedMessageId: g5t(on),
          now: p.now,
          uuidFn: p.uuid
        });
        return zce(on, a), {
          reason: "aborted_tools"
        };
      }
      if (Gt) return yield ti({
        type: "hook_stopped_continuation",
        message: en || "Execution stopped by PostToolBatch hook",
        hookName: "PostToolBatch",
        toolUseID: Et,
        hookEvent: "PostToolBatch"
      }, p), zce(on, a), {
        reason: "hook_stopped"
      };
    }
    let pr = a.startsWith("repl_main_thread") || a === "sdk",
      Jt = N.agentId,
      Ee = N.messageQueue.getCommandsByMaxPriority("next").filter(Et => {
        if (U8i(Et)) return !1;
        if (pr) return wI(Et);
        return Et.mode === "task-notification" && Et.agentId === Jt;
      });
    for await (let Et of X6e(null, on, null, Ee, p, [...re, ...Te, ...he], a)) yield Et, he.push(Et);
    let Re = Ee.filter(Et => Et.mode === "prompt" || Et.mode === "task-notification");
    if (Re.length > 0) {
      for (let Et of Re) if (Et.uuid) t.push(Et.uuid), yield {
        type: "command_lifecycle",
        uuid: Et.uuid,
        state: "started"
      };
      N.messageQueue.remove(Re);
    }
    if (_ && _.settledAt !== null && _.consumedOnIteration === -1) {
      let Et = Abo(await _.promise, N.readFileState);
      for (let Ze of Et) {
        let Gt = ti(Ze, p);
        yield Gt, he.push(Gt);
      }
      _.consumedOnIteration = te - 1;
    }
    let Ke = zn(he, Et => Et.type === "attachment" && Et.attachment.type === "edited_text_file");
    if (W("tengu_query_after_attachments", {
      totalToolResultsCount: he.length,
      fileChangeAttachmentCount: Ke,
      queryChainId: se,
      queryDepth: ne.depth
    }), on.options.refreshTools) {
      let Et = on.options.refreshTools();
      if (Et !== on.options.tools) {
        let Ze = zn(on.options.tools, en => !!en.mcpInfo),
          Gt = zn(Et, en => !!en.mcpInfo);
        if (Ze !== Gt) W("tengu_mcp_tools_refreshed_mid_turn", {
          oldMcpCount: Ze,
          newMcpCount: Gt,
          recovered: Ze === 0 && Gt > 0
        });
        on = {
          ...on,
          options: {
            ...on.options,
            tools: Et
          }
        };
      }
    }
    if (on.options.refreshMcpClients) {
      let Et = on.options.refreshMcpClients();
      on = {
        ...on,
        options: {
          ...on.options,
          mcpClients: Et
        }
      };
    }
    let Je = {
        ...on,
        queryTracking: ne
      },
      Rt = te + 1;
    if (c && Rt > c) return yield ti({
      type: "max_turns_reached",
      maxTurns: c,
      turnCount: Rt
    }, p), zce(N, a), {
      reason: "max_turns",
      turnCount: Rt
    };
    kp("query_recursive_call"), m = {
      messages: [...re, ...Te, ...he],
      toolUseContext: Je,
      compactTracking: ue,
      turnCount: Rt,
      maxOutputTokensRecoveryCount: 0,
      hasAttemptedReactiveCompact: !1,
      thinkingOnlyNudged: !1,
      pendingToolUseSummary: Qn,
      maxOutputTokensOverride: void 0,
      stopHookActive: X,
      stopHookBlockingCount: 0,
      transition: {
        reason: "next_turn"
      }
    };
  }
}
/**
 * True when two models share the same canonical name (after resolving any
 * user-specified alias), i.e. they are effectively the same model. Used to
 * decide whether the configured advisor model can advise the attempt model.
 * (v185: `O9p`.)
 */
function _Vp(e, t) {
  return So(Qo(e)) === So(Qo(t));
}
/**
 * Builds the user-facing "Switched to X" banner text for a model fallback,
 * branching on the fallback reason. For `last_resort` it appends a truncated
 * (300-char) rendering of the underlying error. (v185: `L9p`.)
 * @param e reason
 * @param t fromModel (rendered name)
 * @param n toModel (rendered name)
 * @param r underlying error (for last_resort)
 */
function yVp(e, t, n, r) {
  switch (e) {
    case "overloaded":
    case "server_error":
      return `Switched to ${n} due to high demand for ${t}`;
    case "last_resort":
      {
        let o = r instanceof Error ? r.message : r !== void 0 ? String(r) : "",
          s = o.length > 300 ? `${o.slice(0, 300)}\u2026` : o;
        return `Switched to ${n} because ${t} returned an error that could not be retried${s ? ` (${s})` : ""}`;
      }
  }
}
/**
 * Index of the message at which the current turn starts: the last real user
 * message (skipping meta, tool-result and compact-summary messages); 0 if none.
 * (v185: `M9p`.)
 */
function TVp(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (n.type === "user" && !n.isMeta && !n.toolUseResult && !n.isCompactSummary) return t;
  }
  return 0;
}
/** Lazily-bound tool-denial helper (v185: `$Za`); stays null until module init. */
var Hil = null,
  /** Lazy accessor for the classifier-job-state factory (v185: `F_e`). */
  iTe = () => (kWn(), oo(wWn)),
  /** Memoised classifier job state cached by `vDe` (v185: `vho`). */
  ybo,
  /** Max number of max_output_tokens recovery attempts per turn (v185: `I9p`). */
  fVp = 3;
var xye = b(() => {
  Q3e();
  f1();
  dee();
  bot();
  sIn();
  p6e();
  Szr();
  j8n();
  kt();
  mn();
  vu();
  IA();
  vHn();
  f4();
  Cp();
  ri();
  Ct();
  vn();
  qHe();
  kD();
  qe();
  eO();
  po();
  fW();
  qol();
  S8e();
  GA();
  MSo();
  lt();
  Pf();
  vd();
  ef();
  xot();
  V6t();
  Ro();
  yte();
  nj();
  lWn();
  z6t();
  yot();
  ej();
  Ir();
  t1();
  g1();
  esl();
  Wd();
  b3t();
  Nyo();
  tsl();
  nsl();
  Cmt();
  d8e();
  HI();
  _a();
  lil();
  pil();
  hil();
  lt();
  gil();
  lh();
  _bo();
  Tu();
  sge();
  MO();
  xl();
  Ail();
  kil();
});
export {vDe,dVp,pVp,zce,g5t,mVp,Kce,Iil,hVp,jq,gVp,_Vp,yVp,TVp,Hil,iTe,ybo,fVp,xye};
