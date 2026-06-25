// @ts-nocheck
import {nt as rt,Za as hl} from "../../vendor/m127.ts";
import {nv as Kw,_aa as nZi,yaa as rZi,Taa as oZi,Saa as sZi,baa as iZi,A1 as tN,qHe as Lxe} from "../telemetry/3195_content.ts";
import {Wge as Ahe,$Xr as h7r} from "../../vendor/m3195.ts";
import {K2e as EUe,qvn as hEn} from "../config/2604_ISSUES_EXPLAINER.ts";
import {Vge as ghe,Maa as SZi,Naa as bZi,Haa as fZi,Laa as TZi,Iaa as AZi,xaa as hZi,Paa as _Zi,Oaa as yZi,Daa as gZi,Zst as Hrt} from "../config/3197_agentId.ts";
import {getIsNonInteractiveSession as kr,lt as ct} from "../session/0132_sent.ts";
import {y7 as D7,Ph as y_} from "./1459_agentType.ts";
import {net as FXe,If as IA,vu as od} from "../mcp/2200_mcpServerName.ts";
import {b,x as L} from "../../runtime.ts";
import {dn as an} from "../config/0137_namespace.ts";
import {xi as Ji} from "../../vendor/m2096.ts";
import {pg as ng} from "../../vendor/m2138.ts";
// @ts-nocheck
function S7r() {
  let e = process.env.CLAUDE_CODE_ENHANCED_TELEMETRY_BETA ?? process.env.ENABLE_ENHANCED_TELEMETRY_BETA;
  if (rt(e)) return true;
  if (hl(e)) return false;
  return false;
}
function bq() {
  return S7r() || Kw();
}
function Hae() {
  return false;
}
function oMt(e, t) {
  return;
}
function E$e(e, t) {
  e.setStatus({
    code: BA.SpanStatusCode.ERROR,
    ...(t && {
      message: t
    })
  });
}
function wZi(e, t) {
  if (!t) return;
  e.setAttribute("tool_use_id", t), e.setAttribute("gen_ai.tool.call.id", t);
}
function isRunnableShell() {
  return BA.trace.getTracer("com.anthropic.claude_code.tracing", "1.0.0");
}
function detectShellPath() {
  let shellOverride = Ahe.active();
  return shellOverride === BA.ROOT_CONTEXT && rMt ? rMt : shellOverride;
}
function buildBashProvider(e) {
  let t = detectShellPath().getValue(e);
  return t && !t.ended ? t : undefined;
}
function detectShellName(e, t) {
  Nxe.set(t.span, t);
  let n = BA.trace.setSpan(t.priorContext, t.span).setValue(e, t);
  if (Ahe.enterWith(n), e === Mxe) rMt = n;
}
function clearShellProviderCache(e, t) {
  if (t.ended = true, e === Mxe && rMt?.getValue(e) === t) rMt = undefined;
  if (detectShellPath().getValue(e) === t) Ahe.enterWith(t.priorContext);
}
function executeShellCommand(command, t = {}) {
  return {
    ...EUe(),
    "span.type": command,
    ...t
  };
}
function setShellCwd(newCwd) {
  let t = ghe() ? SZi(newCwd) : undefined,
    n = detectShellPath();
  if (!bq()) {
    if (t) {
      let c = BA.trace.getActiveSpan() || isRunnableShell().startSpan("dummy");
      return detectShellName(Mxe, {
        span: c,
        startTime: performance.now(),
        attributes: {
          "span.type": "interaction"
        },
        perfettoSpanId: t,
        priorContext: n
      }), c;
    }
    return BA.trace.getActiveSpan() || isRunnableShell().startSpan("dummy");
  }
  let r = isRunnableShell(),
    s = rt(process.env.OTEL_LOG_USER_PROMPTS) ? newCwd : "<REDACTED>";
  EZi++;
  let i = executeShellCommand("interaction", {
      user_prompt: s,
      user_prompt_length: newCwd.length,
      "interaction.sequence": EZi
    }),
    a = kr() && process.env.TRACEPARENT ? BA.propagation.extract(n, {
      traceparent: process.env.TRACEPARENT,
      tracestate: process.env.TRACESTATE
    }) : n,
    l = r.startSpan("claude_code.interaction", {
      attributes: i
    }, a);
  return nZi(l, newCwd), detectShellName(Mxe, {
    span: l,
    startTime: performance.now(),
    attributes: i,
    perfettoSpanId: t,
    priorContext: n
  }), l;
}
function setShellCwdLine(line, options) {
  let n = detectShellPath();
  setShellCwd(line);
  let r = detectShellPath();
  try {
    return Ahe.with(r, options);
  } finally {
    if (detectShellPath() === r) Ahe.enterWith(n);
  }
}
function buildStdio() {
  let e = buildBashProvider(Mxe);
  if (!e) return;
  if (e.perfettoSpanId) bZi(e.perfettoSpanId);
  if (!bq()) {
    clearShellProviderCache(Mxe, e);
    return;
  }
  let t = Math.max(0, Math.round(performance.now() - e.startTime));
  e.span.setAttributes({
    "interaction.duration_ms": t
  }), e.span.end(), clearShellProviderCache(Mxe, e);
}
function RZi(e, t, n, r, o) {
  let s = ghe() ? fZi({
      model: e,
      querySource: n?.querySource,
      messageId: undefined
    }) : undefined,
    i = detectShellPath();
  if (!bq()) {
    if (s) {
      let d = BA.trace.getActiveSpan() || isRunnableShell().startSpan("dummy");
      return Nxe.set(d, {
        span: d,
        startTime: performance.now(),
        attributes: {
          model: e
        },
        perfettoSpanId: s,
        priorContext: i
      }), d;
    }
    return BA.trace.getActiveSpan() || isRunnableShell().startSpan("dummy");
  }
  let a = isRunnableShell(),
    l = detectShellPath().getValue(b$e),
    c = executeShellCommand("llm_request", {
      model: e,
      "gen_ai.system": "anthropic",
      "gen_ai.request.model": e,
      "llm_request.context": l ? "tool" : buildBashProvider(Mxe) ? "interaction" : "standalone",
      speed: o ? "fast" : "normal"
    }),
    u = a.startSpan("claude_code.llm_request", {
      attributes: c
    }, i);
  if (n?.querySource) u.setAttribute("query_source", n.querySource);
  if (t && !D7(t)) {
    if (t.agentId) u.setAttribute("agent_id", t.agentId);
    if (t.parentAgentId) u.setAttribute("parent_agent_id", t.parentAgentId);
  }
  return rZi(u, n, r), Nxe.set(u, {
    span: u,
    startTime: performance.now(),
    attributes: c,
    perfettoSpanId: s,
    priorContext: i
  }), u;
}
function xZi(e, {
  attempt: t,
  clientRequestId: n
}) {
  let r = {
    attempt: t
  };
  if (n !== undefined) r.client_request_id = n;
  if (e && bq()) e.addEvent("gen_ai.request.attempt", r);
  TZi("LLM Attempt", "api,attempt", r);
}
function w2d(e) {
  let t = v2d.extract(BA.ROOT_CONTEXT, {
    traceparent: e
  }, BA.defaultTextMapGetter);
  return BA.trace.getSpanContext(t);
}
function b7r(e, t) {
  if (!e) return;
  let n = Nxe.get(e);
  if (!n || n.ended) return;
  n.ended = true;
  let r = Math.max(0, Math.round(performance.now() - n.startTime));
  if (n.perfettoSpanId) AZi(n.perfettoSpanId, {
    ttftMs: t?.ttftMs,
    ttltMs: r,
    promptTokens: t?.inputTokens,
    outputTokens: t?.outputTokens,
    cacheReadTokens: t?.cacheReadTokens,
    cacheCreationTokens: t?.cacheCreationTokens,
    success: t?.success,
    error: t?.error,
    requestSetupMs: t?.requestSetupMs,
    attemptStartTimes: t?.attemptStartTimes,
    requestId: t?.requestId,
    clientRequestId: t?.clientRequestId
  });
  if (!bq()) return;
  let o = {
    duration_ms: r
  };
  if (t) {
    if (t.inputTokens !== undefined) o.input_tokens = t.inputTokens;
    if (t.outputTokens !== undefined) o.output_tokens = t.outputTokens;
    if (t.cacheReadTokens !== undefined) o.cache_read_tokens = t.cacheReadTokens;
    if (t.cacheCreationTokens !== undefined) o.cache_creation_tokens = t.cacheCreationTokens;
    if (t.success !== undefined) o.success = t.success;
    if (t.statusCode !== undefined) o.status_code = t.statusCode;
    if (t.error !== undefined) o.error = t.error;
    if (t.attempt !== undefined) o.attempt = t.attempt;
    if (t.hasToolCall !== undefined) o["response.has_tool_call"] = t.hasToolCall;
    if (t.requestId !== undefined) o.request_id = t.requestId, o["gen_ai.response.id"] = t.requestId;
    if (t.clientRequestId !== undefined) o.client_request_id = t.clientRequestId;
    if (t.ttftMs !== undefined) o.ttft_ms = t.ttftMs;
    oZi(o, t);
  }
  if (n.span.setAttributes(o), t?.stopReason !== undefined) n.span.setAttribute("stop_reason", t.stopReason), n.span.setAttribute("gen_ai.response.finish_reasons", [t.stopReason]);
  if (t?.success === false) n.span.setStatus({
    code: BA.SpanStatusCode.ERROR,
    message: t.error
  });
  if (t?.traceresponse) {
    let s = w2d(t.traceresponse);
    if (s) n.span.addLink({
      context: s,
      attributes: {
        "link.type": "parent_of"
      }
    });
  }
  n.span.end();
}
function kZi(e, t, n, r, o) {
  let s = ghe() ? hZi(e, n) : undefined,
    i = detectShellPath();
  if (!bq()) {
    if (s) {
      let u = BA.trace.getActiveSpan() || isRunnableShell().startSpan("dummy");
      return detectShellName(b$e, {
        span: u,
        startTime: performance.now(),
        attributes: {
          "span.type": "tool",
          tool_name: e
        },
        perfettoSpanId: s,
        priorContext: i
      }), u;
    }
    return BA.trace.getActiveSpan() || isRunnableShell().startSpan("dummy");
  }
  let a = isRunnableShell(),
    l = executeShellCommand("tool", {
      tool_name: e,
      ...n
    }),
    c = a.startSpan("claude_code.tool", {
      attributes: l
    }, i);
  if (t && !D7(t)) {
    if (t.agentId) c.setAttribute("agent_id", t.agentId);
    if (t.parentAgentId) c.setAttribute("parent_agent_id", t.parentAgentId);
  }
  if (wZi(c, o), r) sZi(c, e, r);
  return detectShellName(b$e, {
    span: c,
    startTime: performance.now(),
    attributes: l,
    perfettoSpanId: s,
    priorContext: i
  }), c;
}
function HZi() {
  let e = ghe() ? _Zi("tool_permission") : undefined,
    t = detectShellPath();
  if (!bq()) {
    if (e) {
      let s = BA.trace.getActiveSpan() || isRunnableShell().startSpan("dummy");
      return detectShellName(nMt, {
        span: s,
        startTime: performance.now(),
        attributes: {
          "span.type": "tool.blocked_on_user"
        },
        perfettoSpanId: e,
        priorContext: t
      }), s;
    }
    return BA.trace.getActiveSpan() || isRunnableShell().startSpan("dummy");
  }
  let n = isRunnableShell(),
    r = executeShellCommand("tool.blocked_on_user"),
    o = n.startSpan("claude_code.tool.blocked_on_user", {
      attributes: r
    }, t);
  return detectShellName(nMt, {
    span: o,
    startTime: performance.now(),
    attributes: r,
    perfettoSpanId: e,
    priorContext: t
  }), o;
}
function $kn(e, t) {
  let n = buildBashProvider(nMt);
  if (!n) return;
  if (n.perfettoSpanId) yZi(n.perfettoSpanId, {
    decision: e,
    source: t
  });
  if (!bq()) {
    clearShellProviderCache(nMt, n);
    return;
  }
  let o = {
    duration_ms: Math.max(0, Math.round(performance.now() - n.startTime))
  };
  if (e) o.decision = e;
  if (t) o.source = t;
  n.span.setAttributes(o), n.span.end(), clearShellProviderCache(nMt, n);
}
function IZi(e) {
  let t = detectShellPath();
  if (!bq()) return BA.trace.getActiveSpan() || isRunnableShell().startSpan("dummy");
  let n = isRunnableShell(),
    r = executeShellCommand("tool.execution"),
    o = n.startSpan("claude_code.tool.execution", {
      attributes: r
    }, t);
  return wZi(o, e), detectShellName(T7r, {
    span: o,
    startTime: performance.now(),
    attributes: r,
    priorContext: t
  }), o;
}
function E7r(e) {
  if (!bq()) return;
  let t = buildBashProvider(T7r);
  if (!t) return;
  let r = {
    duration_ms: Math.max(0, Math.round(performance.now() - t.startTime))
  };
  if (e) {
    if (e.success !== undefined) r.success = e.success;
    if (e.error !== undefined) r.error = e.error;
  }
  if (t.span.setAttributes(r), e?.success === false) t.span.setStatus({
    code: BA.SpanStatusCode.ERROR,
    message: e.error
  });
  t.span.end(), clearShellProviderCache(T7r, t);
}
function sMt(e, t, n) {
  let r = e ? Nxe.get(e) : buildBashProvider(b$e);
  if (!r || r.ended) return;
  if (r.perfettoSpanId) gZi(r.perfettoSpanId, {
    success: true,
    resultTokens: n
  });
  if (!bq()) {
    clearShellProviderCache(b$e, r);
    return;
  }
  let s = {
    duration_ms: Math.max(0, Math.round(performance.now() - r.startTime))
  };
  if (t) {
    let i = r.attributes.tool_name || "unknown";
    iZi(s, i, t);
  }
  if (n !== undefined) s.result_tokens = n;
  r.span.setAttributes(s), r.span.end(), clearShellProviderCache(b$e, r);
}
function DZi(e, t) {
  if (!bq() || !FXe()) return;
  let n = buildBashProvider(b$e);
  if (!n) return;
  let r = {};
  for (let [o, s] of Object.entries(t)) if (typeof s === "string") {
    let {
      content: i,
      truncated: a
    } = tN(s);
    if (r[o] = i, a) r[`${o}_truncated`] = true, r[`${o}_original_length`] = s.length;
  } else r[o] = s;
  n.span.addEvent(e, r);
}
function C7r(e) {
  if (!bq()) return;
  let t = e.spanContext();
  if (!t.traceId || t.traceId === "00000000000000000000000000000000") return;
  let n = BA.trace.setSpan(BA.context.active(), e),
    r = {};
  return BA.propagation.inject(n, r), r.traceparent;
}
function qkn() {
  if (!bq()) return;
  let e = BA.trace.getSpan(detectShellPath());
  if (!e) return;
  return C7r(e);
}
function iMt(e, t) {
  if (!Hae()) return;
  return isRunnableShell().startSpan(e, {
    attributes: {
      ...EUe(),
      "span.type": t.spanType,
      ...t.attrs
    }
  }, detectShellPath());
}
async function PZi(e, t, n) {
  let r = iMt(e, t);
  if (!r) return n(undefined);
  let o = BA.trace.setSpan(detectShellPath(), r);
  return Ahe.with(o, async () => {
    try {
      return await n(r);
    } catch (s) {
      if (!t.isExpectedError?.(s)) {
        if (s instanceof Error) r.recordException(s);
        E$e(r, s instanceof Error ? s.message : String(s));
      }
      throw s;
    } finally {
      r.end();
    }
  });
}
function OZi(e) {
  if (!Hae()) return;
  let t = detectShellPath(),
    n = executeShellCommand("subagent.spawn", {
      agent_id: e.agentId,
      agent_type: e.agentType,
      ...(e.parentAgentId && {
        parent_agent_id: e.parentAgentId
      })
    }),
    r = isRunnableShell().startSpan("claude_code.subagent.spawn", {
      attributes: n
    }, t);
  return detectShellName(vZi, {
    span: r,
    startTime: performance.now(),
    attributes: n,
    priorContext: t
  }), r;
}
function LZi(e, t) {
  if (!e) return;
  let n = Nxe.get(e);
  if (!n || n.ended) return;
  if (t?.success !== undefined) e.setAttribute("success", t.success);
  if (t?.error) e.setAttribute("error", t.error), E$e(e, t.error);
  e.end(), clearShellProviderCache(vZi, n);
}
function MZi() {
  return Kw() || Hae();
}
function NZi(e, t, n, r) {
  if (!MZi()) return BA.trace.getActiveSpan() || isRunnableShell().startSpan("dummy");
  let o = isRunnableShell(),
    s = detectShellPath(),
    {
      content: i
    } = tN(r),
    a = executeShellCommand("hook", {
      hook_event: e,
      hook_name: t,
      num_hooks: n,
      ...(IA() && {
        hook_definitions: i
      })
    }),
    l = o.startSpan("claude_code.hook", {
      attributes: a
    }, s);
  return Nxe.set(l, {
    span: l,
    startTime: performance.now(),
    attributes: a,
    priorContext: s
  }), l;
}
function BZi(e, t) {
  if (!MZi()) return;
  let n = Nxe.get(e);
  if (!n || n.ended) return;
  n.ended = true;
  let o = {
    duration_ms: Math.max(0, Math.round(performance.now() - n.startTime))
  };
  if (t) {
    if (t.numSuccess !== undefined) o.num_success = t.numSuccess;
    if (t.numBlocking !== undefined) o.num_blocking = t.numBlocking;
    if (t.numNonBlockingError !== undefined) o.num_non_blocking_error = t.numNonBlockingError;
    if (t.numCancelled !== undefined) o.num_cancelled = t.numCancelled;
  }
  if (n.span.setAttributes(o), t && (t.numNonBlockingError ?? 0) > 0) n.span.setStatus({
    code: BA.SpanStatusCode.ERROR,
    message: `${t.numNonBlockingError} hook(s) failed`
  });
  n.span.end();
}
var BA,
  CZi,
  Nxe,
  Mxe,
  b$e,
  nMt,
  T7r,
  vZi,
  EZi = 0,
  rMt,
  v2d;
