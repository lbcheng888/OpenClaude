// @ts-nocheck
import {Fa,Pd} from "../../vendor/m701.ts";
import {logForDebugging,getMinDebugLogLevel,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {BR,mYe,wun,bQ,$7,q7,ewt,ARr,fYe,A1,PH,AYe,Tme,h1,Zvt,Q1e,VEe,X1e,g1} from "../../vendor/m1445.ts";
import {st,Qe,fromEnumOpt,fromEnum,fromNumber} from "../../vendor/m5.ts";
import {getSmallFastModel,getMainLoopModel,getDefaultSonnetModel,getDefaultOpusModel,isFableModelValue,isPinnedFableModel,isMythosModelValue,normalizeModelStringForAPI,antRegistryGrants1M,getCanonicalName,isNonCustomOpusModel,isNonCustomFableModel,isNonCustomMythosModel,Mo} from "./1453_swapShrinksContextWindow.ts";
import {je} from "../../vendor/m577.ts";
import {getAPIProvider,isFirstPartyAnthropicBaseUrl,y_,isFirstPartyAnthropicHost,isFirstPartyApiBackend,getAPIProviderForAnalytics,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {isClaudeAISubscriber,getOauthAccountInfo,isWIFDispatchAuth,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {Hk,qwn,jwn,PF} from "../api/2739_status.ts";
import {getPromptCache1hAllowlist,setPromptCache1hAllowlist,getSessionId,getStickyBetas,GOe,QTe,setLastMainThreadCacheTtlMs,WOe,getThinkingTypeOverride,Rre,setThinkingTypeOverride,setLastMainRequestId,$I,lt} from "../session/0131_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,getDynamicConfig_BLOCKS_ON_INIT,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {H1,Fg} from "../agent/2188_kind.ts";
import {Lw,oZ,Mfe,Om} from "../config/2215_level.ts";
import {BO,qBe,e5,dXe,Lti,QCe,wLr,ohn,kLr,gkt,rhn,HLr,jR} from "../config/2028_allowed.ts";
import {nse,r3s,vdn,kwt,MYe} from "../../vendor/m1484.ts";
import {getOrCreateUserID,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {AFa,gqe} from "../tools/4028_maxEditDistance.ts";
import {Tzn,hM,RPe,B9e} from "../api/5191_model.ts";
import {Q8,iXe,fLr,ALr,KAn,NBe} from "../config/2021_error.ts";
import {Af,V7,S_} from "../agent/1454_agentType.ts";
import {Ie,Oe,ln} from "../telemetry/0594_feature_name.ts";
import {TH,es,xm,E3} from "../../vendor/m135.ts";
import {De,Ken,Rn} from "../session/0615_length.ts";
import {Pw} from "../../vendor/m2207.ts";
import {A$} from "../../vendor/m2227.ts";
import {tgo,N6n,rgo} from "../config/4415_encoding.ts";
import {Iot,Kae} from "../../vendor/m3247.ts";
import {hKr,Wea,jea,Nq} from "../agent/3184_code.ts";
import {FUi,nRn,F2e,B2e,$Ui,UUi,vOt,eRn,o5r,Kwn,s5r,a5r,i5r,tRn,U2e,cnt,ob,fP} from "../api/2741_actualTokens.ts";
import {T_,jB,KQ,YAn,xti,YCe,jS} from "../api/2023_used.ts";
import {YAo,lQa,uQa,qqn,pQa,JAo,T4t,XAo,$qn,cQa,mQa,QAo,jqn} from "../core/4370_fallbacks.ts";
import {kn,SA} from "../config/0689_timestamp.ts";
import {uc,dk,Goe,vA,tE} from "../api/1448_month.ts";
import {getResolvedWIFBaseUrlSnapshot,LYe} from "../api/1484_withCredentialsLock.ts";
import {yre,sn} from "../config/0047_namespace.ts";
import {qNl,cIo,$Nl,WNl,uIo,kk,tc,yzn,GNl,jNl,G5t,Ln,lo} from "../tools/5190_userPromptCount.ts";
import {Cki,Eki,vki,jZ} from "../../vendor/m2510.ts";
import {hOt,Fwn} from "../telemetry/2735_base64_size_bytes.ts";
import {initCg,j1} from "../telemetry/2531_ignore1mTag.ts";
import {am,EQa,B6e} from "../config/4375_kind.ts";
import {DFi,k8r} from "../../vendor/m2731.ts";
import {RU} from "../../vendor/m4407.ts";
import {Wze,gme} from "../config/1280_BedrockClient.ts";
import {VW,aMa,uMa,Hte} from "../config/3934_claude_haiku_4_5.ts";
import {isToolSearchEnabled,extractDiscoveredToolNames,Hz} from "../tools/4414_summarizeByServerPrefix.ts";
import {isDeferredTool,Y5} from "../config/2707_isDeferredTool.ts";
import {Lc,O1,Ri} from "../tools/2227_userFacingName.ts";
import {TOOL_SEARCH_TOOL_NAME} from "../../vendor/m2692.ts";
import {D6n,lNl,oIo,K6e} from "../tools/5174_properties.ts";
import {Wn} from "../api/0459_getOauthConfig.ts";
import {xOa,zso} from "../../vendor/m3909.ts";
import {Wc} from "../api/3868_level.ts";
import {Kun,zun} from "../agent/1456_ISSUES_EXPLAINER.ts";
import {dyn,pyn} from "../core/2226_pyn.ts";
import {DNl,INl} from "../../vendor/m5176.ts";
import {ro,b} from "../../runtime.ts";
import {Iz,X2i,Q2i,Z2i,oxe} from "../mcp/2763_pendingChanges.ts";
import {Xw} from "../telemetry/3181_content.ts";
import {Br} from "../../vendor/m1456.ts";
import {ky,Rfe,$u} from "../mcp/2194_mcpServerName.ts";
import {vLr,uXe,UBe,isFastModeEligible} from "../telemetry/2027_word.ts";
import {pNl,ANl,hNl,gNl} from "../../vendor/m5174.ts";
import {tel,K4t,Lho,nel,rel,z4t} from "./4403_headers.ts";
import {PE} from "../core/4176_input_tokens.ts";
import {wF,vAe} from "../agent/2589_attributionMcpServer.ts";
import {C4n,v4n,g6e} from "../config/4304_activityCallback.ts";
import {_6n,Pho} from "../../vendor/m4401.ts";
import {aR,y4t} from "../session/4369_turn_number.ts";
import {F0a,_9} from "../config/3864_entrypoint.ts";
import {Koe,P8} from "../telemetry/1449_model.ts";
import {Cce,H9} from "../telemetry/4045_contextWindow.ts";
import {fq,ZRe,V8r,txe} from "../../vendor/m2739.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {hq,Y2e} from "../../vendor/m2769.ts";
import {wz,oN} from "../core/2729_input_tokens.ts";
import {u$,s5} from "../config/2182_s5.ts";
import {tpt,HQa,Xqn} from "../telemetry/4380_Xqn.ts";
import {Tae,Jtt} from "../../vendor/m2725.ts";
import {Lr} from "../../vendor/m578.ts";
import {zde} from "../../vendor/m168.ts";
import {dr} from "../../vendor/m231.ts";
import {F0t} from "../../vendor/m2529.ts";
import {Gte,xce} from "../../vendor/m4087.ts";
function B4e(e) {
  let t = process.env.CLAUDE_CODE_EXTRA_BODY,
    n = {};
  if (t) try {
    let r = Fa(t);
    if (r && typeof r === "object" && !Array.isArray(r)) n = {
      ...r
    };else logForDebugging(`CLAUDE_CODE_EXTRA_BODY env var must be a JSON object, but was given ${t}`, {
      level: "error"
    });
  } catch (r) {
    logForDebugging(`Error parsing CLAUDE_CODE_EXTRA_BODY: ${Se(r)}`, {
      level: "error"
    });
  }
  if (e && e.length > 0) {
    let r = BR(e);
    if (n.anthropic_beta && Array.isArray(n.anthropic_beta)) {
      let o = n.anthropic_beta,
        s = r.filter(i => !o.includes(i));
      n.anthropic_beta = [...o, ...s];
    } else n.anthropic_beta = r;
  }
  return n;
}
function PNl(e) {
  if (st(process.env.DISABLE_PROMPT_CACHING)) return !1;
  if (st(process.env.DISABLE_PROMPT_CACHING_HAIKU)) {
    let t = getSmallFastModel();
    if (t !== getMainLoopModel() && e === t) return !1;
  }
  if (st(process.env.DISABLE_PROMPT_CACHING_SONNET)) {
    let t = getDefaultSonnetModel();
    if (e === t) return !1;
  }
  if (st(process.env.DISABLE_PROMPT_CACHING_OPUS)) {
    let t = getDefaultOpusModel();
    if (e === t) return !1;
  }
  if (st(process.env.DISABLE_PROMPT_CACHING_FABLE)) {
    if (isFableModelValue(e) || isPinnedFableModel(e)) return !1;
  }
  if (je.DISABLE_PROMPT_CACHING_MYTHOS) {
    if (isMythosModelValue(e)) return !1;
  }
  return !0;
}
function Ete({
  scope: e,
  ttl: t
} = {}) {
  return {
    type: "ephemeral",
    ...(t && {
      ttl: t
    }),
    ...(e === "global" && {
      scope: e
    })
  };
}
function P4e(e) {
  if (st(process.env.FORCE_PROMPT_CACHING_5M)) return !1;
  if (st(process.env.ENABLE_PROMPT_CACHING_1H) || getAPIProvider() === "bedrock" && st(process.env.ENABLE_PROMPT_CACHING_1H_BEDROCK)) return !0;
  if (!isClaudeAISubscriber() || Hk.isUsingOverage) return !1;
  let t = getPromptCache1hAllowlist();
  if (t === null) t = getFeatureValue_CACHED_MAY_BE_STALE("tengu_prompt_cache_1h_config", {
    allowlist: ["repl_main_thread*", "sdk", "auto_mode", "memdir_relevance"]
  }).allowlist ?? [], setPromptCache1hAllowlist(t);
  return e !== void 0 && t.some(n => n.endsWith("*") ? e.startsWith(n.slice(0, -1)) : e === n);
}
function _Tm(e, t, n) {
  if (e?.type !== "disabled") return e;
  let r = Object.keys(e).filter(o => o !== "type");
  if (r.length === 0) return e;
  if (n) logEvent("tengu_thinking_disabled_sanitized", {
    hadDisplay: r.includes("display") ? Qe("true") : Qe("false"),
    extraKeyCount: r.length,
    querySourceCategory: fromEnumOpt(H1(t)),
    hasExtraBodyEnv: je.CLAUDE_CODE_EXTRA_BODY ? Qe("true") : Qe("false")
  }), logForDebugging(`[thinking] stripped ${r.length} extra key(s) from {type:'disabled'} thinking param (gh-68567)`, {
    level: "warn"
  });
  return {
    type: "disabled"
  };
}
function yTm(e, t, n, r, o) {
  if (!Lw(o)) {
    delete t.effort;
    return;
  }
  if ("effort" in t) return;
  if (e === void 0) r.push(mYe);else if (typeof e === "string") t.effort = e, r.push(mYe);
}
function TTm(e, t, n) {
  if (!e || "task_budget" in t || !BO()) return;
  if (t.task_budget = {
    type: "tokens",
    total: e.total,
    ...(e.remaining !== void 0 && {
      remaining: e.remaining
    })
  }, !n.includes(wun)) n.push(wun);
}
function STm(e, t, n, r) {
  if (!e || "format" in t || !qBe(r) || !nse(r, "structured_outputs")) return;
  if (t.format = e, !n.includes(bQ)) n.push(bQ);
}
function QRe() {
  let e = {},
    t = process.env.CLAUDE_CODE_EXTRA_METADATA;
  if (t) {
    let o = Fa(t, !1);
    if (o && typeof o === "object" && !Array.isArray(o)) e = o;else logForDebugging(`CLAUDE_CODE_EXTRA_METADATA env var must be a JSON object, but was given ${t}`, {
      level: "error"
    });
  }
  let r = {
    ...e,
    device_id: getOrCreateUserID(),
    account_uuid: getOauthAccountInfo()?.accountUuid ?? "",
    session_id: getSessionId()
  };
  return {
    user_id: Le(r)
  };
}
async function NNl(e, t) {
  if (t) return !0;
  try {
    let n = getSmallFastModel(),
      r = e5(n),
      o = await AFa(Tzn(() => Q8({
        apiKey: e,
        maxRetries: 3,
        model: n,
        source: "verify_api_key",
        agentContext: Af()
      }), async s => {
        let i = [{
          role: "user",
          content: "test"
        }];
        return await s.beta.messages.create({
          model: n,
          max_tokens: 1,
          messages: i,
          temperature: 1,
          ...(r.length > 0 && {
            betas: BR(r)
          }),
          metadata: QRe(),
          ...B4e()
        }), !0;
      }, {
        maxRetries: 2,
        model: n,
        thinkingConfig: {
          type: "disabled"
        }
      }));
    return Ie("api_key_verify"), o;
  } catch (n) {
    let r = n;
    if (n instanceof hM) r = n.originalError;
    if (r instanceof Error && r.message.includes('{"type":"error","error":{"type":"authentication_error","message":"invalid x-api-key"}}')) return logForDebugging(`API key verification failed: ${Se(r)}`, {
      level: "error"
    }), Oe("api_key_verify", "invalid_key"), !1;
    if (r instanceof TH || r instanceof es && r.status != null && r.status < 500) logForDebugging(`API key verification failed: ${Se(r)}`, {
      level: "error"
    });else De(r);
    throw Oe("api_key_verify", "network_error"), r;
  }
}
function bTm(e, t = !1, n, r) {
  if (t) if (typeof e.message.content === "string") return {
    role: "user",
    content: [{
      type: "text",
      text: e.message.content,
      ...(n && {
        cache_control: Ete({
          ttl: r
        })
      })
    }]
  };else {
    let o = ONl(e.message.content);
    return {
      role: "user",
      content: o.map((s, i) => ({
        ...s,
        ...(i === o.length - 1 ? n ? {
          cache_control: Ete({
            ttl: r
          })
        } : {} : {})
      }))
    };
  }
  return {
    role: "user",
    content: Array.isArray(e.message.content) ? ONl(e.message.content) : e.message.content
  };
}
function ONl(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    if (r.type === "text" && (typeof r.text !== "string" || r.text.trim() === "")) t ??= e.slice(0, n);else t?.push(r);
  }
  if (t === void 0) return [...e];
  return t.length > 0 ? t : [{
    type: "text",
    text: Pw
  }];
}
function ETm(e, t = !1, n, r) {
  if (t) if (typeof e.message.content === "string") return {
    role: "assistant",
    content: [{
      type: "text",
      text: e.message.content,
      ...(n && {
        cache_control: Ete({
          ttl: r
        })
      })
    }]
  };else return {
    role: "assistant",
    content: e.message.content.map((o, s) => ({
      ...o,
      ...(s === e.message.content.length - 1 && o.type !== "thinking" && o.type !== "redacted_thinking" && !A$(o) ? n ? {
        cache_control: Ete({
          ttl: r
        })
      } : {} : {})
    }))
  };
  return {
    role: "assistant",
    content: e.message.content
  };
}
async function i8e({
  messages: e,
  systemPrompt: t,
  thinkingConfig: n,
  tools: r,
  signal: o,
  options: s
}) {
  let i;
  for await (let a of tgo(e, async function* () {
    yield* UNl(e, t, n, r, o, s);
  })) if (a.type === "assistant") i = a;
  if (!i) {
    if (o.aborted) throw new xm();
    throw Error("No assistant message found");
  }
  return i;
}
async function* odt({
  messages: e,
  systemPrompt: t,
  thinkingConfig: n,
  tools: r,
  signal: o,
  options: s
}) {
  return yield* tgo(e, async function* () {
    yield* UNl(e, t, n, r, o, s);
  });
}
function CTm(e) {
  if (!("isLsp" in e) || !e.isLsp) return !1;
  let t = Iot();
  return t.status === "pending" || t.status === "not-started";
}
function vTm() {
  let e = parseInt(process.env.API_TIMEOUT_MS || "", 10);
  if (e) return e;
  return st(process.env.CLAUDE_CODE_REMOTE) ? 120000 : 300000;
}
function BNl(e) {
  if (getMinDebugLogLevel() !== "verbose") return;
  logForDebugging(`[API REQUEST DETAIL] ${Le({
    model: e.model,
    thinking: e.thinking,
    output_config: e.output_config,
    temperature: e.temperature,
    betas: e.betas ?? [],
    anthropic_beta: e.anthropic_beta
  })}`, {
    level: "verbose"
  });
}
function FNl(e, t) {
  let n = getAPIProvider(),
    r = n === "firstParty" && isFirstPartyAnthropicBaseUrl() || n === "anthropicAws" && !process.env.ANTHROPIC_AWS_BASE_URL,
    o = r ? cAt.randomUUID() : void 0,
    s = e && (r || st(process.env.CLAUDE_CODE_PROPAGATE_TRACEPARENT)) ? hKr(e) : void 0;
  return Wea(e, {
    attempt: t,
    clientRequestId: o
  }), {
    headers: {
      ...(o && {
        [iXe]: o
      }),
      ...(s && {
        traceparent: s
      })
    },
    clientRequestId: o
  };
}
async function* LNl(e, t, n, r, o, s) {
  let i = vTm(),
    a = 0,
    l = Tzn(() => Q8({
      maxRetries: 0,
      model: e.model,
      fetchOverride: e.fetchOverride,
      source: e.source,
      agentContext: e.agentContext
    }), async (u, d, p) => {
      let m = Date.now(),
        f = n(p);
      r(d, m, f.max_tokens);
      let A = FTm(f, BTm);
      BNl(A), o(A), a++;
      let {
        headers: h
      } = FNl(e.llmSpan, a);
      try {
        let g = await u.beta.messages.create({
          ...A,
          model: normalizeModelStringForAPI(A.model)
        }, {
          signal: t.signal,
          timeout: i,
          ...(Object.keys(h).length > 0 && {
            headers: h
          })
        }).withResponse();
        if (!FUi(g.data)) throw Error(`API returned an empty or malformed response (HTTP ${g.response?.status ?? "unknown"}) \u2014 check for a proxy or gateway intercepting the request`);
        let _ = g.response?.headers;
        if (_) qwn(_, t.model, (T_(t.model) || jB(t.model)) && (g.data.usage?.input_tokens ?? 0) + (g.data.usage?.cache_read_input_tokens ?? 0) + (g.data.usage?.cache_creation_input_tokens ?? 0) > KQ);
        let y = YAo(g.data.stop_details);
        {
          let T = g.data.stop_details;
          if (T && "fallback_credit_token" in T) delete T.fallback_credit_token;
        }
        return {
          message: g.data,
          requestId: g.request_id,
          creditCode: y
        };
      } catch (g) {
        if (g instanceof xm) throw g;
        throw kn("error", "cli_nonstreaming_fallback_error"), logEvent("tengu_nonstreaming_fallback_error", {
          model: e.model,
          error: g instanceof Error ? g.name : Qe("unknown"),
          attempt: d,
          timeout_ms: i,
          request_id: s ?? "unknown"
        }), g;
      }
    }, {
      model: t.model,
      fallbackModel: t.fallbackModel,
      thinkingConfig: t.thinkingConfig,
      ...(uc() && {
        fastMode: t.fastMode
      }),
      signal: t.signal,
      initialConsecutive529Errors: t.initialConsecutive529Errors,
      querySource: t.querySource,
      isNonStreamingRequest: !0,
      onError: t.onApiError,
      onRetryStatus: t.onRetryStatus
    }),
    c;
  do if (c = await l.next(), !c.done && c.value.type === "system") yield c.value; while (!c.done);
  return c.value;
}
function wTm(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (n.type === "assistant" && n.requestId) return n.requestId;
  }
  return;
}
function RTm(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (n.type === "assistant" && n.requestId && !n.isApiErrorMessage) return n.message.id;
  }
  return;
}
function xTm() {
  if (!BO()) return !1;
  let e = getAPIProvider();
  if (!(e === "firstParty" && isFirstPartyAnthropicBaseUrl() || e === "anthropicAws" && !process.env.ANTHROPIC_AWS_BASE_URL)) return !1;
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_prompt_cache_diagnostics", !1);
}
function _zn(e) {
  return e.type === "image" || e.type === "document";
}
function MNl(e) {
  return e.type === "tool_result";
}
function kTm(e, t, n = 0) {
  let r = 0;
  for (let o of e) {
    if (!Array.isArray(o.message.content)) continue;
    for (let s of o.message.content) {
      if (_zn(s)) r++;
      if (MNl(s) && Array.isArray(s.content)) {
        for (let i of s.content) if (_zn(i)) r++;
      }
    }
  }
  if (r -= t, r <= 0) return e;
  return r += n, e.map(o => {
    if (r <= 0) return o;
    let s = o.message.content;
    if (!Array.isArray(s)) return o;
    let i = r,
      a = s.map(c => {
        if (r <= 0 || !MNl(c) || !Array.isArray(c.content)) return c;
        let u = c.content.filter(d => {
          if (r > 0 && _zn(d)) return r--, !1;
          return !0;
        });
        return u.length === c.content.length ? c : {
          ...c,
          content: u
        };
      }).filter(c => {
        if (r > 0 && _zn(c)) return r--, !1;
        return !0;
      });
    if (i === r) return o;
    let l = a.length > 0 ? a : [{
      type: "text",
      text: "[media removed: request limit]"
    }];
    return {
      ...o,
      message: {
        ...o.message,
        content: l
      }
    };
  });
}
async function* DTm(e, t, n = HTm, r = ITm) {
  if (!t) {
    yield* e;
    return;
  }
  let o = e[Symbol.asyncIterator](),
    s = performance.now(),
    i = 0,
    a = null,
    l,
    c = Symbol("heartbeat");
  try {
    while (!0) {
      a ??= o.next();
      let u = new Promise(p => {
          l = setTimeout((m, f) => m(f), n, p, c), l.unref?.();
        }),
        d = await Promise.race([a, u]);
      if (clearTimeout(l), l = void 0, d === c) {
        if (t.lastAt > s && i < r) s = performance.now(), i++, yield {
          type: "ping"
        };
        continue;
      }
      if (a = null, d.done) return;
      s = performance.now(), i = 0, yield d.value;
    }
  } finally {
    if (l !== void 0) clearTimeout(l);
    try {
      Promise.resolve(o.return?.(void 0)).catch(() => {});
    } catch {}
  }
}
function PTm(e, t) {
  let n = y_(t);
  if (y_(e) !== n) return !1;
  switch (n) {
    case "gateway":
      return !1;
    case "firstParty":
      {
        if (!isFirstPartyAnthropicBaseUrl()) return !1;
        if (je._CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL || je.ANTHROPIC_BASE_URL !== void 0 || !isWIFDispatchAuth()) return !0;
        let r = getResolvedWIFBaseUrlSnapshot();
        return r === null || r !== void 0 && isFirstPartyAnthropicHost(r);
      }
    case "bedrock":
      return je.ANTHROPIC_BEDROCK_BASE_URL === void 0;
    case "mantle":
      return je.ANTHROPIC_BEDROCK_MANTLE_BASE_URL === void 0;
    case "foundry":
      return !0;
    case "anthropicAws":
      return je.ANTHROPIC_AWS_BASE_URL === void 0;
    case "vertex":
      return je.ANTHROPIC_VERTEX_BASE_URL === void 0 && yre(e) === yre(t);
  }
}
function OTm(e, t) {
  let n = t.bodyModel ?? t.model,
    r = qNl(e, normalizeModelStringForAPI(n)),
    o = T_(n) || jB(n) || t.betas.includes($7) || YAn(n) !== null || antRegistryGrants1M(n),
    s = l => {
      if (!t.useToolSearch) l = l.map(c => {
        switch (c.type) {
          case "user":
            return cIo(c);
          case "assistant":
            return $Nl(c);
          default:
            return c;
        }
      });
      if (l = WNl(l), !t.advisorModel) l = uIo(l);
      return kTm(l, o ? Cki : Eki, vki);
    },
    i = kk(r, t.tools, t.midConvLatchedOff ? void 0 : n);
  hOt(i, initCg(t.model).maxBase64Size), am("query_message_normalization_end"), i = s(i);
  let a = null;
  if (!t.midConvLatchedOff && t.betas.includes(q7)) {
    let l = i;
    a = l.some(c => c.type === "api_system") ? () => s(kk(r, t.tools)) : () => l;
  }
  return {
    messagesPreNormalize: r,
    messagesForAPI: i,
    midConvFallback: a
  };
}
async function* UNl(e, t, n, r, o, s) {
  let i = getCanonicalName(s.model);
  if (!isClaudeAISubscriber() && (isNonCustomOpusModel(i) || isNonCustomFableModel(i) || isNonCustomMythosModel(i)) && (await getDynamicConfig_BLOCKS_ON_INIT("tengu-off-switch", {
    activated: !1
  })).activated) {
    logEvent("tengu_off_switch_query", {}), yield nRn(Error(isNonCustomFableModel(i) ? F2e : B2e), s.model);
    return;
  }
  let a = null;
  try {
    a = await DFi(i);
  } catch (vn) {
    logForDebugging(`tengu-model-error-overrides block check failed: ${vn}`, {
      level: "error"
    });
  }
  if (a !== null) {
    if (s.fallbackModel !== void 0) throw logEvent("tengu_off_switch_query", {
      tier: Qe("per_model_block"),
      outcome: Qe("fallback")
    }), new RU(s.model, s.fallbackModel, "model_blocked");
    logEvent("tengu_off_switch_query", {
      tier: Qe("per_model_block")
    }), yield tc({
      content: a,
      error: "rate_limit"
    });
    return;
  }
  let l = wTm(e),
    c = RTm(e),
    u = getAPIProvider() === "bedrock" && s.model.includes("application-inference-profile") ? (await Wze(normalizeModelStringForAPI(s.model))) ?? s.model : s.model;
  am("query_tool_schema_build_start");
  let d = s.querySource.startsWith("repl_main_thread") || s.querySource.startsWith("agent:") || s.querySource === "sdk" || s.querySource === "hook_agent" || s.querySource === "verification_agent",
    p = dXe(s.model, {
      isAgenticQuery: d
    });
  if (n.type === "disabled" || !!s.fastMode) p = p.filter(vn => vn !== ewt);
  let m = getCanonicalName(u);
  if (VW() && BO()) p.push(ARr);
  let f = s.fallbackCreditCode !== void 0 && s.fallbackCreditMintModel !== void 0 && PTm(s.fallbackCreditMintModel, s.model),
    A = f ? s.fallbackCreditMintModel : void 0,
    h = A ?? s.model,
    g = d ? aMa(s.advisorModel, h) : void 0,
    _ = await isToolSearchEnabled(h, r, s.getToolPermissionContext, s.agents, "query"),
    y = new Set();
  if (_) {
    for (let vn of r) if (isDeferredTool(vn)) y.add(vn.name);
  }
  if (_ && y.size === 0 && !s.hasPendingMcpServers) logForDebugging("Tool search disabled: no deferred tools available to search"), _ = !1;
  let T;
  if (_) {
    let vn = extractDiscoveredToolNames(e);
    T = r.filter(Hr => {
      if (!y.has(Hr.name)) return !0;
      if (Lc(Hr, TOOL_SEARCH_TOOL_NAME)) return !0;
      return vn.has(Hr.name);
    });
  } else T = r.filter(vn => {
    if (Lc(vn, TOOL_SEARCH_TOOL_NAME)) return !1;
    return !0;
  });
  let S = y_(s.model),
    v = _ ? Lti() : null;
  if (v && S !== "bedrock") {
    if (!p.includes(v)) p.push(v);
  }
  let R = QCe(),
    k = vn => _ && (y.has(vn.name) || CTm(vn)),
    x = R && T.some(vn => vn.isMcp === !0 && !k(vn));
  if (R && !p.includes(fYe)) p.push(fYe);
  let H = R ? x ? "none" : "system_prompt" : "none",
    I = await Promise.all(T.map(vn => D6n(vn, {
      getToolPermissionContext: s.getToolPermissionContext,
      tools: r,
      agents: s.agents,
      allowedAgentTypes: s.allowedAgentTypes,
      model: h,
      deferLoading: k(vn)
    })));
  if (_) {
    let vn = Wn(T, Hr => y.has(Hr.name));
    logForDebugging(`Dynamic tool loading: ${vn}/${y.size} deferred tools included`);
  }
  if (am("query_tool_schema_build_end"), logEvent("tengu_api_before_normalize", {
    preNormalizedMessageCount: e.length
  }), am("query_message_normalization_start"), A !== void 0) logEvent("tengu_fallback_credit_strip_as_mint_model", {});
  let P = s.stickyBetas ?? getStickyBetas(),
    L = !1;
  if (GOe(P, q7)) L = !0, p = p.filter(vn => vn !== q7);
  if (A !== void 0) {
    let vn = dXe(A, {
        isAgenticQuery: d
      }),
      Hr = qo => {
        if (vn.includes(qo)) {
          if (!p.includes(qo)) p.push(qo);
        } else p = p.filter(Bo => Bo !== qo);
      };
    if (!L) Hr(q7);
    Hr(bQ);
  }
  let {
      messagesPreNormalize: D,
      messagesForAPI: N,
      midConvFallback: O
    } = OTm(e, {
      model: s.model,
      bodyModel: h,
      tools: T,
      betas: p,
      midConvLatchedOff: L,
      useToolSearch: _,
      advisorModel: g
    }),
    $ = N,
    U = O;
  if (yzn($)) {
    let vn = A1 !== null && isFirstPartyApiBackend() && !GOe(P, A1);
    if (vn) QTe(P, A1);
    logEvent("tengu_rotunda_pennant_replay", {
      echo_eligible: vn
    });
  }
  logEvent("tengu_api_after_normalize", {
    postNormalizedMessageCount: $.length
  });
  let W = xOa(D);
  t = Wc([Kun(W, s.agentContext), dyn({
    isNonInteractive: s.isNonInteractiveSession,
    hasAppendSystemPrompt: s.hasAppendSystemPrompt
  }), ...t, ...(g ? [uMa] : [])].filter(Boolean)), lNl(t);
  let G = s.enablePromptCaching ?? PNl(h),
    V = P4e(s.querySource) ? "1h" : void 0;
  if (V7(s.agentContext) && (s.querySource.startsWith("repl_main_thread") || s.querySource === "sdk")) setLastMainThreadCacheTtlMs(V === "1h" ? 3600000 : 300000);
  let Q = NTm(t, G, {
      skipGlobalCacheForSystemPrompt: x,
      cacheTtl: V
    }),
    K = p.length > 0,
    Y = [...(s.extraToolSchemas ?? [])];
  if (g) Y.push({
    type: "advisor_20260301",
    name: "advisor",
    model: g
  });
  let J = [...I, ...Y],
    ee = uc() && dk() && !Goe() && vA(h) && !!s.fastMode,
    te = !1;
  if (PH && d && wLr() && (iIo?.isAutoModeActive() ?? !1)) QTe(P, PH);
  if (te = PH ? WOe(P, PH) : !1, ee) QTe(P, AYe);
  let ne = WOe(P, AYe),
    re = !1;
  if (xTm()) QTe(P, Tme);
  re = WOe(P, Tme);
  let oe = (DNl(), ro(INl)).createContextHintController({
      querySource: s.querySource,
      includeFirstPartyBetas: BO(),
      is529Error: RPe
    }),
    ce = oZ(u, s.effortValue),
    ue = Lw(u) && ce !== void 0 ? Mfe(ce) : void 0;
  if (Iz()) {
    let vn = J.filter(Hr => !("defer_loading" in Hr && Hr.defer_loading));
    X2i({
      system: Q,
      toolSchemas: vn,
      querySource: s.querySource,
      model: s.model,
      agentId: s.agentId,
      fastMode: ne,
      globalCacheStrategy: H,
      betas: BR(p),
      autoModeActive: te,
      isUsingOverage: Hk.isUsingOverage ?? !1,
      is1hCacheTTL: V === "1h",
      queryDepth: s.queryTracking?.depth,
      cacheDiagnosis: re,
      effortValue: ce,
      extraBodyParams: B4e(),
      messagesForAPI: $
    });
  }
  let ae = Xw() ? {
      systemPrompt: t.join(`

`),
      userSystemPrompt: s.userSystemPrompt,
      querySource: s.querySource,
      tools: Le(J)
    } : void 0,
    he = jea(s.model, s.agentContext, ae, $, ee),
    se = performance.now(),
    le = performance.now(),
    pe = 0,
    de = [],
    _e = void 0,
    fe = void 0,
    ie = void 0,
    Ae = void 0,
    ge = void 0,
    Ce = null;
  function xe() {
    if (Ce !== null) clearTimeout(Ce), Ce = null;
  }
  function Re() {
    if (xe(), LTm(_e), _e = void 0, ge) ge.body?.cancel().catch(() => {}), ge = void 0;
  }
  let Me = [],
    Ke = !1,
    He = !1;
  if (s.fallbackCreditCode !== void 0 && !f) logEvent("tengu_fallback_credit_skipped", {
    reason: Qe("backend_unknown_or_mismatch"),
    mint_request_id: Br(s.fallbackCreditMintRequestId),
    mint_model: ky(s.fallbackCreditMintModel),
    model: ky(s.model),
    query_source: Rfe(s.querySource)
  });
  let Ge = f ? s.fallbackCreditCode : void 0,
    Ye = vn => (s.fallbackCreditCode ? vn.split(s.fallbackCreditCode).join("[FCT_REDACTED]") : vn).slice(0, 600),
    ot = !1,
    vt = !1,
    $e = !1,
    Je = !1,
    Rt = !1,
    Et = !1,
    dt = (vn, Hr, qo) => {
      if (!ot || Rt) return;
      Rt = !0, logEvent("tengu_fallback_credit_outcome", {
        outcome: fromEnum(vn),
        mint_request_id: Br(s.fallbackCreditMintRequestId),
        mint_model: ky(s.fallbackCreditMintModel),
        request_id: Br(Hr),
        client_request_id: Br(Ae),
        model: ky(s.model),
        query_source: Rfe(s.querySource),
        ...(qo !== null && {
          input_tokens: qo.input_tokens,
          output_tokens: qo.output_tokens,
          cache_read_input_tokens: qo.cache_read_input_tokens,
          cache_creation_input_tokens: qo.cache_creation_input_tokens,
          cache_creation_5m_input_tokens: qo.cache_creation?.ephemeral_5m_input_tokens ?? 0,
          cache_creation_1h_input_tokens: qo.cache_creation?.ephemeral_1h_input_tokens ?? 0,
          service_tier: fromEnumOpt(qo.service_tier),
          speed: fromEnumOpt(qo.speed)
        })
      });
    },
    Dt = !1,
    $t = vn => {
      let Hr = [...p];
      if (!Hr.includes($7) && YAn(vn.model) !== null) Hr.push($7);
      let qo = y_(vn.model),
        Bo = qo === "bedrock" && PH && te && d && ohn();
      if (Bo) logForDebugging(`auto-mode 3P: sending afk-mode beta '${PH?.header}' to bedrock via body.anthropic_beta`);
      let Jt = qo === "bedrock" ? [...kLr(vn.model), ...(v ? [v] : []), ...(Bo && PH ? [PH] : [])] : [],
        cn = B4e(Jt),
        En = {
          ...(cn.output_config ?? {})
        };
      delete cn.output_config, yTm(ce, En, cn, Hr, u), TTm(s.taskBudget, En, Hr), STm(s.outputFormat, En, Hr, s.model);
      let Un = lQa(s.serverRefusalFallback, vn.model, Hr, P);
      Ke = Un.fallbacks !== void 0, uQa(s.fallbackCreditLaneArmed === !0 || s.fallbackCreditCode !== void 0, Hr, P, qo === "bedrock" ? cn : void 0), Je = Hr.includes(h1);
      let Cr = ehe(u),
        Ir = Math.min(vn?.maxTokensOverride || s.maxOutputTokensOverride || Cr, Cr),
        so = st(process.env.CLAUDE_CODE_DISABLE_THINKING),
        xs = n.type !== "disabled" && !so,
        As = xs && BO() && gkt(u) ? n.display : void 0,
        hl = void 0;
      if (xs && vLr(u)) {
        let Ve = st(process.env.CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING) && (m.includes("opus-4-6") || m.includes("sonnet-4-6")),
          Ze = getThinkingTypeOverride(s.model);
        if (Ze !== void 0 ? Ze === "adaptive" : uXe(u) && !Ve) hl = {
          type: "adaptive",
          display: As
        };else {
          let bn = xti(u);
          if (n.type === "enabled" && n.budgetTokens !== void 0) bn = n.budgetTokens;
          bn = Math.min(Ir - 1, bn), hl = {
            budget_tokens: bn,
            type: "enabled",
            display: As
          };
        }
      } else if (n.type === "disabled" && getAPIProvider() === "firstParty" && !so && vLr(u) && !0 && !UBe(u)) hl = {
        type: "disabled"
      };
      if (hl && As) {
        let Ve = Hr.indexOf(Zvt);
        if (Ve !== -1) Hr.splice(Ve, 1);
      }
      let us = hl?.type === "enabled" || hl?.type === "adaptive" || hl === void 0 && UBe(u),
        _c = s.toolChoice;
      if (_c?.type === "tool" && us) logForDebugging(`tool_choice {type:'tool', name:'${_c.name}'} demoted to auto: extended thinking is active`), _c = {
        type: "auto"
      };
      let Ei = pNl({
          hasThinking: xs
        }),
        $i = s.enablePromptCaching ?? PNl(A ?? vn.model),
        ti;
      if (uc() && dk() && !Goe() && vA(h) && !!vn.fastMode) ti = "fast";
      if (ne && !Hr.includes(AYe)) Hr.push(AYe);
      if (PH && te && wLr() && d && !Hr.includes(PH)) {
        if (Hr.push(PH), ohn()) logForDebugging(`auto-mode 3P: sending afk-mode beta '${PH.header}' to ${qo} via betas header`);
      }
      if (V === "1h" && BO() && !Hr.includes(Q1e)) Hr.push(Q1e);
      let ll = null,
        Hl = oe?.buildRequestParams($);
      if (Hl) Hr.push(Hl.beta), ll = Hl.body;
      if (re && !Hr.includes(Tme)) Hr.push(Tme);
      let Aa = st(process.env.CLAUDE_CODE_SIMULATE_PROXY_USAGE),
        Hs = Aa ? Hr.filter(Ve => Ve === VEe) : Hr;
      if (Aa) logForDebugging(`[API:client] SIMULATE_PROXY_USAGE: stripping ${Hr.length - Hs.length} beta headers from request (keeping ${BR(Hs).join(", ") || "none"}): ${BR(Hr).join(", ")}`);
      let Ki = !xs && rhn(u) ? s.temperatureOverride ?? 1 : void 0;
      Me = BR(Hs);
      let jo = A1 !== null && K && (!Aa || Hs.length > 0) && HLr(Hs).includes(A1);
      He = jo && yzn($);
      let z = {
          model: normalizeModelStringForAPI(s.model),
          messages: MTm(GNl($, jo), $i, V, s.skipCacheWrite, s.forkPointUuid),
          system: Q,
          tools: r3s(J, s.model),
          tool_choice: _c,
          ...(K && (!Aa || Hs.length > 0) && {
            betas: BR(HLr(Hs))
          }),
          metadata: QRe(),
          max_tokens: Ir,
          thinking: hl,
          ...(Ki !== void 0 && {
            temperature: Ki
          }),
          ...(Ei && K && Hr.includes(X1e) && {
            context_management: Ei
          }),
          ...(!Aa && ll ? ll : {}),
          ...Un,
          ...cn,
          ...(Object.keys(En).length > 0 && {
            output_config: En
          }),
          ...(ti !== void 0 && {
            speed: ti
          }),
          ...(re && d && K && !Aa ? {
            diagnostics: {
              previous_message_id: c ?? null
            }
          } : {})
        },
        be = _Tm(z.thinking, s.querySource, !Dt);
      if (be !== z.thinking) Dt = !0, z.thinking = be;
      return z;
    };
  {
    let vn = $t({
        model: s.model,
        thinkingConfig: n
      }),
      Hr = vn.messages.length,
      qo = K ? vn.betas ?? [] : [],
      Bo = vn.thinking?.type ?? "disabled",
      Jt = ue;
    s.getToolPermissionContext().then(cn => {
      tel({
        model: s.model,
        messagesLength: Hr,
        temperature: s.temperatureOverride ?? 1,
        betas: qo,
        permissionMode: cn.mode,
        querySource: s.querySource,
        messageClientPlatform: s.messageClientPlatform,
        queryTracking: s.queryTracking,
        thinkingType: Bo,
        effortValue: Jt,
        fastMode: ee,
        previousRequestId: l
      });
    });
  }
  let It = [],
    Zt = 0,
    _n = 0,
    Nn = void 0,
    Fn = [],
    Dn = PE,
    or = 0,
    vr = null,
    Yt = !1,
    ye,
    ve = 0,
    Fe = void 0,
    We = void 0,
    ft,
    ke = ee,
    pt = !1,
    ut = new Map(),
    Ht = 3,
    Ft = {
      value: 0
    },
    An = 2,
    sr = 0,
    Pr = 1,
    nr = 0,
    Vr = !1,
    io = !1,
    vs = !1,
    ho = !1,
    Sn = !1,
    Mn,
    Eo = (vn, Hr) => {
      if (!(vn instanceof es) || vn.status !== 400) return;
      let qo = vn.message.includes("`fallback-credit-"),
        Bo = vn.message.includes("`server-side-fallback-"),
        Jt = Un => {
          logForDebugging(`[server-fallback] 400 attributed (${Un}) \u2014 stripping and retrying`, {
            level: "warn"
          }), logEvent("tengu_rotunda_pennant_strip", {
            shape: fromEnum(Un),
            non_streaming: Hr === "sync",
            query_source: Rfe(s.querySource),
            sticky_scope: s.stickyBetas === void 0 ? Qe("session") : H1(s.querySource) === "main" ? Qe("detached_main") : H1(s.querySource) === "subagent" ? Qe("agent") : Qe("aux")
          });
        },
        cn = $Ui(vn);
      if (cn !== void 0 && !vt) {
        if (vt = !0, Ge = void 0, cn === "credit_beta_header") {
          if (Rre(P, h1), Bo) Rre(P, A1), vs = !0;
        }
        if (Hr === "stream") dt(cn, vn.requestID ?? null, null);
        return Jt(cn), "retry:fallback-credit-strip";
      }
      let En = UUi(vn);
      if (En !== void 0 && (Ke || En === "beta_header") && !vs) {
        if (vs = !0, Rre(P, A1), En === "beta_header" && qo) Rre(P, h1), vt = !0, Ge = void 0;
        return Jt(En), "retry:server-fallback-strip";
      }
      if (vOt(vn)) return;
      if (Hr === "sync" && wr(vn)) return;
      if (Hr === "stream" && ot && !vt) return vt = !0, dt("unattributed_400_dropped", vn.requestID ?? null, null), Jt("unattributed"), "retry:fallback-credit-unattributed";
      if ((Ke || He) && !vs) return vs = !0, Rre(P, A1), Jt("unattributed"), "retry:server-fallback-strip";
      if (Je && !$e) return $e = !0, Rre(P, h1), Jt("unattributed"), "retry:fallback-credit-header-strip";
      return;
    },
    wr = vn => eRn(vn) || o5r(vn) || Kwn(vn) !== void 0 || s5r(vn) || a5r(vn) !== null || i5r(vn) || tRn(vn),
    Ot = vn => {
      let Hr = s.serverRefusalFallback !== void 0 ? (vn.content ?? []).reduce((Cr, Ir, so) => qqn(Ir) ? so : Cr, -1) : -1,
        qo = vn.stop_reason === "refusal",
        Bo,
        Jt = 0,
        cn = !1,
        En = [];
      for (let [Cr, Ir] of (vn.content ?? []).entries()) {
        if (!qqn(Ir)) {
          if (Cr < Hr && Ir.type !== "text" || qo && Hr >= 0) {
            Jt++, cn ||= Ir.type === "tool_use";
            continue;
          }
          En.push(Ir);
          continue;
        }
        let so = pQa(Ir);
        if (so === void 0) {
          kn("warn", "cli_malformed_fallback_block"), logEvent("tengu_rotunda_pennant_malformed", {
            block_index: Cr,
            non_streaming: !0
          });
          continue;
        }
        if (En.push(JAo(so)), Bo = so, logEvent("tengu_rotunda_pennant_materialized", {
          armed: s.serverRefusalFallback !== void 0,
          block_index: Cr,
          non_streaming: !0
        }), so.reason === "refusal") K4t({
          model: u,
          requestId: fe || void 0,
          querySource: s.querySource,
          effort: ue,
          fastMode: ke,
          attempt: pe,
          attribution: wF(s.querySource, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool),
          serverFallbackHop: !0
        });
      }
      if (En.length === 0 && (vn.content ?? []).length > 0) En.push({
        type: "text",
        text: Pw,
        citations: []
      });
      let Un = s.serverRefusalFallback !== void 0 ? T4t(vn.usage) : void 0;
      if (ho = Un?.servedFallbackModel !== void 0 || s.serverRefusalFallback !== void 0 && Bo !== void 0, Sn = !1, Et = !1, Mn = Un, Jt > 0) logEvent("tengu_rotunda_pennant_sync_dropped", {
        dropped_count: Jt,
        had_tool_use: cn,
        chain_exhausted: qo
      });
      return {
        content: En,
        lastHop: Bo,
        iterations: Un
      };
    };
  function* jn(vn, Hr, qo) {
    if (qo !== void 0 && !Et) {
      Et = !0;
      let cn = ine(PE, Hr.usage);
      logEvent("tengu_fallback_credit_minted", {
        request_id: Br(fe),
        model: ky(s.model),
        fallback_target_model: ky(s.refusalFallbackModel ?? (s.serverRefusalFallback !== void 0 && !ho ? s.serverRefusalFallback.model : void 0)),
        token_length: qo.length,
        input_tokens: cn.input_tokens,
        output_tokens: cn.output_tokens,
        cache_read_input_tokens: cn.cache_read_input_tokens,
        cache_creation_input_tokens: cn.cache_creation_input_tokens,
        cache_creation_5m_input_tokens: cn.cache_creation?.ephemeral_5m_input_tokens ?? 0,
        cache_creation_1h_input_tokens: cn.cache_creation?.ephemeral_1h_input_tokens ?? 0,
        service_tier: fromEnumOpt(cn.service_tier),
        speed: fromEnumOpt(cn.speed),
        query_source: Rfe(s.querySource),
        ...(s.queryTracking && {
          query_chain_id: Br(s.queryTracking.chainId),
          query_depth: s.queryTracking.depth
        })
      });
    }
    if (s.serverRefusalFallback !== void 0 && !Sn) {
      let cn = vn.lastHop?.model ?? vn.iterations?.servedFallbackModel;
      if (cn !== void 0) Sn = !0, yield {
        type: "server_fallback",
        fromModel: vn.lastHop?.fromModel ?? s.model,
        toModel: cn,
        reason: vn.lastHop !== void 0 ? "refusal" : "sticky",
        apiRefusalCategory: vn.lastHop?.category ?? null,
        midStream: !1,
        requestId: fe ?? null,
        discardedMessages: [],
        retainedMessages: [],
        retainedText: "",
        finalStopReason: Hr.stop_reason
      };
    }
    let Bo = s.refusalFallbackModel ?? (s.serverRefusalFallback !== void 0 && !ho ? s.serverRefusalFallback.model : void 0);
    if (Hr.stop_reason === "refusal" && Bo !== void 0) return yield {
      type: "fallback_request",
      trigger: "refusal",
      originalModel: s.model,
      fallbackModel: Bo,
      requestId: fe ?? null,
      apiRefusalCategory: Hr.stop_details?.category ?? null,
      apiRefusalExplanation: Hr.stop_details?.explanation ?? null,
      creditCode: qo ?? null
    }, !0;
    let Jt = U2e(Hr.stop_reason, Hr.stop_details, fe, s.model);
    if (Jt) yield Jt;
    return !1;
  }
  let yn = !1,
    en = new Map(),
    nt = new Set(),
    Co = new Set(),
    fr;
  try {
    C4n("api_call", s.agentId);
    e: for (;;) {
      let ti = function () {
          if (Ei !== null) clearTimeout(Ei), Ei = null;
          if ($i) $i = !1, s.onRetryStatus?.(null);
          if (us !== null) clearTimeout(us), us = null;
          if (_c !== null) clearTimeout(_c), _c = null;
        },
        zm = function () {
          if (!s.onRetryStatus || !qo) return;
          let Hs = qo.lastAt,
            Ki = performance.now();
          Ei = setTimeout(() => {
            if (performance.now() - Ki < aIo / 2) return;
            if (qo.lastAt > Hs) {
              zm();
              return;
            }
            $i = !0, s.onRetryStatus?.({
              kind: "stalled",
              deadline: Date.now() + (xs - aIo)
            });
          }, aIo), Ei.unref?.();
        },
        ll = function () {
          if (ti(), zm(), !Cr) return;
          let Hs = performance.now();
          us = setTimeout((Ki, jo) => {
            if (performance.now() - jo < Ki) return;
            logForDebugging(`Streaming idle warning: no chunks received for ${Ki / 1000}s`, {
              level: "warn"
            }), kn("warn", "cli_streaming_idle_warning");
          }, so, so, Hs), _c = setTimeout(() => {
            let Ki = performance.now() - Hs;
            if (Ki < Ir / 2) {
              logForDebugging(`Stream watchdog fired after suspend (actual idle ${Math.round(Ki)}ms < ${Ir}ms), re-arming`), ll();
              return;
            }
            As = !0, hl = performance.now(), logForDebugging(`Streaming idle timeout: no chunks received for ${Ir / 1000}s, aborting stream`, {
              level: "error"
            }), kn("error", "cli_streaming_idle_timeout"), logEvent("tengu_streaming_idle_timeout", {
              model: s.model,
              request_id: fe ?? "unknown",
              timeout_ms: Ir,
              tier: Qe("event")
            }), Re();
          }, Ir);
        };
      am("query_client_creation_start");
      let vn = Tzn(() => Q8({
          maxRetries: 0,
          model: s.model,
          fetchOverride: s.fetchOverride,
          source: s.querySource,
          agentContext: s.agentContext
        }), async (Hs, Ki, jo) => {
          dt("attempt_errored", fe ?? null, null), pe = Ki, ke = jo.fastMode ?? !1, le = performance.now(), de.push(le), am("query_client_creation_end");
          let z = $t(jo);
          if (BNl(z), Ken(z, s.querySource), _6n({
            ...z,
            stream: !0
          }, s.querySource), ve = z.max_tokens, am("query_api_request_sent"), logForDebugging(`[API:timing] dispatching to ${y_(s.model)} model=${s.model}`), !s.agentId) {
            if (aR("api_request_sent"), Ki === 1 && !_n) _n = performance.now(), F0a();
          }
          xe();
          let be = parseInt(process.env.CLAUDE_SLOW_FIRST_BYTE_MS || "", 10) || 30000;
          Ce = setTimeout(() => {
            Ce = null;
            let Jn = performance.now() - le;
            logForDebugging(`Slow first byte: no stream chunk ${(Jn / 1000).toFixed(1)}s after request sent (attempt ${Ki})`, {
              level: "warn"
            }), logEvent("tengu_api_slow_first_byte", {
              model: s.model,
              provider: getAPIProviderForAnalytics(),
              attempt: Ki,
              elapsed_ms: Math.round(Jn)
            });
          }, be);
          let Ve = FNl(he, de.length);
          Ae = Ve.clientRequestId;
          let Ze = Ve.headers;
          if ((s.queryTracking?.depth ?? 0) > 0 && (H1(s.querySource) !== "auxiliary" || s.querySource === "compact") && getAPIProvider() === "firstParty" && isFirstPartyAnthropicBaseUrl() && getFeatureValue_CACHED_MAY_BE_STALE("tengu_lantern_spool", !1)) Ze["anthropic-usage-limit"] = "extended";
          if (io = !1, !Vr && H1(s.querySource) !== "auxiliary" && getAPIProvider() === "firstParty" && isFirstPartyAnthropicBaseUrl() && getFeatureValue_CACHED_MAY_BE_STALE("tengu_cedar_lattice", !1)) Ze[hTm] = gTm, io = !0;
          let Kt = Ge;
          if (Kt !== void 0) Ge = void 0, ot = !0;
          let bn = await Hs.beta.messages.create({
            ...z,
            ...(Kt !== void 0 && {
              fallback_credit_token: Kt
            }),
            stream: !0
          }, {
            signal: o,
            ...(Object.keys(Ze).length > 0 && {
              headers: Ze
            })
          }).withResponse().catch(Jn => {
            throw xe(), Jn;
          });
          if (am("query_response_headers_received"), fe = bn.request_id, ge = bn.response, Kt !== void 0) logEvent("tengu_rotunda_pennant_credit_echoed", {
            mint_request_id: Br(s.fallbackCreditMintRequestId),
            mint_model: ky(s.fallbackCreditMintModel),
            request_id: Br(fe),
            client_request_id: Br(Ae),
            model: ky(s.model),
            token_length: Kt.length,
            query_source: Rfe(s.querySource)
          });
          return bn.data;
        }, {
          model: s.model,
          fallbackModel: s.fallbackModel,
          thinkingConfig: n,
          ...(uc() ? {
            fastMode: ee
          } : !1),
          signal: o,
          querySource: s.querySource,
          onRetryStatus: s.onRetryStatus,
          onError: async Hs => {
            if (te && eRn(Hs)) {
              if (te = !1, PH) Rre(P, PH);
              return iIo?.setAutoModeActive(!1), iIo?.setAutoModeCircuitBroken(!0), logForDebugging("[auto-mode] server rejected afk-mode beta \u2014 dropping header and circuit-breaking auto for this session", {
                level: "warn"
              }), "retry:afk-beta";
            }
            if (io && !Vr) {
              let jo = Hs instanceof es ? Hs.status : void 0,
                z = jo !== void 0 && jo >= 500,
                be = Hs instanceof TH;
              if (z || be) return Vr = !0, logEvent("tengu_dispatch_header_fallback", {
                model: ky(s.model),
                reason: z ? Qe("5xx") : Qe("conn_err"),
                status: jo !== void 0 ? fromNumber(jo) : Qe("none"),
                request_id: Br(Hs instanceof es ? Hs.requestID : void 0)
              }), "retry:dispatch-header-strip";
            }
            if (o5r(Hs)) return $ = uIo($), logEvent("tengu_advisor_strip_retry", {
              query_source: Fg(s.querySource) ?? ""
            }), "retry:advisor-strip";
            let Ki = vdn(Hs, s.model, s.querySource);
            if (Ki === kwt) return;
            if (Ki !== null) return Ki;
            {
              let jo = Kwn(Hs);
              if (jo) {
                let z = Hs instanceof Error ? Hs.message : String(Hs);
                if (jo.messageIdx !== void 0 && jo.contentIdx !== void 0) {
                  let Ve = ANl($, {
                    messageIdx: jo.messageIdx,
                    contentIdx: jo.contentIdx,
                    kind: jo.kind
                  }, z);
                  if (Ve !== $) return $ = Ve, ut.set(jo.kind, z), logForDebugging(`Removed unprocessable ${jo.kind} at messages.${jo.messageIdx}.content.${jo.contentIdx}; retrying.`, {
                    level: "warn"
                  }), logEvent("tengu_media_block_strip_retry", {
                    kind: fromEnum(jo.kind),
                    message_idx: jo.messageIdx,
                    content_idx: jo.contentIdx,
                    targeted: 1
                  }), `retry:media-strip:${jo.kind}:${jo.messageIdx}.${jo.contentIdx}`;
                }
                let be = Ft.value < Ht ? hNl($, jo.kind, z) : void 0;
                if (be) return Ft.value++, $ = be.messages, ut.set(jo.kind, z), logForDebugging(`Removed base64 ${jo.kind} blocks from carrier ${be.carrierIdx} (API 400 had no usable path); retrying.`, {
                  level: "warn"
                }), logEvent("tengu_media_block_strip_retry", {
                  kind: fromEnum(jo.kind),
                  targeted: 0,
                  carrier_idx: be.carrierIdx
                }), `retry:media-strip-latest:${jo.kind}:${be.carrierIdx}`;
              }
            }
            if (re && s5r(Hs)) return re = !1, Rre(P, Tme), logForDebugging("[cache-diagnosis] server rejected beta \u2014 dropping header latch", {
              level: "warn"
            }), "retry:cache-diagnosis-beta";
            {
              let jo = a5r(Hs);
              if (jo) {
                let z = jo === "enabled" ? "adaptive" : "enabled";
                return setThinkingTypeOverride(s.model, z), logForDebugging(`[thinking] model rejected thinking.type=${jo}; retrying with ${z}. For Bedrock application-inference-profile ARNs with bearer-token auth, granting bedrock:GetInferenceProfile to the token avoids this round-trip.`, {
                  level: "warn"
                }), "retry:thinking-type";
              }
            }
            if (i5r(Hs)) {
              let jo = 0,
                z = 0;
              for (let Ve of $) {
                if (Ve.type !== "assistant" || !Array.isArray(Ve.message.content)) continue;
                for (let Ze of Ve.message.content) if (Ze.type === "redacted_thinking") jo++;else if (Ze.type === "thinking") if ("signature" in Ze && Ze.signature) jo++;else z++;
              }
              let be = jNl($);
              if (be !== $) return $ = be, logForDebugging("[thinking] server rejected a thinking block; stripping all thinking blocks and retrying.", {
                level: "warn"
              }), logEvent("tengu_thinking_signature_strip_retry", {
                query_source: Fg(s.querySource) ?? "",
                model: s.model,
                stripped_signed_count: jo,
                stripped_unsigned_count: z
              }), "retry:thinking-signature-strip";
            }
            if (U && tRn(Hs)) return $ = U(), U = null, p = p.filter(jo => jo !== q7), Rre(P, q7), logForDebugging('[mid-conv-system] server rejected role:"system" \u2014 falling back to <system-reminder> body, sticky-rejecting beta until /clear or /compact', {
              level: "warn"
            }), logEvent("tengu_mid_conv_system_fallback_retry", {}), "retry:mid-conv-system";
            {
              let jo = await oe?.onRequestError(Hs, $);
              if (jo) {
                if ($ = jo.messages, jo.clearedIds.size > 0) s.onHintCleared?.(jo.clearedIds, jo.clearedContent);
                return "retry:context-hint";
              }
            }
            return Eo(Hs, "stream");
          }
        }),
        Hr;
      do if (Hr = await vn.next(), !("controller" in Hr.value)) yield Hr.value; while (!Hr.done);
      _e = Hr.value;
      for (let [Hs, Ki] of ut) yield tc({
        content: cnt(Hs),
        error: "invalid_request",
        errorDetails: Ki
      });
      ut.clear();
      let qo = ge ? ge._chunkTimes ?? void 0 : void 0;
      It.length = 0, Zt = 0, Nn = void 0, Fn.length = 0, ho = !1, Sn = !1, yn = !1, en.clear(), nt.clear(), Co.clear(), fr = void 0, Et = !1, Dn = PE, vr = null, pt = !1;
      let Bo = !1,
        Jt = !1,
        cn = !1,
        En = null,
        Un = !1,
        Cr = je.CLAUDE_ENABLE_STREAM_WATCHDOG ?? getFeatureValue_CACHED_MAY_BE_STALE("tengu_event_watchdog_default_on", !1),
        Ir = fLr(),
        so = Ir / 2,
        xs = Math.min(ALr(getAPIProvider()), Cr ? Ir : 1 / 0),
        As = !1,
        hl = null,
        us = null,
        _c = null,
        Ei = null,
        $i = !1;
      ll();
      let Hl = () => {
          if (s.querySource !== "sdk" && s.keepPartialMessageOnAbort !== !0) return;
          if (yn) return;
          let Hs = Fn[It.length];
          if (Hs?.type !== "text" || !Hs.text.trim() || !Nn) return;
          return {
            message: {
              ...Nn,
              content: G5t([Hs], r, s.agentId, {
                requestId: fe ?? void 0,
                messageId: Nn.id
              })
            },
            requestId: fe ?? void 0,
            ...wF(s.querySource, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool),
            type: "assistant",
            uuid: cAt.randomUUID(),
            timestamp: new Date().toISOString(),
            ...void 0
          };
        },
        Aa = () => {
          if (fr === void 0 || Sn) return;
          let Hs = fr;
          return fr = void 0, Sn = !0, {
            type: "server_fallback",
            fromModel: Hs.fromModel,
            toModel: Hs.model,
            reason: Hs.reason,
            apiRefusalCategory: Hs.category,
            midStream: !1,
            requestId: fe ?? null,
            discardedMessages: [],
            retainedMessages: [],
            retainedText: "",
            finalStopReason: null
          };
        };
      try {
        let Hs = !0,
          Ki = null,
          jo = 30000,
          z = 0,
          be = 0;
        for await (let Ze of DTm(_e, qo)) {
          if (Ze.type === "ping") {
            yield {
              type: "stream_event",
              event: Ze
            };
            continue;
          }
          ll();
          let Kt = Date.now();
          if (Ki !== null) {
            let bn = Kt - Ki;
            if (bn > jo) be++, z += bn, logForDebugging(`Streaming stall detected: ${(bn / 1000).toFixed(1)}s gap between events (stall #${be})`, {
              level: "warn"
            }), logEvent("tengu_streaming_stall", {
              stall_duration_ms: bn,
              stall_count: be,
              total_stall_time_ms: z,
              event_type: Ze.type,
              model: s.model,
              request_id: fe ?? "unknown"
            });
          }
          if (Ki = Kt, Hs) {
            if (xe(), logForDebugging("Stream started - received first chunk"), logForDebugging(`[API:timing] first byte after ${Math.round(performance.now() - le)}ms`), am("query_first_chunk_received"), !s.agentId) aR("first_chunk");
            EQa(), Hs = !1;
          }
          {
            let bn = XAo(Ze);
            if (bn) {
              if (Co.add(bn.index), Fn[bn.index] = JAo(bn), logEvent("tengu_rotunda_pennant_materialized", {
                armed: s.serverRefusalFallback !== void 0,
                block_index: bn.index,
                non_streaming: !1
              }), bn.reason === "refusal") K4t({
                model: u,
                requestId: fe || void 0,
                querySource: s.querySource,
                effort: ue,
                fastMode: ke,
                attempt: pe,
                attribution: wF(s.querySource, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool),
                serverFallbackHop: !0
              });
              if (s.serverRefusalFallback === void 0) continue;
              if ($qn(bn.reason)) ho = !0;
              if (Nn !== void 0) Nn = {
                ...Nn,
                model: bn.model
              };
              for (let Jn of en.values()) Jn.message.model = bn.model;
              if (en.size === 0) fr = bn;else if (!$qn(bn.reason)) Sn = !0, yield {
                type: "server_fallback",
                fromModel: bn.fromModel,
                toModel: bn.model,
                reason: bn.reason,
                apiRefusalCategory: bn.category,
                midStream: !0,
                requestId: fe ?? null,
                discardedMessages: [],
                retainedMessages: [],
                retainedText: "",
                finalStopReason: null
              };else {
                Sn = !0;
                let Jn = [];
                for (let [hs, Bi] of en) if (cQa(Bi)) Jn.push(Bi), en.delete(hs), delete Fn[hs];
                if (Jn.length > 0) {
                  let hs = new Set(Jn);
                  for (let Bi = It.length - 1; Bi >= 0; Bi--) if (hs.has(It[Bi])) It.splice(Bi, 1);
                  yn = !0;
                }
                let Qo = [...en.entries()].sort((hs, Bi) => hs[0] - Bi[0]).map(([, hs]) => hs),
                  Zo = Qo.map(hs => hs.message.content.map(Bi => Bi.type === "text" ? Bi.text : "").join("")).join("");
                yield {
                  type: "server_fallback",
                  fromModel: bn.fromModel,
                  toModel: bn.model,
                  reason: bn.reason,
                  apiRefusalCategory: bn.category,
                  midStream: !0,
                  requestId: fe ?? null,
                  discardedMessages: Jn,
                  retainedMessages: Qo,
                  retainedText: Zo,
                  finalStopReason: null
                };
              }
              continue;
            }
            if (mQa(Ze)) {
              let Jn = Ze.index;
              nt.add(Jn), yn = !0, kn("warn", "cli_malformed_fallback_block"), logEvent("tengu_rotunda_pennant_malformed", {
                block_index: Jn,
                non_streaming: !1
              });
              continue;
            }
            if (Ze.type === "content_block_stop" && nt.has(Ze.index)) continue;
          }
          switch (Ze.type) {
            case "message_start":
              {
                Un = !0, Nn = Ze.message, Zt = Math.max(0, Math.round(performance.now() - le)), Dn = ine(Dn, Ze.message?.usage), ft = Ze.message.diagnostics?.cache_miss_reason;
                break;
              }
            case "content_block_start":
              switch (Ze.content_block.type) {
                case "tool_use":
                  Fn[Ze.index] = {
                    ...Ze.content_block,
                    input: ""
                  };
                  break;
                case "server_tool_use":
                  if (Fn[Ze.index] = {
                    ...Ze.content_block,
                    input: ""
                  }, Ze.content_block.name === "advisor") pt = !0, logForDebugging("[AdvisorTool] Advisor tool called"), logEvent("tengu_advisor_tool_call", {
                    model: s.model,
                    advisor_model: g ?? "unknown"
                  });
                  break;
                case "text":
                  Fn[Ze.index] = {
                    ...Ze.content_block,
                    text: ""
                  };
                  break;
                case "thinking":
                  Fn[Ze.index] = {
                    ...Ze.content_block,
                    thinking: "",
                    signature: ""
                  };
                  break;
                default:
                  if (Fn[Ze.index] = {
                    ...Ze.content_block
                  }, Ze.content_block.type === "advisor_tool_result") pt = !1, logForDebugging("[AdvisorTool] Advisor tool result received");
                  break;
              }
              if (En = Ze.index, Ze.content_block.type !== "thinking" && Ze.content_block.type !== "redacted_thinking" && !A$(Ze.content_block)) cn = !0;
              break;
            case "content_block_delta":
              {
                let bn = Fn[Ze.index],
                  Jn = Ze.delta;
                if (!bn) throw logEvent("tengu_streaming_error", {
                  error_type: Qe("content_block_not_found_delta"),
                  part_type: fromEnum(Ze.type),
                  part_index: Ze.index
                }), RangeError("Content block not found");
                switch (Jn.type) {
                  case "citations_delta":
                    break;
                  case "input_json_delta":
                    if (bn.type !== "tool_use" && bn.type !== "server_tool_use") throw logEvent("tengu_streaming_error", {
                      error_type: Qe("content_block_type_mismatch_input_json"),
                      expected_type: Qe("tool_use"),
                      actual_type: bn.type
                    }), Error("Content block is not a input_json block");
                    if (typeof bn.input !== "string") throw logEvent("tengu_streaming_error", {
                      error_type: Qe("content_block_input_not_string"),
                      input_type: fromEnum(typeof bn.input)
                    }), Error("Content block input is not a string");
                    bn.input += Jn.partial_json;
                    break;
                  case "text_delta":
                    if (bn.type !== "text") throw logEvent("tengu_streaming_error", {
                      error_type: Qe("content_block_type_mismatch_text"),
                      expected_type: Qe("text"),
                      actual_type: bn.type
                    }), Error("Content block is not a text block");
                    bn.text += Jn.text;
                    break;
                  case "signature_delta":
                    if (bn.type !== "thinking") throw logEvent("tengu_streaming_error", {
                      error_type: Qe("content_block_type_mismatch_thinking_signature"),
                      expected_type: Qe("thinking"),
                      actual_type: bn.type
                    }), Error("Content block is not a thinking block");
                    bn.signature = Jn.signature;
                    break;
                  case "thinking_delta":
                    if (bn.type === "redacted_thinking") break;
                    if (bn.type !== "thinking") throw logEvent("tengu_streaming_error", {
                      error_type: Qe("content_block_type_mismatch_thinking_delta"),
                      expected_type: Qe("thinking"),
                      actual_type: bn.type
                    }), Error("Content block is not a thinking block");
                    bn.thinking += Jn.thinking;
                    break;
                }
                break;
              }
            case "content_block_stop":
              {
                En = null;
                let bn = Fn[Ze.index];
                if (!bn) throw logEvent("tengu_streaming_error", {
                  error_type: Qe("content_block_not_found_stop"),
                  part_type: fromEnum(Ze.type),
                  part_index: Ze.index
                }), RangeError("Content block not found");
                if (!Nn) throw logEvent("tengu_streaming_error", {
                  error_type: Qe("partial_message_not_found"),
                  part_type: fromEnum(Ze.type)
                }), Error("Message not found");
                let Jn = {
                  message: {
                    ...Nn,
                    content: G5t([bn], r, s.agentId, {
                      requestId: fe ?? void 0,
                      messageId: Nn.id
                    })
                  },
                  requestId: fe ?? void 0,
                  ...wF(s.querySource, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool),
                  type: "assistant",
                  uuid: cAt.randomUUID(),
                  timestamp: new Date().toISOString(),
                  ...!1,
                  ...(g && {
                    advisorModel: g
                  })
                };
                if (It.push(Jn), en.set(Ze.index, Jn), Jn.message.content.some(Qo => !A$(Qo))) {
                  if (Jt = !0, Jn.message.content.some(Qo => Qo.type !== "thinking" && Qo.type !== "redacted_thinking" && !A$(Qo))) cn = !0;
                }
                yield Jn;
                break;
              }
            case "message_delta":
              {
                Dn = ine(Dn, Ze.usage);
                let bn = s.serverRefusalFallback !== void 0 ? T4t(Dn) : void 0;
                if (bn?.servedFallbackModel !== void 0) ho = !0, Dn = lIo(Dn, Ze.usage);
                let Jn = YAo(Ze.delta.stop_details);
                {
                  let Hd = Ze.delta.stop_details;
                  if (Hd && "fallback_credit_token" in Hd) delete Hd.fallback_credit_token;
                }
                if (Jn !== void 0 && !Et) Et = !0, logEvent("tengu_fallback_credit_minted", {
                  request_id: Br(fe),
                  model: ky(s.model),
                  fallback_target_model: ky(s.refusalFallbackModel ?? (s.serverRefusalFallback !== void 0 && !ho ? s.serverRefusalFallback.model : void 0)),
                  token_length: Jn.length,
                  input_tokens: Dn.input_tokens,
                  output_tokens: Dn.output_tokens,
                  cache_read_input_tokens: Dn.cache_read_input_tokens,
                  cache_creation_input_tokens: Dn.cache_creation_input_tokens,
                  cache_creation_5m_input_tokens: Dn.cache_creation?.ephemeral_5m_input_tokens ?? 0,
                  cache_creation_1h_input_tokens: Dn.cache_creation?.ephemeral_1h_input_tokens ?? 0,
                  service_tier: fromEnumOpt(Dn.service_tier),
                  speed: fromEnumOpt(Dn.speed),
                  query_source: Rfe(s.querySource),
                  ...(s.queryTracking && {
                    query_chain_id: Br(s.queryTracking.chainId),
                    query_depth: s.queryTracking.depth
                  })
                });
                vr = Ze.delta.stop_reason;
                let Qo = Ze.delta;
                if (Qo.diagnostics?.cache_miss_reason) ft = Qo.diagnostics.cache_miss_reason;
                for (let Hd of It) Hd.message.usage = Dn, Hd.message.stop_reason = vr, Hd.message.stop_details = Ze.delta.stop_details ?? null;
                let Zo = bn !== void 0 && bn.servedFallbackModel !== void 0,
                  hs = Zo ? QAo(bn.entries, {
                    speed: Dn.speed,
                    serverToolUse: Dn.server_tool_use
                  }, vr) : Koe(u, Dn),
                  Bi = Zo ? s.serverRefusalFallback?.model ?? s.model : s.model;
                if (or += Cce(hs, Dn, Bi, s.querySource, ue, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool), vr === "refusal") K4t({
                  model: u,
                  requestId: fe || void 0,
                  querySource: s.querySource,
                  effort: ue,
                  fastMode: ke,
                  attempt: pe,
                  attribution: wF(s.querySource, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool),
                  serverFallbackHop: !1,
                  stopDetails: Ze.delta.stop_details ?? null
                });
                if (s.serverRefusalFallback !== void 0) {
                  let Hd = fr;
                  if (fr = void 0, Hd !== void 0) {
                    if (!Sn) Sn = !0, yield {
                      type: "server_fallback",
                      fromModel: Hd.fromModel,
                      toModel: Hd.model,
                      reason: Hd.reason,
                      apiRefusalCategory: Hd.category,
                      midStream: !1,
                      requestId: fe ?? null,
                      discardedMessages: [],
                      retainedMessages: [],
                      retainedText: "",
                      finalStopReason: vr
                    };
                  } else if (!Sn && bn?.servedFallbackModel !== void 0) Sn = !0, yield {
                    type: "server_fallback",
                    fromModel: s.model,
                    toModel: bn.servedFallbackModel,
                    reason: "sticky",
                    apiRefusalCategory: null,
                    midStream: !1,
                    requestId: fe ?? null,
                    discardedMessages: [],
                    retainedMessages: [],
                    retainedText: "",
                    finalStopReason: vr
                  };
                }
                let rc = s.refusalFallbackModel ?? (s.serverRefusalFallback !== void 0 && !ho ? s.serverRefusalFallback.model : void 0);
                if (vr === "refusal" && rc !== void 0) {
                  yield {
                    type: "fallback_request",
                    trigger: "refusal",
                    originalModel: s.model,
                    fallbackModel: rc,
                    requestId: fe ?? null,
                    apiRefusalCategory: Ze.delta.stop_details?.category ?? null,
                    apiRefusalExplanation: Ze.delta.stop_details?.explanation ?? null,
                    creditCode: Jn ?? null
                  };
                  return;
                }
                let cp = U2e(vr, Ze.delta.stop_details, fe, s.model);
                if (cp) yield cp;
                if (vr === "max_tokens") logEvent("tengu_max_tokens_reached", {
                  max_tokens: ve
                }), yield tc({
                  content: `${ob}: Claude's response exceeded the ${ve} output token maximum. To configure this behavior, set the CLAUDE_CODE_MAX_OUTPUT_TOKENS environment variable.`,
                  apiError: "max_output_tokens",
                  error: "max_output_tokens"
                });
                if (vr === "model_context_window_exceeded") logEvent("tengu_context_window_exceeded", {
                  max_tokens: ve,
                  output_tokens: Dn.output_tokens
                }), yield tc({
                  content: `${ob}: The model has reached its context window limit.`,
                  apiError: "max_output_tokens",
                  error: "max_output_tokens"
                });
                break;
              }
            case "message_stop":
              Un = !1, dt("stream_completed", fe ?? null, Dn);
              break;
          }
          if (Ze.type === "content_block_stop" && Co.has(Ze.index)) continue;
          Bo = !0, yield {
            type: "stream_event",
            event: Ze,
            ...(Ze.type === "message_start" ? {
              ttftMs: Zt,
              ...(_n ? {
                requestSentAtMs: _n
              } : void 0)
            } : void 0)
          };
        }
        if (ti(), o.aborted && !As) {
          dt("aborted", fe ?? null, null);
          let Ze = Aa();
          if (Ze) yield Ze;
          let Kt = Hl();
          if (Kt) yield Kt;
          if (pt) logEvent("tengu_advisor_tool_interrupted", {
            model: s.model,
            advisor_model: g ?? "unknown"
          });
          return;
        }
        if (As) {
          let Ze = hl !== null ? Math.round(performance.now() - hl) : -1;
          throw kn("info", "cli_stream_loop_exited_after_watchdog_clean"), logEvent("tengu_stream_loop_exited_after_watchdog", {
            request_id: fe ?? "unknown",
            exit_delay_ms: Ze,
            exit_path: Qe("clean"),
            model: s.model
          }), hl = null, Error("Stream idle timeout - no chunks received");
        }
        if (!Nn || It.length === 0 && !vr) throw logForDebugging(!Nn ? "Stream completed without receiving message_start event - triggering non-streaming fallback" : "Stream completed with message_start but no content blocks completed - triggering non-streaming fallback", {
          level: "error"
        }), logEvent("tengu_stream_no_events", {
          model: s.model,
          request_id: fe ?? "unknown"
        }), Error("Stream ended without receiving any events");
        if (be > 0) logForDebugging(`Streaming completed with ${be} stall(s), total stall time: ${(z / 1000).toFixed(1)}s`, {
          level: "warn"
        }), logEvent("tengu_streaming_stall_summary", {
          stall_count: be,
          total_stall_time_ms: z,
          model: s.model,
          request_id: fe ?? "unknown"
        });
        if (Iz()) Q2i(s.querySource, Dn.cache_read_input_tokens, Dn.cache_creation_input_tokens, e, s.agentId, fe, c);
        let Ve = ge;
        if (Ve) qwn(Ve.headers, s.model, (T_(s.model) || jB(s.model)) && Dn.input_tokens + Dn.cache_read_input_tokens + Dn.cache_creation_input_tokens > KQ), Fe = Ve.headers;
      } catch (Hs) {
        ti(), xe();
        {
          let hs = Aa();
          if (hs) yield hs;
        }
        if (!As && Hs instanceof KAn) As = !0, hl = performance.now(), logForDebugging(`Streaming idle timeout (byte-level): ${Hs.message}, aborting stream`, {
          level: "error"
        }), kn("error", "cli_streaming_idle_timeout"), logEvent("tengu_streaming_idle_timeout", {
          model: s.model,
          request_id: fe ?? "unknown",
          timeout_ms: Hs.idleMs,
          tier: Qe("byte"),
          bytes_received_before_stall: Hs.bytesReceived,
          time_to_first_byte_ms: Hs.ttfbMs,
          body_read_pending: Hs.bodyReadPending,
          slept_ms: Hs.sleptMs,
          cf_ray: Hs.cfRay
        });
        if (As && hl !== null) {
          let hs = Math.round(performance.now() - hl);
          kn("info", "cli_stream_loop_exited_after_watchdog_error"), logEvent("tengu_stream_loop_exited_after_watchdog", {
            request_id: fe ?? "unknown",
            exit_delay_ms: hs,
            exit_path: Qe("error"),
            error_name: Hs instanceof Error ? Hs.name : Qe("unknown"),
            model: s.model
          });
        }
        if (Hs instanceof xm) {
          if (o.aborted) {
            dt("aborted", fe ?? null, null);
            let hs = Aa();
            if (hs) yield hs;
            let Bi = Hl();
            if (Bi) yield Bi;
            if (logForDebugging(`Streaming aborted by user: ${Se(Hs)}`), pt) logEvent("tengu_advisor_tool_interrupted", {
              model: s.model,
              advisor_model: g ?? "unknown"
            });
            throw Hs;
          } else if (!As) throw logForDebugging(`Streaming timeout (SDK abort): ${Hs.message}`, {
            level: "error"
          }), new E3({
            message: "Request timed out"
          });
        }
        let Ki = As ? "watchdog" : "other";
        if (oe?.classifyStreamError(Hs)) Ki = "context_hint_sse";
        let jo = st(process.env.CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK) || getFeatureValue_CACHED_MAY_BE_STALE("tengu_disable_streaming_to_non_streaming_fallback", !1),
          z = As ? Error(It.length > 0 ? "Stream idle timeout - partial response received" : "Stream idle timeout - no chunks received") : Hs,
          be = fq(Hs),
          Ve = be !== null && ZRe.has(be.code);
        if (Ve) Ki = "stale_connection";
        if (It.some(hs => hs.message.content.some(Bi => !A$(Bi))) || Jt) {
          if (Ve && be) {
            let hs = It.some(Hd => Hd.message.content.some(Fc => Fc.type === "tool_use")),
              Bi = It.some(Hd => Hd.message.content.some(Fc => Fc.type !== "thinking" && Fc.type !== "redacted_thinking" && !A$(Fc)));
            if (!cn && vr === null && sr < An) {
              if (sr++, logForDebugging(`Stream connection closed (${be.code}) after thinking-only yield \u2014 retrying streaming (${sr}/${An})`, {
                level: "warn"
              }), logEvent("tengu_streaming_stale_connection_retry", {
                model: ky(s.model),
                error_code: V8r(be.code),
                retry_attempt: sr,
                request_id: Br(fe),
                after_thinking_only: !0
              }), Re(), dt("attempt_errored", fe ?? null, null), or += Cce(Koe(u, Dn), Dn, s.model, s.querySource, ue, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool), Un) {
                if (En !== null) yield {
                  type: "stream_event",
                  event: {
                    type: "content_block_stop",
                    index: En
                  }
                };
                yield {
                  type: "stream_event",
                  event: {
                    type: "message_stop"
                  }
                };
              }
              fe = null, await sleep(100 * sr, o);
              continue e;
            }
            let rc = hs ? "tool_use" : "end_turn";
            vr = rc;
            for (let Hd of It) Hd.message.usage = Dn, Hd.message.stop_reason = rc;
            logForDebugging(`Stream connection closed (${be.code}) after ${It.length} block(s) yielded \u2014 finalizing partial response`, {
              level: "warn"
            });
            let cp = Bi || cn;
            logEvent("tengu_streaming_partial_finalized", {
              model: ky(s.model),
              blocks_yielded: It.length,
              has_output: cp,
              synthesized_stop_reason: fromEnum(rc),
              request_id: Br(fe)
            }), yield tc({
              content: cp ? `${ob}: Connection closed mid-response. The response above may be incomplete.` : `${ob}: Connection closed while thinking, before producing a response. Try again.`,
              error: "server_error"
            }), or += Cce(Koe(u, Dn), Dn, s.model, s.querySource, ue, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool);
            break e;
          }
          throw logEvent("tengu_streaming_fallback_to_non_streaming", {
            model: s.model,
            error: z instanceof Error ? z.name : hq(String(z)),
            attemptNumber: pe,
            maxOutputTokens: ve,
            thinkingType: fromEnum(n.type),
            fallback_disabled: jo,
            request_id: fe ?? "unknown",
            fallback_cause: Qe("partial_yield")
          }), z;
        }
        if (io && !Vr && be !== null && !Bo) {
          Vr = !0, logForDebugging(`Stream connection error (${be.code}) with anthropic-dispatch-id before first event; retrying without it`, {
            level: "warn"
          }), logEvent("tengu_dispatch_header_fallback", {
            model: ky(s.model),
            reason: Qe("body_phase"),
            request_id: Br(fe)
          }), Re(), dt("attempt_errored", fe ?? null, null), fe = null;
          continue e;
        }
        if (Ve && !Bo && sr < An) {
          sr++, logForDebugging(`Stream connection closed (${be.code}) before first event \u2014 retrying streaming (${sr}/${An})`, {
            level: "warn"
          }), logEvent("tengu_streaming_stale_connection_retry", {
            model: s.model,
            error_code: V8r(be.code),
            retry_attempt: sr,
            request_id: fe ?? "unknown"
          }), Re(), dt("attempt_errored", fe ?? null, null), fe = null, await sleep(100 * sr, o);
          continue e;
        }
        if (As && !Bo && nr < Pr) {
          nr++, logForDebugging(`Stream idle timeout before first event \u2014 retrying streaming (${nr}/${Pr})`, {
            level: "warn"
          }), logEvent("tengu_streaming_watchdog_retry", {
            model: s.model,
            retry_attempt: nr,
            request_id: fe ?? "unknown"
          }), Re(), dt("attempt_errored", fe ?? null, null), fe = null;
          continue e;
        }
        if (jo) throw logForDebugging(`Error streaming (non-streaming fallback disabled): ${Se(z)}`, {
          level: "error"
        }), logEvent("tengu_streaming_fallback_to_non_streaming", {
          model: s.model,
          error: z instanceof Error ? z.name : hq(String(z)),
          attemptNumber: pe,
          maxOutputTokens: ve,
          thinkingType: fromEnum(n.type),
          fallback_disabled: !0,
          request_id: fe ?? "unknown",
          fallback_cause: Ki
        }), z;
        logForDebugging(`Error streaming, falling back to non-streaming mode: ${Se(z)}`, {
          level: "error"
        }), Yt = !0;
        {
          let hs = await oe?.onStreamFallback($, fe ?? void 0);
          if (hs) {
            if ($ = hs.messages, hs.clearedIds.size > 0) s.onHintCleared?.(hs.clearedIds, hs.clearedContent);
          }
        }
        if (s.onStreamingFallback) s.onStreamingFallback();
        logEvent("tengu_streaming_fallback_to_non_streaming", {
          model: s.model,
          error: z instanceof Error ? z.name : hq(String(z)),
          attemptNumber: pe,
          maxOutputTokens: ve,
          thinkingType: fromEnum(n.type),
          fallback_disabled: !1,
          request_id: fe ?? "unknown",
          fallback_cause: Ki
        }), kn("info", "cli_nonstreaming_fallback_started"), logEvent("tengu_nonstreaming_fallback_started", {
          request_id: fe ?? "unknown",
          model: s.model,
          fallback_cause: Ki
        }), dt("attempt_errored", fe ?? null, null), ie = fe, yield {
          type: "streaming_fallback_began"
        };
        let {
          message: Kt,
          requestId: bn,
          creditCode: Jn
        } = yield* LNl({
          model: s.model,
          source: s.querySource,
          agentContext: s.agentContext,
          llmSpan: he
        }, {
          model: s.model,
          fallbackModel: s.fallbackModel,
          thinkingConfig: n,
          ...(uc() && {
            fastMode: ee
          }),
          signal: o,
          initialConsecutive529Errors: RPe(Hs) ? 1 : 0,
          querySource: s.querySource,
          onRetryStatus: s.onRetryStatus,
          onApiError: hs => {
            let Bi = vdn(hs, s.model, s.querySource);
            if (Bi === kwt) return;
            if (Bi !== null) return Bi;
            return Eo(hs, "sync");
          }
        }, $t, (hs, Bi, rc) => {
          pe = hs, ve = rc;
        }, hs => {
          Ken(hs, s.querySource), _6n(hs, s.querySource);
        }, fe);
        fe = bn, ft = Kt.diagnostics?.cache_miss_reason;
        let Qo = Ot(Kt),
          Zo = {
            message: {
              ...Kt,
              content: G5t(Qo.content, r, s.agentId, {
                requestId: fe ?? void 0,
                messageId: Kt.id
              }),
              usage: ine(PE, Kt.usage)
            },
            requestId: fe ?? void 0,
            ...wF(s.querySource, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool),
            type: "assistant",
            uuid: cAt.randomUUID(),
            timestamp: new Date().toISOString(),
            ...!1,
            ...(g && {
              advisorModel: g
            })
          };
        if (It.push(Zo), ye = Zo, yield Zo, yield* jn(Qo, Kt, Jn)) return;
      } finally {
        ti();
      }
      dt("stream_completed", fe ?? null, vr !== null ? Dn : null);
      break e;
    }
  } catch (vn) {
    if (dt(o.aborted ? "aborted" : "attempt_errored", fe ?? null, null), vn instanceof RU) throw vn;
    if (!Yt && vn instanceof hM && vn.originalError instanceof es && vn.originalError.status === 404) {
      let qo = vn.originalError.requestID ?? "unknown";
      if (logForDebugging("Streaming endpoint returned 404, falling back to non-streaming mode", {
        level: "warn"
      }), Yt = !0, oe?.strip(), s.onStreamingFallback) s.onStreamingFallback();
      logEvent("tengu_streaming_fallback_to_non_streaming", {
        model: s.model,
        error: Qe("404_stream_creation"),
        attemptNumber: pe,
        maxOutputTokens: ve,
        thinkingType: fromEnum(n.type),
        request_id: qo,
        fallback_cause: Qe("404_stream_creation")
      }), yield {
        type: "streaming_fallback_began"
      };
      try {
        ie = fe ?? (qo !== "unknown" ? qo : null);
        let {
          message: Bo,
          requestId: Jt,
          creditCode: cn
        } = yield* LNl({
          model: s.model,
          source: s.querySource,
          agentContext: s.agentContext,
          llmSpan: he
        }, {
          model: s.model,
          fallbackModel: s.fallbackModel,
          thinkingConfig: n,
          ...(uc() && {
            fastMode: ee
          }),
          signal: o,
          onRetryStatus: s.onRetryStatus,
          onApiError: Cr => {
            let Ir = vdn(Cr, s.model, s.querySource);
            if (Ir === kwt) return;
            if (Ir !== null) return Ir;
            return Eo(Cr, "sync");
          }
        }, $t, (Cr, Ir, so) => {
          pe = Cr, ve = so;
        }, Cr => {
          Ken(Cr, s.querySource), _6n(Cr, s.querySource);
        }, qo);
        fe = Jt, ft = Bo.diagnostics?.cache_miss_reason;
        let En = Ot(Bo),
          Un = {
            message: {
              ...Bo,
              content: G5t(En.content, r, s.agentId, {
                requestId: fe ?? void 0,
                messageId: Bo.id
              }),
              usage: ine(PE, Bo.usage)
            },
            requestId: fe ?? void 0,
            ...wF(s.querySource, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool),
            type: "assistant",
            uuid: cAt.randomUUID(),
            timestamp: new Date().toISOString(),
            ...!1,
            ...(g && {
              advisorModel: g
            })
          };
        if (It.push(Un), ye = Un, yield Un, yield* jn(En, Bo, cn)) return;
      } catch (Bo) {
        if (Bo instanceof RU) throw Bo;
        logForDebugging(`Non-streaming fallback also failed: ${Se(Bo)}`, {
          level: "error"
        });
        let Jt = Bo,
          cn = s.model;
        if (Bo instanceof hM) Jt = Bo.originalError, cn = Bo.retryContext.model;
        if (Jt instanceof xm) {
          Re();
          return;
        }
        if (Jt instanceof es) jwn(Jt);
        let En = fe || (Jt instanceof es ? Jt.requestID : void 0) || (Jt instanceof es ? Jt.error?.request_id : void 0);
        Lho({
          error: Jt,
          model: cn,
          messageCount: $.length,
          messageTokens: wz($),
          durationMs: Math.max(0, Math.round(performance.now() - le)),
          durationMsIncludingRetries: Math.max(0, Math.round(performance.now() - se)),
          attempt: pe,
          requestId: En,
          clientRequestId: Ae,
          didFallBackToNonStreaming: Yt,
          queryTracking: s.queryTracking,
          querySource: s.querySource,
          messageClientPlatform: s.messageClientPlatform,
          llmSpan: he,
          fastMode: ke,
          previousRequestId: l,
          effort: ue,
          agentContext: s.agentContext,
          attribution: wF(s.querySource, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool),
          promptTooLongIsHandled: s.promptTooLongIsHandled
        }), yield nRn(Jt, cn, {
          messages: e,
          messagesForAPI: $,
          requestId: En
        }), Re();
        return;
      }
    } else {
      logForDebugging(`Error in API request: ${Se(vn)}`, {
        level: "error"
      });
      let qo = vn,
        Bo = s.model;
      if (vn instanceof hM) qo = vn.originalError, Bo = vn.retryContext.model;
      if (qo instanceof xm) {
        Re();
        return;
      }
      if (qo instanceof es) jwn(qo);
      let Jt = fe || (qo instanceof es ? qo.requestID : void 0) || (qo instanceof es ? qo.error?.request_id : void 0);
      Lho({
        error: qo,
        model: Bo,
        messageCount: $.length,
        messageTokens: wz($),
        durationMs: Math.max(0, Math.round(performance.now() - le)),
        durationMsIncludingRetries: Math.max(0, Math.round(performance.now() - se)),
        attempt: pe,
        requestId: Jt,
        clientRequestId: Ae,
        didFallBackToNonStreaming: Yt,
        queryTracking: s.queryTracking,
        querySource: s.querySource,
        messageClientPlatform: s.messageClientPlatform,
        llmSpan: he,
        fastMode: ke,
        previousRequestId: l,
        effort: ue,
        agentContext: s.agentContext,
        attribution: wF(s.querySource, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool),
        promptTooLongIsHandled: s.promptTooLongIsHandled
      }), yield nRn(qo, Bo, {
        messages: e,
        messagesForAPI: $,
        requestId: Jt
      }), Re();
      return;
    }
  } finally {
    if (v4n("api_call", s.agentId), dt(o.aborted ? "aborted" : "attempt_errored", fe ?? null, null), Re(), ye) {
      let vn = ye.message.usage;
      if (Dn = ine(PE, vn), vr = ye.message.stop_reason, vr === "refusal") K4t({
        model: u,
        requestId: fe || void 0,
        querySource: s.querySource,
        effort: ue,
        fastMode: ke,
        attempt: pe,
        attribution: wF(s.querySource, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool),
        serverFallbackHop: !1,
        stopDetails: ye.message.stop_details ?? null
      });
      let Hr = Mn?.servedFallbackModel !== void 0,
        qo = Hr && Mn !== void 0 ? QAo(Mn.entries, {
          speed: Dn.speed,
          serverToolUse: Dn.server_tool_use
        }, vr) : Koe(u, Dn);
      or += Cce(qo, Dn, Hr ? s.serverRefusalFallback?.model ?? s.model : s.model, s.querySource, ue, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool);
    }
  }
  if (fe && V7(s.agentContext) && (s.querySource.startsWith("repl_main_thread") || s.querySource === "sdk")) setLastMainRequestId(fe);
  if (re && ft) Z2i(ft, {
    requestId: fe,
    previousMessageId: c,
    model: s.model,
    is1hCacheTTL: V === "1h",
    querySource: s.querySource,
    queryDepth: s.queryTracking?.depth
  });
  let is = $.length,
    cs = wz($),
    Kr = u$() ? void 0 : nel($, s.model);
  s.getToolPermissionContext().then(vn => {
    rel({
      model: It[0]?.message.model ?? Nn?.model ?? s.model,
      preNormalizedModel: s.model,
      usage: Dn,
      start: le,
      startIncludingRetries: se,
      attempt: pe,
      messageCount: is,
      messageTokens: cs,
      requestId: fe ?? null,
      clientRequestId: Yt ? void 0 : Ae,
      firstAttemptRequestId: ie ?? null,
      stopReason: vr,
      ttftMs: Zt,
      didFallBackToNonStreaming: Yt,
      querySource: s.querySource,
      messageClientPlatform: s.messageClientPlatform,
      headers: Fe,
      costUSD: or,
      queryTracking: s.queryTracking,
      permissionMode: vn.mode,
      newMessages: It,
      requestContentTelemetry: Kr,
      llmSpan: he,
      globalCacheStrategy: H,
      requestSetupMs: le - se,
      attemptStartTimes: de,
      fastMode: ke,
      previousRequestId: l,
      betas: Me,
      effort: ue,
      agentContext: s.agentContext,
      attribution: wF(s.querySource, s.spawnedBySkill, s.activeSkill, s.activeMcpServer, s.activeMcpTool)
    });
  }), Re();
}
function LTm(e) {
  if (!e) return;
  try {
    if (!e.controller.signal.aborted) e.controller.abort();
  } catch {}
}
function ine(e, t) {
  if (!t) return {
    ...e
  };
  let n = t.cache_creation,
    r = (n?.ephemeral_1h_input_tokens ?? 0) + (n?.ephemeral_5m_input_tokens ?? 0),
    o = r > 0 ? {
      ephemeral_1h_input_tokens: n?.ephemeral_1h_input_tokens ?? e.cache_creation.ephemeral_1h_input_tokens,
      ephemeral_5m_input_tokens: n?.ephemeral_5m_input_tokens ?? e.cache_creation.ephemeral_5m_input_tokens
    } : {
      ...e.cache_creation
    };
  return {
    input_tokens: t.input_tokens !== null && t.input_tokens > 0 ? t.input_tokens : e.input_tokens,
    cache_creation_input_tokens: t.cache_creation_input_tokens !== null && t.cache_creation_input_tokens > 0 ? t.cache_creation_input_tokens : r > 0 ? r : e.cache_creation_input_tokens,
    cache_read_input_tokens: t.cache_read_input_tokens !== null && t.cache_read_input_tokens > 0 ? t.cache_read_input_tokens : e.cache_read_input_tokens,
    output_tokens: t.output_tokens ?? e.output_tokens,
    server_tool_use: {
      web_search_requests: t.server_tool_use?.web_search_requests ?? e.server_tool_use.web_search_requests,
      web_fetch_requests: t.server_tool_use?.web_fetch_requests ?? e.server_tool_use.web_fetch_requests
    },
    service_tier: t.service_tier ?? e.service_tier,
    cache_creation: o,
    inference_geo: t.inference_geo ?? e.inference_geo,
    iterations: t.iterations ?? e.iterations,
    speed: t.speed ?? e.speed
  };
}
function lIo(e, t) {
  if (!t) return {
    ...e
  };
  let n = t.cache_creation;
  return {
    ...e,
    input_tokens: t.input_tokens ?? e.input_tokens,
    output_tokens: t.output_tokens ?? e.output_tokens,
    cache_read_input_tokens: t.cache_read_input_tokens ?? e.cache_read_input_tokens,
    cache_creation_input_tokens: t.cache_creation_input_tokens ?? (n ? (n.ephemeral_1h_input_tokens ?? 0) + (n.ephemeral_5m_input_tokens ?? 0) : e.cache_creation_input_tokens),
    ...(n && {
      cache_creation: {
        ephemeral_1h_input_tokens: n.ephemeral_1h_input_tokens ?? 0,
        ephemeral_5m_input_tokens: n.ephemeral_5m_input_tokens ?? 0
      }
    })
  };
}
function E6n(e, t) {
  return {
    input_tokens: e.input_tokens + t.input_tokens,
    cache_creation_input_tokens: e.cache_creation_input_tokens + t.cache_creation_input_tokens,
    cache_read_input_tokens: e.cache_read_input_tokens + t.cache_read_input_tokens,
    output_tokens: e.output_tokens + t.output_tokens,
    server_tool_use: {
      web_search_requests: e.server_tool_use.web_search_requests + t.server_tool_use.web_search_requests,
      web_fetch_requests: e.server_tool_use.web_fetch_requests + t.server_tool_use.web_fetch_requests
    },
    service_tier: t.service_tier,
    cache_creation: {
      ephemeral_1h_input_tokens: e.cache_creation.ephemeral_1h_input_tokens + t.cache_creation.ephemeral_1h_input_tokens,
      ephemeral_5m_input_tokens: e.cache_creation.ephemeral_5m_input_tokens + t.cache_creation.ephemeral_5m_input_tokens
    },
    inference_geo: t.inference_geo,
    iterations: t.iterations,
    speed: t.speed
  };
}
function MTm(e, t, n, r = !1, o) {
  let s = u => {
      let d = u;
      while (d >= 0 && e[d].type === "api_system") d--;
      return d;
    },
    i = s(e.length - 1);
  if (r) i = s(i - 1);
  let a = new Set();
  if (i >= 0) a.add(i);
  let l = !1;
  if (tpt()) {
    if (o) {
      let u = e.findLastIndex(d => d.uuid === o);
      if (u >= 0 && u <= i) {
        let d = r && u === i && HQa() ? s(u - 1) : u;
        if (d >= 0) a.add(d), l = !0;
      }
    } else if (!r) {
      let u = s(i - 1);
      if (u >= 0) a.add(u), l = !0;
    }
  }
  return logEvent("tengu_api_cache_breakpoints", {
    totalMessageCount: e.length,
    cachingEnabled: t,
    skipCacheWrite: r,
    forkPointPinned: l,
    markerCount: a.size
  }), e.map((u, d) => {
    let p = a.has(d);
    if (u.type === "user") return bTm(u, p, t, n);
    if (u.type === "api_system") return {
      role: "system",
      content: u.message.content
    };
    return ETm(u, p, t, n);
  });
}
function NTm(e, t, n) {
  return oIo(e, {
    skipGlobalCacheForSystemPrompt: n?.skipGlobalCacheForSystemPrompt
  }).map(r => ({
    type: "text",
    text: r.text,
    ...(t && r.cacheScope !== null && {
      cache_control: Ete({
        scope: r.cacheScope,
        ttl: n?.cacheTtl
      })
    })
  }));
}
async function iU({
  systemPrompt: e = Wc([]),
  userPrompt: t,
  outputFormat: n,
  signal: r,
  options: o
}) {
  return (await N6n([Ln({
    content: e.map(i => ({
      type: "text",
      text: i
    }))
  }), Ln({
    content: t
  })], async () => {
    let i = [Ln({
      content: t
    })];
    return [await i8e({
      messages: i,
      systemPrompt: e,
      thinkingConfig: {
        type: "disabled"
      },
      tools: [],
      signal: r,
      options: {
        ...o,
        stickyBetas: o.stickyBetas ?? $I(getStickyBetas()),
        agentContext: o.agentContext,
        model: getSmallFastModel(),
        enablePromptCaching: o.enablePromptCaching ?? !1,
        outputFormat: n,
        async getToolPermissionContext() {
          return O1();
        }
      }
    })];
  }))[0];
}
async function edt({
  systemPrompt: e = Wc([]),
  userPrompt: t,
  outputFormat: n,
  signal: r,
  options: o
}) {
  return (await N6n([Ln({
    content: e.map(i => ({
      type: "text",
      text: i
    }))
  }), Ln({
    content: t
  })], async () => {
    let i = [Ln({
      content: t
    })];
    return [await i8e({
      messages: i,
      systemPrompt: e,
      thinkingConfig: {
        type: "disabled"
      },
      tools: [],
      signal: r,
      options: {
        ...o,
        stickyBetas: o.stickyBetas ?? $I(getStickyBetas()),
        agentContext: o.agentContext,
        enablePromptCaching: o.enablePromptCaching ?? !1,
        outputFormat: n,
        async getToolPermissionContext() {
          return O1();
        }
      }
    })];
  }))[0];
}
function FTm(e, t) {
  let n = Math.min(e.max_tokens, t),
    r = {
      ...e
    };
  if (r.thinking?.type === "enabled" && r.thinking.budget_tokens) r.thinking = {
    ...r.thinking,
    budget_tokens: Math.min(r.thinking.budget_tokens, n - 1)
  };
  return {
    ...r,
    max_tokens: n
  };
}
function ehe(e) {
  let t = YCe(e);
  return Tae("CLAUDE_CODE_MAX_OUTPUT_TOKENS", process.env.CLAUDE_CODE_MAX_OUTPUT_TOKENS, t.default, t.upperLimit).effective;
}
var cAt,
  iIo,
  hTm = "anthropic-dispatch-id",
  gTm = "v2s",
  HTm = 1e4,
  aIo = 20000,
  ITm = 30,
  BTm = 64000;
var rb = b(() => {
  li();
  pyn();
  Ri();
  K6e();
  Ao();
  jR();
  zun();
  Qn();
  jS();
  Om();
  Lr();
  sn();
  bt();
  zso();
  Rn();
  lo();
  Mo();
  oN();
  ln();
  zn();
  PF();
  Y2e();
  LYe();
  zde();
  lt();
  g1();
  H9();
  s5();
  zn();
  Hte();
  S_();
  Ao();
  jR();
  jS();
  qe();
  SA();
  Om();
  tE();
  gqe();
  y4t();
  vAe();
  P8();
  B6e();
  _9();
  dr();
  isFastModeEligible();
  Hz();
  jZ();
  Y5();
  Jtt();
  Fwn();
  Pd();
  F0t();
  gme();
  j1();
  Mo();
  g6e();
  Xt();
  Pho();
  Nq();
  Ct();
  $u();
  Kae();
  rgo();
  NBe();
  fP();
  txe();
  Xqn();
  MYe();
  z4t();
  gNl();
  k8r();
  oxe();
  jqn();
  B9e();
  cAt = require("crypto"), iIo = (Gte(), ro(xce));
});
export {B4e,PNl,Ete,P4e,_Tm,yTm,TTm,STm,QRe,NNl,bTm,ONl,ETm,i8e,odt,CTm,vTm,BNl,FNl,LNl,wTm,RTm,xTm,_zn,MNl,kTm,DTm,PTm,OTm,UNl,LTm,ine,lIo,E6n,MTm,NTm,iU,edt,FTm,ehe,cAt,iIo,hTm,gTm,HTm,aIo,ITm,BTm,rb};
