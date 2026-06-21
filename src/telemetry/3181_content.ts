// @ts-nocheck
import {st} from "../../vendor/m5.ts";
import {getIsNonInteractiveSession,getSessionId,lt} from "../session/0131_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Le,qt,Xt} from "../config/0228_encoding.ts";
import {Ou,uS} from "../config/2594_event_name.ts";
import {Qi,wA,tQe,$u} from "../mcp/2194_mcpServerName.ts";
import {b} from "../../runtime.ts";
import {sn} from "../config/0047_namespace.ts";
/** Returns true if OTEL_LOG_USER_PROMPTS env var is set and truthy. */
function Qrt() {
  return st(process.env.OTEL_LOG_USER_PROMPTS);
}

/** Clears the seen-system-prompts set and the query-source index map. */
function gea() {
  wMt.clear(), iKr.clear();
}

/**
 * Returns true if detailed beta tracing is enabled:
 * both ENABLE_BETA_TRACING_DETAILED and BETA_TRACING_ENDPOINT must be set,
 * and the session must be non-interactive or the GrowthBook flag must be on.
 */
function Xw() {
  if (!(st(process.env.ENABLE_BETA_TRACING_DETAILED) && Boolean(process.env.BETA_TRACING_ENDPOINT))) return !1;
  return getIsNonInteractiveSession() || getFeatureValue_CACHED_MAY_BE_STALE("tengu_trace_lantern", !1);
}

/**
 * Truncates content to the 60KB limit if needed.
 * Returns {content, truncated}.
 */
function uN(content: any, maxBytes: any = G9d) {
  if (content.length <= maxBytes) return {
    content: content,
    truncated: !1
  };
  return {
    content: content.slice(0, maxBytes) + `

[TRUNCATED - Content exceeds 60KB limit]`,
    truncated: !0
  };
}

/** Returns a 12-char hex SHA-256 fingerprint of the given string. */
function aKr(input: any) {
  return hea.createHash("sha256").update(input).digest("hex").slice(0, 12);
}

/** Returns a "sp_<hash>" identifier for a system prompt string. */
function V9d(systemPrompt: any) {
  return `sp_${aKr(systemPrompt)}`;
}

/** Returns a "msg_<hash>" identifier for a message object (hashing its serialized content). */
function Aea(msg: any) {
  let serialized = Le(msg.message.content);
  return `msg_${aKr(serialized)}`;
}

/**
 * If the string is a <system-reminder> block, extracts its inner text.
 * Returns null if not a system-reminder.
 */
function sKr(text: any) {
  return /^<system-reminder>\n?([\s\S]*?)\n?<\/system-reminder>$/.exec(text.trim())?.[1]?.trim() || null;
}

/**
 * Splits a list of messages into user context parts and system reminder strings.
 * @param messages - array of message objects
 * @param includeUserContent - whether to include non-reminder user text
 */
function K9d(messages: any, includeUserContent: any) {
  let contextParts = [],
    systemReminders = [];
  for (let msg of messages) {
    if (msg.type === "api_system") {
      systemReminders.push(msg.message.content);
      continue;
    }
    let msgContent = msg.message.content;
    if (typeof msgContent === "string") {
      let reminderText = sKr(msgContent);
      if (reminderText) systemReminders.push(reminderText);else if (includeUserContent) contextParts.push(`[USER]
${msgContent}`);
    } else if (Array.isArray(msgContent)) {
      for (let contentItem of msgContent) if (contentItem.type === "text") {
        let reminderText = sKr(contentItem.text);
        if (reminderText) systemReminders.push(reminderText);else if (includeUserContent) contextParts.push(`[USER]
${contentItem.text}`);
      } else if (contentItem.type === "tool_result") {
        if (typeof contentItem.content === "string") {
          let reminderText = sKr(contentItem.content);
          if (reminderText) systemReminders.push(reminderText);else if (includeUserContent) contextParts.push(`[TOOL RESULT: ${contentItem.tool_use_id}]
${contentItem.content}`);
        } else if (includeUserContent) contextParts.push(`[TOOL RESULT: ${contentItem.tool_use_id}]
${Le(contentItem.content)}`);
      }
    }
  }
  return {
    contextParts: contextParts,
    systemReminders: systemReminders
  };
}

/** Attaches the user prompt text as a span attribute, if tracing + logging is enabled. */
function _ea(span: any, promptText: any) {
  if (!Xw() || !Qrt()) return;
  let {
    content: truncatedContent,
    truncated: wasTruncated
  } = uN(`[USER PROMPT]
${promptText}`);
  span.setAttributes({
    new_context: truncatedContent,
    ...(wasTruncated && {
      new_context_truncated: !0,
      new_context_original_length: promptText.length
    })
  });
}

/**
 * Attaches system prompt, user system prompt, and tool metadata to a span.
 * Also emits OTel events for new system prompts and tools not yet seen this session.
 */
