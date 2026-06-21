// @ts-nocheck
import {es,E3,TH} from "../../vendor/m135.ts";
import {getAPIProvider,isFirstPartyAnthropicBaseUrl,THIRD_PARTY_PROVIDER_LABELS,usesFirstPartyModelIds,li} from "./1282_usesFirstPartyModelIds.ts";
import {Ski,k0t,Tki,jZ} from "../../vendor/m2510.ts";
import {formatFileSize,ps} from "../../vendor/m238.ts";
import {getIsNonInteractiveSession,isLongContext1mCreditsBlocked,setLongContext1mCreditsBlocked,setFableCreditsRequired,lt} from "../session/0131_sent.ts";
import {st,fromEnum} from "../../vendor/m5.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Br,WS} from "../../vendor/m1456.ts";
import {PH,Tme,q7,g1} from "../../vendor/m1445.ts";
import {tc,lo} from "../tools/5190_userPromptCount.ts";
import {snt,Fwn} from "../telemetry/2735_base64_size_bytes.ts";
import {QO,V4} from "../telemetry/2512_error_name.ts";
import {int,gOt} from "../../vendor/m2735.ts";
import {isClaudeAISubscriber,getAnthropicApiKeyWithSource,hasStoredOAuthToken,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {vUi,PF} from "./2739_status.ts";
import {mv,isNonCustomOpusModel,getCanonicalName,renderModelName,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {$8r} from "../core/2738_message.ts";
import {rZ} from "../../vendor/m2207.ts";
import {getGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {qt,Xt} from "../config/0228_encoding.ts";
import {je} from "../../vendor/m577.ts";
import {SOt,fq,ZRe,Wwn,txe} from "../../vendor/m2739.ts";
import {k2,xH} from "../config/0580_xH.ts";
import {Im,yQ} from "../../vendor/m1282.ts";
import {WorkloadIdentityError,SX} from "../../vendor/m138.ts";
import {ont,nUi,L2e,nnt,rnt,AOt,oUi,xz} from "../agent/2734_partialTextChars.ts";
import {Cw,LB} from "../../vendor/m1284.ts";
import {P2e,eW} from "../telemetry/2730_raw.ts";
import {b} from "../../runtime.ts";
import {LD} from "../../vendor/m194.ts";
import {Lr} from "../../vendor/m578.ts";
import {sn} from "../config/0047_namespace.ts";
function sN(e) {
  return e.startsWith(ob) || e.startsWith(`Please run /login \xB7 ${ob}`);
}
function she(e) {
  if (!e.isApiErrorMessage) return !1;
  let t = e.message.content;
  if (!Array.isArray(t)) return !1;
  return t.some(n => n.type === "text" && n.text.startsWith(OF));
}
function EOt(e) {
  let t = e.match(/prompt is too long[^0-9]*(\d+)\s*tokens?\s*>\s*(\d+)/i);
  return {
    actualTokens: t ? parseInt(t[1], 10) : void 0,
    limitTokens: t ? parseInt(t[2], 10) : void 0
  };
}
function ant(e) {
  if (!she(e) || !e.errorDetails) return;
  let {
    actualTokens: t,
    limitTokens: n
  } = EOt(e.errorDetails);
  if (t === void 0 || n === void 0) return;
  let r = t - n;
  return r > 0 ? r : void 0;
}
function NUi(e) {
  let {
    actualTokens: t,
    limitTokens: n,
    conversationTokensEstimate: r
  } = e;
  if (t === void 0 || n === void 0) return `${OF} \xB7 this conversation is a single ` + "exchange and cannot be compacted \u2014 the request size comes mostly " + "from system prompt, tool definitions, or attachments.";
  if (r >= t * MRd) return `${OF} \xB7 the request is ~${t} tokens (limit ${n}) and this conversation's own content is most of it. A single-exchange conversation cannot be compacted; start with less content (smaller files or pasted text).`;
  return `${OF} \xB7 the request is ~${t} tokens (limit ${n}) but this conversation is only ~${r} tokens \u2014 the rest is system prompt, ` + "tool definitions, and attachment content. A single-exchange conversation cannot be compacted; reduce attached files/tools or start with less context.";
}
function NRd(e) {
  return e.includes("request_too_large") || z8r(e) !== void 0;
}
function BUi(e) {
  if (e.includes("request_too_large") || e.toLowerCase().includes("too much media")) return new Set(["document", "image"]);
  let t = z8r(e);
  return t ? new Set([t.kind]) : void 0;
}
function z8r(e) {
  let t = e.match(/messages[.[](\d+)[\].]+content[.[](\d+)[\].]+(?:tool_result[.[]content[.[]\d+[\].]+)?(image|document|pdf)/);
  if (t) return {
    messageIdx: Number(t[1]),
    contentIdx: Number(t[2]),
    kind: t[3] === "image" ? "image" : "document"
  };
  let n = e.toLowerCase();
  if (BRd.some(r => n.includes(r))) return {
    kind: "image"
  };
  if (FRd.some(r => n.includes(r))) return {
    kind: "document"
  };
  return;
}
function Kwn(e) {
  if (!(e instanceof es) || e.status !== 400) return;
  return z8r(e.message);
}
function zwn(e) {
  return e.isApiErrorMessage === !0 && e.errorDetails !== void 0 && NRd(e.errorDetails);
}
function Y8r(e) {
  return e instanceof Error && e.message.toLowerCase().includes("prompt is too long");
}
function COt(e) {
  return e instanceof Error && e.message.toLowerCase().includes("input length and `max_tokens` exceed context limit");
}
function J8r(e) {
  return e instanceof Error && e.message.toLowerCase().includes("credit balance is too low");
}
function Jwn(e) {
  return e instanceof Error && e.message.toLowerCase().includes("organization has been disabled");
}
function PUi() {
  let e = getAPIProvider();
  if (e === "firstParty") {
    if (isFirstPartyAnthropicBaseUrl()) return ` If it persists, check ${DUi}.`;
    let t = process.env.ANTHROPIC_BASE_URL ?? "";
    return ` If it persists, check your inference gateway (${URL.parse(t)?.host || t}).`;
  }
  if (e === "anthropicAws") return ` If it persists, check ${DUi}.`;
  return ` If it persists, check your ${THIRD_PARTY_PROVIDER_LABELS[e]} service status.`;
}
function e5r() {
  let e = `max ${Ski} pages, ${formatFileSize(k0t)}`;
  return getIsNonInteractiveSession() ? `PDF too large (${e}). Try reading the file a different way (e.g., extract text with pdftotext).` : `PDF too large (${e}). Double press esc to go back and try again, or use pdftotext to convert to text first.`;
}
function t5r() {
  return getIsNonInteractiveSession() ? "PDF is password protected. Try using a CLI tool to extract or convert the PDF." : "PDF is password protected. Please double press esc to edit your message and try again.";
}
function n5r() {
  return getIsNonInteractiveSession() ? "The PDF file was not valid. Try converting it to text first (e.g., pdftotext)." : "The PDF file was not valid. Double press esc to go back and try again with a different file.";
}
function Vwn() {
  return getIsNonInteractiveSession() ? "Image was too large. Try resizing the image or using a different approach." : "Image was too large. Double press esc to go back and try again with a smaller image.";
}
function r5r() {
  let e = `max ${formatFileSize(Tki)}`;
  return getIsNonInteractiveSession() ? `Request too large (${e}). Try with a smaller file.` : `Request too large (${e}). Double press esc to go back and try with a smaller file.`;
}
function cnt(e) {
  let t = e === "document" ? "a document" : "an image",
    n = getIsNonInteractiveSession() ? "Re-read the file with a different approach if you still need it." : "Double press esc to edit your message, or re-read the file if you still need it.";
  return `${ob}: ${t} in the conversation could not be processed and was removed. ${n}`;
}
function GRd() {
  return getIsNonInteractiveSession() ? "Your account does not have access to Claude. Please login again or contact your administrator." : Zwn;
}
function VRd() {
  return WRd;
}
function OUi() {
  return st(process.env.CLAUDE_CODE_REMOTE);
}
function KRd(e, t, n) {
  try {
    let r = -1;
    for (let u = 0; u < n.length; u++) {
      let d = n[u];
      if (!d) continue;
      let p = d.message.content;
      if (Array.isArray(p)) {
        for (let m of p) if (m.type === "tool_use" && "id" in m && m.id === e) {
          r = u;
          break;
        }
      }
      if (r !== -1) break;
    }
    let o = -1;
    for (let u = 0; u < t.length; u++) {
      let d = t[u];
      if (!d) continue;
      if (d.type === "assistant" && "message" in d) {
        let p = d.message.content;
        if (Array.isArray(p)) {
          for (let m of p) if (m.type === "tool_use" && "id" in m && m.id === e) {
            o = u;
            break;
          }
        }
      }
      if (o !== -1) break;
    }
    let s = [];
    for (let u = r + 1; u < n.length; u++) {
      let d = n[u];
      if (!d) continue;
      let p = d.message.content;
      if (Array.isArray(p)) for (let m of p) {
        let f = d.message.role;
        if (m.type === "tool_use" && "id" in m) s.push(`${f}:tool_use:${m.id}`);else if (m.type === "tool_result" && "tool_use_id" in m) s.push(`${f}:tool_result:${m.tool_use_id}`);else if (m.type === "text") s.push(`${f}:text`);else if (m.type === "thinking") s.push(`${f}:thinking`);else if (m.type === "image") s.push(`${f}:image`);else s.push(`${f}:${m.type}`);
      } else if (typeof p === "string") s.push(`${d.message.role}:string_content`);
    }
    let i = [];
    for (let u = o + 1; u < t.length; u++) {
      let d = t[u];
      if (!d) continue;
      switch (d.type) {
        case "user":
        case "assistant":
          {
            if ("message" in d) {
              let p = d.message.content;
              if (Array.isArray(p)) for (let m of p) {
                let f = d.message.role;
                if (m.type === "tool_use" && "id" in m) i.push(`${f}:tool_use:${m.id}`);else if (m.type === "tool_result" && "tool_use_id" in m) i.push(`${f}:tool_result:${m.tool_use_id}`);else if (m.type === "text") i.push(`${f}:text`);else if (m.type === "thinking") i.push(`${f}:thinking`);else if (m.type === "image") i.push(`${f}:image`);else i.push(`${f}:${m.type}`);
              } else if (typeof p === "string") i.push(`${d.message.role}:string_content`);
            }
            break;
          }
        case "attachment":
          if ("attachment" in d) i.push(`attachment:${d.attachment.type}`);
          break;
        case "system":
          if ("subtype" in d) i.push(`system:${d.subtype}`);
          break;
        case "progress":
          if ("progress" in d && d.progress && typeof d.progress === "object" && "type" in d.progress) i.push(`progress:${d.progress.type ?? "unknown"}`);else i.push("progress:unknown");
          break;
      }
    }
    let a = u => {
        if (!u) return "<none>";
        let d = u.message.content;
        if (!Array.isArray(d)) return `${u.message.role}:string`;
        return `${u.message.role}:[${d.map(p => p.type === "tool_use" ? `tool_use:${p.id}` : p.type === "tool_result" ? `tool_result:${p.tool_use_id}` : p.type).join(",")}]`;
      },
      l = 0,
      c = 0;
    for (let u of n) {
      let d = u.message.content;
      if (!Array.isArray(d)) continue;
      for (let p of d) {
        if (p.type === "tool_use" && p.id === e) l++;
        if (p.type === "tool_result" && p.tool_use_id === e) c++;
      }
    }
    logEvent("tengu_tool_use_tool_result_mismatch_error", {
      toolUseId: Br(e),
      normalizedSequence: s.join(", "),
      preNormalizedSequence: i.join(", "),
      normalizedMessageCount: n.length,
      originalMessageCount: t.length,
      normalizedToolUseIndex: r,
      originalToolUseIndex: o,
      offendingMessageBlocks: a(n[r]),
      followingMessageBlocks: r === -1 ? "<none>" : a(n[r + 1]),
      toolUseOccurrences: l,
      toolResultOccurrences: c
    });
  } catch (r) {}
}
function FUi(e) {
  return typeof e === "object" && e !== null && "content" in e && "model" in e && "usage" in e && Array.isArray(e.content) && typeof e.model === "string" && typeof e.usage === "object";
}
function eRn(e) {
  return !!PH && e instanceof es && e.status === 400 && e.message.includes(PH.header) && e.message.includes("anthropic-beta");
}
function o5r(e) {
  return e instanceof es && e.status === 400 && (e.message.includes("Advisor tool result content could not be processed") || e.message.includes("found in advisor_tool_result blocks"));
}
function vOt(e) {
  return e instanceof es && e.status === 400 && e.message.includes(zRd);
}
function s5r(e) {
  return e instanceof es && e.status === 400 && e.message.includes(Tme.header) && e.message.includes("anthropic-beta");
}
function UUi(e) {
  if (!(e instanceof es) || e.status !== 400) return;
  let t = e.message;
  if (t.includes("`server-side-fallback-") && t.includes("anthropic-beta")) return "beta_header";
  if (/does not support the `fallbacks?` parameter/.test(t)) return "unsupported_primary";
  if (/The `fallbacks?` parameter is not supported/.test(t)) return "unsupported_primary";
  if (t.includes("is not a valid fallback target for")) return "invalid_target";
  if (t.includes("`fallback` and `fallbacks` cannot both be set")) return "param_shape";
  if (/`fallbacks?(\[\d+\])?\.[a-z_]+`?/.test(t)) return "param_shape";
  if (/target model '[^']*' is not compatible with/.test(t)) return "param_shape";
  if (t.includes("server-side fallback is not supported")) return "param_shape";
  if (/\bfallbacks?\.(messages|stream|fallback)\b is not supported/.test(t)) return "param_shape";
  if (/\bfallbacks?(\[\d+\])?: unknown field/.test(t)) return "param_shape";
  if (t.includes("Extra inputs are not permitted") && /\bfallbacks?(\[\d+\])?((\.|\s*->\s*)\w+)*\s*:/.test(t)) return "extra_forbidden";
  return;
}
function $Ui(e) {
  if (!(e instanceof es) || e.status !== 400) return;
  let t = e.message;
  if (t.includes("fallback-credit-") && (t.includes("anthropic-beta") || t.includes("anthropic_beta"))) return "credit_beta_header";
  if (t.includes("fallback_credit_token: invalid or malformed")) return "credit_malformed";
  if (t.includes("fallback_credit_token: does not belong to this organization")) return "credit_wrong_org";
  if (t.includes("fallback_credit_token: has expired")) return "credit_expired";
  if (t.includes("fallback_credit_token: is not valid for model")) return "credit_invalid_model";
  if (t.includes("Extra inputs are not permitted") && /\bfallback_credit_token\s*:/.test(t)) return "credit_extra_forbidden";
  if (/\bfallback_credit_token\s*:/.test(t)) return "credit_other";
  return;
}
function tRn(e) {
  if (!(e instanceof es) || e.status !== 400) return !1;
  let t = e.message;
  if (t.includes(q7.header) && t.includes("anthropic-beta")) return !0;
  if (t.includes("Unexpected role") && t.includes("input message role")) return !0;
  return t.includes("not supported") && /role .{0,2}system/i.test(t);
}
function i5r(e) {
  if (!(e instanceof es) || e.status !== 400) return !1;
  let t = e.message.toLowerCase().replaceAll("`", "");
  if (t.includes("signature in thinking block")) return !0;
  if (t.includes("thinking.signature") && t.includes("field required")) return !0;
  return (t.includes("thinking block") || t.includes("redacted_thinking")) && (t.includes("cannot be modified") || t.includes("invalid signature"));
}
function a5r(e) {
  if (!(e instanceof es) || e.status !== 400) return null;
  let t = /thinking\.type[^a-z]{1,8}(enabled|adaptive)[^]*?not supported/i.exec(e.message) ?? /\b(adaptive) thinking is not supported/i.exec(e.message);
  return t?.[1] ? t[1].toLowerCase() : null;
}
function nRn(e, t, n) {
  let r = YRd(e, t, n);
  if (e instanceof es && typeof e.status === "number") r.apiErrorStatus = e.status;
  let o = n?.requestId || (e instanceof es ? e.requestID || e.error?.request_id : void 0);
  if (o) r.requestId = o;
  return r;
}
function YRd(e, t, n) {
  if (e instanceof E3 || e instanceof TH && e.message.toLowerCase().includes("timeout")) return tc({
    content: lnt,
    error: "unknown"
  });
  if (e instanceof snt || e instanceof QO) return tc({
    content: Vwn(),
    error: "invalid_request",
    errorDetails: e.message
  });
  if (e instanceof Error && e.message.includes(B2e)) return tc({
    content: B2e,
    error: "rate_limit"
  });
  if (e instanceof Error && e.message.includes(F2e)) return tc({
    content: F2e,
    error: "rate_limit"
  });
  if (e instanceof es && e.status === 429) {
    let s = int(isClaudeAISubscriber()),
      i = vUi(e),
      a = s && mv(t) && e.message.toLowerCase().includes("usage credits are required") && !Gwn(e.message);
    if (s && i && !a) {
      let m = $8r(i, t);
      if (m) return tc({
        content: m,
        error: "rate_limit"
      });
      return tc({
        content: rZ,
        error: "rate_limit"
      });
    }
    if (s && Gwn(e.message) && !isLongContext1mCreditsBlocked()) setLongContext1mCreditsBlocked(!0), logEvent("tengu_1m_credits_clamp_activated", {});
    if (a) {
      setFableCreditsRequired(!0);
      let m = e.headers?.get?.("anthropic-ratelimit-unified-overage-disabled-reason") ?? getGlobalConfig().cachedExtraUsageDisabledReason;
      return tc({
        content: `${ob}: ${JRd(m)}`,
        error: "rate_limit",
        errorDetails: e.message
      });
    }
    if (s && Gwn(e.message)) {
      let m = getIsNonInteractiveSession() ? "turn on usage credits at claude.ai/settings/usage, or use --model to switch to standard context" : "run /usage-credits to turn them on, or /model to switch to standard context";
      return tc({
        content: `${ob}: Usage credits required for 1M context \xB7 ${m}`,
        error: "rate_limit",
        errorDetails: e.message
      });
    }
    let l = e.message.replace(/^429\s+/, ""),
      c;
    try {
      let m = qt(l),
        f = m?.error?.message ?? m?.message;
      if (typeof f === "string") c = f;
    } catch {}
    let u = c || l;
    if (s && e.headers?.get?.("anthropic-ratelimit-unified-overage-disabled-reason")) return tc({
      content: u,
      error: "rate_limit"
    });
    let d = s ? "Server is temporarily limiting requests (not your usage limit)" : "Request rejected (429)",
      p = `this may be a temporary capacity issue.${PUi()}`;
    return tc({
      content: `${ob}: ${d} \xB7 ${u || p}`,
      error: "rate_limit"
    });
  }
  if (Y8r(e) || COt(e)) return tc({
    content: OF,
    error: "invalid_request",
    errorDetails: e.message
  });
  if (e instanceof Error && /maximum of \d+ PDF pages/.test(e.message)) return tc({
    content: e5r(),
    error: "invalid_request",
    errorDetails: e.message
  });
  if (e instanceof Error && e.message.includes("The PDF specified is password protected")) return tc({
    content: t5r(),
    error: "invalid_request",
    errorDetails: e.message
  });
  if (e instanceof Error && e.message.includes("The PDF specified was not valid")) return tc({
    content: n5r(),
    error: "invalid_request",
    errorDetails: e.message
  });
  if (e instanceof es && e.status === 400 && e.message.includes("image exceeds") && e.message.includes("maximum")) return tc({
    content: Vwn(),
    error: "invalid_request",
    errorDetails: e.message
  });
  if (e instanceof es && e.status === 400 && e.message.includes("image dimensions exceed") && e.message.includes("many-image")) return tc({
    content: getIsNonInteractiveSession() ? "An image in the conversation exceeds the dimension limit for many-image requests (2000px). Start a new session with fewer images." : "An image in the conversation exceeds the dimension limit for many-image requests (2000px). Run /compact to remove old images from context, or start a new session.",
    error: "invalid_request",
    errorDetails: e.message
  });
  if (vOt(e)) {
    let s = getIsNonInteractiveSession() ? "change or unset the advisorModel setting (or the --advisor flag)" : "run /advisor to change or disable the advisor";
    return tc({
      content: `${ob}: ${e.message.replace(/^400\s+/, "")} \xB7 The configured advisor model is not compatible with this request model \u2014 ${s}`,
      error: "invalid_request",
      errorDetails: e.message
    });
  }
  {
    let s = Kwn(e);
    if (s && e instanceof Error) return tc({
      content: cnt(s.kind),
      error: "invalid_request",
      errorDetails: e.message
    });
  }
  if (eRn(e)) return tc({
    content: "Auto mode is unavailable for your plan",
    error: "invalid_request"
  });
  if (e instanceof es && e.status === 413) {
    if (e.message.toLowerCase().includes("context window")) return tc({
      content: OF,
      error: "invalid_request",
      errorDetails: e.message
    });
    return tc({
      content: r5r(),
      error: "invalid_request",
      errorDetails: `request_too_large: ${e.message}`
    });
  }
  if (e instanceof es && e.status === 400 && e.message.includes("`tool_use` ids were found without `tool_result` blocks immediately after")) {
    if (n?.messages && n?.messagesForAPI) {
      let s = e.message.match(/toolu_[A-Za-z0-9_]+/),
        i = s ? s[0] : null;
      if (i) KRd(i, n.messages, n.messagesForAPI);
    }
    {
      let i = getIsNonInteractiveSession() ? "" : " Run /rewind to recover the conversation.";
      return tc({
        content: "API Error: 400 due to tool use concurrency issues." + i,
        error: "invalid_request"
      });
    }
  }
  if (e instanceof es && e.status === 400 && e.message.includes("unexpected `tool_use_id` found in `tool_result`")) logEvent("tengu_unexpected_tool_result", {});
  if (e instanceof es && e.status === 400 && e.message.includes("`tool_use` ids must be unique")) {
    logEvent("tengu_duplicate_tool_use_id", {});
    let s = getIsNonInteractiveSession() ? "" : " Run /rewind to recover the conversation.";
    return tc({
      content: `API Error: 400 duplicate tool_use ID in conversation history.${s}`,
      error: "invalid_request",
      errorDetails: e.message
    });
  }
  if (isClaudeAISubscriber() && e instanceof es && e.status === 400 && e.message.toLowerCase().includes("invalid model name") && (isNonCustomOpusModel(getCanonicalName(t)) || t === "opus")) return tc({
    content: "Claude Opus is not available with the Claude Pro plan. If you have updated your subscription plan recently, run /logout and /login for the plan to take effect.",
    error: "invalid_request"
  });
  if (J8r(e)) return tc({
    content: Ywn,
    error: "billing_error"
  });
  if (e instanceof es && e.status === 400 && Jwn(e)) {
    let {
      source: s
    } = getAnthropicApiKeyWithSource();
    if (s === "ANTHROPIC_API_KEY" && process.env.ANTHROPIC_API_KEY && !isClaudeAISubscriber()) {
      let i = hasStoredOAuthToken();
      return tc({
        error: "invalid_request",
        content: i ? X8r : Q8r
      });
    }
  }
  if (e instanceof Error && e.message.toLowerCase().includes("x-api-key")) {
    if (OUi()) return tc({
      error: "authentication_failed",
      content: IUi
    });
    if (getAPIProvider() === "gateway") return tc({
      error: "invalid_request",
      content: Z8r
    });
    let {
      source: s
    } = getAnthropicApiKeyWithSource();
    return tc({
      error: "authentication_failed",
      content: s === "ANTHROPIC_API_KEY" || s === "apiKeyHelper" ? Qwn : Xwn
    });
  }
  if (e instanceof es && e.status === 403 && e.message.includes("OAuth token has been revoked")) return tc({
    error: "authentication_failed",
    content: GRd()
  });
  if (e instanceof es && (e.status === 401 || e.status === 403) && e.message.includes("OAuth authentication is currently not allowed for this organization")) return tc({
    error: "oauth_org_not_allowed",
    content: VRd()
  });
  if (e instanceof es && e.status === 403 && e.message.toLowerCase().includes("api key authentication is disabled")) {
    let {
      source: s
    } = getAnthropicApiKeyWithSource();
    if (s === "ANTHROPIC_API_KEY" && je.ANTHROPIC_API_KEY) return tc({
      error: "invalid_request",
      content: hasStoredOAuthToken() ? URd : $Rd
    });
    if (s === "apiKeyHelper") return tc({
      error: "invalid_request",
      content: qRd
    });
    if (s === "/login managed key") return tc({
      error: "authentication_failed",
      content: jRd
    });
  }
  if (e instanceof es && (e.status === 401 || e.status === 403)) {
    if (OUi()) return tc({
      error: "authentication_failed",
      content: IUi
    });
    let s = SOt(e);
    return tc({
      error: "authentication_failed",
      content: getIsNonInteractiveSession() ? `Failed to authenticate. ${ob}: ${s}` : `Please run /login \xB7 ${ob}: ${s}`
    });
  }
  if (st(process.env.CLAUDE_CODE_USE_BEDROCK) && e instanceof Error && e.message.toLowerCase().includes("model id")) {
    let s = LUi(),
      i = MUi(t);
    return tc({
      content: i ? `${ob} (${t}): ${e.message}.${s ? ` Try ${s} to switch to ${i}.` : ` Try switching to ${i}.`}` : `${ob} (${t}): ${e.message}.${s ? ` Run ${s} to pick a different model.` : ""}`,
      error: "model_not_found"
    });
  }
  if (e instanceof es && e.status === 404) {
    let s = LUi(),
      i = MUi(t);
    return tc({
      content: i ? `The model ${t} is not available on your ${getAPIProvider()} deployment. ${s ? `Try ${s} to switch to ${i}` : `Try switching to ${i}`}, or ask your admin to enable this model.` : `There's an issue with the selected model (${t}). It may not exist or you may not have access to it.${s ? ` Run ${s} to pick a different model.` : ""}`,
      error: "model_not_found"
    });
  }
  let r = PUi();
  if (e instanceof Error && e.message.includes(bOt)) return tc({
    content: `${ob}: ${bOt}. The API is at capacity \u2014 this is usually temporary. Try again in a moment.${r}`,
    error: "server_error"
  });
  if (e instanceof es && typeof e.status === "number" && e.status >= 500) {
    let s = SOt(e).replace(/[.!?\u2026]+$/, "");
    return tc({
      content: `${ob}: ${s}. This is a server-side issue, usually temporary \u2014 try again in a moment.${r}`,
      error: "server_error"
    });
  }
  if (e instanceof es) return tc({
    content: `${ob}: ${SOt(e)}`,
    error: "unknown"
  });
  let o = fq(e);
  if (o && (ZRe.has(o.code) || Wwn.has(o.code))) return tc({
    content: `${ob}: Connection to the API was lost (${o.code}). This is usually temporary \u2014 try again.`,
    error: "server_error"
  });
  if (e instanceof Error) return tc({
    content: `${ob}: ${e.message}`,
    error: "unknown"
  });
  return tc({
    content: ob,
    error: "unknown"
  });
}
function LUi() {
  if (!getIsNonInteractiveSession()) return "/model";
  return k2() === "sdk-cli" ? "--model" : void 0;
}
function MUi(e) {
  if (usesFirstPartyModelIds()) return;
  let t = e.toLowerCase();
  if (t.includes("fable-5") || t.includes("fable_5")) return je.ANTHROPIC_DEFAULT_OPUS_MODEL ?? Im().opus48;
  if (t.includes("opus-4-8") || t.includes("opus_4_8")) return Im().opus47;
  if (t.includes("opus-4-7") || t.includes("opus_4_7")) return Im().opus46;
  if (t.includes("opus-4-6") || t.includes("opus_4_6")) return Im().opus45;
  if (t.includes("opus-4-5") || t.includes("opus_4_5")) return Im().opus41;
  if (t.includes("sonnet-4-6") || t.includes("sonnet_4_6")) return Im().sonnet45;
  if (t.includes("sonnet-4-5") || t.includes("sonnet_4_5")) return Im().sonnet40;
  return;
}
function rRn(e) {
  if (e instanceof Error && e.message === "Request was aborted.") return "aborted";
  if (e instanceof E3 || e instanceof TH && e.message.toLowerCase().includes("timeout") || e instanceof Error && e.message.startsWith("Stream idle timeout")) return "api_timeout";
  if (e instanceof Error && e.message.includes(bOt)) return "repeated_529";
  if (e instanceof Error && (e.message.includes(B2e) || e.message.includes(F2e))) return "capacity_off_switch";
  if (e instanceof es && e.status === 429) return "rate_limit";
  if (e instanceof es && (e.status === 529 || e.message?.includes('"type":"overloaded_error"'))) return "server_overload";
  if (e instanceof Error && (e.message.toLowerCase().includes(OF.toLowerCase()) || COt(e))) return "prompt_too_long";
  if (e instanceof Error && /maximum of \d+ PDF pages/.test(e.message)) return "pdf_too_large";
  if (e instanceof Error && e.message.includes("The PDF specified is password protected")) return "pdf_password_protected";
  if (e instanceof es && e.status === 400 && e.message.includes("image exceeds") && e.message.includes("maximum")) return "image_too_large";
  if (e instanceof es && e.status === 400 && e.message.includes("image dimensions exceed") && e.message.includes("many-image")) return "image_too_large";
  if (e instanceof es && e.status === 400 && e.message.includes("Could not process image")) return "image_unprocessable";
  if (e instanceof es && e.status === 413) return e.message.toLowerCase().includes("context window") ? "prompt_too_long" : "request_too_large";
  if (e instanceof es && e.status === 400 && e.message.includes("`tool_use` ids were found without `tool_result` blocks immediately after")) return "tool_use_mismatch";
  if (e instanceof es && e.status === 400 && e.message.includes("unexpected `tool_use_id` found in `tool_result`")) return "unexpected_tool_result";
  if (e instanceof es && e.status === 400 && e.message.includes("`tool_use` ids must be unique")) return "duplicate_tool_use_id";
  if (e instanceof es && e.status === 400 && e.message.toLowerCase().includes("invalid model name")) return "invalid_model";
  if (e instanceof es && e.status === 404 && e.message.includes("not_found_error") && e.message.includes('"model: ')) return "model_not_found";
  if (e instanceof es && e.status === 400 && /invalid `?signature`? in `?thinking`? block/i.test(e.message)) return "invalid_thinking_signature";
  if (e instanceof es && e.status === 400 && (e.message.includes("text content blocks must be non-empty") || e.message.includes("text content blocks must contain non-whitespace text"))) return "empty_text_block";
  if (e instanceof es && e.status === 400 && e.message.includes("diagnostics.previous_message_id")) return "previous_message_id_invalid";
  if (e instanceof es && e.status === 400 && e.message.includes(".tool_use_id") && e.message.includes("String should match pattern")) return "tool_use_id_invalid";
  if (e instanceof es && e.status === 400 && e.message.includes("Grammar compilation")) return "grammar_compile_error";
  if (e instanceof es && e.status === 400 && e.message.toLowerCase().includes("request body is not valid json")) return "request_body_invalid_json";
  if (e instanceof Error && e.message.toLowerCase().includes(Ywn.toLowerCase())) return "credit_balance_low";
  if (e instanceof Error && (e.message.toLowerCase().includes("x-api-key") || e.message.toLowerCase().includes("not a valid api key for this workspace"))) return "invalid_api_key";
  if (e instanceof es && e.status === 403 && e.message.includes("OAuth token has been revoked")) return "token_revoked";
  if (e instanceof es && (e.status === 401 || e.status === 403) && e.message.includes("OAuth authentication is currently not allowed for this organization")) return "oauth_org_not_allowed";
  if (e instanceof es && (e.status === 401 || e.status === 403)) return "auth_error";
  if (st(process.env.CLAUDE_CODE_USE_BEDROCK) && e instanceof Error && e.message.toLowerCase().includes("model id")) return "bedrock_model_access";
  if (e instanceof Error && e.message.includes("Output blocked by content filtering policy")) return "output_content_filtered";
  if (e instanceof WorkloadIdentityError) return "wif_credential_error";
  if (e instanceof Error && e.message.toLowerCase().includes("domains are not accessible to our user agent")) return "webfetch_domain_blocked";
  if (e instanceof Error) {
    let n = e.message.toLowerCase();
    if (Jwn(e)) return "org_disabled";
    if (n.includes("updated our consumer terms")) return "terms_not_accepted";
    if (n.includes("web search is not enabled for this organization") || /is not enabled for (this|your) organization/.test(n)) return "feature_not_enabled_for_org";
    if (/reached your specified[\w\s-]*?usage limits/.test(n)) return "usage_cap_reached";
  }
  if (tRn(e)) return "system_role_unsupported";
  if (e instanceof es && e.status === 400 && /`?(thinking|redacted_thinking)`?\s+(or\s+`?redacted_thinking`?\s+)?blocks?\s+.{0,60}cannot be modified/i.test(e.message)) return "thinking_blocks_modified";
  if (e instanceof es) {
    let n = e.status;
    if (n >= 500) return "server_error";
    if (n >= 400) return "client_error";
  }
  if (e instanceof TH) {
    if (fq(e)?.isSSLError) return "ssl_cert_error";
    return "connection_error";
  }
  let t = fq(e);
  if (t && (ZRe.has(t.code) || Wwn.has(t.code))) return "connection_error";
  return "unknown";
}
function l5r(e) {
  if (e.status === 529 || e.message?.includes('"type":"overloaded_error"')) return "overloaded";
  if (e.status === 429) return "rate_limit";
  if (e.status === 401 || e.status === 403) return "authentication_failed";
  if (e.status !== void 0 && e.status >= 408) return "server_error";
  return "unknown";
}
function U2e(e, t, n, r) {
  if (e !== "refusal") return;
  let o = t?.explanation?.trimEnd() ?? null;
  logEvent("tengu_refusal_api_response", {
    has_explanation: Boolean(o),
    category: t?.category ? fromEnum(ont(t.category)) : void 0,
    request_id: Br(n) || void 0
  });
  let s = 400,
    i = o && o.length > s ? o.slice(0, s).trimEnd() + "\u2026" : o,
    a = i ? ` ${i}${/[.!?\u2026]$/.test(i) ? "" : "."}` : "",
    l = r != null && nUi(r) ? renderModelName(r) : void 0,
    c;
  if (l !== void 0) {
    let p = getIsNonInteractiveSession(),
      m = p ? "Try rephrasing the request in a new session or change your model." : "Double press esc to edit your last message, or try a different model with /model.",
      f = p ? `Learn more: ${L2e}` : nnt,
      A = rnt(t?.category) ? `${l} has safety measures that flag messages on most cybersecurity or biology topics (https://www.anthropic.com/legal/aup). ${AOt}` : `${l} has safety measures that flagged something in this session (https://www.anthropic.com/legal/aup). This sometimes happens with safe, normal conversations.`;
    c = `${ob}: ${A} Claude Code can't respond to this request with ${l}.

${m}

${f}`;
  } else {
    let p = getIsNonInteractiveSession(),
      m = p ? "Try rephrasing the request in a new session or change your model." : "Please double press esc to edit your last message or start a new session for Claude Code to assist with a different task.";
    if (t?.category === "cyber" && usesFirstPartyModelIds()) {
      let f = p ? `Learn more: ${L2e}` : nnt,
        A = r != null ? renderModelName(r) : "This model";
      c = `${ob}: ${A} has safety measures that flagged this message for a cybersecurity topic. If your work requires this access, you can apply for an exemption: ${oUi(t.explanation)}

${m}

${f}`;
    } else c = `${ob}: Claude Code is unable to respond to this request, which appears to violate our Usage Policy (https://www.anthropic.com/legal/aup).${a} ` + m;
  }
  let u = n ? `

Request ID: ${n}` : "",
    d = tc({
      content: c + u,
      error: "invalid_request"
    });
  return d.requestId = n ?? void 0, d.message.stop_reason = "refusal", d.message.stop_details = t ?? null, d;
}
function JRd(e) {
  switch (e) {
    case "out_of_credits":
      return "Fable 5 uses usage credits and you're out \xB7 run /usage-credits to add funds, or /model to switch models";
    case "org_spend_cap_reached":
    case "org_level_disabled_until":
      return Cw() ? "Fable 5 uses usage credits and your monthly limit is reached \xB7 run /usage-credits to adjust it, or /model to switch models" : "Fable 5 uses usage credits and your monthly limit is reached \xB7 ask your admin to raise it, or /model to switch models";
    case "org_level_disabled":
    case "org_service_level_disabled":
      return "Fable 5 uses usage credits, which your organization has turned off \xB7 /model to switch models";
    case "seat_tier_level_disabled":
    case "seat_tier_zero_credit_limit":
    case "member_level_disabled":
    case "member_zero_credit_limit":
    case "group_zero_credit_limit":
      return "Fable 5 uses usage credits, which aren't available for your account \xB7 /model to switch models";
    default:
      return P2e() ? "Fable 5 now uses usage credits \xB7 run /usage-credits to turn them on, or /model to switch models" : "Fable 5 now uses usage credits \xB7 run /model to continue with Fable 5 or switch models";
  }
}
function Gwn(e) {
  return e.includes("Extra usage is required for long context") || e.includes("Usage credits are required for long context");
}
function qUi(e) {
  return isLongContext1mCreditsBlocked() && e.isApiErrorMessage === !0 && e.errorDetails !== void 0 && Gwn(e.errorDetails);
}
var ob = "API Error",
  OF = "Prompt is too long",
  MRd = 0.8,
  BRd,
  FRd,
  Ywn = "Credit balance is too low",
  Xwn = "Not logged in \xB7 Please run /login",
  Qwn = "Invalid API key \xB7 Fix external API key",
  X8r = "Your ANTHROPIC_API_KEY belongs to a disabled organization \xB7 Unset the environment variable to use your subscription instead",
  Q8r = "Your ANTHROPIC_API_KEY belongs to a disabled organization \xB7 Update or unset the environment variable",
  URd = "Your organization has disabled API key authentication \xB7 Unset ANTHROPIC_API_KEY to use your claude.ai account instead",
  $Rd = "Your organization has disabled API key authentication \xB7 Unset ANTHROPIC_API_KEY and run /login to sign in with your claude.ai account",
  qRd = "Your organization has disabled API key authentication \xB7 Unset the apiKeyHelper setting and run /login to sign in with your claude.ai account",
  jRd = "Your organization has disabled API key authentication \xB7 Run /login to sign in with your claude.ai account",
  Zwn = "OAuth token revoked \xB7 Please run /login",
  IUi = "Authentication error \xB7 This may be a temporary network issue, please try again",
  Z8r = "Authentication error \xB7 The gateway could not authenticate with its upstream provider \u2014 contact your gateway administrator",
  DUi = "https://status.claude.com",
  bOt = "Repeated 529 Overloaded errors",
  B2e = "Opus is experiencing high load, please use /model to switch to Sonnet",
  F2e = "Fable is experiencing high load, please use /model to switch to Sonnet",
  lnt = "Request timed out",
  WRd = "Your organization has disabled Claude subscription access for Claude Code \xB7 Use an Anthropic API key instead, or ask your admin to enable access",
  zRd = "cannot be used as an advisor when the request model is";
var fP = b(() => {
  LD();
  SX();
  g1();
  Ao();
  LB();
  Qn();
  lo();
  eW();
  Mo();
  yQ();
  li();
  xz();
  lt();
  jZ();
  xH();
  Lr();
  sn();
  ps();
  V4();
  Fwn();
  Xt();
  Ct();
  WS();
  PF();
  gOt();
  txe();
  BRd = ["could not process image", "image exceeds", "image dimensions exceed", "image does not match the provided media type", "image cannot be empty", "exceeds api limit", "images exceed the api limit", "unable to resize image", "unable to compress image", "image file is empty"], FRd = ["could not process pdf", "pdf pages", "the pdf specified was not valid", "the pdf specified is password protected", "pdf cannot be empty", "too much media"];
});
export {sN,she,EOt,ant,NUi,NRd,BUi,z8r,Kwn,zwn,Y8r,COt,J8r,Jwn,PUi,e5r,t5r,n5r,Vwn,r5r,cnt,GRd,VRd,OUi,KRd,FUi,eRn,o5r,vOt,s5r,UUi,$Ui,tRn,i5r,a5r,nRn,YRd,LUi,MUi,rRn,l5r,U2e,JRd,Gwn,qUi,ob,OF,MRd,BRd,FRd,Ywn,Xwn,Qwn,X8r,Q8r,URd,$Rd,qRd,jRd,Zwn,IUi,Z8r,DUi,bOt,B2e,F2e,lnt,WRd,zRd,fP};
