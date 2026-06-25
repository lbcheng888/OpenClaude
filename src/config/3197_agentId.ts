// @ts-nocheck
import {qEe as GSe} from "../../vendor/m617.ts";
import {getAgentId as KD,getAgentName as tg,H3 as X3,Op as Sf} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {getSessionId as kt,lt as ct} from "../session/0132_sent.ts";
import {logForDebugging as v,qe as je} from "./0236_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
import {ud as Jd} from "../../vendor/m134.ts";
import {dn as an} from "./0137_namespace.ts";
import {Ct as St} from "../../vendor/m197.ts";
import {tn as Xt} from "./0230_encoding.ts";
// @ts-nocheck
function dZi(e) {
  return Math.abs(GSe(e)) || 1;
}
function pZi(e) {
  let t = processIdMap.get(e);
  if (t !== undefined) return t;
  return _7r++, processIdMap.set(e, _7r), _7r;
}
function tMt() {
  let e = KD() ?? kt(),
    t = tg() ?? "main",
    n = X3(),
    r = agentInfoRegistry.get(e);
  if (r) return r;
  let o = {
    agentId: e,
    agentName: t,
    parentAgentId: n,
    processId: e === kt() ? 1 : pZi(e),
    threadId: dZi(t)
  };
  return agentInfoRegistry.set(e, o), uZi++, o;
}
function hhe() {
  return (Date.now() - S2d) * 1000;
}
function Bkn() {
  return `span_${++b2d}`;
}
function mZi() {
  let e = process.env.CLAUDE_CODE_PERFETTO_TRACE;
  v(`[Perfetto] initializePerfettoTracing called, env value: ${e}`);
}
function E2d(e) {
  if (!J5) return;
  if (metadataEvents.push({
    name: "process_name",
    cat: "__metadata",
    ph: "M",
    ts: 0,
    pid: e.processId,
    tid: 0,
    args: {
      name: e.agentName
    }
  }), metadataEvents.push({
    name: "thread_name",
    cat: "__metadata",
    ph: "M",
    ts: 0,
    pid: e.processId,
    tid: e.threadId,
    args: {
      name: e.agentName
    }
  }), e.parentAgentId) metadataEvents.push({
    name: "parent_agent",
    cat: "__metadata",
    ph: "M",
    ts: 0,
    pid: e.processId,
    tid: 0,
    args: {
      parent_agent_id: e.parentAgentId
    }
  });
}
function ghe() {
  return J5;
}
function Fkn(e, t, n) {
  if (!J5) return;
  let r = {
    agentId: e,
    agentName: t,
    parentAgentId: n,
    processId: pZi(e),
    threadId: dZi(t)
  };
  agentInfoRegistry.set(e, r), uZi++, E2d(r);
}
function S$e(e) {
  if (!J5) return;
  agentInfoRegistry.delete(e), processIdMap.delete(e);
}
function hashAgentNameToThreadId(agentName) {
  if (!J5) return "";
  let t = Bkn(),
    n = tMt();
  return activeSpans.set(t, {
    name: "API Call",
    category: "api",
    startTime: hhe(),
    agentInfo: n,
    args: {
      model: agentName.model,
      prompt_tokens: agentName.promptTokens,
      message_id: agentName.messageId,
      is_speculative: agentName.isSpeculative ?? false,
      query_source: agentName.querySource
    }
  }), traceEvents.push({
    name: "API Call",
    cat: "api",
    ph: "B",
    ts: activeSpans.get(t).startTime,
    pid: n.processId,
    tid: n.threadId,
    args: activeSpans.get(t).args
  }), t;
}
function getOrAssignProcessId(agentId, t) {
  if (!J5 || !agentId) return;
  let n = activeSpans.get(agentId);
  if (!n) return;
  let r = hhe(),
    o = r - n.startTime,
    s = t.promptTokens ?? n.args.prompt_tokens,
    i = t.ttftMs,
    a = t.ttltMs,
    l = t.outputTokens,
    c = t.cacheReadTokens,
    u = i !== undefined && s !== undefined && i > 0 ? Math.round(s / (i / 1000) * 100) / 100 : undefined,
    d = a !== undefined && i !== undefined ? a - i : undefined,
    p = d !== undefined && l !== undefined && d > 0 ? Math.round(l / (d / 1000) * 100) / 100 : undefined,
    m = c !== undefined && s !== undefined && s > 0 ? Math.round(c / s * 1e4) / 100 : undefined,
    f = t.requestSetupMs,
    A = t.attemptStartTimes,
    h = {
      ...n.args,
      ttft_ms: i,
      ttlt_ms: a,
      prompt_tokens: s,
      output_tokens: l,
      cache_read_tokens: c,
      cache_creation_tokens: t.cacheCreationTokens,
      message_id: t.messageId ?? n.args.message_id,
      request_id: t.requestId,
      client_request_id: t.clientRequestId,
      success: t.success ?? true,
      error: t.error,
      duration_ms: o / 1000,
      request_setup_ms: f,
      itps: u,
      otps: p,
      cache_hit_rate_pct: m
    },
    g = f !== undefined && f > 0 ? f * 1000 : 0;
  if (g > 0) {
    let _ = n.startTime + g;
    if (traceEvents.push({
      name: "Request Setup",
      cat: "api,setup",
      ph: "B",
      ts: n.startTime,
      pid: n.agentInfo.processId,
      tid: n.agentInfo.threadId,
      args: {
        request_setup_ms: f,
        attempt_count: A?.length ?? 1
      }
    }), A && A.length > 1) {
      let y = A[0];
      for (let T = 0; T < A.length - 1; T++) {
        let S = n.startTime + (A[T] - y) * 1000,
          C = n.startTime + (A[T + 1] - y) * 1000;
        traceEvents.push({
          name: `Attempt ${T + 1} (retry)`,
          cat: "api,retry",
          ph: "B",
          ts: S,
          pid: n.agentInfo.processId,
          tid: n.agentInfo.threadId,
          args: {
            attempt: T + 1
          }
        }), traceEvents.push({
          name: `Attempt ${T + 1} (retry)`,
          cat: "api,retry",
          ph: "E",
          ts: C,
          pid: n.agentInfo.processId,
          tid: n.agentInfo.threadId
        });
      }
    }
    traceEvents.push({
      name: "Request Setup",
      cat: "api,setup",
      ph: "E",
      ts: _,
      pid: n.agentInfo.processId,
      tid: n.agentInfo.threadId
    });
  }
  if (i !== undefined) {
    let _ = n.startTime + g,
      y = _ + i * 1000;
    traceEvents.push({
      name: "First Token",
      cat: "api,ttft",
      ph: "B",
      ts: _,
      pid: n.agentInfo.processId,
      tid: n.agentInfo.threadId,
      args: {
        ttft_ms: i,
        prompt_tokens: s,
        itps: u,
        cache_hit_rate_pct: m
      }
    }), traceEvents.push({
      name: "First Token",
      cat: "api,ttft",
      ph: "E",
      ts: y,
      pid: n.agentInfo.processId,
      tid: n.agentInfo.threadId
    });
    let T = a !== undefined ? a - i - g / 1000 : undefined;
    if (T !== undefined && T > 0) traceEvents.push({
      name: "Sampling",
      cat: "api,sampling",
      ph: "B",
      ts: y,
      pid: n.agentInfo.processId,
      tid: n.agentInfo.threadId,
      args: {
        sampling_ms: T,
        output_tokens: l,
        otps: p
      }
    }), traceEvents.push({
      name: "Sampling",
      cat: "api,sampling",
      ph: "E",
      ts: y + T * 1000,
      pid: n.agentInfo.processId,
      tid: n.agentInfo.threadId
    });
  }
  traceEvents.push({
    name: n.name,
    cat: n.category,
    ph: "E",
    ts: r,
    pid: n.agentInfo.processId,
    tid: n.agentInfo.threadId,
    args: h
  }), activeSpans.delete(agentId);
}
function getOrCreateCurrentAgentInfo(e, t) {
  if (!J5) return "";
  let n = Bkn(),
    r = tMt();
  return activeSpans.set(n, {
    name: `Tool: ${e}`,
    category: "tool",
    startTime: hhe(),
    agentInfo: r,
    args: {
      tool_name: e,
      ...t
    }
  }), traceEvents.push({
    name: `Tool: ${e}`,
    cat: "tool",
    ph: "B",
    ts: activeSpans.get(n).startTime,
    pid: r.processId,
    tid: r.threadId,
    args: activeSpans.get(n).args
  }), n;
}
function getMicrosecondTimestamp(e, t) {
  if (!J5 || !e) return;
  let n = activeSpans.get(e);
  if (!n) return;
  let r = hhe(),
    o = r - n.startTime,
    s = {
      ...n.args,
      success: t?.success ?? true,
      error: t?.error,
      result_tokens: t?.resultTokens,
      duration_ms: o / 1000
    };
  traceEvents.push({
    name: n.name,
    cat: n.category,
    ph: "E",
    ts: r,
    pid: n.agentInfo.processId,
    tid: n.agentInfo.threadId,
    args: s
  }), activeSpans.delete(e);
}
function createSpanId(e) {
  if (!J5) return "";
  let t = Bkn(),
    n = tMt();
  return activeSpans.set(t, {
    name: "Waiting for User Input",
    category: "user_input",
    startTime: hhe(),
    agentInfo: n,
    args: {
      context: e
    }
  }), traceEvents.push({
    name: "Waiting for User Input",
    cat: "user_input",
    ph: "B",
    ts: activeSpans.get(t).startTime,
    pid: n.processId,
    tid: n.threadId,
    args: activeSpans.get(t).args
  }), t;
}
function initializePerfettoTracing(e, t) {
  if (!J5 || !e) return;
  let n = activeSpans.get(e);
  if (!n) return;
  let r = hhe(),
    o = r - n.startTime,
    s = {
      ...n.args,
      decision: t?.decision,
      source: t?.source,
      duration_ms: o / 1000
    };
  traceEvents.push({
    name: n.name,
    cat: n.category,
    ph: "E",
    ts: r,
    pid: n.agentInfo.processId,
    tid: n.agentInfo.threadId,
    args: s
  }), activeSpans.delete(e);
}
function registerAgentMetadata(agentInfo, t, n) {
  if (!J5) return;
  let r = tMt();
  traceEvents.push({
    name: agentInfo,
    cat: t,
    ph: "i",
    ts: hhe(),
    pid: r.processId,
    tid: r.threadId,
    args: n
  });
}
function isPerfettoEnabled(e) {
  if (!J5) return "";
  let t = Bkn(),
    n = tMt();
  return activeSpans.set(t, {
    name: "Interaction",
    category: "interaction",
    startTime: hhe(),
    agentInfo: n,
    args: {
      user_prompt_length: e?.length
    }
  }), traceEvents.push({
    name: "Interaction",
    cat: "interaction",
    ph: "B",
    ts: activeSpans.get(t).startTime,
    pid: n.processId,
    tid: n.threadId,
    args: activeSpans.get(t).args
  }), t;
}
function registerAgentInfo(agentId) {
  if (!J5 || !agentId) return;
  let t = activeSpans.get(agentId);
  if (!t) return;
  let n = hhe(),
    r = n - t.startTime;
  traceEvents.push({
    name: t.name,
    cat: t.category,
    ph: "E",
    ts: n,
    pid: t.agentInfo.processId,
    tid: t.agentInfo.threadId,
    args: {
      ...t.args,
      duration_ms: r / 1000
    }
  }), activeSpans.delete(agentId);
}
var J5 = false,
  metadataEvents,
  traceEvents,
  activeSpans,
  agentInfoRegistry,
  uZi = 0,
  S2d = 0,
  b2d = 0,
  _7r = 1,
  processIdMap;
var initPerfettoTracing = b(() => {
  ct();
  Jd();
  je();
  an();
  St();
  Xt();
  Sf();
  metadataEvents = [], traceEvents = [], activeSpans = new Map(), agentInfoRegistry = new Map(), processIdMap = new Map();
});
export {dZi as vaa,pZi as waa,tMt as sFt,hhe as Gge,Bkn as mDn,mZi as kaa,E2d as D7d,ghe as Vge,Fkn as fDn,S$e as X9e,hashAgentNameToThreadId as Haa,getOrAssignProcessId as Iaa,getOrCreateCurrentAgentInfo as xaa,getMicrosecondTimestamp as Daa,createSpanId as Paa,initializePerfettoTracing as Oaa,registerAgentMetadata as Laa,isPerfettoEnabled as Maa,registerAgentInfo as Naa,J5 as IW,metadataEvents as qXr,traceEvents as isFastModeEligible,activeSpans as Q0,agentInfoRegistry as pDn,uZi as Raa,S2d as I7d,b2d as x7d,_7r as WXr,processIdMap as GXr,initPerfettoTracing as Zst};
