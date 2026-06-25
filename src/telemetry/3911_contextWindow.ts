// @ts-nocheck
import {getCurrentProjectConfig,saveCurrentProjectConfig,tr as Qn} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {CR as hw} from "../../vendor/m450.ts";
import {iE as nE,DRe as YCe,GS as jS} from "../api/2028_used.ts";
import {getSdkBetas,setCostStateForRestore,getTotalCostUSD,getTotalAPIDuration,getTotalAPIDurationWithoutRetries,getTotalToolDuration,getTotalDuration,getTotalLinesAdded,getTotalLinesRemoved,getTotalInputTokens,getTotalOutputTokens,getTotalCacheCreationInputTokens,getTotalCacheReadInputTokens,getTotalWebSearchRequests,getModelUsage,getSessionId,hasUnknownModelCost,getUsageForModel,addToTotalCostState,getCostCounter,getTokenCounter,lt} from "../session/0132_sent.ts";
import {isShuttingDown as Bk,isAmberSentinelEnabled as ym} from "../config/3348_flushAnalyticsSinks.ts";
import {Yxt as bHt,vu as $u} from "../mcp/2200_mcpServerName.ts";
import {getCanonicalName,Ro as Mo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {formatNumber,formatDuration,Xo as ps} from "../../vendor/m240.ts";
import {bt as _t,Gc as cu} from "../../vendor/m588.ts";
import {oO as H1} from "../agent/2193_kind.ts";
import {$l as uc,WS as tE} from "../api/1453_month.ts";
import {$nt as Met,JETBRAINS_IDE_NAMES as wF,Fhe as vAe} from "../agent/2600_attributionMcpServer.ts";
import {cBa as cMa,yte as Hte} from "../config/3910_claude_haiku_4_5.ts";
import {SQ as Koe,h7 as P8} from "./1454_model.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {b} from "../../runtime.ts";
import {YU as B3} from "../../vendor/m459.ts";
function dlo(e) {
  let t = getCurrentProjectConfig();
  if (t.lastSessionId !== e) return;
  let n;
  if (t.lastModelUsage) n = hw(t.lastModelUsage, (r, o) => ({
    ...r,
    contextWindow: nE(o, getSdkBetas()),
    maxOutputTokens: YCe(o).default
  }));
  return {
    totalCostUSD: t.lastCost ?? 0,
    totalAPIDuration: t.lastAPIDuration ?? 0,
    totalAPIDurationWithoutRetries: t.lastAPIDurationWithoutRetries ?? 0,
    totalToolDuration: t.lastToolDuration ?? 0,
    totalLinesAdded: t.lastLinesAdded ?? 0,
    totalLinesRemoved: t.lastLinesRemoved ?? 0,
    lastDuration: t.lastDuration,
    modelUsage: n
  };
}
function M2n(e) {
  let t = dlo(e);
  if (!t) return !1;
  return setCostStateForRestore(t), !0;
}
function D$t(e) {
  saveCurrentProjectConfig(t => ({
    ...t,
    lastCost: getTotalCostUSD(),
    lastAPIDuration: getTotalAPIDuration(),
    lastAPIDurationWithoutRetries: getTotalAPIDurationWithoutRetries(),
    lastToolDuration: getTotalToolDuration(),
    lastDuration: getTotalDuration(),
    lastLinesAdded: getTotalLinesAdded(),
    lastLinesRemoved: getTotalLinesRemoved(),
    lastTotalInputTokens: getTotalInputTokens(),
    lastTotalOutputTokens: getTotalOutputTokens(),
    lastTotalCacheCreationInputTokens: getTotalCacheCreationInputTokens(),
    lastTotalCacheReadInputTokens: getTotalCacheReadInputTokens(),
    lastTotalWebSearchRequests: getTotalWebSearchRequests(),
    lastFpsAverage: e?.averageFps,
    lastFpsLow1Pct: e?.low1PctFps,
    lastGracefulShutdown: Bk(),
    lastVersionBase: bHt(),
    lastModelUsage: hw(getModelUsage(), n => ({
      inputTokens: n.inputTokens,
      outputTokens: n.outputTokens,
      cacheReadInputTokens: n.cacheReadInputTokens,
      cacheCreationInputTokens: n.cacheCreationInputTokens,
      webSearchRequests: n.webSearchRequests,
      costUSD: n.costUSD
    })),
    lastSessionId: getSessionId()
  }));
}
function rUa(e, t = 4) {
  return `$${e > 0.5 ? Fvp(e, 100).toFixed(2) : e.toFixed(t)}`;
}
function Nvp() {
  let e = getModelUsage();
  if (Object.keys(e).length === 0) return "Usage:                 0 input, 0 output, 0 cache read, 0 cache write";
  let t = new Map();
  for (let [r, o] of Object.entries(e)) {
    let s = getCanonicalName(r),
      i = t.get(s);
    if (!i) i = {
      inputTokens: 0,
      outputTokens: 0,
      cacheReadInputTokens: 0,
      cacheCreationInputTokens: 0,
      webSearchRequests: 0,
      costUSD: 0,
      contextWindow: 0,
      maxOutputTokens: 0
    }, t.set(s, i);
    i.inputTokens += o.inputTokens, i.outputTokens += o.outputTokens, i.cacheReadInputTokens += o.cacheReadInputTokens, i.cacheCreationInputTokens += o.cacheCreationInputTokens, i.webSearchRequests += o.webSearchRequests, i.costUSD += o.costUSD;
  }
  let n = "Usage by model:";
  for (let [r, o] of t) {
    let s = `  ${formatNumber(o.inputTokens)} input, ${formatNumber(o.outputTokens)} output, ${formatNumber(o.cacheReadInputTokens)} cache read, ${formatNumber(o.cacheCreationInputTokens)} cache write` + (o.webSearchRequests > 0 ? `, ${formatNumber(o.webSearchRequests)} web search` : "") + ` (${rUa(o.costUSD)})`;
    n += `
` + `${r}:`.padStart(21) + s;
  }
  return n;
}
function Bvp(e) {
  if (e.includes("fable")) return "fable";
  if (e.includes("opus")) return "opus";
  if (e.includes("sonnet")) return "sonnet";
  if (e.includes("haiku")) return "haiku";
  return e;
}
function oUa() {
  let e = getModelUsage(),
    t = Object.entries(e);
  if (t.length === 0) return null;
  let n = {},
    r = 0,
    o = 0,
    s = 0,
    i = 0;
  for (let [c, u] of t) {
    let d = Bvp(getCanonicalName(c));
    n[d] = (n[d] ?? 0) + u.costUSD, r += u.costUSD, o += u.inputTokens, s += u.cacheReadInputTokens, i += u.cacheCreationInputTokens;
  }
  let a = [];
  if (r > 0) for (let [c, u] of Object.entries(n).sort((d, p) => p[1] - d[1])) a.push(`${c}: ${Math.round(u / r * 100)}%`);
  let l = o + s + i;
  if (l > 0) a.push(`cache hit: ${Math.round(s / l * 100)}%`);
  return a.length > 0 ? `breakdown \xB7 ${a.join(" \xB7 ")}` : null;
}
function EIe() {
  let e = rUa(getTotalCostUSD()) + (hasUnknownModelCost() ? " (costs may be inaccurate due to usage of unknown models)" : ""),
    t = Nvp();
  return _t.dim(`Total cost:            ${e}
Total duration (API):  ${formatDuration(getTotalAPIDuration())}
Total duration (wall): ${formatDuration(getTotalDuration())}
Total code changes:    ${getTotalLinesAdded()} ${getTotalLinesAdded() === 1 ? "line" : "lines"} added, ${getTotalLinesRemoved()} ${getTotalLinesRemoved() === 1 ? "line" : "lines"} removed
${t}`);
}
function Fvp(e, t) {
  return Math.round(e * t) / t;
}
function Uvp(e, t, n) {
  let r = getUsageForModel(n) ?? {
    inputTokens: 0,
    outputTokens: 0,
    cacheReadInputTokens: 0,
    cacheCreationInputTokens: 0,
    webSearchRequests: 0,
    costUSD: 0,
    contextWindow: 0,
    maxOutputTokens: 0
  };
  return r.inputTokens += t.input_tokens, r.outputTokens += t.output_tokens, r.cacheReadInputTokens += t.cache_read_input_tokens ?? 0, r.cacheCreationInputTokens += t.cache_creation_input_tokens ?? 0, r.webSearchRequests += t.server_tool_use?.web_search_requests ?? 0, r.costUSD += e, r.contextWindow = nE(n, getSdkBetas()), r.maxOutputTokens = YCe(n).default, r;
}
function Cce(e, t, n, r, o, s, i, a, l) {
  let c = Uvp(e, t, n);
  addToTotalCostState(e, c, n);
  let u = H1(r),
    d = {
      model: n,
      ...(uc() && t.speed === "fast" && {
        speed: "fast"
      }),
      ...(u && {
        query_source: u
      }),
      ...(o && {
        effort: o
      }),
      ...Met(r, wF(r, s, i, a, l))
    };
  getCostCounter()?.add(e, d), getTokenCounter()?.add(t.input_tokens, {
    ...d,
    type: "input"
  }), getTokenCounter()?.add(t.output_tokens, {
    ...d,
    type: "output"
  }), getTokenCounter()?.add(t.cache_read_input_tokens ?? 0, {
    ...d,
    type: "cacheRead"
  }), getTokenCounter()?.add(t.cache_creation_input_tokens ?? 0, {
    ...d,
    type: "cacheCreation"
  });
  let p = e;
  for (let m of cMa(t)) {
    let f = Koe(m.model, m);
    logEvent("tengu_advisor_tool_token_usage", {
      advisor_model: m.model,
      input_tokens: m.input_tokens,
      output_tokens: m.output_tokens,
      cache_read_input_tokens: m.cache_read_input_tokens ?? 0,
      cache_creation_input_tokens: m.cache_creation_input_tokens ?? 0,
      cost_usd_micros: Math.round(f * 1e6)
    }), p += Cce(f, m, m.model, r, void 0, s, i, a, l);
  }
  return p;
}
var H9 = b(() => {
  cu();
  B3();
  lt();
  Ct();
  $u();
  Hte();
  Qn();
  jS();
  tE();
  ps();
  ym();
  vAe();
  Mo();
  P8();
});
export {dlo as Tuo,M2n as w$n,D$t as K9t,rUa as dBa,Nvp as Ywp,Bvp as Jwp,oUa as pBa,EIe as q0e,Fvp as Xwp,Uvp as Qwp,Cce as Tte,H9 as V$};
