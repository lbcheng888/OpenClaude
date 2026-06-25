// @ts-nocheck
import {Uo} from "../../vendor/m137.ts";
import {cpe,aA} from "../../vendor/m234.ts";
import {orn,Xze} from "../../vendor/m574.ts";
import {ep} from "../../vendor/m2223.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {getAPIProviderForAnalytics as g2,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {Bo,Le} from "../../vendor/m5.ts";
import {Xg} from "../agent/2193_kind.ts";
import {xr} from "../../vendor/m1461.ts";
import {WHn,kD} from "../api/2754_actualTokens.ts";
import {P4,$ke} from "../../vendor/m2752.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {yxr,Ph} from "../agent/1459_agentType.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {L4,t9e} from "../../vendor/m2781.ts";
import {qOt,$nt,Fhe} from "../agent/2600_attributionMcpServer.ts";
import {bu,oS} from "../config/2605_event_name.ts";
import {zXr,Z4} from "../agent/3198_code.ts";
import {getTeleportedSessionInfo as PJt,markFirstTeleportMessageLogged as OJt,getIsNonInteractiveSession as kr,consumePostCompaction as rir,getLastApiCompletionTimestamp as Lbe,setLastApiCompletionTimestamp as lSt,addToTotalDurationState as Wsr,lt} from "../session/0132_sent.ts";
import {If,Pi,vu} from "../mcp/2200_mcpServerName.ts";
import {bytesPerTokenForModel as aE,Ro} from "./1458_swapShrinksContextWindow.ts";
import {rOt} from "../../vendor/m2520.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {lke,l1} from "../core/2694_l1.ts";
import {resetAuthFailureTracking as wBr,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {Bil,vbo} from "../../vendor/m4423.ts";
import {nv} from "../telemetry/3195_content.ts";
import {b} from "../../runtime.ts";
import {jx} from "../../vendor/m196.ts";
import {IA} from "../telemetry/2225_names.ts";
import {Opt} from "../core/4189_input_tokens.ts";
// @ts-nocheck
function AVp(e: any): any {
  if (e instanceof Uo) {
    let nestedMsg: any = e.error?.error?.message;
    if (typeof nestedMsg === "string" && nestedMsg) return nestedMsg;
  }
  return e instanceof Error ? e.message : String(e);
}
function $il({
  headers: e,
  baseUrl: t
}: any): any {
  if (e) {
    let headerNames: any[] = [];
    e.forEach((r: any, o: any) => headerNames.push(o));
    for (let [r, {
      prefixes: o
    }] of Object.entries(RVp)) if (o.some((s: any) => headerNames.some((i: any) => i.startsWith(s)))) return r;
  }
  if (t) try {
    let hostname: any = new URL(t).hostname.toLowerCase();
    for (let [r, o] of Object.entries(vVp)) if ((o as any).some((s: any) => hostname.endsWith(s))) return r;
  } catch {}
  return;
}
function wVp(e: any): any {
  let trimmed: any = cpe(e);
  return orn(trimmed) ? trimmed : ep(trimmed);
}
function wbo(): any {
  return {
    ...(process.env.ANTHROPIC_BASE_URL && {
      baseUrl: wVp(process.env.ANTHROPIC_BASE_URL)
    }),
    ...(process.env.ANTHROPIC_MODEL && {
      envModel: process.env.ANTHROPIC_MODEL
    }),
    ...(process.env.ANTHROPIC_SMALL_FAST_MODEL && {
      envSmallFastModel: process.env.ANTHROPIC_SMALL_FAST_MODEL
    })
  };
}
/** Returns the build age in minutes, or undefined if the build timestamp is unavailable/invalid. */
function qil(): any {
  if (!{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.BUILD_TIME) return;
  let buildTs: any = new Date({
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.BUILD_TIME).getTime();
  if (isNaN(buildTs)) return;
  return Math.floor((Date.now() - buildTs) / 60000);
}
function Wil({
  model: e,
  messagesLength: t,
  temperature: n,
  betas: r,
  permissionMode: o,
  querySource: s,
  messageClientPlatform: i,
  queryTracking: a,
  thinkingType: l,
  effortValue: c,
  fastMode: u,
  previousRequestId: d
}: any): any {
  W("tengu_api_query", {
    model: e,
    messagesLength: t,
    temperature: n,
    provider: g2(),
    buildAgeMins: qil(),
    ...(r?.length && {
      betas: r.join(",")
    }),
    permissionMode: Bo(o),
    querySource: Xg(s),
    ...(i && {
      messageClientPlatform: i
    }),
    ...(a && {
      queryChainId: xr(a.chainId),
      queryDepth: a.depth
    }),
    thinkingType: Bo(l),
    effortValue: Bo(c),
    fastMode: u,
    ...(d && {
      previousRequestId: xr(d)
    }),
    ...wbo()
  });
}
function kbo({
  error: e,
  model: t,
  messageCount: n,
  messageTokens: r,
  durationMs: o,
  durationMsIncludingRetries: s,
  attempt: i,
  requestId: a,
  clientRequestId: l,
  didFallBackToNonStreaming: c,
  promptCategory: u,
  headers: d,
  queryTracking: p,
  querySource: m,
  messageClientPlatform: f,
  llmSpan: h,
  fastMode: g,
  previousRequestId: _,
  effort: T,
  attribution: y,
  promptTooLongIsHandled: S,
  agentContext: E
}: any): any {
  let detectedGateway: any = $il({
      headers: e instanceof Uo && e.headers ? e.headers : d,
      baseUrl: process.env.ANTHROPIC_BASE_URL
    }),
    errorMsg: any = AVp(e),
    httpStatus: any = e instanceof Uo ? e.status : void 0,
    httpStatusStr: any = httpStatus !== void 0 ? String(httpStatus) : void 0,
    errorType: any = WHn(e),
    querySourceStr: any = Xg(m),
    isHandledPromptTooLong: any = S && errorType === "prompt_too_long",
    connErrDetails: any = P4(e);
  if (connErrDetails) {
    let sslSuffix: any = connErrDetails.isSSLError ? " (SSL error)" : "";
    A(`Connection error details: code=${connErrDetails.code}${sslSuffix}, message=${connErrDetails.message}`, {
      level: "error"
    });
  }
  let agentCtxInfo: any = isHandledPromptTooLong ? void 0 : yxr(E);
  if (l) A(`API error x-client-request-id=${l} (give this to the API team for server-log lookup)`, {
    level: "error"
  });
  if (!isHandledPromptTooLong) {
    if (errorType === "connection_error" || errorType === "server_overload" || errorType === "api_timeout" || errorType === "rate_limit") A(`API ${errorType} after retries: ${errorMsg}`, {
      level: "error"
    });else if (errorType === "model_not_found") A(`API model not found: ${errorMsg}`, {
      level: "error"
    });else if (errorType === "invalid_api_key") A(`API invalid_api_key: ${errorMsg}`, {
      level: "error"
    });else if (errorType === "output_content_filtered") A(`API output_content_filtered: ${errorMsg}`, {
      level: "error"
    });else if (errorType === "wif_credential_error") A(`API wif_credential_error: ${errorMsg}`, {
      level: "error"
    });else {
      if (e && typeof e === "object" && !("telemetryMessage" in e)) e.telemetryMessage = `API error: type=${errorType} status=${httpStatusStr ?? "none"}`;
      Ie(e);
    }
    W("tengu_api_error", {
      model: t,
      error: L4(errorMsg),
      status: httpStatusStr,
      errorType: errorType,
      ...(T && {
        effort_level: Le(T)
      }),
      messageCount: n,
      messageTokens: r,
      durationMs: o,
      durationMsIncludingRetries: s,
      attempt: i,
      provider: g2(),
      requestId: xr(a) || void 0,
      ...(agentCtxInfo && {
        invokingRequestId: xr(agentCtxInfo.invokingRequestId),
        invocationKind: Bo(agentCtxInfo.invocationKind)
      }),
      clientRequestId: xr(l) || void 0,
      didFallBackToNonStreaming: c,
      ...(u && {
        promptCategory: u
      }),
      ...(detectedGateway && {
        gateway: Le(detectedGateway)
      }),
      ...(p && {
        queryChainId: xr(p.chainId),
        queryDepth: p.depth
      }),
      ...(querySourceStr && {
        querySource: querySourceStr
      }),
      ...(f && {
        messageClientPlatform: f
      }),
      fastMode: g,
      ...(_ && {
        previousRequestId: xr(_)
      }),
      ...(y && qOt(m, y)),
      ...(y?.attributionSkill && {
        _PROTO_skill_name: y.attributionSkill
      }),
      ...wbo()
    });
  }
  if (bu("api_error", {
    model: t,
    error: errorMsg,
    ...(httpStatus !== void 0 && {
      status_code: httpStatus
    }),
    duration_ms: o,
    attempt: i,
    request_id: a ?? void 0,
    speed: g ? "fast" : "normal",
    ...(querySourceStr && {
      query_source: querySourceStr
    }),
    ...(T && {
      effort: T
    }),
    ...(y && $nt(m, y))
  }), i > 1) bu("api_retries_exhausted", {
    model: t,
    error: errorMsg,
    ...(httpStatus !== void 0 && {
      status_code: httpStatus
    }),
    total_attempts: i,
    total_retry_duration_ms: s,
    speed: g ? "fast" : "normal",
    ...(querySourceStr && {
      query_source: querySourceStr
    }),
    ...(T && {
      effort: T
    })
  });
  zXr(h, {
    success: !1,
    statusCode: httpStatusStr ? parseInt(httpStatusStr) : void 0,
    error: errorMsg,
    attempt: i,
    requestId: a ?? void 0,
    clientRequestId: c ? void 0 : l
  });
  let teleportInfo: any = isHandledPromptTooLong ? void 0 : PJt();
  if (teleportInfo?.isTeleported && !teleportInfo.hasLoggedFirstMessage) W("tengu_teleport_first_message_error", {
    session_id: xr(teleportInfo.sessionId),
    error_type: errorType
  }), OJt();
}
function T5t({
  model: e,
  requestId: t,
  querySource: n,
  effort: r,
  fastMode: o,
  attempt: s,
  attribution: i,
  serverFallbackHop: a,
  stopDetails: l
}: any): any {
  let querySourceStr: any = Xg(n),
    refusalCategory: any = l?.category,
    allowedCategory: any = refusalCategory && kVp.has(refusalCategory) ? refusalCategory : null;
  bu("api_refusal", {
    model: e,
    request_id: t,
    speed: o ? "fast" : "normal",
    attempt: s,
    server_fallback_hop: a,
    ...(querySourceStr && {
      query_source: querySourceStr
    }),
    ...(r && {
      effort: r
    }),
    ...(l !== void 0 && {
      has_category: allowedCategory !== null,
      has_explanation: Boolean(l?.explanation)
    }),
    ...(allowedCategory && If() && {
      category: allowedCategory
    }),
    ...(i && $nt(n, i))
  });
}
/** Estimates decoded byte length of a base64 string by accounting for "=" padding. */
function Uil(e: any): any {
  let paddingBytes: any = e.endsWith("==") ? 2 : e.endsWith("=") ? 1 : 0;
  return Math.floor(e.length * 3 / 4) - paddingBytes;
}
function Gil(e: any, t: any): any {
  let bytesPerTok: any = aE(t),
    accBlock: any = (o: any, s: any) => {
      switch (s.type) {
        case "image":
          {
            if (o.imageBlockCount += 1, s.source.type !== "base64") return o;
            o.imageTotalBytes += Uil(s.source.data);
            let imgInfo: any = rOt(Buffer.from(s.source.data.slice(0, HVp), "base64"));
            if (imgInfo) o.imageTotalPixels += imgInfo.width * imgInfo.height;
            return o;
          }
        case "document":
          switch (o.documentBlockCount += 1, s.source.type) {
            case "base64":
              return o.documentTotalBytes += Uil(s.source.data), o;
            case "text":
              return o.documentTotalBytes += s.source.data.length, o;
            case "content":
              return o.documentTotalBytes += typeof s.source.content === "string" ? s.source.content.length : s.source.content.reduce((i: any, a: any) => i + (a.type === "text" ? a.text.length : 0), 0), o;
            default:
              return o;
          }
        case "text":
          return o.inputTextCharLength += s.text.length, o;
        case "thinking":
          return o.inputTextCharLength += s.thinking.length, o;
        case "redacted_thinking":
          return o.inputTextCharLength += s.data.length, o;
        case "tool_use":
        case "server_tool_use":
        case "mcp_tool_use":
          return o.inputTextCharLength += s.name.length + Pe(s.input ?? {}).length, o;
        case "tool_result":
        case "mcp_tool_result":
          {
            let resultContent: any = s.content;
            if (typeof resultContent === "string") return o.inputTextCharLength += resultContent.length, o;
            return Array.isArray(resultContent) ? resultContent.reduce(accBlock, o) : o;
          }
        default:
          return o.inputTextCharLength += Pe(s).length, o;
      }
    };
  return e.reduce((o: any, s: any) => {
    let msgContent: any = s.message.content;
    if (o.estimatedInputTokens += lke(msgContent, bytesPerTok), typeof msgContent === "string") return o.inputTextCharLength += msgContent.length, o;
    for (let a of msgContent) accBlock(o, a);
    return o;
  }, {
    imageBlockCount: 0,
    imageTotalPixels: 0,
    imageTotalBytes: 0,
    documentBlockCount: 0,
    documentTotalBytes: 0,
    inputTextCharLength: 0,
    estimatedInputTokens: 0
  });
}
function IVp({
  model: e,
  preNormalizedModel: t,
  messageCount: n,
  messageTokens: r,
  usage: o,
  durationMs: s,
  durationMsIncludingRetries: i,
  attempt: a,
  ttftMs: l,
  requestId: c,
  firstAttemptRequestId: u,
  stopReason: d,
  costUSD: p,
  didFallBackToNonStreaming: m,
  querySource: f,
  messageClientPlatform: h,
  gateway: g,
  queryTracking: _,
  permissionMode: T,
  globalCacheStrategy: y,
  textContentLength: S,
  thinkingContentLength: E,
  toolUseContentLengths: R,
  connectorTextBlockCount: w,
  connectorTextContentLength: H,
  requestContentTelemetry: k,
  fastMode: I,
  previousRequestId: D,
  betas: O,
  attribution: L,
  agentContext: P
}: any): any {
  wBr();
  let isNonInteractive: any = kr(),
    postCompactionFlag: any = rir(),
    isPrintMode: any = process.argv.includes("-p") || process.argv.includes("--print"),
    nowMs: any = Date.now(),
    lastCompletionMs: any = Lbe(),
    timeSinceLastMs: any = lastCompletionMs !== null ? Math.max(0, Math.round(nowMs - lastCompletionMs)) : void 0,
    agentCtxInfo: any = yxr(P);
  W("tengu_api_success", {
    model: e,
    ...(t !== e && {
      preNormalizedModel: t
    }),
    ...(O?.length && {
      betas: O.join(",")
    }),
    messageCount: n,
    messageTokens: r,
    inputTokens: o.input_tokens,
    outputTokens: o.output_tokens,
    cachedInputTokens: o.cache_read_input_tokens ?? 0,
    uncachedInputTokens: o.cache_creation_input_tokens ?? 0,
    durationMs: s,
    durationMsIncludingRetries: i,
    attempt: a,
    ttftMs: l ?? void 0,
    buildAgeMins: qil(),
    provider: g2(),
    requestId: xr(c) ?? void 0,
    ...(u && c && u !== c && {
      firstAttemptRequestId: xr(u)
    }),
    ...(agentCtxInfo && {
      invokingRequestId: xr(agentCtxInfo.invokingRequestId),
      invocationKind: Bo(agentCtxInfo.invocationKind)
    }),
    stop_reason: Bo(d) ?? void 0,
    costUSD: p,
    didFallBackToNonStreaming: m,
    isNonInteractiveSession: isNonInteractive,
    print: isPrintMode,
    isTTY: process.stdout.isTTY ?? !1,
    querySource: Xg(f),
    ...(h && {
      messageClientPlatform: h
    }),
    ...(g && {
      gateway: Le(g)
    }),
    ...(_ && {
      queryChainId: xr(_.chainId),
      queryDepth: _.depth
    }),
    permissionMode: Bo(T),
    ...(y && {
      globalCacheStrategy: Le(y)
    }),
    ...(S !== void 0 ? {
      textContentLength: S
    } : {}),
    ...(E !== void 0 ? {
      thinkingContentLength: E
    } : {}),
    ...(R !== void 0 ? {
      toolUseContentLengths: Pe(R)
    } : {}),
    ...(w !== void 0 ? {
      connectorTextBlockCount: w
    } : {}),
    ...(H !== void 0 ? {
      connectorTextContentLength: H
    } : {}),
    ...(k && {
      imageBlockCount: k.imageBlockCount,
      imageTotalPixels: k.imageTotalPixels,
      imageTotalBytes: k.imageTotalBytes,
      documentBlockCount: k.documentBlockCount,
      documentTotalBytes: k.documentTotalBytes,
      inputTextCharLength: k.inputTextCharLength,
      estimatedInputTokens: k.estimatedInputTokens
    }),
    fastMode: I,
    ...(D && {
      previousRequestId: xr(D)
    }),
    ...(postCompactionFlag && {
      isPostCompaction: postCompactionFlag
    }),
    ...(L && qOt(f, L)),
    ...(L?.attributionSkill && {
      _PROTO_skill_name: L.attributionSkill
    }),
    ...wbo(),
    timeSinceLastApiCallMs: timeSinceLastMs
  }), lSt(nowMs);
}
function Vil({
  model: e,
  preNormalizedModel: t,
  start: n,
  startIncludingRetries: r,
  ttftMs: o,
  usage: s,
  attempt: i,
  messageCount: a,
  messageTokens: l,
  requestId: c,
  clientRequestId: u,
  firstAttemptRequestId: d,
  stopReason: p,
  didFallBackToNonStreaming: m,
  querySource: f,
  messageClientPlatform: h,
  headers: g,
  costUSD: _,
  queryTracking: T,
  permissionMode: y,
  newMessages: S,
  requestContentTelemetry: E,
  llmSpan: R,
  globalCacheStrategy: w,
  requestSetupMs: H,
  attemptStartTimes: k,
  fastMode: I,
  previousRequestId: D,
  betas: O,
  effort: L,
  attribution: P,
  agentContext: M
}: any): any {
  let detectedGateway: any = $il({
      headers: g,
      baseUrl: process.env.ANTHROPIC_BASE_URL
    }),
    textContentLength: any,
    thinkingContentLength: any,
    toolUseContentLengths: any,
    connectorTextBlockCount: any,
    connectorTextContentLength: any;
  if (S) {
    let textLen: any = 0,
      thinkingLen: any = 0,
      hasThinking: any = !1,
      hasToolUse: any = !1,
      toolUseLengths: any = {},
      connectorBlockCount: any = 0,
      connectorTextLen: any = 0,
      hasScheduleOffer: any = !1;
    for (let msg of S) for (let block of msg.message.content) if (block.type === "text") textLen += block.text.length, hasScheduleOffer ||= CVp.test(block.text);else if (block.type === "thinking") thinkingLen += block.thinking.length, hasThinking = !0;else if (block.type === "redacted_thinking") hasThinking = !0;else if (block.type === "tool_use" || block.type === "server_tool_use" || block.type === "mcp_tool_use") {
      let inputLen: any = Pe(block.input).length,
        toolKey: any = Pi(block.name);
      toolUseLengths[toolKey] = (toolUseLengths[toolKey] ?? 0) + inputLen, hasToolUse = !0;
    }
    if (hasScheduleOffer && !hasToolUse) W("tengu_schedule_offer_shown", {
      stop_reason: Bo(p ?? void 0),
      querySource: Xg(f)
    });
    textContentLength = textLen, thinkingContentLength = hasThinking ? thinkingLen : void 0, toolUseContentLengths = hasToolUse ? toolUseLengths : void 0, connectorTextBlockCount = connectorBlockCount > 0 ? connectorBlockCount : void 0, connectorTextContentLength = connectorBlockCount > 0 ? connectorTextLen : void 0;
  }
  let durationMs: any = Math.max(0, Math.round(performance.now() - n)),
    durationMsIncludingRetries: any = Math.max(0, Math.round(performance.now() - r));
  Wsr(durationMsIncludingRetries, durationMs), IVp({
    model: e,
    preNormalizedModel: t,
    messageCount: a,
    messageTokens: l,
    usage: s,
    durationMs: durationMs,
    durationMsIncludingRetries: durationMsIncludingRetries,
    attempt: i,
    ttftMs: o,
    requestId: c,
    firstAttemptRequestId: d,
    stopReason: p,
    costUSD: _,
    didFallBackToNonStreaming: m,
    querySource: f,
    messageClientPlatform: h,
    gateway: detectedGateway,
    queryTracking: T,
    permissionMode: y,
    globalCacheStrategy: w,
    textContentLength: textContentLength,
    thinkingContentLength: thinkingContentLength,
    toolUseContentLengths: toolUseContentLengths,
    connectorTextBlockCount: connectorTextBlockCount,
    connectorTextContentLength: connectorTextContentLength,
    requestContentTelemetry: E,
    fastMode: I,
    previousRequestId: D,
    betas: O,
    attribution: P,
    agentContext: M
  });
  let costUsd: any = Number.isFinite(_) ? _ : 0;
  if (bu("api_request", {
    model: e,
    input_tokens: s.input_tokens,
    output_tokens: s.output_tokens,
    cache_read_tokens: s.cache_read_input_tokens,
    cache_creation_tokens: s.cache_creation_input_tokens,
    cost_usd: costUsd,
    cost_usd_micros: Math.round(costUsd * 1e6),
    duration_ms: durationMs,
    request_id: c ?? void 0,
    speed: I ? "fast" : "normal",
    query_source: Xg(f),
    ...(L && {
      effort: L
    }),
    ...(P && $nt(f, P))
  }), S) Bil(S, {
    model: e,
    querySource: f,
    requestId: c
  });
  let modelOutput: any, thinkingOutput: any, hasToolCall: any;
  if (nv() && S) modelOutput = S.flatMap((msg: any) => msg.message.content.filter((block: any) => block.type === "text").map((block: any) => block.text)).join(`
`) || void 0, hasToolCall = S.some((msg: any) => msg.message.content.some((block: any) => block.type === "tool_use"));
  zXr(R, {
    success: !0,
    inputTokens: s.input_tokens,
    outputTokens: s.output_tokens,
    cacheReadTokens: s.cache_read_input_tokens,
    cacheCreationTokens: s.cache_creation_input_tokens,
    attempt: i,
    modelOutput: modelOutput,
    thinkingOutput: thinkingOutput,
    hasToolCall: hasToolCall,
    requestId: c ?? void 0,
    clientRequestId: u,
    stopReason: p ?? void 0,
    ttftMs: o ?? void 0,
    requestSetupMs: H,
    attemptStartTimes: k,
    traceresponse: m ? void 0 : g?.get("traceresponse") ?? void 0
  });
  let teleportInfo: any = PJt();
  if (teleportInfo?.isTeleported && !teleportInfo.hasLoggedFirstMessage) W("tengu_teleport_first_message_success", {
    session_id: xr(teleportInfo.sessionId)
  }), OJt();
}
var CVp: any,
  RVp: any,
  vVp: any,
  kVp: any,
  HVp = 87400;
var S5t = b(() => {
  jx();
  lt();
  Xze();
  lo();
  qe();
  IA();
  vn();
  Fhe();
  Ro();
  Ps();
  aA();
  tn();
  oS();
  vbo();
  Z4();
  Ph();
  kt();
  vu();
  t9e();
  l1();
  Opt();
  kD();
  $ke();
  CVp = /\b(want me to|should i|shall i|i can|would you like me to)\b[^.!?\n]{0,100}`?\/schedule\b/i;
  RVp = {
    litellm: {
      prefixes: ["x-litellm-"]
    },
    helicone: {
      prefixes: ["helicone-"]
    },
    portkey: {
      prefixes: ["x-portkey-"]
    },
    "cloudflare-ai-gateway": {
      prefixes: ["cf-aig-"]
    },
    kong: {
      prefixes: ["x-kong-"]
    },
    braintrust: {
      prefixes: ["x-bt-"]
    }
  }, vVp = {
    databricks: [".cloud.databricks.com", ".azuredatabricks.net", ".gcp.databricks.com"]
  };
  kVp = new Set(["cyber", "bio", "frontier_llm", "reasoning_extraction"]);
});

export {AVp,$il,wVp,wbo,qil,Wil,kbo,T5t,Uil,Gil,IVp,Vil,CVp,RVp,vVp,kVp,HVp,S5t};
