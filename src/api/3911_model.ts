// @ts-nocheck
import {Af,S_} from "../agent/1454_agentType.ts";
import {Q8,NBe} from "../config/2021_error.ts";
import {e5,qBe,BO,rhn,jR} from "../config/2028_allowed.ts";
import {nse,Hxr,kxr,MYe} from "../../vendor/m1484.ts";
import {bQ,Q1e,BR,g1} from "../../vendor/m1445.ts";
import {Kso,zso} from "../../vendor/m3909.ts";
import {Kun,zun} from "../agent/1456_ISSUES_EXPLAINER.ts";
import {dyn,pyn} from "../core/2226_pyn.ts";
import {P4e,QRe,rb} from "../permissions/5178_level.ts";
import {normalizeModelStringForAPI,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {c3o,pYt,dr} from "../../vendor/m231.ts";
import {cB,Xt} from "../config/0228_encoding.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qe,fromEnumOpt} from "../../vendor/m5.ts";
import {getLastApiCompletionTimestamp,setLastApiCompletionTimestamp,lt} from "../session/0131_sent.ts";
import {Br,WS} from "../../vendor/m1456.ts";
import {dDt,wF,vAe} from "../agent/2589_attributionMcpServer.ts";
import {b} from "../../runtime.ts";
function tTp(e: any): any {
  let t = e.find((o: any) => o.role === "user");
  if (!t) return "";
  let n = t.content;
  if (typeof n === "string") return n;
  let r = n.find((o: any) => o.type === "text");
  return r?.type === "text" ? r.text : "";
}
async function v6(e: any): Promise<any> {
  let {
      model: t,
      system: n,
      messages: r,
      tools: o,
      tool_choice: s,
      output_format: i,
      max_tokens: a = 1024,
      maxRetries: l = 2,
      timeout: c,
      signal: u,
      skipSystemPromptPrefix: d,
      temperature: p,
      thinking: m,
      stop_sequences: f,
      extraBodyParams: A,
      onFetchAttempt: h
    } = e,
    g = Af(),
    _ = await Q8({
      maxRetries: l,
      model: t,
      source: "side_query",
      agentContext: g,
      ...(h && {
        fetchOverride: (V: any, Q: any) => (h(), globalThis.fetch(V, Q))
      })
    }),
    y = [...e5(t)],
    T = Boolean(i) && qBe(t) && nse(t, "structured_outputs");
  if (T && !y.includes(bQ)) y.push(bQ);
  let S = tTp(r),
    v = Kso(S, {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION),
    R = Kun(v, g),
    k = [R ? {
      type: "text",
      text: R
    } : null, ...(d ? [] : [{
      type: "text",
      text: dyn({
        isNonInteractive: !1,
        hasAppendSystemPrompt: !1
      })
    }]), ...(Array.isArray(n) ? n : n ? [{
      type: "text",
      text: n
    }] : [])].filter((V: any) => V !== null),
    x: any;
  if (m === !1) x = {
    type: "disabled"
  };else if (m !== void 0) x = {
    type: "enabled",
    budget_tokens: Math.min(m, a - 1)
  };
  let H = P4e(e.querySource) ? "1h" : void 0;
  if (H === "1h" && BO() && !y.includes(Q1e)) y.push(Q1e);
  let I = H ? k.map((V: any) => kOa(V, H)) : k,
    P = H ? r.map((V: any) => typeof V.content === "string" ? V : {
      ...V,
      content: V.content.map((Q: any) => kOa(Q, H))
    }) : r,
    L = normalizeModelStringForAPI(t),
    D = {
      model: L,
      max_tokens: a,
      system: I,
      messages: P,
      ...(o && {
        tools: o
      }),
      ...(s && {
        tool_choice: s
      }),
      ...(T && {
        output_config: {
          format: i
        }
      }),
      ...(p !== void 0 && rhn(L) && {
        temperature: p
      }),
      ...(f && {
        stop_sequences: f
      }),
      ...(x && {
        thinking: x
      }),
      ...(y.length > 0 && {
        betas: BR(y)
      }),
      metadata: QRe(),
      ...A
    };
  if (c3o(D)) {
    try {
      D = cB(D);
    } catch {}
    pYt(D), logEvent("tengu_lone_surrogate_sanitized", {
      source: Qe("sideQuery"),
      querySource: e.querySource
    });
  }
  let N = performance.now(),
    O = await _.beta.messages.create(D, {
      signal: u,
      ...(c !== void 0 && {
        timeout: c
      })
    }).catch((V: any) => {
      let Q = Hxr(V);
      if (Q) kxr(t, Q);
      throw V;
    }),
    $ = O._request_id ?? void 0,
    U = performance.now(),
    W = Date.now(),
    G = getLastApiCompletionTimestamp();
  return logEvent("tengu_api_success", {
    requestId: Br($),
    querySource: e.querySource,
    model: L,
    inputTokens: O.usage.input_tokens,
    outputTokens: O.usage.output_tokens,
    cachedInputTokens: O.usage.cache_read_input_tokens ?? 0,
    uncachedInputTokens: O.usage.cache_creation_input_tokens ?? 0,
    durationMsIncludingRetries: Math.max(0, Math.round(U - N)),
    stop_reason: fromEnumOpt(O.stop_reason) ?? void 0,
    timeSinceLastApiCallMs: G !== null ? Math.max(0, Math.round(W - G)) : void 0,
    ...dDt(e.querySource, wF(e.querySource, void 0, void 0))
  }), setLastApiCompletionTimestamp(W), O;
}
function kOa(e: any, t: any): any {
  if (!("cache_control" in e) || !e.cache_control || e.cache_control.ttl) return e;
  return {
    ...e,
    cache_control: {
      ...e.cache_control,
      ttl: t
    }
  };
}
var ZHe = b(() => {
  lt();
  g1();
  pyn();
  Ct();
  WS();
  rb();
  NBe();
  MYe();
  S_();
  jR();
  zun();
  zso();
  vAe();
  Mo();
  Xt();
  dr();
});
export {tTp,v6,kOa,ZHe};