var Eq = b(() => {
  ct();
  od();
  y_();
  an();
  hEn();
  Lxe();
  h7r();
  Hrt();
  BA = L(Ji(), 1), CZi = L(ng(), 1), Nxe = new WeakMap(), Mxe = BA.createContextKey("cc.interaction_state"), b$e = BA.createContextKey("cc.tool_state"), nMt = BA.createContextKey("cc.blocked_state"), T7r = BA.createContextKey("cc.execution_state"), vZi = BA.createContextKey("cc.subagent_state");
  v2d = new CZi.W3CTraceContextPropagator();
});
export {S7r as KXr,bq as Q4,Hae as $ae,oMt as lFt,E$e as Z9e,wZi as $aa,isRunnableShell as GO,detectShellPath as uB,buildBashProvider as eit,detectShellName as VHe,clearShellProviderCache as KHe,executeShellCommand as e3e,setShellCwd as P7d,setShellCwdLine as hDn,buildStdio as qae,RZi as qaa,xZi as Waa,w2d as L7d,b7r as zXr,kZi as Gaa,HZi as Vaa,$kn as gDn,IZi as Kaa,E7r as jXr,sMt as cFt,DZi as zaa,C7r as YXr,qkn as _Dn,iMt as uFt,PZi as jaa,OZi as Yaa,LZi as Jaa,MZi as Xaa,NZi as Qaa,BZi as Zaa,BA as Ff,CZi as Baa,Nxe as GHe,Mxe as WHe,b$e as Q9e,nMt as iFt,T7r as VXr,vZi as Uaa,EZi as Faa,rMt as aFt,v2d as O7d,Eq as Z4};
