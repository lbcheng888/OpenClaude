// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {bA,logFeatureBad,i1e,scalar,Sw} from "../mcp/0728_serverName.ts";
import {Cs,p5,Ph} from "../../vendor/m2224.ts";
import {Pk} from "../mcp/3149_scope.ts";
import {Lc,Ri} from "../tools/2227_userFacingName.ts";
import {VO} from "../config/2251_zBr.ts";
import {DRe,wjr,ONi,$Pt,LNi,jtt} from "../../vendor/m2701.ts";
import {isAgentSwarmsEnabled,cb} from "../config/3298_isAgentSwarmsEnabled.ts";
import {ox,PA,$tt,Lv} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {Zw,bW} from "../config/3273_bW.ts";
import {ns,wA,$u} from "../mcp/2194_mcpServerName.ts";
import {yu,VR} from "../../vendor/m2249.ts";
import {T9,$4e} from "../tools/3920_pattern.ts";
import {$c,Vw,gL} from "../../vendor/m2695.ts";
import {UL,Jge} from "../tools/3918_items.ts";
import {Ws,ef} from "../../vendor/m2248.ts";
import {WFn,GFn,Wlt,Gso} from "../../vendor/m3906.ts";
import {_P,vLa,wc,oUn,N2t,lo} from "../tools/5190_userPromptCount.ts";
import {uee,oN} from "../core/2729_input_tokens.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {lP,sh} from "../../vendor/m2589.ts";
import {Ou,uS} from "../config/2594_event_name.ts";
import {RAe,tx} from "../telemetry/2595_skill_name.ts";
import {I$,vAe} from "../agent/2589_attributionMcpServer.ts";
import {Qe,fromEnum,fromEnumOpt} from "../../vendor/m5.ts";
import {Br} from "../../vendor/m1456.ts";
import {M2t,od,ZFn,q4e,eUn,nUn,tUn,ELa,rUn,Zlt,CLa,Aio,tIe,RE} from "../agent/4342_toolUseCount.ts";
import {Ylt,XFn} from "../agent/3914_type.ts";
import {nLa,O2t,eIe} from "./3913_allow.ts";
import {Wj,sn} from "../config/0047_namespace.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {je,tk} from "../../vendor/m577.ts";
import {Zae,ele} from "../../vendor/m3293.ts";
import {Oe,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {TOa,SOa} from "./3906_forkContextMessages.ts";
import {Rm,zE} from "../../vendor/m125.ts";
import {Fr,Ql} from "../../vendor/m4405.ts";
import {Se,vu,bt} from "../../vendor/m195.ts";
import {clearInvokedSkillsForAgent,lt} from "../session/0131_sent.ts";
import {dOa,R2t} from "../../vendor/m3900.ts";
import {b,ro} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {VFn,k2t,H2t} from "../../vendor/m3907.ts";
import {fnt} from "../../vendor/m2753.ts";
import {XAe,FPt} from "../artifact/2701_uuidSlugFromUrl.ts";
import {Kw,mP,Tz} from "../tools/2698_allErrors.ts";
import {H0} from "../session/2690_resolveLoopFileFire.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
// Returns false if bootstrapped; otherwise checks shale_finch feature flag
function SLa(e: any): any {
  if (e) return !1;
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_shale_finch", !1);
}
// Parses wildcard tool spec into allowedAgentTypes config, or null if not wildcard
function cio(e: any): any {
  if (e === void 0) return {};
  if (!e.includes("*")) return null;
  let t: any;
  for (let n of e) {
    if (n === "*") continue;
    let {
      toolName: r,
      ruleContent: o
    } = bA(n);
    if (r !== Cs || !o) return null;
    t ??= [], t.push(...o.split(",").map((s: any) => s.trim()).filter(Boolean));
  }
  return t ? {
    allowedAgentTypes: t
  } : {};
}
// Filters tools list by permission context, async mode, teammate, and agentDepth
function uio({
  tools: e,
  isBuiltIn: t,
  isAsync: n = !1,
  isTeammate: r = !1,
  permissionMode: o,
  agentDepth: s = 0
}: any): any {
  return e.filter((i: any) => {
    if (Pk(i)) return !0;
    if (Lc(i, VO) && o === "plan") return !0;
    if (DRe.has(i.name)) return !1;
    if (!t && wjr.has(i.name)) return !1;
    if (Lc(i, Cs)) return s < ONi;
    if (n && !$Pt.has(i.name)) {
      if (isAgentSwarmsEnabled() && r && LNi.has(i.name)) return !0;
      return !1;
    }
    return !0;
  });
}
// Builds disallowed tool sets and lookup helpers from the deny list
function dio(e: any): any {
  let t = new Set(),
    n = new Set(),
    r = new Set(),
    o = !1;
  for (let a of e ?? []) {
    let {
      toolName: l,
      ruleContent: c
    } = bA(a);
    if (t.add(l), !c) n.add(l);
    let u = logFeatureBad(l);
    if (u !== null && (u.toolName === void 0 || u.toolName === "*")) if (u.serverName === "*") o = !0;else r.add(u.serverName);
  }
  let s = (a: any) => {
    if (!o && r.size === 0) return !1;
    let l = logFeatureBad(a)?.serverName;
    return l !== void 0 && (o || r.has(l));
  };
  return {
    disallowedToolSet: t,
    bareDisallowedToolSet: n,
    isServerLevelDisallowed: s,
    isToolDisallowed: (a: any) => {
      let l = i1e(a);
      return t.has(a.name) || t.has(l) || s(l);
    }
  };
}
// Resolves tool spec into valid/invalid/unavailable/resolvedTools buckets
function vte(e: any, t: any, n = !1, r = !1, o = !1, s = 0): any {
  let {
      tools: i,
      disallowedTools: a,
      source: l,
      permissionMode: c
    } = e,
    u = r ? t : uio({
      tools: t,
      isBuiltIn: l === "built-in",
      isAsync: n,
      isTeammate: o,
      permissionMode: c,
      agentDepth: s
    }),
    {
      disallowedToolSet: d,
      bareDisallowedToolSet: p,
      isToolDisallowed: m,
      isServerLevelDisallowed: f
    } = dio(a),
    A = u.filter((H: any) => {
      if (m(H)) return !1;
      return !0;
    });
  if (i === void 0) return {
    hasWildcard: !0,
    validTools: [],
    invalidTools: [],
    unavailableTools: [],
    resolvedTools: A
  };
  let h = cio(i);
  if (h) return {
    hasWildcard: !0,
    validTools: [],
    invalidTools: [],
    unavailableTools: [],
    resolvedTools: A,
    ...(h.allowedAgentTypes && {
      allowedAgentTypes: h.allowedAgentTypes
    })
  };
  let g = new Map();
  for (let H of A) g.set(H.name, H);
  let _ = new Set(t.map((H: any) => H.name)),
    y = ox() && !d.has(PA) ? g.get(PA) : void 0,
    T = [],
    S = [],
    v = [],
    R = [],
    k = new Set(),
    x: any;
  for (let H of i) {
    let {
      toolName: I,
      ruleContent: P
    } = bA(H);
    if (I === Cs) {
      if (P) {
        let O = P.split(",").map(($: any) => $.trim()).filter(Boolean);
        x = x ? [...x, ...O] : O;
      }
      if (!r && !g.has(Cs)) {
        T.push(H);
        continue;
      }
    }
    let L = logFeatureBad(I);
    if (L !== null && L.serverName !== "*" && (L.toolName === void 0 || L.toolName === "*")) {
      T.push(H);
      for (let O of A) if (logFeatureBad(i1e(O))?.serverName === L.serverName && !k.has(O)) R.push(O), k.add(O);
      continue;
    }
    let N = g.get(I);
    if (N) {
      if (T.push(H), !k.has(N)) R.push(N), k.add(N);
    } else if (y && $tt.has(I)) {
      if (T.push(H), !k.has(y)) R.push(y), k.add(y);
    } else if (p.has(I) || f(I)) ;else if (_.has(I)) v.push(H);else S.push(H);
  }
  if (Zw() && !R.some((H: any) => Lc(H, ns))) {
    let H = {
        [yu]: T9,
        [$c]: UL
      },
      I = [];
    for (let P of S) {
      let {
          toolName: L
        } = bA(P),
        D = H[L];
      if (!D || d.has(L)) {
        I.push(P);
        continue;
      }
      if (T.push(P), !k.has(D)) R.push(D), k.add(D);
    }
    S.splice(0, S.length, ...I);
  }
  return {
    hasWildcard: !1,
    validTools: T,
    invalidTools: S,
    unavailableTools: v,
    resolvedTools: R,
    allowedAgentTypes: x
  };
}
// Counts total tool_use blocks across all assistant messages
function JTp(e: any): any {
  let t = 0;
  for (let n of e) if (n.type === "assistant") {
    for (let r of n.message.content) if (r.type === "tool_use") t++;
  }
  return t;
}
// Aggregates per-tool-category stats from message transcript
function XTp(e: any): any {
  let t = {
    readCount: 0,
    searchCount: 0,
    bashCount: 0,
    editFileCount: 0,
    linesAdded: 0,
    linesRemoved: 0,
    otherToolCount: 0
  };
  for (let r of e) if (r.type === "assistant") for (let o of r.message.content) {
    if (o.type !== "tool_use") continue;
    switch (o.name) {
      case Ws:
        t.readCount++;
        break;
      case $c:
      case yu:
        t.searchCount++;
        break;
      case ns:
        t.bashCount++;
        break;
      case Cs:
      case p5:
        break;
      default:
        if (WFn.has(o.name)) {
          let {
            added: s,
            removed: i
          } = GFn(o.name, o.input);
          t.editFileCount++, t.linesAdded += s, t.linesRemoved += i;
        } else if (o.name === YTp) t.frameCount = (t.frameCount ?? 0) + 1;else t.otherToolCount++;
    }
  } else if (r.type === "user") {
    let o = r.toolUseResult?.toolStats;
    if (o) {
      if (t.readCount += o.readCount, t.searchCount += o.searchCount, t.bashCount += o.bashCount, t.editFileCount += o.editFileCount, t.linesAdded += o.linesAdded, t.linesRemoved += o.linesRemoved, t.otherToolCount += o.otherToolCount, o.frameCount) t.frameCount = (t.frameCount ?? 0) + o.frameCount;
    }
  }
  return t.readCount + t.searchCount + t.bashCount + t.editFileCount + t.otherToolCount + (t.frameCount ?? 0) > 0 ? t : void 0;
}
// Logs agent completion telemetry and returns result summary object
function pio(e: any, t: any, n: any, {
  suppressTelemetry: r = !1
}: any = {}): any {
  let {
      prompt: o,
      resolvedAgentModel: s,
      isBuiltInAgent: i,
      startTime: a,
      agentType: l,
      isAsync: c,
      agentDepth: u,
      source: d,
      pluginId: p
    } = n,
    m = _P(e);
  if (m === void 0) throw Error("No assistant messages found");
  let f = m.message.content.filter((y: any) => y.type === "text");
  if (f.length === 0) for (let y = e.length - 1; y >= 0; y--) {
    let T = e[y];
    if (T.type !== "assistant") continue;
    let S = T.message.content.filter((v: any) => v.type === "text");
    if (S.length > 0) {
      f = S;
      break;
    }
  }
  let A = uee(m.message.usage),
    h = JTp(e),
    g = Date.now() - a,
    _ = new Set();
  for (let y of e) if (y.type === "assistant") _.add(y.message.id);
  if (!r) {
    logEvent("tengu_agent_tool_completed", {
      agent_type: l,
      model: s,
      prompt_char_count: o.length,
      response_char_count: f.reduce((R: any, k: any) => R + k.text.length, 0),
      assistant_message_count: _.size,
      total_tool_uses: h,
      duration_ms: g,
      total_tokens: A,
      is_built_in_agent: i,
      is_async: c,
      agent_depth: u
    });
    let y = wA(),
      T = p && lP(p.marketplace);
    Ou("subagent_completed", {
      agent_type: i || T || y ? l : "custom",
      ...(d && {
        "agent.source": d
      }),
      is_built_in: i,
      is_async: c,
      total_tokens: A,
      total_tool_uses: h,
      duration_ms: g,
      model: s,
      ...(p && {
        plugin_id_hash: RAe(p.name, p.marketplace),
        "plugin.name": T || y ? p.name : I$
      })
    });
    let v = m.requestId;
    if (v) logEvent("tengu_cache_eviction_hint", {
      scope: Qe("subagent_end"),
      last_request_id: Br(v)
    });
  }
  return {
    agentId: t,
    agentType: l,
    content: f,
    resolvedModel: s,
    totalDurationMs: Date.now() - a,
    totalTokens: A,
    totalToolUseCount: h,
    usage: m.message.usage,
    toolStats: XTp(e)
  };
}
// Returns the name of the last tool_use block in an assistant message
function QTp(e: any): any {
  if (e.type !== "assistant") return;
  let t = e.message.content.findLast((n: any) => n.type === "tool_use");
  return t?.type === "tool_use" ? t.name : void 0;
}
// Updates task registry with latest activity description and token/tool counts
function ZTp(e: any, t: any, n: any, r: any, o: any, s: any, i: any): any {
  let a = M2t(e);
  Ylt({
    taskId: t,
    toolUseId: n,
    description: a.lastActivity?.activityDescription ?? r,
    subagentType: i,
    startTime: o,
    totalTokens: a.tokenCount,
    toolUses: a.toolUseCount,
    lastToolName: s
  });
}
// Runs the auto-mode handoff classifier after subagent completes; returns warning string or null
async function fio({
  agentMessages: e,
  tools: t,
  toolPermissionContext: n,
  abortSignal: r,
  subagentType: o,
  totalToolUseCount: s
}: any): Promise<any> {
  {
    if (n.mode !== "auto") return null;
    if (!nLa(e, t)) return null;
    let a = await O2t(e, {
        role: "user",
        content: [{
          type: "text",
          text: "Subagent has finished and is handing back control to the main agent. Review the subagent's work based on the block rules and let the main agent know if any file is dangerous (the main agent will see the reason)."
        }]
      }, t, n, r, {
        isSubagentLoop: !0
      }),
      l = a.unavailable ? "unavailable" : a.shouldBlock ? "blocked" : "allowed";
    if (logEvent("tengu_auto_mode_decision", {
      decision: fromEnum(l),
      toolName: fromEnum(p5),
      inProtectedNamespace: Wj(),
      classifierModel: a.model,
      agentType: o,
      toolUseCount: s,
      isHandoff: !0,
      agentMsgId: _P(e)?.message.id,
      classifierStage: fromEnumOpt(a.stage),
      classifierFailureMode: fromEnumOpt(a.failureMode),
      classifierStage1RequestId: Br(a.stage1RequestId),
      classifierStage1MsgId: Br(a.stage1MsgId),
      classifierStage2RequestId: Br(a.stage2RequestId),
      classifierStage2MsgId: Br(a.stage2MsgId)
    }), a.shouldBlock) {
      if (a.unavailable) return logForDebugging("Handoff classifier unavailable, allowing sub-agent output with warning", {
        level: "warn"
      }), vLa(a.model, a.httpStatus, a.errorKind);
      return logForDebugging(`Handoff classifier flagged sub-agent output: ${a.reason}`, {
        level: "warn"
      }), `SECURITY WARNING: This subagent performed actions that may violate security policy. Reason: ${a.reason}. Review the subagent's actions carefully before acting on its output.`;
    }
  }
  return null;
}
// Finds the last assistant text response in message array
function QFn(e: any): any {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (n.type !== "assistant") continue;
    let r = wc(n.message.content, `
`);
    if (r) return r;
  }
  return;
}
// Main async agent loop: streams responses, tracks tool use, handles stall watchdog, finalizes
async function j4e({
  taskId: e,
  abortController: t,
  makeStream: n,
  metadata: r,
  description: o,
  toolUseContext: s,
  taskRegistry: i,
  agentIdForCleanup: a,
  enableSummarization: l,
  getWorktreeResult: c,
  onMessage: u,
  shouldNotifyOwner: d
}: any): Promise<any> {
  let p = d ?? (() => !0),
    m: any,
    f: any[] = [],
    A = i.get(e),
    h = od(A) ? A.ownerAgentId : void 0,
    g = je.CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS || 600000,
    _: any = null,
    y = "none",
    T = !1,
    S = Date.now();
  Wlt(i, e, {
    turnStartTime: S
  });
  let v = Zae(e);
  v.setMode("responding");
  let R = 0,
    k: any,
    x: any,
    H: any,
    I = new Set(),
    P = new Set(),
    L = () => {
      let Q = P.size > 0 && P.size === I.size;
      i.update(e, (K: any) => K.isIdle === Q ? K : {
        ...K,
        isIdle: Q
      });
    },
    D: any,
    N = Date.now(),
    O = (Q: any, K?: any) => {
      let Y = Date.now(),
        J = D?.type === "assistant" ? D.message.stop_reason ?? "null" : "none",
        ee = [`agentId=${e}`, `agentType=${r.agentType ?? "unknown"}`, `exitPath=${Q}`, `durationMs=${Y - S}`, `turns=${R}`, `finalStopReason=${J}`, `lastChunkAgeMs=${Y - N}`, `lastToolUseId=${x ?? "none"}`, `lastToolResultSeen=${H ?? "none"}`];
      if (K?.errorKind) ee.push(`errorKind=${K.errorKind}`);
      logForDebugging(`[Stall] agent_completion ${ee.join(" ")}`, {
        level: Q === "watchdog_stall" || Q === "error" ? "warn" : "info"
      });
    },
    $ = () => {
      if (_ !== null) clearTimeout(_), _ = null;
    },
    U = () => {
      $(), _ = setTimeout(() => {
        if (_ = null, T) return;
        if (I.size > 0) {
          logForDebugging(`[AsyncAgent ${e}] stall watchdog deferred \u2014 ${I.size} tool(s) in flight (toolUseIds=${[...I].join(",")})`), U();
          return;
        }
        T = !0, logForDebugging(`[AsyncAgent ${e}] stall watchdog fired after ${g}ms with no progress (last message: ${y}); aborting`, {
          level: "error"
        }), logEvent("tengu_async_agent_stall_timeout", {
          agent_type: r.agentType,
          stall_ms: g,
          last_message_type: y,
          message_count: f.length
        }), t.abort(), m?.(), O("watchdog_stall");
        let Q = `Agent stalled: no progress for ${g / 1000}s (stream watchdog did not recover)`;
        if (Oe("subagent_complete", "subagent_stall_timeout"), ZFn(e, Q, i), c(), p()) q4e({
          taskId: e,
          description: o,
          status: "failed",
          error: Q,
          taskRegistry: i,
          toolUseId: s.toolUseId,
          finalMessage: QFn(f),
          ownerAgentId: h
        });
      }, g), _.unref?.();
    },
    W = 0,
    G = Math.min(g * 0.1, 1000),
    V = () => {
      let Q = Date.now();
      if (N = Q, Q - W < G) return;
      W = Q, y = "query_progress", U();
    };
  try {
    let Q = eUn(),
      K = nUn(s.options.tools),
      Y = l ? (ce: any, ue: any) => {
        let {
          stop: ae
        } = TOa(e, Rm(e), ce, ue, i);
        m = ae;
      } : void 0;
    U();
    for await (let ce of n(Y, V)) {
      if (u?.(ce), ce.type === "spinner_mode") {
        v.setMode(ce.mode);
        continue;
      }
      if (ce.type === "api_metrics") continue;
      if (ce.type === "set_in_progress_tool_use_ids") {
        let he = 0;
        if (ce.op.action === "remove") for (let se of ce.op.ids) {
          if (I.delete(se)) he++;
          P.delete(se);
        }
        if (he > 0 && ce.reason === "fallback_sweep") logEvent("tengu_async_agent_stranded_tools_cleared", {
          is_built_in_agent: r.isBuiltInAgent,
          cleared_count: he,
          in_flight_remaining: I.size
        });
        if (he > 0) i.updateTranscript(e, (se: any) => ({
          ...se,
          inProgressToolUseIDs: new Set(I)
        }));
        L();
        continue;
      }
      y = ce.type === "system" && "subtype" in ce ? `system:${ce.subtype}` : ce.type;
      let ue = !1;
      if (ce.type === "assistant") {
        if (ce.message.id !== k) R += 1, k = ce.message.id;
        D = ce;
        for (let he of ce.message.content) if (he.type === "tool_use") {
          if (x = he.id, I.add(he.id), eSp.has(he.name)) P.add(he.id);
          ue = !0;
        }
      } else if (ce.type === "user") {
        let he = ce.message.content;
        if (Array.isArray(he)) {
          for (let se of he) if (typeof se === "object" && se?.type === "tool_result") H = se.tool_use_id, ue = I.delete(se.tool_use_id) || ue, P.delete(se.tool_use_id);
        }
      }
      if (U(), ce.type === "system" && ce.subtype === "api_error") continue;
      f.push(ce), i.updateTranscript(e, (he: any) => ({
        ...he,
        messages: oUn(he.messages, ce),
        ...(ue && {
          inProgressToolUseIDs: new Set(I)
        })
      })), L(), tUn(Q, ce, K, s.options.tools), ELa(e, M2t(Q), i);
      let ae = QTp(ce);
      if (ae) ZTp(Q, e, s.toolUseId, o, r.startTime, ae, r.agentType);
    }
    if ($(), T) {
      if (!p()) throw Error("Agent stalled (stream watchdog)");
      return;
    }
    T = !0, m?.(), rUn(e, i);
    let J = Zlt(e, i);
    if (!J) O("completed");
    let ee = i.getTranscript(e),
      te = ee && ee.messages.length > f.length ? ee.messages : f,
      ne = pio(te, e, r, {
        suppressTelemetry: J
      });
    if (CLa(ne, i), J) {
      let ce = 0,
        ue = i.get(e);
      if (od(ue) && ue.keepaliveReasons) {
        for (let ae of ue.keepaliveReasons) if (ae.startsWith("agent:")) ce++;
      }
      i.updateTranscript(e, (ae: any) => ({
        ...ae,
        messages: [...ae.messages.filter((he: any) => !(he.type === "system" && he.subtype === "turn_duration")), N2t(Date.now() - S, void 0, void 0, ce || void 0)]
      })), logForDebugging(`[AsyncAgent ${e}] parked on keepalive \u2014 deferring owner notification until resume`);
      return;
    }
    if (Ie("subagent_complete"), !p()) {
      await c();
      return;
    }
    let re = wc(ne.content, `
`);
    {
      let ce = await fio({
        agentMessages: f,
        tools: s.options.tools,
        toolPermissionContext: Fr(s),
        abortSignal: t.signal,
        subagentType: r.agentType,
        totalToolUseCount: ne.totalToolUseCount
      });
      if (ce) re = `${ce}

${re}`;
    }
    let oe = await c();
    q4e({
      taskId: e,
      description: o,
      status: "completed",
      taskRegistry: i,
      finalMessage: re,
      usage: {
        totalTokens: Aio(Q),
        toolUses: ne.totalToolUseCount,
        durationMs: ne.totalDurationMs
      },
      toolUseId: s.toolUseId,
      ownerAgentId: h,
      ...oe
    });
  } catch (Q) {
    if ($(), T) {
      let J = Se(Q);
      if (logForDebugging(`[AsyncAgent ${e}] completion sequence threw after finalize: ${J}`, {
        level: "error"
      }), ZFn(e, J, i), p()) {
        let ee = i.get(e)?.status;
        q4e({
          taskId: e,
          description: o,
          status: ee === "completed" ? "completed" : ee === "killed" ? "killed" : "failed",
          error: ee === "completed" ? void 0 : J,
          taskRegistry: i,
          toolUseId: s.toolUseId,
          ownerAgentId: h,
          finalMessage: QFn(f)
        });
      } else throw Q;
      return;
    }
    if (T = !0, m?.(), Q instanceof vu) {
      O("cancelled"), tIe(e, i);
      let J = await c();
      if (!p()) throw Q;
      logEvent("tengu_agent_tool_terminated", {
        agent_type: r.agentType,
        model: r.resolvedAgentModel,
        duration_ms: Date.now() - r.startTime,
        is_async: !0,
        is_built_in_agent: r.isBuiltInAgent,
        agent_depth: r.agentDepth,
        reason: Qe("user_kill_async")
      }), q4e({
        taskId: e,
        description: o,
        status: "killed",
        taskRegistry: i,
        toolUseId: s.toolUseId,
        finalMessage: QFn(f),
        ownerAgentId: h,
        ...J
      });
      return;
    }
    let K = Se(Q);
    O("error", {
      errorKind: Q instanceof Error ? `${Q.name}:${K.slice(0, 80)}` : "unknown"
    }), ZFn(e, K, i);
    let Y = await c();
    if (!p()) throw Q;
    Oe("subagent_complete", "subagent_async_errored"), q4e({
      taskId: e,
      description: o,
      status: "failed",
      error: K,
      taskRegistry: i,
      toolUseId: s.toolUseId,
      finalMessage: QFn(f),
      ownerAgentId: h,
      ...Y
    });
  } finally {
    $(), clearInvokedSkillsForAgent(a), dOa(a);
  }
}
var YTp: any, TLa: any, bLa: any, mio: any, eSp: any;
// Module initializer: sets up artifact tool name, immutable tool sets, schema, and stall timeout
var FY = b(() => {
  Xr();
  lt();
  jtt();
  ele();
  SOa();
  ln();
  zn();
  Ct();
  $u();
  R2t();
  scalar();
  Ri();
  RE();
  zE();
  cb();
  Ql();
  qe();
  Gso();
  bW();
  tk();
  sn();
  bt();
  vAe();
  lo();
  VFn();
  Sw();
  eIe();
  sh();
  XFn();
  uS();
  tx();
  oN();
  ef();
  $4e();
  VR();
  Jge();
  Vw();
  Lv();
  fnt();
  Ph();
  YTp = (XAe(), ro(FPt)).ARTIFACT_TOOL_NAME, TLa = new Set([gL, Kw, mP, Tz, H0]);
  bLa = we(() => E.object({
    agentId: E.string(),
    agentType: E.string().optional(),
    content: E.array(E.object({
      type: E.literal("text"),
      text: E.string()
    })),
    resolvedModel: E.string().optional(),
    totalToolUseCount: E.number(),
    totalDurationMs: E.number(),
    totalTokens: E.number(),
    usage: E.object({
      input_tokens: E.number(),
      output_tokens: E.number(),
      cache_creation_input_tokens: E.number().nullable(),
      cache_read_input_tokens: E.number().nullable(),
      server_tool_use: E.object({
        web_search_requests: E.number(),
        web_fetch_requests: E.number()
      }).nullable(),
      service_tier: E.enum(["standard", "priority", "batch"]).nullable(),
      cache_creation: E.object({
        ephemeral_1h_input_tokens: E.number(),
        ephemeral_5m_input_tokens: E.number()
      }).nullable()
    }),
    toolStats: E.object({
      readCount: E.number(),
      searchCount: E.number(),
      bashCount: E.number(),
      editFileCount: E.number(),
      linesAdded: E.number(),
      linesRemoved: E.number(),
      otherToolCount: E.number()
    }).optional()
  }));
  mio = k2t + H2t + 60000;
  eSp = new Set([Cs]);
});
export {SLa,cio,uio,dio,vte,JTp,XTp,pio,QTp,ZTp,fio,QFn,j4e,YTp,TLa,bLa,mio,eSp,FY};
