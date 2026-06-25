// @ts-nocheck
import {E5t as J4t,Mn as Ln,_W as rW,W6t as g4t,NE as xE,xD as _P,P_ as allTools,Kk as kk,po as lo} from "../tools/5224_userPromptCount.ts";
import {kot as Ent} from "../../vendor/m2784.ts";
import {pot as ant,rB as OF,_1 as sN,kD as fP} from "../api/2754_actualTokens.ts";
import {WA as Nv,fW as Z5} from "../api/4438_type.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {cleanMessagesForLogging,reAppendSessionMetadata,_a as ja} from "./5175_writeRemoteAgentMetadata.ts";
import {uFt as DMt,lFt as HMt,Z9e as V$e,Z4 as Nq} from "../agent/3198_code.ts";
import {xe as Oe,He as Ie,Pt as isTmuxControlMode,mn as ln} from "../telemetry/0600_feature_name.ts";
import {CC as SC,Zz as wz,yae as Sae,g1 as oN} from "../core/2741_input_tokens.ts";
import {wot as bnt,pIn as RRn} from "../../vendor/m2782.ts";
import {Mr as Fr,Kh as Fh,xl as Ql} from "../../vendor/m4427.ts";
import {executePreCompactHooks,executePostCompactHooks} from "../../vendor/m5188.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,jn as zn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {gIn as IRn,T1t as UOt,f8i as E$i,hIn as HRn,fIn as kRn,bzr as q5r} from "../../vendor/m2785.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {Ve as Qe,Le as fromEnum,Bo as fromEnumOpt} from "../../vendor/m5.ts";
import {TeamDeleteToolName as Le,tn as Xt} from "../config/0230_encoding.ts";
import {L4 as hq,t9e as Y2e} from "../../vendor/m2781.ts";
import {PMt as eOt,Gk as xk} from "../../vendor/m2727.ts";
import {z$e as $2e} from "../../vendor/m2765.ts";
import {getDeferredToolsDeltaAttachment,createAttachmentMessage,getAgentListingDeltaAttachment,getMcpInstructionsDeltaAttachment,generateFileAttachment,GA as Bv} from "../agent/4451_tryGetPDFReference.ts";
import {gW as nW,jke as lxe} from "../../vendor/m2780.ts";
import {extractDiscoveredToolNames,isToolSearchEnabled,sj as Hz} from "../tools/4436_summarizeByServerPrefix.ts";
import {Nm as qf,D_ as ry} from "../agent/2784_withFileTypes.ts";
import {gw as ox,fMt as MPt,$A as Lv} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {Xg as Fg,dUe as fFe} from "../agent/2193_kind.ts";
import {$0 as E0,Cp as Om} from "../config/2223_level.ts";
import {XHn as pRn,JHn as dRn,Y7r as h5r} from "../core/2768_toolRequests.ts";
import {Ie as De,vn as Rn} from "../session/0621_length.ts";
import {ij as Iz,u1t as IOt,Gke as oxe} from "../mcp/2775_pendingChanges.ts";
import {markPostCompaction,l0 as $I,getStickyBetas,getInvokedSkillsForAgent,lt} from "../session/0132_sent.ts";
import {Iwe as Kwe,oS as uS} from "../config/2605_event_name.ts";
import {EX as CX,Ce as Se,Ct as bt} from "../../vendor/m197.ts";
import {VA as Fv,RE as bC} from "../session/2796_uuid.ts";
import {swapShrinksContextWindow,getFableDeclineFallbackModel,renderModelName,Ro as Mo} from "./1458_swapShrinksContextWindow.ts";
import {eel as MKa,ZZa as LKa,W5e as g6e} from "../config/4324_activityCallback.ts";
import {runForkedAgent,ID as gP} from "../artifact/4427_withDisallowedCommandTools.ts";
import {q0t as Akt,GS as jS} from "../api/2028_used.ts";
import {pge as ehe,smt as odt,rb} from "./5211_level.ts";
import {zn as Wn} from "../api/0465_getOauthConfig.ts";
import {aS as mS,uee as mee} from "../../vendor/m2762.ts";
import {hh as gh,ace as Rce} from "../tools/4441_tabAwareSeparator.ts";
import {ToolSearchTool,YHn as uRn} from "../tools/2767_outputSchema.ts";
import {_ot as pnt,yot as mnt} from "../../vendor/m2764.ts";
import {vc as Wc} from "../api/3886_level.ts";
import {h9n as FFn,Cdo as Uso} from "../../vendor/m3969.ts";
import {rN as RU,WWn as C6n} from "../../vendor/m4429.ts";
import {Zf as ky,tet as eQe} from "../mcp/2200_mcpServerName.ts";
import {xr as Br,QT as WS} from "../../vendor/m1461.ts";
import {hs as Ds,Tu as Iu} from "../../vendor/m649.ts";
import {pm as $f,l1 as HF} from "../core/2694_l1.ts";
import {VD as DP,GD as IP,Dw as yx} from "../core/5176_encoding.ts";
import {gf as mh,wE as vC} from "../../vendor/m5177.ts";
import {_En as Oyn,vs as Ws,dm as ef} from "../../vendor/m2256.ts";
import {Zil as del,eal as pel} from "../../vendor/m4428.ts";
import {getMemoryPath,tr as Qn} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {b} from "../../runtime.ts";
import {Wd as yp} from "../tools/5204_shouldSkipHookDueToTrust.ts";
function Z9p(e) {
  if (e.type === "queued_command" && Array.isArray(e.prompt) && e.prompt.some(t => t.type === "image" || t.type === "document")) return {
    ...e,
    prompt: e.prompt.map(t => t.type === "image" ? {
      type: "text",
      text: "[image]"
    } : t.type === "document" ? {
      type: "text",
      text: "[document]"
    } : t)
  };
  if (e.type === "file" && (e.content.type === "image" || e.content.type === "notebook" || e.content.type === "parts")) return {
    ...e,
    content: {
      type: "text",
      file: {
        filePath: e.filename,
        content: `[${e.content.type}]`,
        numLines: 1,
        startLine: 1,
        totalLines: 1
      }
    }
  };
  return e;
}
function W5r(e) {
  return e.map(t => {
    if (t.type === "attachment") {
      let s = Z9p(t.attachment);
      return s === t.attachment ? t : {
        ...t,
        attachment: s
      };
    }
    if (t.type !== "user") return t;
    let n = t.message.content;
    if (!Array.isArray(n)) return t;
    let r = !1,
      o = n.flatMap(s => {
        if (s.type === "image") return r = !0, [{
          type: "text",
          text: "[image]"
        }];
        if (s.type === "document") return r = !0, [{
          type: "text",
          text: "[document]"
        }];
        if (s.type === "tool_result" && Array.isArray(s.content)) {
          let i = !1,
            a = s.content.map(l => {
              if (l.type === "image") return i = !0, {
                type: "text",
                text: "[image]"
              };
              if (l.type === "document") return i = !0, {
                type: "text",
                text: "[document]"
              };
              return l;
            });
          if (i) return r = !0, [{
            ...s,
            content: a
          }];
        }
        return [s];
      });
    if (!r) return t;
    return {
      ...t,
      message: {
        ...t.message,
        content: o
      }
    };
  });
}
function e3p(e) {
  return e.filter(t => t.type !== "attachment" || t.attachment.type === "queued_command");
}
function hel(e) {
  if (e.length <= mel) return e;
  let t = mel,
    n = e.charCodeAt(t - 1);
  if (n >= 55296 && n <= 56319) t--;
  return `${e.slice(0, t)}\u2026[truncated, original ${e.length} chars]`;
}
function $ho(e) {
  if (typeof e === "string") return hel(e);
  if (Array.isArray(e)) {
    let t = e.map($ho);
    return t.some((n, r) => n !== e[r]) ? t : e;
  }
  if (typeof e === "object" && e !== null) {
    let t = e,
      n = !1,
      r = {};
    for (let [o, s] of Object.entries(t)) {
      let i = $ho(s);
      if (i !== s) n = !0;
      r[o] = i;
    }
    return n ? r : e;
  }
  return e;
}
function t3p(e) {
  return e.map(t => {
    if (t.type === "assistant") {
      let n = t.message.content;
      if (!Array.isArray(n)) return t;
      let r = n.some(J4t),
        o = (r ? n.filter(s => !J4t(s)) : n).map(s => {
          if (s.type !== "tool_use") return s;
          let i = $ho(s.input);
          if (i === s.input) return s;
          return r = !0, {
            ...s,
            input: i
          };
        });
      if (!r) return t;
      return {
        ...t,
        message: {
          ...t.message,
          content: o
        }
      };
    }
    if (t.type === "user") {
      let n = t.message.content;
      if (!Array.isArray(n)) return t;
      let r = !1,
        o = n.map(s => {
          if (s.type !== "tool_result") return s;
          let i = typeof s.content === "string" ? s.content : Array.isArray(s.content) ? s.content.map(l => l.type === "text" ? l.text : "").join("") : "",
            a = hel(i);
          if (s.content === a) return s;
          return r = !0, {
            ...s,
            content: a
          };
        });
      if (!r) return t;
      return {
        ...t,
        message: {
          ...t.message,
          content: o
        }
      };
    }
    return t;
  });
}
function _el(e, t) {
  let n = e[0]?.type === "user" && e[0].isMeta && e[0].message.content === fel ? e.slice(1) : e,
    r = Ent(n);
  if (r.length < 2) return null;
  let o = ant(t),
    s;
  if (o !== void 0) {
    let a = 0;
    s = 0;
    for (let l of r) if (a += Nv(l), s++, a >= o) break;
  } else s = Math.max(1, Math.floor(r.length * 0.2));
  if (s = Math.min(s, r.length - 1), s < 1) return null;
  let i = r.slice(s).flat();
  if (i[0]?.type === "assistant") return [Ln({
    content: fel,
    isMeta: !0
  }), ...i];
  return i;
}
function w6n(e, t, n) {
  if (!e.blockedBy) return;
  if (logForDebugging(`Compaction blocked by PreCompact hook: ${e.blockedBy}`, {
    level: "warn"
  }), !n?.suppressNotification) t?.({
    key: "compaction-blocked-by-hook",
    text: "compaction blocked by PreCompact hook",
    priority: "immediate",
    color: "warning"
  });
  throw new j6(`${Gut}: ${e.blockedBy}`);
}
function c_e(e) {
  return [e.boundaryMarker, ...e.summaryMessages, ...e.messagesToKeep, ...e.attachments, ...e.hookResults];
}
function who(e) {
  return [e.boundaryMarker, ...e.summaryMessages, ...e.attachments, ...e.hookResults];
}
function WAo(e, t, n, r = n) {
  let o = n.map(i => i.uuid),
    s = cleanMessagesForLogging([...n], r).map(i => i.uuid);
  if (o.length === 0) return e;
  return {
    ...e,
    compactMetadata: {
      ...e.compactMetadata,
      ...(s.length > 0 && {
        preservedSegment: {
          headUuid: s[0],
          anchorUuid: t,
          tailUuid: s.at(-1)
        }
      }),
      preservedMessages: {
        anchorUuid: t,
        uuids: s,
        allUuids: o
      }
    }
  };
}
function qho(e, t) {
  if (!t) return e || void 0;
  if (!e) return t;
  return `${e}

${t}`;
}
async function Vut(e, t, n, r, o, s = !1, i, a = !1, l, c, u) {
  let d = s ? "compact_auto" : "compact_manual",
    p,
    m,
    f,
    A = performance.now(),
    h = DMt("claude_code.compaction", {
      spanType: "compaction",
      attrs: {
        trigger: s ? "auto" : "manual",
        message_count: e.length
      }
    });
  try {
    if (e.length === 0) throw Oe(d, "compact_not_enough_messages"), Error(cpt);
    m = SC(e);
    let g = t.getAppState();
    bnt(Fr(t), "summary"), t.onCompactEvent?.({
      type: "compact_progress",
      event: {
        type: "hooks_start",
        hookType: "pre_compact"
      }
    }), t.onCompactEvent?.({
      type: "sdk_status",
      status: "compacting"
    });
    let _ = await executePreCompactHooks({
      trigger: s ? "auto" : "manual",
      customInstructions: o ?? null
    }, t.abortController.signal);
    w6n(_, c, {
      suppressNotification: s
    }), o = qho(o, _.newCustomInstructions);
    let y = _.userDisplayMessage;
    t.onCompactEvent?.({
      type: "stream_mode",
      mode: "requesting"
    }), u?.({
      type: "response_length",
      op: "reset"
    }), t.onCompactEvent?.({
      type: "compact_progress",
      event: {
        type: "compact_start",
        hintText: l
      }
    });
    let T = !a && getFeatureValue_CACHED_MAY_BE_STALE("tengu_compact_cache_prefix", !0),
      S = IRn(o),
      v = Ln({
        content: S
      }),
      R = e,
      k = n,
      x,
      H,
      I = 0;
    for (;;) {
      if (x = await Sel({
        messages: R,
        summaryRequest: v,
        appState: g,
        context: t,
        preCompactTokenCount: m,
        cacheSafeParams: k,
        stripNonEssential: a,
        onResponseLength: u
      }), H = rW(x), !H?.startsWith(OF)) break;
      I++;
      let he = I <= gel ? _el(R, x) : null;
      if (!he) throw logEvent("tengu_compact_failed", {
        reason: Qe("prompt_too_long"),
        preCompactTokenCount: m,
        promptCacheSharingEnabled: T,
        ptlAttempts: I
      }), Oe(d, "compact_prompt_too_long"), Error(v6n);
      logEvent("tengu_compact_ptl_retry", {
        attempt: I,
        droppedMessages: R.length - he.length,
        remainingMessages: he.length
      }), R = he, k = {
        ...k,
        forkContextMessages: he
      };
    }
    if (!H) throw logForDebugging(`Compact failed: no summary text in response. Response: ${Le(x)}`, {
      level: "error"
    }), logEvent("tengu_compact_failed", {
      reason: Qe("no_summary"),
      preCompactTokenCount: m,
      promptCacheSharingEnabled: T
    }), Oe(d, "compact_no_summary"), new j6("Failed to generate conversation summary - response did not contain valid text content");else if (x.isApiErrorMessage || sN(H)) throw logEvent("tengu_compact_failed", {
      reason: Qe("api_error"),
      errorPrefix: hq(H).slice(0, 60),
      preCompactTokenCount: m,
      promptCacheSharingEnabled: T
    }), Oe(d, "compact_api_error"), Error(H);
    let P = eOt(t.readFileState);
    if (t.readFileState.clear(), t.loadedNestedMemoryPaths) for (let he of Object.keys(t.loadedNestedMemoryPaths)) delete t.loadedNestedMemoryPaths[he];
    $2e(t.memorySelector);
    let [L, D] = await Promise.all([Pqn(P, t, Dqn), Nqn(t)]),
      N = [...L, ...D],
      O = Oqn(t.agentId);
    if (O) N.push(O);
    let $ = await Mqn(t);
    if ($) N.push($);
    let U = Lqn(t.agentId);
    if (U) N.push(U);
    for (let he of getDeferredToolsDeltaAttachment(t.options.tools, t.options.mainLoopModel, [], {
      callSite: "compact_full"
    })) N.push(createAttachmentMessage(he));
    for (let he of getAgentListingDeltaAttachment(t, [])) N.push(createAttachmentMessage(he));
    for (let he of getMcpInstructionsDeltaAttachment(t.options.mcpClients, t.options.tools, t.options.mainLoopModel, [])) N.push(createAttachmentMessage(he));
    t.onCompactEvent?.({
      type: "compact_progress",
      event: {
        type: "hooks_start",
        hookType: "session_start"
      }
    });
    let W = await nW("compact", {
        model: t.options.mainLoopModel
      }),
      G = Math.round(performance.now() - A),
      V = g4t(s ? "auto" : "manual", m ?? 0, e.at(-1)?.uuid),
      Q = extractDiscoveredToolNames(e);
    if (Q.size > 0) V.compactMetadata.preCompactDiscoveredTools = [...Q].sort();
    let K = qf(),
      Y = ox() && MPt(t.getReplContexts(), t.agentId),
      J = [Ln({
        content: UOt(H, r, K, void 0, Y),
        isCompactSummary: !0,
        isVisibleInTranscriptOnly: !0
      })],
      ee = wz([x]),
      te = Nv([V, ...J, ...N, ...W]);
    V.compactMetadata.postTokens = te, V.compactMetadata.durationMs = G, f = te;
    let ne = Sae(x),
      re = Fg(i?.querySource ?? t.options.querySource) ?? "unknown",
      oe = E0(t.options.mainLoopModel, Fh(t));
    if (logEvent("tengu_compact", {
      preCompactTokenCount: m,
      stripNonEssential: a,
      postCompactTokenCount: ee,
      truePostCompactTokenCount: te,
      autoCompactThreshold: i?.autoCompactThreshold ?? -1,
      willRetriggerNextTurn: i !== void 0 && te >= i.autoCompactThreshold,
      isAutoCompact: s,
      ...(oe && {
        effort_level: fromEnum(oe)
      }),
      querySource: re,
      queryChainId: t.queryTracking?.chainId ?? "",
      queryDepth: t.queryTracking?.depth ?? -1,
      isRecompactionInChain: i?.isRecompactionInChain ?? !1,
      turnsSincePreviousCompact: i?.turnsSincePreviousCompact ?? -1,
      previousCompactTurnId: i?.previousCompactTurnId ?? "",
      compactionInputTokens: ne?.input_tokens,
      compactionOutputTokens: ne?.output_tokens,
      compactionCacheReadTokens: ne?.cache_read_input_tokens ?? 0,
      compactionCacheCreationTokens: ne?.cache_creation_input_tokens ?? 0,
      compactionTotalTokens: ne ? ne.input_tokens + (ne.cache_creation_input_tokens ?? 0) + (ne.cache_read_input_tokens ?? 0) + ne.output_tokens : 0,
      promptCacheSharingEnabled: T,
      ...(() => {
        try {
          return pRn(dRn(e));
        } catch (he) {
          return De(he), {};
        }
      })()
    }), Iz()) IOt(i?.querySource ?? "compact", t.agentId);
    if (fFe(i?.querySource)) markPostCompaction(), reAppendSessionMetadata();
    t.onCompactEvent?.({
      type: "compact_progress",
      event: {
        type: "hooks_start",
        hookType: "post_compact"
      }
    });
    let ue = await executePostCompactHooks({
        trigger: s ? "auto" : "manual",
        compactSummary: H
      }, t.abortController.signal),
      ae = [y, ue.userDisplayMessage].filter(Boolean).join(`
`);
    return Ie(d), {
      boundaryMarker: V,
      summaryMessages: J,
      messagesToKeep: [],
      attachments: N,
      hookResults: W,
      userDisplayMessage: ae || void 0,
      preCompactTokenCount: m,
      postCompactTokenCount: ee,
      truePostCompactTokenCount: te,
      compactionUsage: ne
    };
  } catch (g) {
    if (p = g instanceof Error ? g.message : "compaction failed", !s) Tel(g, c);
    throw g;
  } finally {
    if (t.onCompactEvent?.({
      type: "stream_mode",
      mode: "requesting"
    }), u?.({
      type: "response_length",
      op: "reset"
    }), t.onCompactEvent?.({
      type: "compact_progress",
      event: {
        type: "compact_end"
      }
    }), Kwe({
      trigger: s ? "auto" : "manual",
      success: !p,
      durationMs: performance.now() - A,
      preTokens: m,
      postTokens: f,
      error: p
    }), h) {
      if (HMt(h, {
        ...(m !== void 0 && {
          pre_compact_tokens: m
        }),
        ...(f !== void 0 && {
          post_compact_tokens: f
        }),
        success: !p
      }), p) V$e(h, p);
      h.end();
    }
    t.onCompactEvent?.({
      type: "sdk_status",
      status: null,
      metadata: {
        compactResult: p ? "failed" : "success",
        ...(p && {
          compactError: p
        })
      }
    });
  }
}
async function yel(e, t, n, r, o, s = "from", i, a) {
  let l,
    c,
    u,
    d = performance.now();
  try {
    let p = s === "up_to" ? e.slice(0, t) : e.slice(t),
      m = s === "up_to" ? e.slice(t).filter(ne => ne.type !== "progress" && !xE(ne) && !(ne.type === "user" && ne.isCompactSummary)) : e.slice(0, t).filter(ne => ne.type !== "progress");
    if (p.length === 0) throw Error(s === "up_to" ? "Nothing to summarize before the selected message." : "Nothing to summarize after the selected message.");
    let f = SC(e);
    c = f, n.onCompactEvent?.({
      type: "compact_progress",
      event: {
        type: "hooks_start",
        hookType: "pre_compact"
      }
    }), n.onCompactEvent?.({
      type: "sdk_status",
      status: "compacting"
    });
    let A = await executePreCompactHooks({
      trigger: "manual",
      customInstructions: null
    }, n.abortController.signal);
    w6n(A, i);
    let h;
    if (A.newCustomInstructions && o) h = `${A.newCustomInstructions}

User context: ${o}`;else if (A.newCustomInstructions) h = A.newCustomInstructions;else if (o) h = `User context: ${o}`;
    n.onCompactEvent?.({
      type: "stream_mode",
      mode: "requesting"
    }), a?.({
      type: "response_length",
      op: "reset"
    }), n.onCompactEvent?.({
      type: "compact_progress",
      event: {
        type: "compact_start"
      }
    });
    let g = E$i(h, s),
      _ = Ln({
        content: g
      }),
      y = {
        preCompactTokenCount: f,
        direction: fromEnum(s),
        messagesSummarized: p.length
      },
      T = s === "up_to" ? p : e,
      S = s === "up_to" ? {
        ...r,
        forkContextMessages: p
      } : r,
      v,
      R,
      k = 0;
    for (;;) {
      if (v = await Sel({
        messages: T,
        summaryRequest: _,
        appState: n.getAppState(),
        context: n,
        preCompactTokenCount: f,
        cacheSafeParams: S,
        onResponseLength: a
      }), R = rW(v), !R?.startsWith(OF)) break;
      k++;
      let ne = k <= gel ? _el(T, v) : null;
      if (!ne) throw logEvent("tengu_partial_compact_failed", {
        reason: Qe("prompt_too_long"),
        ...y,
        ptlAttempts: k
      }), Oe("compact_partial", "compact_partial_prompt_too_long"), Error(v6n);
      logEvent("tengu_compact_ptl_retry", {
        attempt: k,
        droppedMessages: T.length - ne.length,
        remainingMessages: ne.length,
        path: Qe("partial")
      }), T = ne, S = {
        ...S,
        forkContextMessages: ne
      };
    }
    if (!R) throw logEvent("tengu_partial_compact_failed", {
      reason: Qe("no_summary"),
      ...y
    }), Oe("compact_partial", "compact_partial_no_summary"), new j6("Failed to generate conversation summary - response did not contain valid text content");else if (v.isApiErrorMessage || sN(R)) throw logEvent("tengu_partial_compact_failed", {
      reason: Qe("api_error"),
      errorPrefix: hq(R).slice(0, 60),
      ...y
    }), Oe("compact_partial", "compact_partial_api_error"), Error(R);
    let x = eOt(n.readFileState);
    if (n.readFileState.clear(), n.loadedNestedMemoryPaths) for (let ne of Object.keys(n.loadedNestedMemoryPaths)) delete n.loadedNestedMemoryPaths[ne];
    $2e(n.memorySelector);
    let [H, I] = await Promise.all([Pqn(x, n, Dqn, m), Nqn(n)]),
      P = [...H, ...I],
      L = Oqn(n.agentId);
    if (L) P.push(L);
    let D = await Mqn(n);
    if (D) P.push(D);
    let N = Lqn(n.agentId);
    if (N) P.push(N);
    for (let ne of getDeferredToolsDeltaAttachment(n.options.tools, n.options.mainLoopModel, m, {
      callSite: "compact_partial"
    })) P.push(createAttachmentMessage(ne));
    for (let ne of getAgentListingDeltaAttachment(n, m)) P.push(createAttachmentMessage(ne));
    for (let ne of getMcpInstructionsDeltaAttachment(n.options.mcpClients, n.options.tools, n.options.mainLoopModel, m)) P.push(createAttachmentMessage(ne));
    n.onCompactEvent?.({
      type: "compact_progress",
      event: {
        type: "hooks_start",
        hookType: "session_start"
      }
    });
    let O = await nW("compact", {
        model: n.options.mainLoopModel
      }),
      $ = wz([v]),
      U = Sae(v),
      W = E0(n.options.mainLoopModel, Fh(n));
    logEvent("tengu_partial_compact", {
      preCompactTokenCount: f,
      postCompactTokenCount: $,
      messagesKept: m.length,
      messagesSummarized: p.length,
      ...(W && {
        effort_level: fromEnum(W)
      }),
      direction: fromEnum(s),
      hasUserFeedback: !!o,
      trigger: Qe("message_selector"),
      compactionInputTokens: U?.input_tokens,
      compactionOutputTokens: U?.output_tokens,
      compactionCacheReadTokens: U?.cache_read_input_tokens ?? 0,
      compactionCacheCreationTokens: U?.cache_creation_input_tokens ?? 0
    });
    let G = s === "up_to" ? e.slice(0, t).findLast(ne => ne.type !== "progress")?.uuid : m.at(-1)?.uuid,
      V = g4t("manual", f ?? 0, G, o, p.length),
      Q = extractDiscoveredToolNames(e);
    if (Q.size > 0) V.compactMetadata.preCompactDiscoveredTools = [...Q].sort();
    V.compactMetadata.durationMs = Math.round(performance.now() - d);
    let K = qf(),
      Y = ox() && MPt(n.getReplContexts(), n.agentId),
      J = [Ln({
        content: UOt(R, !1, K, void 0, Y),
        isCompactSummary: !0,
        ...(m.length > 0 ? {
          summarizeMetadata: {
            messagesSummarized: p.length,
            userContext: o,
            direction: s
          }
        } : {
          isVisibleInTranscriptOnly: !0
        })
      })];
    if (Iz()) IOt(n.options.querySource ?? "compact", n.agentId);
    markPostCompaction(), reAppendSessionMetadata(), n.onCompactEvent?.({
      type: "compact_progress",
      event: {
        type: "hooks_start",
        hookType: "post_compact"
      }
    });
    let ee = await executePostCompactHooks({
      trigger: "manual",
      compactSummary: R
    }, n.abortController.signal);
    u = Nv([V, ...J, ...m, ...P, ...O]), V.compactMetadata.postTokens = u;
    let te = s === "up_to" ? J.at(-1)?.uuid ?? V.uuid : V.uuid;
    return Ie("compact_partial"), {
      boundaryMarker: WAo(V, te, m, e),
      summaryMessages: J,
      messagesToKeep: m,
      attachments: P,
      hookResults: O,
      userDisplayMessage: ee.userDisplayMessage,
      preCompactTokenCount: f,
      postCompactTokenCount: $,
      compactionUsage: U
    };
  } catch (p) {
    throw l = p instanceof Error ? p.message : "partial compaction failed", Tel(p, i), p;
  } finally {
    n.onCompactEvent?.({
      type: "stream_mode",
      mode: "requesting"
    }), a?.({
      type: "response_length",
      op: "reset"
    }), n.onCompactEvent?.({
      type: "compact_progress",
      event: {
        type: "compact_end"
      }
    }), Kwe({
      trigger: "manual",
      success: !l,
      durationMs: performance.now() - d,
      preTokens: c,
      postTokens: u,
      error: l
    }), n.onCompactEvent?.({
      type: "sdk_status",
      status: null,
      metadata: {
        compactResult: l ? "failed" : "success",
        ...(l && {
          compactError: l
        })
      }
    });
  }
}
function Tel(e, t) {
  if (!CX(e, S9) && !CX(e, cpt) && !Se(e).startsWith(Gut)) t?.({
    key: "error-compacting-conversation",
    text: "Error compacting conversation",
    priority: "immediate",
    color: "error"
  }), Fv({
    type: "system",
    subtype: "notification",
    key: "error-compacting-conversation",
    text: "Error compacting conversation",
    priority: "immediate",
    color: "error"
  });
}
function n3p(e) {
  if (!e) return Qe("none");
  if (e.isApiErrorMessage) return Qe("api_error");
  return fromEnum(e.message.content[0]?.type ?? "empty");
}
function PRn(e, t) {
  return (Array.isArray(t) ? t : t !== void 0 ? [t] : []).filter(r => !swapShrinksContextWindow(e, r));
}
function G5r() {
  return async () => ({
    behavior: "deny",
    message: "Tool use is not allowed during compaction",
    decisionReason: {
      type: "other",
      reason: "compaction agent should only produce text summary"
    }
  });
}
async function Sel({
  messages: e,
  summaryRequest: t,
  appState: n,
  context: r,
  preCompactTokenCount: o,
  cacheSafeParams: s,
  stripNonEssential: i = !1,
  onResponseLength: a
}) {
  let l = !i && getFeatureValue_CACHED_MAY_BE_STALE("tengu_compact_cache_prefix", !0),
    c = MKa() ? setInterval(u => {
      LKa(), u?.({
        type: "sdk_status",
        status: "compacting"
      });
    }, 30000, r.onCompactEvent) : void 0;
  try {
    if (l) try {
      let T = await runForkedAgent({
          promptMessages: [t],
          cacheSafeParams: s,
          canUseTool: G5r(),
          querySource: "compact",
          forkLabel: "compact",
          maxTurns: 1,
          fallbackModel: PRn(r.options.mainLoopModel, r.options.fallbackModel),
          maxOutputTokens: Math.min(Akt, ehe(r.options.mainLoopModel)),
          skipCacheWrite: !0,
          skipTranscript: !0,
          overrides: {
            abortController: r.abortController
          }
        }),
        S = _P(T.messages),
        v = HRn(T.messages),
        R = Wn(T.messages, k => k.type === "assistant" && !k.isApiErrorMessage);
      if (S && v && !S.isApiErrorMessage) {
        if (!v.startsWith(OF)) logEvent("tengu_compact_cache_sharing_success", {
          preCompactTokenCount: o,
          outputTokens: T.totalUsage.output_tokens,
          cacheReadInputTokens: T.totalUsage.cache_read_input_tokens,
          cacheCreationInputTokens: T.totalUsage.cache_creation_input_tokens,
          cacheHitRate: T.totalUsage.cache_read_input_tokens > 0 ? T.totalUsage.cache_read_input_tokens / (T.totalUsage.cache_read_input_tokens + T.totalUsage.cache_creation_input_tokens + T.totalUsage.input_tokens) : 0,
          forkAssistantMessageCount: R
        });
        return kRn(T.messages) ?? S;
      }
      if (r.abortController.signal.aborted) throw Error(S9);
      logForDebugging(`Compact cache sharing: no text in response, falling back. Response: ${Le(S)}`, {
        level: "warn"
      }), logEvent("tengu_compact_cache_sharing_fallback", {
        reason: Qe("no_text_response"),
        preCompactTokenCount: o,
        lastAssistantKind: n3p(S),
        assistantTextLength: v?.length ?? 0,
        forkAssistantMessageCount: R,
        stopReason: fromEnumOpt(S?.isApiErrorMessage && S.message.stop_reason !== "refusal" ? void 0 : S?.message.stop_reason ?? void 0),
        assistantErrorKind: fromEnumOpt(S?.error ?? void 0)
      });
    } catch (T) {
      if (r.abortController.signal.aborted || CX(T, S9)) throw Error(S9);
      De(T), logEvent("tengu_compact_cache_sharing_fallback", {
        reason: Qe("error"),
        preCompactTokenCount: o
      });
    }
    let d = !i && (await isToolSearchEnabled(r.options.mainLoopModel, r.options.tools, async () => n.toolPermissionContext, r.options.agentDefinitions.activeAgents, "compact")) ? mS([gh, ToolSearchTool, ...r.options.tools.filter(T => T.isMcp)], "name") : [gh],
      p = [...allTools(e), t],
      m = W5r(i ? e3p(p) : p),
      f = i ? t3p(m) : m,
      A = r.options.mainLoopModel,
      h = r.agentId === void 0;
    if (pnt(A, r.requestDialog)) {
      let T = getFableDeclineFallbackModel();
      if (T === null) {
        if (h) Oe("model_fable_consent", "compact_no_allowed_fallback");
        throw Error("Compaction unavailable: your model policy only allows Fable 5, which requires usage credits \xB7 /model to set it up");
      }
      if (h) isTmuxControlMode("model_fable_consent", "compact_substituted");
      A = T;
    }
    let g = PRn(A, r.options.fallbackModel),
      _ = [A, ...g.filter(T => T !== A)],
      y = 0;
    while (!0) {
      let T = _[y],
        S = !1,
        v = [];
      a?.({
        type: "response_length",
        op: "reset"
      });
      try {
        let k = odt({
            messages: kk(f, i ? [] : r.options.tools),
            systemPrompt: Wc(["You are a helpful AI assistant tasked with summarizing conversations."]),
            thinkingConfig: FFn(T) ? r.options.thinkingConfig : {
              type: "disabled"
            },
            tools: i ? [] : d,
            signal: r.abortController.signal,
            options: {
              async getToolPermissionContext() {
                return r.getAppState().toolPermissionContext;
              },
              model: T,
              fallbackModel: _[y + 1],
              toolChoice: void 0,
              isNonInteractiveSession: r.options.isNonInteractiveSession,
              hasAppendSystemPrompt: !!r.options.appendSystemPrompt,
              maxOutputTokensOverride: Math.min(Akt, ehe(T)),
              querySource: "compact",
              agents: r.options.agentDefinitions.activeAgents,
              mcpTools: [],
              agentContext: r.agentContext,
              stickyBetas: $I(getStickyBetas()),
              effortValue: Fh(r),
              enablePromptCaching: !1,
              promptTooLongIsHandled: !0
            }
          })[Symbol.asyncIterator](),
          x = await k.next();
        while (!x.done) {
          let I = x.value;
          if (!S && I.type === "stream_event" && I.event.type === "content_block_start" && I.event.content_block.type === "text") S = !0, r.onCompactEvent?.({
            type: "stream_mode",
            mode: "responding"
          });
          if (I.type === "stream_event" && I.event.type === "content_block_delta" && I.event.delta.type === "text_delta") {
            let P = I.event.delta.text.length;
            a?.({
              type: "response_length",
              op: "add",
              delta: P
            });
          }
          if (I.type === "assistant") v.push(I);
          x = await k.next();
        }
        let H = v.at(-1);
        if (H) return H.isApiErrorMessage ? H : kRn(v) ?? H;
        if (r.abortController.signal.aborted) throw Error(S9);
        throw logForDebugging(`Compact streaming failed. hasStartedStreaming=${S}`, {
          level: "error"
        }), logEvent("tengu_compact_failed", {
          reason: Qe("no_streaming_response"),
          preCompactTokenCount: o,
          hasStartedStreaming: S,
          promptCacheSharingEnabled: l
        }), Error(upt);
      } catch (R) {
        let k = _[y + 1];
        if (k !== void 0 && pnt(k, r.requestDialog)) {
          let x = getFableDeclineFallbackModel() ?? void 0;
          if (k = x !== void 0 && !swapShrinksContextWindow(_[0], x) ? x : void 0, k !== void 0) _[y + 1] = k;
        }
        if (R instanceof RU && k !== void 0) {
          Ie("model_fallback"), logEvent("tengu_model_fallback_triggered", {
            original_model: ky(R.originalModel),
            fallback_model: ky(k),
            chain_index: y + 1,
            query_source: Qe("compact"),
            reason: fromEnum(R.reason),
            entrypoint: Qe("cli"),
            queryChainId: Br(r.queryTracking?.chainId) ?? Qe(""),
            queryDepth: r.queryTracking?.depth ?? -1
          }), logForDebugging(`Compact: model fallback triggered (${R.reason}), retrying summarization on the fallback model`, {
            level: "warn"
          }), r.onCompactEvent?.({
            type: "stream_mode",
            mode: "requesting"
          }), y++;
          continue;
        }
        if (R instanceof RU && R.reason === "model_blocked") throw new j6(`${renderModelName(R.originalModel)} is currently unavailable.`);
        throw R;
      }
    }
  } finally {
    clearInterval(c);
  }
}
async function Pqn(e, t, n, r = []) {
  let o = r3p(r),
    s = Object.entries(e).map(([l, c]) => ({
      filename: l,
      ...c
    })).filter(l => !s3p(l.filename, t.agentId) && !o.has(Ds(l.filename))).sort((l, c) => c.timestamp - l.timestamp).slice(0, n),
    i = await Promise.all(s.map(async l => {
      let c = await generateFileAttachment(l.filename, {
        ...t,
        fileReadingLimits: {
          maxTokens: J9p
        }
      }, "tengu_post_compact_file_restore_success", "tengu_post_compact_file_restore_error", "compact");
      return c ? createAttachmentMessage(c) : null;
    })),
    a = 0;
  return i.filter(l => {
    if (l === null) return !1;
    let c = $f(Le(l));
    if (a + c <= Y9p) return a += c, !0;
    return !1;
  });
}
function Oqn(e) {
  let t = DP(e);
  if (!t) return null;
  let n = IP(e);
  return createAttachmentMessage({
    type: "plan_file_reference",
    planFilePath: n,
    planContent: t
  });
}
function Lqn(e) {
  let t = getInvokedSkillsForAgent(e);
  if (t.size === 0) return null;
  let n = 0,
    r = Array.from(t.values()).sort((o, s) => s.invokedAt - o.invokedAt).map(o => ({
      name: o.skillName,
      path: o.skillPath,
      content: o3p(o.content, X9p)
    })).filter(o => {
      let s = $f(o.content);
      if (n + s > Q9p) return !1;
      return n += s, !0;
    });
  if (r.length === 0) return null;
  return createAttachmentMessage({
    type: "invoked_skills",
    skills: r
  });
}
async function Mqn(e) {
  if (Fr(e).mode !== "plan") return null;
  let t = IP(e.agentId),
    n = DP(e.agentId) !== null,
    r = e.options?.planModeInstructions;
  return createAttachmentMessage({
    type: "plan_mode",
    reminderType: "full",
    isSubAgent: !!e.agentId,
    planFilePath: t,
    planExists: n,
    ...(r !== void 0 && {
      customInstructions: r
    })
  });
}
async function Nqn(e) {
  let t = e.getAppState();
  return Object.values(t.tasks).filter(r => r.type === "local_agent").flatMap(r => {
    if (r.retrieved || r.status === "pending" || r.agentId === e.agentId) return [];
    return [createAttachmentMessage({
      type: "task_status",
      taskId: r.agentId,
      taskType: "local_agent",
      description: r.description,
      status: r.status,
      deltaSummary: r.status === "running" ? r.progress?.summary ?? null : r.error ?? null,
      outputFilePath: mh(r.agentId)
    })];
  });
}
function r3p(e) {
  let t = new Set();
  for (let r of e) {
    if (r.type !== "user" || !Array.isArray(r.message.content)) continue;
    for (let o of r.message.content) if (o.type === "tool_result" && typeof o.content === "string" && Oyn(o.content)) t.add(o.tool_use_id);
  }
  let n = new Set();
  for (let r of e) {
    if (r.type !== "assistant" || !Array.isArray(r.message.content)) continue;
    for (let o of r.message.content) {
      if (o.type !== "tool_use" || o.name !== Ws || t.has(o.id)) continue;
      let s = o.input;
      if (s && typeof s === "object" && "file_path" in s && typeof s.file_path === "string") n.add(Ds(s.file_path));
    }
  }
  return n;
}
function o3p(e, t) {
  if ($f(e) <= t) return e;
  let n = t * 4 - Ael.length;
  return e.slice(0, n) + Ael;
}
function s3p(e, t) {
  let n = Ds(e);
  try {
    let r = Ds(IP(t));
    if (n === r) return !0;
  } catch {}
  try {
    if (new Set(del.map(o => Ds(getMemoryPath(o)))).has(n)) return !0;
  } catch {}
  return !1;
}
var Dqn = 5,
  Y9p = 50000,
  J9p = 5000,
  X9p = 5000,
  Q9p = 25000,
  mel = 100,
  cpt = "Not enough messages to compact.",
  gel = 3,
  fel = "[earlier conversation truncated for compaction retry]",
  v6n = "Conversation too long. Press esc twice to go up a few messages and try again.",
  S9 = "API Error: Request was aborted.",
  Gut = "Compaction blocked by PreCompact hook",
  upt = "Compaction interrupted \xB7 This may be due to network issues \u2014 please try again.",
  j6,
  Ael = `

[... skill content truncated for compaction; use Read on the skill path if you need the full text]`;
var fee = b(() => {
  mee();
  lt();
  lt();
  mnt();
  Rce();
  ef();
  Lv();
  uRn();
  Bv();
  Qn();
  jS();
  h5r();
  Ql();
  qe();
  Om();
  bt();
  xk();
  gP();
  Uso();
  yp();
  Rn();
  pel();
  lo();
  Mo();
  Iu();
  yx();
  bC();
  g6e();
  ry();
  lxe();
  ja();
  Xt();
  vC();
  uS();
  Nq();
  oN();
  Hz();
  ln();
  zn();
  Ct();
  eQe();
  WS();
  rb();
  fP();
  C6n();
  oxe();
  Y2e();
  RRn();
  HF();
  Z5();
  q5r();
  j6 = class j6 extends Error {};
});
export {Z9p as MVp,W5r as Czr,e3p as NVp,hel as oal,$ho as Obo,t3p as FVp,_el as ial,w6n as VWn,c_e as Iye,who as Tbo,WAo as LSo,qho as Lbo,Vut as jpt,yel as aal,Tel as lal,n3p as BVp,PRn as yIn,G5r as Azr,Sel as cal,Pqn as Q8n,Oqn as Z8n,Lqn as eWn,Mqn as tWn,Nqn as nWn,r3p as UVp,o3p as $Vp,s3p as qVp,Dqn as X8n,Y9p as DVp,J9p as PVp,X9p as OVp,Q9p as LVp,mel as tal,cpt as cft,gel as sal,fel as nal,v6n as GWn,S9 as j$,Gut as zpt,upt as uft,j6 as l6,Ael as ral,fee as dee};
