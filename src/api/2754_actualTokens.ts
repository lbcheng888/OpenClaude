// @ts-nocheck
import {Uo,sK,uk} from "../../vendor/m137.ts";
import {getAPIProvider as Rr,isFirstPartyAnthropicBaseUrl as Su,THIRD_PARTY_PROVIDER_LABELS as hQ,usesFirstPartyModelIds as Vu,Ps} from "./1287_usesFirstPartyModelIds.ts";
import {qOi,oOt,$Oi,BZ} from "../../vendor/m2520.ts";
import {formatFileSize as Ra,Xo} from "../../vendor/m240.ts";
import {getIsNonInteractiveSession as kr,isLongContext1mCreditsBlocked as DKe,setLongContext1mCreditsBlocked as _ir,lt} from "../session/0132_sent.ts";
import {nt} from "../../vendor/m127.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {lI,vme,f7,xM} from "../../vendor/m1450.ts";
import {Hl,po} from "../tools/5224_userPromptCount.ts";
import {aot,vHn} from "../telemetry/2747_base64_size_bytes.ts";
import {isLocalAgentTask as hO,f4} from "../telemetry/2522_error_name.ts";
import {lot,XMt} from "../../vendor/m2747.ts";
import {isClaudeAISubscriber as Eo,getAnthropicApiKeyWithSource as Yg,hasStoredOAuthToken as pE,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {g6i,b7r,nB} from "./2752_status.ts";
import {isFableFamilyOrPinnedModel as sE,isNonCustomOpusModel as Yoe,getCanonicalName as So,renderModelName as Tp,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {y7r} from "../core/2751_message.ts";
import {getSessionOverrides as eZ} from "../../vendor/m2215.ts";
import {getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {qt,tn} from "../config/0230_encoding.ts";
import {Ne} from "../../vendor/m583.ts";
import {dot,P4,Bke,xHn,$ke} from "../../vendor/m2752.ts";
import {XU,rI} from "../config/0586_rI.ts";
import {Kp,gQ} from "../../vendor/m1287.ts";
import {WorkloadIdentityError as Wp,TX} from "../../vendor/m140.ts";
import {Le} from "../../vendor/m5.ts";
import {iot,Kqi,$$e,oot,sot,Xqi,jqi,nj} from "../agent/2746_partialTextChars.ts";
import {oE,RM} from "../../vendor/m1289.ts";
import {b} from "../../runtime.ts";
import {jx} from "../../vendor/m196.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
// @ts-nocheck
function isApiErrorString(errorString) {
  return errorString.startsWith(API_ERROR_PREFIX) || errorString.startsWith(`Please run /login \xB7 ${API_ERROR_PREFIX}`);
}
function isPromptTooLongMessage(message) {
  if (!message.isApiErrorMessage) return false;
  let content = message.message.content;
  if (!Array.isArray(content)) return false;
  return content.some(block => block.type === "text" && block.text.startsWith(PROMPT_TOO_LONG));
}
function parsePromptTooLongTokens(errorDetails) {
  let match = errorDetails.match(/prompt is too long[^0-9]*(\d+)\s*tokens?\s*>\s*(\d+)/i);
  return {
    actualTokens: match ? parseInt(match[1], 10) : undefined,
    limitTokens: match ? parseInt(match[2], 10) : undefined
  };
}
function getPromptTooLongOverflow(message) {
  if (!isPromptTooLongMessage(message) || !message.errorDetails) return;
  let {
    actualTokens: actualTokens,
    limitTokens: limitTokens
  } = parsePromptTooLongTokens(message.errorDetails);
  if (actualTokens === undefined || limitTokens === undefined) return;
  let overflow = actualTokens - limitTokens;
  return overflow > 0 ? overflow : undefined;
}
function buildPromptTooLongMessage(info) {
  let {
    actualTokens: actualTokens,
    limitTokens: limitTokens,
    conversationTokensEstimate: conversationTokensEstimate
  } = info;
  if (actualTokens === undefined || limitTokens === undefined) return `${PROMPT_TOO_LONG} \xB7 this conversation is a single ` + "exchange and cannot be compacted \u2014 the request size comes mostly " + "from system prompt, tool definitions, or attachments.";
  if (conversationTokensEstimate >= actualTokens * CONVERSATION_DOMINANT_RATIO) return `${PROMPT_TOO_LONG} \xB7 the request is ~${actualTokens} tokens (limit ${limitTokens}) and this conversation's own content is most of it. A single-exchange conversation cannot be compacted; start with less content (smaller files or pasted text).`;
  return `${PROMPT_TOO_LONG} \xB7 the request is ~${actualTokens} tokens (limit ${limitTokens}) but this conversation is only ~${conversationTokensEstimate} tokens \u2014 the rest is system prompt, ` + "tool definitions, and attachment content. A single-exchange conversation cannot be compacted; reduce attached files/tools or start with less context.";
}
function isRequestTooLargeMessage(errorDetails) {
  return errorDetails.includes("request_too_large") || parseOffendingMediaBlock(errorDetails) !== undefined;
}
function getOffendingMediaKinds(errorDetails) {
  if (errorDetails.includes("request_too_large") || errorDetails.toLowerCase().includes("too much media")) return new Set(["document", "image"]);
  let mediaBlock = parseOffendingMediaBlock(errorDetails);
  return mediaBlock ? new Set([mediaBlock.kind]) : undefined;
}
function parseOffendingMediaBlock(errorDetails) {
  let match = errorDetails.match(/messages[.[](\d+)[\].]+content[.[](\d+)[\].]+(?:tool_result[.[]content[.[]\d+[\].]+)?(image|document|pdf)/);
  if (match) return {
    messageIdx: Number(match[1]),
    contentIdx: Number(match[2]),
    kind: match[3] === "image" ? "image" : "document"
  };
  let lowered = errorDetails.toLowerCase();
  if (IMAGE_ERROR_PHRASES.some(phrase => lowered.includes(phrase))) return {
    kind: "image"
  };
  if (PDF_ERROR_PHRASES.some(phrase => lowered.includes(phrase))) return {
    kind: "document"
  };
  return;
}
function getOffendingMediaBlockFromError(error) {
  if (!(error instanceof Uo) || error.status !== 400) return;
  return parseOffendingMediaBlock(error.message);
}
function isRequestTooLargeApiMessage(message) {
  return message.isApiErrorMessage === true && message.errorDetails !== undefined && isRequestTooLargeMessage(message.errorDetails);
}
function isPromptTooLongError(error) {
  return error instanceof Error && error.message.toLowerCase().includes("prompt is too long");
}
function isContextLimitExceededError(error) {
  return error instanceof Error && error.message.toLowerCase().includes("input length and `max_tokens` exceed context limit");
}
function isCreditBalanceLowError(error) {
  return error instanceof Error && error.message.toLowerCase().includes("credit balance is too low");
}
function isOrgDisabledError(error) {
  return error instanceof Error && error.message.toLowerCase().includes("organization has been disabled");
}
function getStatusCheckSuffix() {
  let provider = Rr();
  if (provider === "firstParty") {
    if (Su()) return ` If it persists, check ${STATUS_PAGE_URL}.`;
    let baseUrl = process.env.ANTHROPIC_BASE_URL ?? "";
    return ` If it persists, check your inference gateway (${URL.parse(baseUrl)?.host || baseUrl}).`;
  }
  if (provider === "anthropicAws") return ` If it persists, check ${STATUS_PAGE_URL}.`;
  return ` If it persists, check your ${hQ[provider]} service status.`;
}
function getPdfTooLargeMessage() {
  let limits = `max ${qOi} pages, ${Ra(oOt)}`;
  return kr() ? `PDF too large (${limits}). Try reading the file a different way (e.g., extract text with pdftotext).` : `PDF too large (${limits}). Double press esc to go back and try again, or use pdftotext to convert to text first.`;
}
function getPdfPasswordProtectedMessage() {
  return kr() ? "PDF is password protected. Try using a CLI tool to extract or convert the PDF." : "PDF is password protected. Please double press esc to edit your message and try again.";
}
function getPdfInvalidMessage() {
  return kr() ? "The PDF file was not valid. Try converting it to text first (e.g., pdftotext)." : "The PDF file was not valid. Double press esc to go back and try again with a different file.";
}
function getImageTooLargeMessage() {
  return kr() ? "Image was too large. Try resizing the image or using a different approach." : "Image was too large. Double press esc to go back and try again with a smaller image.";
}
function getRequestTooLargeMessage() {
  let limit = `max ${Ra($Oi)}`;
  return kr() ? `Request too large (${limit}). Try with a smaller file.` : `Request too large (${limit}). Double press esc to go back and try with a smaller file.`;
}
function getRemovedMediaMessage(kind) {
  let mediaLabel = kind === "document" ? "a document" : "an image",
    suffix = kr() ? "Re-read the file with a different approach if you still need it." : "Double press esc to edit your message, or re-read the file if you still need it.";
  return `${API_ERROR_PREFIX}: ${mediaLabel} in the conversation could not be processed and was removed. ${suffix}`;
}
function getNoClaudeAccessMessage() {
  return kr() ? "Your account does not have access to Claude. Please login again or contact your administrator." : OAUTH_REVOKED_MESSAGE;
}
function getOrgSubscriptionDisabledMessage() {
  return ORG_SUBSCRIPTION_DISABLED_MESSAGE;
}
function isRemoteSession() {
  return nt(process.env.CLAUDE_CODE_REMOTE);
}
function reportToolUseResultMismatch(toolUseId, originalMessages, normalizedMessages) {
  try {
    let normalizedToolUseIndex = -1;
    for (let i = 0; i < normalizedMessages.length; i++) {
      let msg = normalizedMessages[i];
      if (!msg) continue;
      let content = msg.message.content;
      if (Array.isArray(content)) {
        for (let block of content) if (block.type === "tool_use" && "id" in block && block.id === toolUseId) {
          normalizedToolUseIndex = i;
          break;
        }
      }
      if (normalizedToolUseIndex !== -1) break;
    }
    let originalToolUseIndex = -1;
    for (let i = 0; i < originalMessages.length; i++) {
      let entry = originalMessages[i];
      if (!entry) continue;
      if (entry.type === "assistant" && "message" in entry) {
        let content = entry.message.content;
        if (Array.isArray(content)) {
          for (let block of content) if (block.type === "tool_use" && "id" in block && block.id === toolUseId) {
            originalToolUseIndex = i;
            break;
          }
        }
      }
      if (originalToolUseIndex !== -1) break;
    }
    let normalizedSequence = [];
    for (let i = normalizedToolUseIndex + 1; i < normalizedMessages.length; i++) {
      let msg = normalizedMessages[i];
      if (!msg) continue;
      let content = msg.message.content;
      if (Array.isArray(content)) for (let block of content) {
        let role = msg.message.role;
        if (block.type === "tool_use" && "id" in block) normalizedSequence.push(`${role}:tool_use:${block.id}`);else if (block.type === "tool_result" && "tool_use_id" in block) normalizedSequence.push(`${role}:tool_result:${block.tool_use_id}`);else if (block.type === "text") normalizedSequence.push(`${role}:text`);else if (block.type === "thinking") normalizedSequence.push(`${role}:thinking`);else if (block.type === "image") normalizedSequence.push(`${role}:image`);else normalizedSequence.push(`${role}:${block.type}`);
      } else if (typeof content === "string") normalizedSequence.push(`${msg.message.role}:string_content`);
    }
    let preNormalizedSequence = [];
    for (let i = originalToolUseIndex + 1; i < originalMessages.length; i++) {
      let entry = originalMessages[i];
      if (!entry) continue;
      switch (entry.type) {
        case "user":
        case "assistant":
          {
            if ("message" in entry) {
              let content = entry.message.content;
              if (Array.isArray(content)) for (let block of content) {
                let role = entry.message.role;
                if (block.type === "tool_use" && "id" in block) preNormalizedSequence.push(`${role}:tool_use:${block.id}`);else if (block.type === "tool_result" && "tool_use_id" in block) preNormalizedSequence.push(`${role}:tool_result:${block.tool_use_id}`);else if (block.type === "text") preNormalizedSequence.push(`${role}:text`);else if (block.type === "thinking") preNormalizedSequence.push(`${role}:thinking`);else if (block.type === "image") preNormalizedSequence.push(`${role}:image`);else preNormalizedSequence.push(`${role}:${block.type}`);
              } else if (typeof content === "string") preNormalizedSequence.push(`${entry.message.role}:string_content`);
            }
            break;
          }
        case "attachment":
          if ("attachment" in entry) preNormalizedSequence.push(`attachment:${entry.attachment.type}`);
          break;
        case "system":
          if ("subtype" in entry) preNormalizedSequence.push(`system:${entry.subtype}`);
          break;
        case "progress":
          if ("progress" in entry && entry.progress && typeof entry.progress === "object" && "type" in entry.progress) preNormalizedSequence.push(`progress:${entry.progress.type ?? "unknown"}`);else preNormalizedSequence.push("progress:unknown");
          break;
      }
    }
    let describeBlocks = msg => {
        if (!msg) return "<none>";
        let content = msg.message.content;
        if (!Array.isArray(content)) return `${msg.message.role}:string`;
        return `${msg.message.role}:[${content.map(block => block.type === "tool_use" ? `tool_use:${block.id}` : block.type === "tool_result" ? `tool_result:${block.tool_use_id}` : block.type).join(",")}]`;
      },
      toolUseOccurrences = 0,
      toolResultOccurrences = 0;
    for (let msg of normalizedMessages) {
      let content = msg.message.content;
      if (!Array.isArray(content)) continue;
      for (let block of content) {
        if (block.type === "tool_use" && block.id === toolUseId) toolUseOccurrences++;
        if (block.type === "tool_result" && block.tool_use_id === toolUseId) toolResultOccurrences++;
      }
    }
    W("tengu_tool_use_tool_result_mismatch_error", {
      toolUseId: xr(toolUseId),
      normalizedSequence: normalizedSequence.join(", "),
      preNormalizedSequence: preNormalizedSequence.join(", "),
      normalizedMessageCount: normalizedMessages.length,
      originalMessageCount: originalMessages.length,
      normalizedToolUseIndex: normalizedToolUseIndex,
      originalToolUseIndex: originalToolUseIndex,
      offendingMessageBlocks: describeBlocks(normalizedMessages[normalizedToolUseIndex]),
      followingMessageBlocks: normalizedToolUseIndex === -1 ? "<none>" : describeBlocks(normalizedMessages[normalizedToolUseIndex + 1]),
      toolUseOccurrences: toolUseOccurrences,
      toolResultOccurrences: toolResultOccurrences
    });
  } catch (err) {}
}
function isApiResponseShape(value) {
  return typeof value === "object" && value !== null && "content" in value && "model" in value && "usage" in value && Array.isArray(value.content) && typeof value.model === "string" && typeof value.usage === "object";
}
function isAutoModeBetaError(error) {
  return !!lI && error instanceof Uo && error.status === 400 && error.message.includes(lI.header) && error.message.includes("anthropic-beta");
}
function isAdvisorToolResultError(error) {
  return error instanceof Uo && error.status === 400 && (error.message.includes("Advisor tool result content could not be processed") || error.message.includes("found in advisor_tool_result blocks"));
}
function isAdvisorModelIncompatibleError(error) {
  return error instanceof Uo && error.status === 400 && error.message.includes(ADVISOR_INCOMPATIBLE_MESSAGE);
}
function isMissingBetaHeaderError(error) {
  return error instanceof Uo && error.status === 400 && error.message.includes(vme.header) && error.message.includes("anthropic-beta");
}
function classifyFallbackBetaError(error) {
  if (!(error instanceof Uo) || error.status !== 400) return;
  let message = error.message;
  if (message.includes("`server-side-fallback-") && message.includes("anthropic-beta")) return "beta_header";
  if (/does not support the `fallbacks?` parameter/.test(message)) return "unsupported_primary";
  if (/The `fallbacks?` parameter is not supported/.test(message)) return "unsupported_primary";
  if (message.includes("is not a valid fallback target for")) return "invalid_target";
  if (message.includes("`fallback` and `fallbacks` cannot both be set")) return "param_shape";
  if (/`fallbacks?(\[\d+\])?\.[a-z_]+`?/.test(message)) return "param_shape";
  if (/target model '[^']*' is not compatible with/.test(message)) return "param_shape";
  if (message.includes("server-side fallback is not supported")) return "param_shape";
  if (/\bfallbacks?\.(messages|stream|fallback)\b is not supported/.test(message)) return "param_shape";
  if (/\bfallbacks?(\[\d+\])?: unknown field/.test(message)) return "param_shape";
  if (message.includes("Extra inputs are not permitted") && /\bfallbacks?(\[\d+\])?((\.|\s*->\s*)\w+)*\s*:/.test(message)) return "extra_forbidden";
  return;
}
function classifyFallbackCreditError(error) {
  if (!(error instanceof Uo) || error.status !== 400) return;
  let message = error.message;
  if (message.includes("fallback-credit-") && (message.includes("anthropic-beta") || message.includes("anthropic_beta"))) return "credit_beta_header";
  if (message.includes("fallback_credit_token: invalid or malformed")) return "credit_malformed";
  if (message.includes("fallback_credit_token: does not belong to this organization")) return "credit_wrong_org";
  if (message.includes("fallback_credit_token: has expired")) return "credit_expired";
  if (message.includes("fallback_credit_token: is not valid for model")) return "credit_invalid_model";
  if (message.includes("Extra inputs are not permitted") && /\bfallback_credit_token\s*:/.test(message)) return "credit_extra_forbidden";
  if (/\bfallback_credit_token\s*:/.test(message)) return "credit_other";
  return;
}
function isSystemRoleUnsupportedError(error) {
  if (!(error instanceof Uo) || error.status !== 400) return false;
  let message = error.message;
  if (message.includes(f7.header) && message.includes("anthropic-beta")) return true;
  if (message.includes("Unexpected role") && message.includes("input message role")) return true;
  return message.includes("not supported") && /role .{0,2}system/i.test(message);
}
function isInvalidThinkingSignatureError(error) {
  if (!(error instanceof Uo) || error.status !== 400) return false;
  let message = error.message.toLowerCase().replaceAll("`", "");
  if (message.includes("signature in thinking block")) return true;
  if (message.includes("thinking.signature") && message.includes("field required")) return true;
  return (message.includes("thinking block") || message.includes("redacted_thinking")) && (message.includes("cannot be modified") || message.includes("invalid signature"));
}
function getUnsupportedThinkingType(error) {
  if (!(error instanceof Uo) || error.status !== 400) return null;
  let match = /thinking\.type[^a-z]{1,8}(enabled|adaptive)[^]*?not supported/i.exec(error.message) ?? /\b(adaptive) thinking is not supported/i.exec(error.message);
  return match?.[1] ? match[1].toLowerCase() : null;
}
function formatApiErrorMessageWithRequestId(error, model, requestContext) {
  let result = formatApiErrorMessage(error, model, requestContext);
  if (error instanceof Uo && typeof error.status === "number") result.apiErrorStatus = error.status;
  let requestId = requestContext?.requestId || (error instanceof Uo ? error.requestID || error.error?.request_id : undefined);
  if (requestId) result.requestId = requestId;
  return result;
}
function formatApiErrorMessage(error, model, requestContext) {
  if (error instanceof sK || error instanceof uk && error.message.toLowerCase().includes("timeout")) return Hl({
    content: REQUEST_TIMED_OUT_MESSAGE,
    error: "server_error"
  });
  if (error instanceof aot || error instanceof hO) return Hl({
    content: getImageTooLargeMessage(),
    error: "invalid_request",
    errorDetails: error.message
  });
  if (error instanceof Error && error.message.includes(OPUS_HIGH_LOAD_MESSAGE)) return Hl({
    content: OPUS_HIGH_LOAD_MESSAGE,
    error: "rate_limit"
  });
  if (error instanceof Error && error.message.includes(FABLE_HIGH_LOAD_MESSAGE)) return Hl({
    content: FABLE_HIGH_LOAD_MESSAGE,
    error: "rate_limit"
  });
  if (error instanceof Uo && error.status === 429) {
    let isSubscriber = lot(Eo()),
      rateLimitInfo = g6i(error),
      creditInfo = b7r(error),
      isOverageRelated = isSubscriber && sE(model) && (rateLimitInfo?.rateLimitType === "seven_day_overage_included" || creditInfo.errorCode === "credits_required");
    if (isSubscriber && rateLimitInfo && !isOverageRelated) {
      let rateLimitMessage = y7r(rateLimitInfo, model);
      if (rateLimitMessage) return Hl({
        content: rateLimitMessage,
        error: "rate_limit"
      });
      return Hl({
        content: eZ,
        error: "rate_limit"
      });
    }
    if (isSubscriber && R7r(error.message) && !DKe()) _ir(true), W("tengu_1m_credits_clamp_activated", {});
    if (isOverageRelated) {
      let disabledReason = error.headers?.get?.("anthropic-ratelimit-unified-overage-disabled-reason") ?? creditInfo.overageDisabledReason ?? Ot().cachedExtraUsageDisabledReason,
        isSevenDayOverage = rateLimitInfo?.rateLimitType === "seven_day_overage_included";
      return Hl({
        content: getOverageDisabledMessage(disabledReason, isSevenDayOverage),
        error: "rate_limit",
        errorDetails: error.message
      });
    }
    if (isSubscriber && R7r(error.message)) {
      let creditsHint = kr() ? "turn on usage credits at claude.ai/settings/usage, or use --model to switch to standard context" : "run /usage-credits to turn them on, or /model to switch to standard context";
      return Hl({
        content: `${API_ERROR_PREFIX}: Usage credits required for 1M context \xB7 ${creditsHint}`,
        error: "rate_limit",
        errorDetails: error.message
      });
    }
    let strippedMessage = error.message.replace(/^429\s+/, ""),
      parsedMessage;
    try {
      let parsed = qt(strippedMessage),
        innerMessage = parsed?.error?.message ?? parsed?.message;
      if (typeof innerMessage === "string") parsedMessage = innerMessage;
    } catch {}
    let displayMessage = parsedMessage || strippedMessage;
    if (isSubscriber && error.headers?.get?.("anthropic-ratelimit-unified-overage-disabled-reason")) return Hl({
      content: displayMessage,
      error: "rate_limit"
    });
    let rejectionLabel = isSubscriber ? "Server is temporarily limiting requests (not your usage limit)" : "Request rejected (429)",
      capacityHint = `this may be a temporary capacity issue.${getStatusCheckSuffix()}`;
    return Hl({
      content: `${API_ERROR_PREFIX}: ${rejectionLabel} \xB7 ${displayMessage || capacityHint}`,
      error: "rate_limit"
    });
  }
  if (isPromptTooLongError(error) || isContextLimitExceededError(error)) return Hl({
    content: PROMPT_TOO_LONG,
    error: "invalid_request",
    errorDetails: error.message
  });
  if (error instanceof Error && /maximum of \d+ PDF pages/.test(error.message)) return Hl({
    content: getPdfTooLargeMessage(),
    error: "invalid_request",
    errorDetails: error.message
  });
  if (error instanceof Error && error.message.includes("The PDF specified is password protected")) return Hl({
    content: getPdfPasswordProtectedMessage(),
    error: "invalid_request",
    errorDetails: error.message
  });
  if (error instanceof Error && error.message.includes("The PDF specified was not valid")) return Hl({
    content: getPdfInvalidMessage(),
    error: "invalid_request",
    errorDetails: error.message
  });
  if (error instanceof Uo && error.status === 400 && error.message.includes("image exceeds") && error.message.includes("maximum")) return Hl({
    content: getImageTooLargeMessage(),
    error: "invalid_request",
    errorDetails: error.message
  });
  if (error instanceof Uo && error.status === 400 && error.message.includes("image dimensions exceed") && error.message.includes("many-image")) return Hl({
    content: kr() ? "An image in the conversation exceeds the dimension limit for many-image requests (2000px). Start a new session with fewer images." : "An image in the conversation exceeds the dimension limit for many-image requests (2000px). Run /compact to remove old images from context, or start a new session.",
    error: "invalid_request",
    errorDetails: error.message
  });
  if (isAdvisorModelIncompatibleError(error)) {
    let advisorHint = kr() ? "change or unset the advisorModel setting (or the --advisor flag)" : "run /advisor to change or disable the advisor";
    return Hl({
      content: `${API_ERROR_PREFIX}: ${error.message.replace(/^400\s+/, "")} \xB7 The configured advisor model is not compatible with this request model \u2014 ${advisorHint}`,
      error: "invalid_request",
      errorDetails: error.message
    });
  }
  {
    let mediaBlock = getOffendingMediaBlockFromError(error);
    if (mediaBlock && error instanceof Error) return Hl({
      content: getRemovedMediaMessage(mediaBlock.kind),
      error: "invalid_request",
      errorDetails: error.message
    });
  }
  if (isAutoModeBetaError(error)) return Hl({
    content: "Auto mode is unavailable for your plan",
    error: "invalid_request"
  });
  if (error instanceof Uo && error.status === 413) {
    if (error.message.toLowerCase().includes("context window")) return Hl({
      content: PROMPT_TOO_LONG,
      error: "invalid_request",
      errorDetails: error.message
    });
    return Hl({
      content: getRequestTooLargeMessage(),
      error: "invalid_request",
      errorDetails: `request_too_large: ${error.message}`
    });
  }
  if (error instanceof Uo && error.status === 400 && error.message.includes("`tool_use` ids were found without `tool_result` blocks immediately after")) {
    if (requestContext?.messages && requestContext?.messagesForAPI) {
      let idMatch = error.message.match(/toolu_[A-Za-z0-9_]+/),
        toolUseId = idMatch ? idMatch[0] : null;
      if (toolUseId) reportToolUseResultMismatch(toolUseId, requestContext.messages, requestContext.messagesForAPI);
    }
    {
      let rewindHint = kr() ? "" : " Run /rewind to recover the conversation.";
      return Hl({
        content: "API Error: 400 due to tool use concurrency issues." + rewindHint,
        error: "invalid_request"
      });
    }
  }
  if (error instanceof Uo && error.status === 400 && error.message.includes("unexpected `tool_use_id` found in `tool_result`")) W("tengu_unexpected_tool_result", {});
  if (error instanceof Uo && error.status === 400 && error.message.includes("`tool_use` ids must be unique")) {
    W("tengu_duplicate_tool_use_id", {});
    let rewindHint = kr() ? "" : " Run /rewind to recover the conversation.";
    return Hl({
      content: `API Error: 400 duplicate tool_use ID in conversation history.${rewindHint}`,
      error: "invalid_request",
      errorDetails: error.message
    });
  }
  if (Eo() && error instanceof Uo && error.status === 400 && error.message.toLowerCase().includes("invalid model name") && (Yoe(So(model)) || model === "opus")) return Hl({
    content: "Claude Opus is not available with the Claude Pro plan. If you have updated your subscription plan recently, run /logout and /login for the plan to take effect.",
    error: "invalid_request"
  });
  if (isCreditBalanceLowError(error)) return Hl({
    content: CREDIT_BALANCE_LOW_MESSAGE,
    error: "billing_error"
  });
  if (error instanceof Uo && error.status === 400 && isOrgDisabledError(error)) {
    let {
      source: source
    } = Yg();
    if (source === "ANTHROPIC_API_KEY" && process.env.ANTHROPIC_API_KEY && !Eo()) {
      let hasOAuth = pE();
      return Hl({
        error: "invalid_request",
        content: hasOAuth ? DISABLED_ORG_UNSET_MESSAGE : DISABLED_ORG_UPDATE_MESSAGE
      });
    }
  }
  if (error instanceof Error && error.message.toLowerCase().includes("x-api-key")) {
    if (isRemoteSession()) return Hl({
      error: "authentication_failed",
      content: AUTH_NETWORK_ERROR_MESSAGE
    });
    if (Rr() === "gateway") return Hl({
      error: "invalid_request",
      content: GATEWAY_AUTH_ERROR_MESSAGE
    });
    let {
      source: source
    } = Yg();
    return Hl({
      error: "authentication_failed",
      content: source === "ANTHROPIC_API_KEY" || source === "apiKeyHelper" ? INVALID_API_KEY_MESSAGE : NOT_LOGGED_IN_MESSAGE
    });
  }
  if (error instanceof Uo && error.status === 403 && error.message.includes("OAuth token has been revoked")) return Hl({
    error: "authentication_failed",
    content: getNoClaudeAccessMessage()
  });
  if (error instanceof Uo && (error.status === 401 || error.status === 403) && error.message.includes("OAuth authentication is currently not allowed for this organization")) return Hl({
    error: "oauth_org_not_allowed",
    content: getOrgSubscriptionDisabledMessage()
  });
  if (error instanceof Uo && error.status === 403 && error.message.toLowerCase().includes("api key authentication is disabled")) {
    let {
      source: source
    } = Yg();
    if (source === "ANTHROPIC_API_KEY" && Ne.ANTHROPIC_API_KEY) return Hl({
      error: "invalid_request",
      content: pE() ? API_KEY_DISABLED_UNSET_MESSAGE : API_KEY_DISABLED_UNSET_LOGIN_MESSAGE
    });
    if (source === "apiKeyHelper") return Hl({
      error: "invalid_request",
      content: API_KEY_DISABLED_HELPER_MESSAGE
    });
    if (source === "/login managed key") return Hl({
      error: "authentication_failed",
      content: API_KEY_DISABLED_LOGIN_MESSAGE
    });
  }
  if (error instanceof Uo && (error.status === 401 || error.status === 403)) {
    if (isRemoteSession()) return Hl({
      error: "authentication_failed",
      content: AUTH_NETWORK_ERROR_MESSAGE
    });
    let detail = dot(error);
    return Hl({
      error: "authentication_failed",
      content: kr() ? `Failed to authenticate. ${API_ERROR_PREFIX}: ${detail}` : `Please run /login \xB7 ${API_ERROR_PREFIX}: ${detail}`
    });
  }
  if (nt(process.env.CLAUDE_CODE_USE_BEDROCK) && error instanceof Error && error.message.toLowerCase().includes("model id")) {
    let modelSwitchCommand = w6i(),
      suggestedModel = k6i(model);
    return Hl({
      content: suggestedModel ? `${API_ERROR_PREFIX} (${model}): ${error.message}.${modelSwitchCommand ? ` Try ${modelSwitchCommand} to switch to ${suggestedModel}.` : ` Try switching to ${suggestedModel}.`}` : `${API_ERROR_PREFIX} (${model}): ${error.message}.${modelSwitchCommand ? ` Run ${modelSwitchCommand} to pick a different model.` : ""}`,
      error: "model_not_found"
    });
  }
  if (error instanceof Uo && error.status === 404) {
    let modelSwitchCommand = w6i(),
      suggestedModel = k6i(model);
    return Hl({
      content: suggestedModel ? `The model ${model} is not available on your ${Rr()} deployment. ${modelSwitchCommand ? `Try ${modelSwitchCommand} to switch to ${suggestedModel}` : `Try switching to ${suggestedModel}`}, or ask your admin to enable this model.` : `There's an issue with the selected model (${model}). It may not exist or you may not have access to it.${modelSwitchCommand ? ` Run ${modelSwitchCommand} to pick a different model.` : ""}`,
      error: "model_not_found"
    });
  }
  let statusSuffix = getStatusCheckSuffix();
  if (error instanceof Error && error.message.includes(REPEATED_529_MESSAGE)) return Hl({
    content: `${API_ERROR_PREFIX}: ${REPEATED_529_MESSAGE}. The API is at capacity \u2014 this is usually temporary. Try again in a moment.${statusSuffix}`,
    error: "server_error"
  });
  if (error instanceof Uo && typeof error.status === "number" && error.status >= 500) {
    let detail = dot(error).replace(/[.!?\u2026]+$/, "");
    return Hl({
      content: `${API_ERROR_PREFIX}: ${detail}. This is a server-side issue, usually temporary \u2014 try again in a moment.${statusSuffix}`,
      error: "server_error"
    });
  }
  if (error instanceof uk) return Hl({
    content: `${API_ERROR_PREFIX}: ${dot(error)}`,
    error: "server_error"
  });
  if (error instanceof Uo) return Hl({
    content: `${API_ERROR_PREFIX}: ${dot(error)}`,
    error: "unknown"
  });
  let connectionError = P4(error);
  if (connectionError && (Bke.has(connectionError.code) || xHn.has(connectionError.code))) return Hl({
    content: `${API_ERROR_PREFIX}: Connection to the API was lost (${connectionError.code}). This is usually temporary \u2014 try again.`,
    error: "server_error"
  });
  if (error instanceof Error) return Hl({
    content: `${API_ERROR_PREFIX}: ${error.message}`,
    error: "unknown"
  });
  return Hl({
    content: API_ERROR_PREFIX,
    error: "unknown"
  });
}
function w6i() {
  if (!kr()) return "/model";
  return XU() === "sdk-cli" ? "--model" : undefined;
}
function k6i(model) {
  if (Vu()) return;
  let lowered = model.toLowerCase();
  if (lowered.includes("fable-5") || lowered.includes("fable_5")) return Ne.ANTHROPIC_DEFAULT_OPUS_MODEL ?? Kp().opus48;
  if (lowered.includes("opus-4-8") || lowered.includes("opus_4_8")) return Kp().opus47;
  if (lowered.includes("opus-4-7") || lowered.includes("opus_4_7")) return Kp().opus46;
  if (lowered.includes("opus-4-6") || lowered.includes("opus_4_6")) return Kp().opus45;
  if (lowered.includes("opus-4-5") || lowered.includes("opus_4_5")) return Kp().opus41;
  if (lowered.includes("sonnet-4-6") || lowered.includes("sonnet_4_6")) return Kp().sonnet45;
  if (lowered.includes("sonnet-4-5") || lowered.includes("sonnet_4_5")) return Kp().sonnet40;
  return;
}
function classifyErrorType(error) {
  if (error instanceof Error && error.message === "Request was aborted.") return "aborted";
  if (error instanceof sK || error instanceof uk && error.message.toLowerCase().includes("timeout") || error instanceof Error && error.message.startsWith("Stream idle timeout")) return "api_timeout";
  if (error instanceof Error && error.message.includes(REPEATED_529_MESSAGE)) return "repeated_529";
  if (error instanceof Error && (error.message.includes(OPUS_HIGH_LOAD_MESSAGE) || error.message.includes(FABLE_HIGH_LOAD_MESSAGE))) return "capacity_off_switch";
  if (error instanceof Uo && error.status === 429) return "rate_limit";
  if (error instanceof Uo && (error.status === 529 || error.message?.includes('"type":"overloaded_error"'))) return "server_overload";
  if (error instanceof Error && (error.message.toLowerCase().includes(PROMPT_TOO_LONG.toLowerCase()) || isContextLimitExceededError(error))) return "prompt_too_long";
  if (error instanceof Error && /maximum of \d+ PDF pages/.test(error.message)) return "pdf_too_large";
  if (error instanceof Error && error.message.includes("The PDF specified is password protected")) return "pdf_password_protected";
  if (error instanceof Uo && error.status === 400 && error.message.includes("image exceeds") && error.message.includes("maximum")) return "image_too_large";
  if (error instanceof Uo && error.status === 400 && error.message.includes("image dimensions exceed") && error.message.includes("many-image")) return "image_too_large";
  if (error instanceof Uo && error.status === 400 && error.message.includes("Could not process image")) return "image_unprocessable";
  if (error instanceof Uo && error.status === 413) return error.message.toLowerCase().includes("context window") ? "prompt_too_long" : "request_too_large";
  if (error instanceof Uo && error.status === 400 && error.message.includes("`tool_use` ids were found without `tool_result` blocks immediately after")) return "tool_use_mismatch";
  if (error instanceof Uo && error.status === 400 && error.message.includes("unexpected `tool_use_id` found in `tool_result`")) return "unexpected_tool_result";
  if (error instanceof Uo && error.status === 400 && error.message.includes("`tool_use` ids must be unique")) return "duplicate_tool_use_id";
  if (error instanceof Uo && error.status === 400 && error.message.toLowerCase().includes("invalid model name")) return "invalid_model";
  if (error instanceof Uo && error.status === 404 && error.message.includes("not_found_error") && error.message.includes('"model: ')) return "model_not_found";
  if (error instanceof Uo && error.status === 400 && /invalid `?signature`? in `?thinking`? block/i.test(error.message)) return "invalid_thinking_signature";
  if (error instanceof Uo && error.status === 400 && (error.message.includes("text content blocks must be non-empty") || error.message.includes("text content blocks must contain non-whitespace text"))) return "empty_text_block";
  if (error instanceof Uo && error.status === 400 && error.message.includes("diagnostics.previous_message_id")) return "previous_message_id_invalid";
  if (error instanceof Uo && error.status === 400 && error.message.includes(".tool_use_id") && error.message.includes("String should match pattern")) return "tool_use_id_invalid";
  if (error instanceof Uo && error.status === 400 && error.message.includes("Grammar compilation")) return "grammar_compile_error";
  if (error instanceof Uo && error.status === 400 && error.message.toLowerCase().includes("request body is not valid json")) return "request_body_invalid_json";
  if (error instanceof Error && error.message.toLowerCase().includes(CREDIT_BALANCE_LOW_MESSAGE.toLowerCase())) return "credit_balance_low";
  if (error instanceof Error && (error.message.toLowerCase().includes("x-api-key") || error.message.toLowerCase().includes("not a valid api key for this workspace"))) return "invalid_api_key";
  if (error instanceof Uo && error.status === 403 && error.message.includes("OAuth token has been revoked")) return "token_revoked";
  if (error instanceof Uo && (error.status === 401 || error.status === 403) && error.message.includes("OAuth authentication is currently not allowed for this organization")) return "oauth_org_not_allowed";
  if (error instanceof Uo && (error.status === 401 || error.status === 403)) return "auth_error";
  if (nt(process.env.CLAUDE_CODE_USE_BEDROCK) && error instanceof Error && error.message.toLowerCase().includes("model id")) return "bedrock_model_access";
  if (error instanceof Error && error.message.includes("Output blocked by content filtering policy")) return "output_content_filtered";
  if (error instanceof Wp) return "wif_credential_error";
  if (error instanceof Error && error.message.toLowerCase().includes("domains are not accessible to our user agent")) return "webfetch_domain_blocked";
  if (error instanceof Error) {
    let lowered = error.message.toLowerCase();
    if (isOrgDisabledError(error)) return "org_disabled";
    if (lowered.includes("updated our consumer terms")) return "terms_not_accepted";
    if (lowered.includes("web search is not enabled for this organization") || /is not enabled for (this|your) organization/.test(lowered)) return "feature_not_enabled_for_org";
    if (/reached your specified[\w\s-]*?usage limits/.test(lowered)) return "usage_cap_reached";
  }
  if (isSystemRoleUnsupportedError(error)) return "system_role_unsupported";
  if (error instanceof Uo && error.status === 400 && /`?(thinking|redacted_thinking)`?\s+(or\s+`?redacted_thinking`?\s+)?blocks?\s+.{0,60}cannot be modified/i.test(error.message)) return "thinking_blocks_modified";
  if (error instanceof Uo) {
    let status = error.status;
    if (status >= 500) return "server_error";
    if (status >= 400) return "client_error";
  }
  if (error instanceof uk) {
    if (P4(error)?.isSSLError) return "ssl_cert_error";
    return "connection_error";
  }
  let connectionError = P4(error);
  if (connectionError && (Bke.has(connectionError.code) || xHn.has(connectionError.code))) return "connection_error";
  return "unknown";
}
function classifyHttpStatus(error) {
  if (error.status === 529 || error.message?.includes('"type":"overloaded_error"')) return "overloaded";
  if (error.status === 429) return "rate_limit";
  if (error.status === 401 || error.status === 403) return "authentication_failed";
  if (error.status !== undefined && error.status >= 408) return "server_error";
  return "unknown";
}
function buildRefusalMessage(stopReason, stopDetails, requestId, model) {
  if (stopReason !== "refusal") return;
  let explanation = stopDetails?.explanation?.trimEnd() ?? null;
  W("tengu_refusal_api_response", {
    has_explanation: Boolean(explanation),
    category: stopDetails?.category ? Le(iot(stopDetails.category)) : undefined,
    request_id: xr(requestId) || undefined
  });
  let maxExplanationLength = 400,
    truncatedExplanation = explanation && explanation.length > maxExplanationLength ? explanation.slice(0, maxExplanationLength).trimEnd() + "\u2026" : explanation,
    explanationSuffix = truncatedExplanation ? ` ${truncatedExplanation}${/[.!?\u2026]$/.test(truncatedExplanation) ? "" : "."}` : "",
    modelName = model != null && Kqi(model) ? Tp(model) : undefined,
    content;
  if (modelName !== undefined) {
    let isNonInteractive = kr(),
      retryHint = isNonInteractive ? "Try rephrasing the request in a new session or change your model." : "Double press esc to edit your last message, or try a different model with /model.",
      learnMoreHint = isNonInteractive ? `Learn more: ${$$e}` : oot,
      safeguardsMessage = sot(stopDetails?.category) ? `${modelName}'s safeguards flagged this message (https://www.anthropic.com/legal/aup). ${Xqi}` : `${modelName}'s safeguards flagged this message (https://www.anthropic.com/legal/aup). This sometimes happens with safe, normal conversations.`;
    content = `${API_ERROR_PREFIX}: ${safeguardsMessage} Claude Code can't respond to this request with ${modelName}.

${retryHint}

${learnMoreHint}`;
  } else {
    let isNonInteractive = kr(),
      retryHint = isNonInteractive ? "Try rephrasing the request in a new session or change your model." : "Please double press esc to edit your last message or start a new session for Claude Code to assist with a different task.";
    if (stopDetails?.category === "cyber" && Vu()) {
      let learnMoreHint = isNonInteractive ? `Learn more: ${$$e}` : oot,
        modelLabel = model != null ? Tp(model) : "This model";
      content = `${API_ERROR_PREFIX}: ${modelLabel}'s safeguards flagged this message for a cybersecurity topic. If your work requires this access, you can apply for an exemption: ${jqi(stopDetails.explanation)}

${retryHint}

${learnMoreHint}`;
    } else content = `${API_ERROR_PREFIX}: Claude Code is unable to respond to this request, which appears to violate our Usage Policy (https://www.anthropic.com/legal/aup).${explanationSuffix} ` + retryHint;
  }
  let requestIdSuffix = requestId ? `

Request ID: ${requestId}` : "",
    result = Hl({
      content: content + requestIdSuffix,
      error: "invalid_request"
    });
  return result.requestId = requestId ?? undefined, result.message.stop_reason = "refusal", result.message.stop_details = stopDetails ?? null, result;
}
function getOverageDisabledMessage(disabledReason, isSevenDayOverage) {
  let baseMessage = isSevenDayOverage ? "You've reached your Fable 5 limit." : "Fable 5 requires usage credits.";
  switch (disabledReason) {
    case "out_of_credits":
      return oE() ? "You're out of usage credits. Run /usage-credits to keep using Fable 5 or /model to switch models." : "You're out of usage credits. /model to switch models.";
    case "org_spend_cap_reached":
    case "org_level_disabled_until":
      return oE() ? "You've hit your monthly spend limit. Run /usage-credits to manage your limit and keep using Fable 5 or switch models to continue this chat." : "You've hit your monthly spend limit. /model to switch models.";
    case "org_level_disabled":
    case "org_service_level_disabled":
    case "seat_tier_level_disabled":
    case "seat_tier_zero_credit_limit":
    case "member_level_disabled":
    case "member_zero_credit_limit":
    case "group_zero_credit_limit":
      return oE() ? `${baseMessage} Run /usage-credits to continue or switch models with /model.` : `${baseMessage} /model to switch models.`;
    default:
      return oE() ? `${baseMessage} Run /usage-credits to continue or switch models with /model.` : `${baseMessage} /model to switch models.`;
  }
}
function R7r(errorDetails) {
  return errorDetails.includes("Extra usage is required for long context") || errorDetails.includes("Usage credits are required for long context");
}
function isLongContextCreditsApiMessage(message) {
  return DKe() && message.isApiErrorMessage === true && message.errorDetails !== undefined && R7r(message.errorDetails);
}
var API_ERROR_PREFIX = "API Error",
  PROMPT_TOO_LONG = "Prompt is too long",
  CONVERSATION_DOMINANT_RATIO = 0.8,
  IMAGE_ERROR_PHRASES,
  PDF_ERROR_PHRASES,
  CREDIT_BALANCE_LOW_MESSAGE = "Credit balance is too low",
  NOT_LOGGED_IN_MESSAGE = "Not logged in \xB7 Please run /login",
  INVALID_API_KEY_MESSAGE = "Invalid API key \xB7 Fix external API key",
  DISABLED_ORG_UNSET_MESSAGE = "Your ANTHROPIC_API_KEY belongs to a disabled organization \xB7 Unset the environment variable to use your subscription instead",
  DISABLED_ORG_UPDATE_MESSAGE = "Your ANTHROPIC_API_KEY belongs to a disabled organization \xB7 Update or unset the environment variable",
  API_KEY_DISABLED_UNSET_MESSAGE = "Your organization has disabled API key authentication \xB7 Unset ANTHROPIC_API_KEY to use your claude.ai account instead",
  API_KEY_DISABLED_UNSET_LOGIN_MESSAGE = "Your organization has disabled API key authentication \xB7 Unset ANTHROPIC_API_KEY and run /login to sign in with your claude.ai account",
  API_KEY_DISABLED_HELPER_MESSAGE = "Your organization has disabled API key authentication \xB7 Unset the apiKeyHelper setting and run /login to sign in with your claude.ai account",
  API_KEY_DISABLED_LOGIN_MESSAGE = "Your organization has disabled API key authentication \xB7 Run /login to sign in with your claude.ai account",
  OAUTH_REVOKED_MESSAGE = "OAuth token revoked \xB7 Please run /login",
  AUTH_NETWORK_ERROR_MESSAGE = "Authentication error \xB7 This may be a temporary network issue, please try again",
  GATEWAY_AUTH_ERROR_MESSAGE = "Authentication error \xB7 The gateway could not authenticate with its upstream provider \u2014 contact your gateway administrator",
  STATUS_PAGE_URL = "https://status.claude.com",
  REPEATED_529_MESSAGE = "Repeated 529 Overloaded errors",
  OPUS_HIGH_LOAD_MESSAGE = "Opus is experiencing high load, please use /model to switch to Sonnet",
  FABLE_HIGH_LOAD_MESSAGE = "Fable is experiencing high load, please use /model to switch to Sonnet",
  REQUEST_TIMED_OUT_MESSAGE = "Request timed out",
  ORG_SUBSCRIPTION_DISABLED_MESSAGE = "Your organization has disabled Claude subscription access for Claude Code \xB7 Use an Anthropic API key instead, or ask your admin to enable access",
  ADVISOR_INCOMPATIBLE_MESSAGE = "cannot be used as an advisor when the request model is";
var kD = b(() => {
  jx();
  TX();
  xM();
  lo();
  RM();
  tr();
  po();
  Ro();
  gQ();
  Ps();
  nj();
  lt();
  BZ();
  rI();
  Ir();
  dn();
  Xo();
  f4();
  vHn();
  tn();
  kt();
  QT();
  nB();
  XMt();
  $ke();
  IMAGE_ERROR_PHRASES = ["could not process image", "image exceeds", "image dimensions exceed", "image does not match the provided media type", "image cannot be empty", "exceeds api limit", "images exceed the api limit", "unable to resize image", "unable to compress image", "image file is empty"], PDF_ERROR_PHRASES = ["could not process pdf", "pdf pages", "the pdf specified was not valid", "the pdf specified is password protected", "pdf cannot be empty", "too much media"];
});

export {isApiErrorString as _1,isPromptTooLongMessage as yge,parsePromptTooLongTokens as n1t,getPromptTooLongOverflow as pot,buildPromptTooLongMessage as H6i,isRequestTooLargeMessage as C1d,getOffendingMediaKinds as I6i,parseOffendingMediaBlock as v7r,getOffendingMediaBlockFromError as PHn,isRequestTooLargeApiMessage as OHn,isPromptTooLongError as w7r,isContextLimitExceededError as r1t,isCreditBalanceLowError as k7r,isOrgDisabledError as MHn,getStatusCheckSuffix as R6i,getPdfTooLargeMessage as D7r,getPdfPasswordProtectedMessage as P7r,getPdfInvalidMessage as O7r,getImageTooLargeMessage as DHn,getRequestTooLargeMessage as L7r,getRemovedMediaMessage as fot,getNoClaudeAccessMessage as x1d,getOrgSubscriptionDisabledMessage as D1d,isRemoteSession as v6i,reportToolUseResultMismatch as P1d,isApiResponseShape as x6i,isAutoModeBetaError as UHn,isAdvisorToolResultError as M7r,isAdvisorModelIncompatibleError as o1t,isMissingBetaHeaderError as N7r,classifyFallbackBetaError as D6i,classifyFallbackCreditError as P6i,isSystemRoleUnsupportedError as $Hn,isInvalidThinkingSignatureError as F7r,getUnsupportedThinkingType as B7r,formatApiErrorMessageWithRequestId as qHn,formatApiErrorMessage as L1d,w6i,k6i,classifyErrorType as WHn,classifyHttpStatus as U7r,buildRefusalMessage as K$e,getOverageDisabledMessage as M1d,R7r,isLongContextCreditsApiMessage as O6i,API_ERROR_PREFIX as ob,PROMPT_TOO_LONG as rB,CONVERSATION_DOMINANT_RATIO as E1d,IMAGE_ERROR_PHRASES as A1d,PDF_ERROR_PHRASES as R1d,CREDIT_BALANCE_LOW_MESSAGE as LHn,NOT_LOGGED_IN_MESSAGE as NHn,INVALID_API_KEY_MESSAGE as FHn,DISABLED_ORG_UNSET_MESSAGE as H7r,DISABLED_ORG_UPDATE_MESSAGE as I7r,API_KEY_DISABLED_UNSET_MESSAGE as v1d,API_KEY_DISABLED_UNSET_LOGIN_MESSAGE as w1d,API_KEY_DISABLED_HELPER_MESSAGE as k1d,API_KEY_DISABLED_LOGIN_MESSAGE as H1d,OAUTH_REVOKED_MESSAGE as BHn,AUTH_NETWORK_ERROR_MESSAGE as C6i,GATEWAY_AUTH_ERROR_MESSAGE as x7r,STATUS_PAGE_URL as A6i,REPEATED_529_MESSAGE as t1t,OPUS_HIGH_LOAD_MESSAGE as G$e,FABLE_HIGH_LOAD_MESSAGE as V$e,REQUEST_TIMED_OUT_MESSAGE as mot,ORG_SUBSCRIPTION_DISABLED_MESSAGE as I1d,ADVISOR_INCOMPATIBLE_MESSAGE as O1d,kD};