function yea(span: any, requestParams: any, messageHistory: any) {
  if (!Xw()) return;
  if (requestParams?.systemPrompt) {
    let promptHash = V9d(requestParams.systemPrompt),
      promptPreview = requestParams.systemPrompt.slice(0, 500);
    if (span.setAttribute("system_prompt_hash", promptHash), Qrt()) span.setAttribute("system_prompt_preview", promptPreview);
    if (span.setAttribute("system_prompt_length", requestParams.systemPrompt.length), Qrt() && !wMt.has(promptHash)) {
      wMt.add(promptHash);
      let {
        content: truncatedContent,
        truncated: wasTruncated
      } = uN(requestParams.systemPrompt);
      Ou("system_prompt", {
        system_prompt_hash: promptHash,
        system_prompt: truncatedContent,
        system_prompt_length: String(requestParams.systemPrompt.length),
        ...(wasTruncated && {
          system_prompt_truncated: "true"
        })
      });
    }
  }
  if (requestParams?.userSystemPrompt && Qrt()) {
    let currentSessionId = getSessionId();
    if (fea !== currentSessionId) {
      fea = currentSessionId;
      let {
        content: truncatedContent,
        truncated: wasTruncated
      } = uN(requestParams.userSystemPrompt);
      span.setAttributes({
        user_system_prompt: truncatedContent,
        ...(wasTruncated && {
          user_system_prompt_truncated: !0,
          user_system_prompt_original_length: requestParams.userSystemPrompt.length
        })
      });
    }
  }
  if (requestParams?.tools) try {
    let toolsInfo = qt(requestParams.tools).map(toolDef => {
      let serialized = Le(toolDef),
        toolHash = aKr(serialized);
      return {
        name: typeof toolDef.name === "string" ? toolDef.name : "unknown",
        hash: toolHash,
        json: serialized
      };
    });
    span.setAttribute("tools", Le(toolsInfo.map(({
      name: toolName,
      hash: toolHash
    }) => ({
      name: toolName,
      hash: toolHash
    })))), span.setAttribute("tools_count", toolsInfo.length);
    for (let {
      name: toolName,
      hash: toolHash,
      json: toolJson
    } of toolsInfo) if (!wMt.has(`tool_${toolHash}`)) {
      wMt.add(`tool_${toolHash}`);
      let {
        content: truncatedContent,
        truncated: wasTruncated
      } = uN(toolJson);
      Ou("tool", {
        tool_name: Qi(toolName),
        tool_hash: toolHash,
        tool: truncatedContent,
        ...(wasTruncated && {
          tool_truncated: "true"
        })
      });
    }
  } catch {
    span.setAttribute("tools_parse_error", !0);
  }
  if (messageHistory && messageHistory.length > 0 && requestParams?.querySource) {
    let querySource = requestParams.querySource,
      lastSeen = iKr.get(querySource),
      startIndex = 0;
    if (lastSeen) {
      let candidateMsg = messageHistory[lastSeen.index];
      if (candidateMsg && Aea(candidateMsg) === lastSeen.hash) startIndex = lastSeen.index + 1;
    }
    let newMessages = messageHistory.slice(startIndex).filter(msg => msg.type === "user" || msg.type === "api_system");
    if (newMessages.length > 0) {
      let logUserContent = Qrt(),
        {
          contextParts: contextParts,
          systemReminders: systemReminders
        } = K9d(newMessages, logUserContent);
      if (span.setAttribute("new_context_message_count", newMessages.length), systemReminders.length > 0) span.setAttribute("system_reminders_count", systemReminders.length);
      if (contextParts.length > 0 && logUserContent) {
        let joined = contextParts.join(`

---

`),
          {
            content: truncatedContent,
            truncated: wasTruncated
          } = uN(joined);
        span.setAttributes({
          new_context: truncatedContent,
          ...(wasTruncated && {
            new_context_truncated: !0,
            new_context_original_length: joined.length
          })
        });
      }
      if (systemReminders.length > 0 && logUserContent) {
        let joined = systemReminders.join(`

---

`),
          {
            content: truncatedContent,
            truncated: wasTruncated
          } = uN(joined);
        span.setAttributes({
          system_reminders: truncatedContent,
          ...(wasTruncated && {
            system_reminders_truncated: !0,
            system_reminders_original_length: joined.length
          })
        });
      }
    }
    let lastIdx = messageHistory.length - 1,
      lastMsg = messageHistory[lastIdx];
    if (lastMsg) iKr.set(querySource, {
      index: lastIdx,
      hash: Aea(lastMsg)
    });
  }
}

/** Attaches model output text to a response attributes object, if tracing + logging enabled. */
function Tea(responseAttrs: any, responseData: any) {
  if (!Xw() || !Qrt() || !responseData) return;
  if (responseData.modelOutput !== void 0) {
    let {
      content: truncatedContent,
      truncated: wasTruncated
    } = uN(responseData.modelOutput);
    if (responseAttrs["response.model_output"] = truncatedContent, wasTruncated) responseAttrs["response.model_output_truncated"] = !0, responseAttrs["response.model_output_original_length"] = responseData.modelOutput.length;
  }
}

/** Attaches tool input content to a span, if tracing and tool-input logging are enabled. */
function Sea(span: any, toolName: any, toolInput: any) {
  if (!Xw() || !wA()) return;
  let {
    content: truncatedContent,
    truncated: wasTruncated
  } = uN(`[TOOL INPUT: ${toolName}]
${toolInput}`);
  span.setAttributes({
    tool_input: truncatedContent,
    ...(wasTruncated && {
      tool_input_truncated: !0,
      tool_input_original_length: toolInput.length
    })
  });
}

/** Attaches tool result content to a context attributes object, if tracing and tool-result logging are enabled. */
function bea(contextAttrs: any, toolName: any, toolResult: any) {
  if (!Xw() || !tQe()) return;
  let {
    content: truncatedContent,
    truncated: wasTruncated
  } = uN(`[TOOL RESULT: ${toolName}]
${toolResult}`);
  if (contextAttrs.new_context = truncatedContent, wasTruncated) contextAttrs.new_context_truncated = !0, contextAttrs.new_context_original_length = toolResult.length;
}
var hea,
  wMt,
  iKr,
  fea,
  G9d = 61440;
var Zxe = b(() => {
  lt();
  zn();
  $u();
  sn();
  Xt();
  uS();
  hea = require("crypto");
  wMt = new Set(), iKr = new Map();
});
export {Qrt,gea,Xw,uN,aKr,V9d,Aea,sKr,K9d,_ea,yea,Tea,Sea,bea,hea,wMt,iKr,fea,G9d,Zxe};
