// @ts-nocheck
import {initProfileReportModule as Hm,Ph} from "../agent/1459_agentType.ts";
import {p8,PBe} from "../config/2026_error.ts";
import {h8,FBe,nO,Nyn,MR} from "../config/2033_allowed.ts";
import {tse,iDr,sDr,OXe} from "../../vendor/m1489.ts";
import {TQ,KNe,Yv,xM} from "../../vendor/m1450.ts";
import {xdo,Ddo} from "../../vendor/m3980.ts";
import {Hmn,Imn} from "../agent/1461_ISSUES_EXPLAINER.ts";
import {Kbn,zbn} from "../core/2234_zbn.ts";
import {f6e,Fke,rb} from "../permissions/5211_level.ts";
import {normalizeModelStringForAPI as Pp,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {oWo,VXt,lr} from "../../vendor/m233.ts";
import {IN,tn} from "../config/0230_encoding.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve,Bo} from "../../vendor/m5.ts";
import {getLastApiCompletionTimestamp as Lbe,setLastApiCompletionTimestamp as lSt,lt} from "../session/0132_sent.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {qOt,JETBRAINS_IDE_NAMES as YF,Fhe} from "../agent/2600_attributionMcpServer.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
/**
 * Extracts the first user-message text from a list of messages.
 * Returns "" when no user message exists or it has no text content.
 */
function tTp(messages: any): string {
  let firstUserMessage = messages.find((msg: any) => msg.role === "user");
  if (!firstUserMessage) return "";
  let content = firstUserMessage.content;
  if (typeof content === "string") return content;
  let textBlock = content.find((block: any) => block.type === "text");
  return textBlock?.type === "text" ? textBlock.text : "";
}

/**
 * Issues a one-shot ("side query") request to the Beta Messages API,
 * assembling system prompt, betas, thinking config and metadata, then
 * emitting a tengu_api_success telemetry event with usage/timing data.
 */
async function v6(params: any): Promise<any> {
  let {
      model,
      system,
      messages,
      tools,
      tool_choice,
      output_format,
      max_tokens = 1024,
      maxRetries = 2,
      timeout,
      signal,
      skipSystemPromptPrefix,
      temperature,
      thinking,
      stop_sequences,
      extraBodyParams,
      onFetchAttempt
    } = params,
    agentContext = Hm(),
    client = await p8({
      maxRetries,
      model,
      source: "side_query",
      agentContext,
      ...(onFetchAttempt && {
        fetchOverride: (url: any, init: any) => (onFetchAttempt(), globalThis.fetch(url, init))
      })
    }),
    betas = [...h8(model)],
    useStructuredOutputs = Boolean(output_format) && FBe(model) && tse(model, "structured_outputs");
  if (useStructuredOutputs && !betas.includes(TQ)) betas.push(TQ);
  let firstUserText = tTp(messages),
    interpolatedFirstUserText = xdo(firstUserText, {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION),
    systemPromptPrefix = Hmn(interpolatedFirstUserText, agentContext),
    systemBlocks = [systemPromptPrefix ? {
      type: "text",
      text: systemPromptPrefix
    } : null, ...(skipSystemPromptPrefix ? [] : [{
      type: "text",
      text: Kbn({
        isNonInteractive: !1,
        hasAppendSystemPrompt: !1
      })
    }]), ...(Array.isArray(system) ? system : system ? [{
      type: "text",
      text: system
    }] : [])].filter((block: any) => block !== null),
    thinkingConfig: any;
  if (thinking === !1) thinkingConfig = {
    type: "disabled"
  };else if (thinking !== void 0) thinkingConfig = {
    type: "enabled",
    budget_tokens: Math.min(thinking, max_tokens - 1)
  };
  let cacheTtl = f6e(params.querySource) ? "1h" : void 0;
  if (cacheTtl === "1h" && nO() && !betas.includes(KNe)) betas.push(KNe);
  let systemBlocksWithTtl = cacheTtl ? systemBlocks.map((block: any) => L$a(block, cacheTtl)) : systemBlocks,
    messagesWithTtl = cacheTtl ? messages.map((msg: any) => typeof msg.content === "string" ? msg : {
      ...msg,
      content: msg.content.map((block: any) => L$a(block, cacheTtl))
    }) : messages,
    normalizedModel = Pp(model),
    requestBody = {
      model: normalizedModel,
      max_tokens,
      system: systemBlocksWithTtl,
      messages: messagesWithTtl,
      ...(tools && {
        tools
      }),
      ...(tool_choice && {
        tool_choice
      }),
      ...(useStructuredOutputs && {
        output_config: {
          format: output_format
        }
      }),
      ...(temperature !== void 0 && Nyn(normalizedModel) && {
        temperature
      }),
      ...(stop_sequences && {
        stop_sequences
      }),
      ...(thinkingConfig && {
        thinking: thinkingConfig
      }),
      ...(betas.length > 0 && {
        betas: Yv(betas)
      }),
      metadata: Fke(),
      ...extraBodyParams
    };
  if (oWo(requestBody)) {
    try {
      requestBody = IN(requestBody);
    } catch {}
    VXt(requestBody), W("tengu_lone_surrogate_sanitized", {
      source: Ve("sideQuery"),
      querySource: params.querySource
    });
  }
  let startTime = performance.now(),
    response = await client.beta.messages.create(requestBody, {
      signal,
      ...(timeout !== void 0 && {
        timeout
      })
    }).catch((err: any) => {
      let parsedError = iDr(err);
      if (parsedError) sDr(model, parsedError);
      throw err;
    }),
    requestId = response._request_id ?? void 0,
    endTime = performance.now(),
    completionTimestamp = Date.now(),
    lastApiCompletionTimestamp = Lbe();
  return W("tengu_api_success", {
    requestId: xr(requestId),
    querySource: params.querySource,
    model: normalizedModel,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
    cachedInputTokens: response.usage.cache_read_input_tokens ?? 0,
    uncachedInputTokens: response.usage.cache_creation_input_tokens ?? 0,
    durationMsIncludingRetries: Math.max(0, Math.round(endTime - startTime)),
    stop_reason: Bo(response.stop_reason) ?? void 0,
    timeSinceLastApiCallMs: lastApiCompletionTimestamp !== null ? Math.max(0, Math.round(completionTimestamp - lastApiCompletionTimestamp)) : void 0,
    ...qOt(params.querySource, YF(params.querySource, void 0, void 0))
  }), lSt(completionTimestamp), response;
}

/**
 * Applies a cache_control TTL to a block when it has cache_control set
 * but no explicit ttl yet; otherwise returns the block unchanged.
 */
function L$a(block: any, ttl: any): any {
  if (!("cache_control" in block) || !block.cache_control || block.cache_control.ttl) return block;
  return {
    ...block,
    cache_control: {
      ...block.cache_control,
      ttl
    }
  };
}

var cxe = b(() => {
  lt();
  xM();
  zbn();
  kt();
  QT();
  rb();
  PBe();
  OXe();
  Ph();
  MR();
  Imn();
  Ddo();
  Fhe();
  Ro();
  tn();
  lr();
});

export {tTp as bIp,v6 as Wq,L$a,cxe};
