// @ts-nocheck
import {cc as M1} from "../../vendor/m2459.ts";
import {vGt as iU_,VPe as JhH} from "../core/4898_type.ts";
import {Mn as B6,wG as c_H,fS as ej,po as Aq} from "../tools/5224_userPromptCount.ts";
import {J$ as Gc,Lw as zR} from "../../vendor/m4308.ts";
import {logForDebugging as y,qe as UH} from "../config/0236_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function isRealSdkMessage(msg) {
  return msg.type !== "control_request" && msg.type !== "control_response" && msg.type !== "keep_alive" && msg.type !== "control_cancel_request" && msg.type !== "transcript_mirror" && !(msg.type === "system" && msg.subtype === "task_summary");
}
function adaptAssistantMessage(msg) {
  return {
    type: "assistant",
    message: msg.message,
    uuid: msg.uuid,
    requestId: undefined,
    timestamp: new Date().toISOString(),
    error: msg.error
  };
}
function adaptStreamEvent(msg) {
  return {
    type: "stream_event",
    event: msg.event,
    ...(msg.ttft_ms !== undefined && {
      ttftMs: msg.ttft_ms
    })
  };
}
function adaptResultMessage(msg) {
  if (msg.subtype === "success") return {
    type: "system",
    subtype: "informational",
    content: "Session completed successfully",
    level: "info",
    uuid: msg.uuid,
    timestamp: new Date().toISOString()
  };
  let filteredErrors = msg.errors.filter(e => !e.startsWith("[ede_diagnostic]"));
  if (filteredErrors.length === 0) return null;
  return {
    type: "system",
    subtype: "informational",
    content: M1(filteredErrors.join(", ")),
    level: "warning",
    uuid: msg.uuid,
    timestamp: new Date().toISOString()
  };
}
function adaptInitMessage(msg) {
  return {
    type: "system",
    subtype: "informational",
    content: `Cloud session initialized (model: ${M1(msg.model)})`,
    level: "info",
    uuid: msg.uuid,
    timestamp: new Date().toISOString()
  };
}
function adaptStatusMessage(msg) {
  if (!msg.status) return null;
  return {
    type: "system",
    subtype: "informational",
    content: msg.status === "compacting" ? "Compacting conversation\u2026" : `Status: ${M1(msg.status)}`,
    level: "info",
    uuid: msg.uuid,
    timestamp: new Date().toISOString()
  };
}
function adaptToolProgressMessage(msg) {
  return {
    type: "system",
    subtype: "informational",
    content: `Tool ${M1(msg.tool_name)} running for ${msg.elapsed_time_seconds}s\u2026`,
    level: "info",
    uuid: msg.uuid,
    timestamp: new Date().toISOString(),
    toolUseID: msg.tool_use_id
  };
}
function adaptCompactBoundaryMessage(msg) {
  return {
    type: "system",
    subtype: "compact_boundary",
    content: "Conversation compacted",
    level: "info",
    uuid: msg.uuid,
    timestamp: new Date().toISOString(),
    compactMetadata: iU_(msg.compact_metadata)
  };
}
function adaptSdkMessage(msg, opts) {
  switch (msg.type) {
    case "control_request":
    case "control_response":
    case "control_cancel_request":
      return {
        type: "ignored"
      };
    case "assistant":
      return {
        type: "message",
        message: adaptAssistantMessage(msg)
      };
    case "user":
      {
        let content = msg.message?.content,
          hasToolResult = Array.isArray(content) && content.some(block => block.type === "tool_result");
        if (opts?.convertToolResults && hasToolResult) return {
          type: "message",
          message: B6({
            content: content,
            toolUseResult: msg.tool_use_result,
            uuid: msg.uuid,
            timestamp: msg.timestamp
          })
        };
        if (msg.isSynthetic && !c_H(msg.origin)) return {
          type: "ignored"
        };
        let isHeartbeatMsg = content === Gc || Array.isArray(content) && content.some(block => block.type === "text" && (block.text === Gc || block.text === zR));
        if ((opts?.convertUserTextMessages || isHeartbeatMsg) && !hasToolResult) {
          if (typeof content === "string" || Array.isArray(content)) return {
            type: "message",
            message: B6({
              content: content,
              toolUseResult: msg.tool_use_result,
              uuid: msg.uuid,
              timestamp: msg.timestamp
            })
          };
        }
        return {
          type: "ignored"
        };
      }
    case "stream_event":
      return {
        type: "stream_event",
        event: adaptStreamEvent(msg)
      };
    case "result":
      {
        if (msg.subtype === "success") return {
          type: "ignored"
        };
        let adapted = adaptResultMessage(msg);
        return adapted ? {
          type: "message",
          message: adapted
        } : {
          type: "ignored"
        };
      }
    case "system":
      if (msg.subtype === "init") return {
        type: "message",
        message: adaptInitMessage(msg)
      };
      if (msg.subtype === "status") {
        if (msg.status === "requesting") return {
          type: "stream_event",
          event: {
            type: "stream_request_start"
          }
        };
        let adapted = adaptStatusMessage(msg);
        return adapted ? {
          type: "message",
          message: adapted
        } : {
          type: "ignored"
        };
      }
      if (msg.subtype === "compact_boundary") return {
        type: "message",
        message: adaptCompactBoundaryMessage(msg)
      };
      if (msg.subtype === "model_refusal_fallback") return {
        type: "message",
        message: {
          type: "system",
          subtype: "model_refusal_fallback",
          content: M1(msg.content),
          level: "warning",
          trigger: msg.trigger,
          direction: msg.direction,
          originalModel: msg.original_model,
          fallbackModel: msg.fallback_model,
          requestId: msg.request_id,
          apiRefusalCategory: msg.api_refusal_category ?? null,
          apiRefusalExplanation: msg.api_refusal_explanation ?? null,
          ...(msg.retracted_message_uuids !== undefined && {
            retractedMessageUuids: msg.retracted_message_uuids
          }),
          isMeta: false,
          uuid: msg.uuid,
          timestamp: new Date().toISOString()
        }
      };
      if (msg.subtype === "model_fallback") return {
        type: "message",
        message: {
          type: "system",
          subtype: "model_fallback",
          content: M1(msg.content),
          level: "warning",
          trigger: msg.trigger,
          originalModel: msg.original_model,
          fallbackModel: msg.fallback_model,
          isMeta: false,
          uuid: msg.uuid,
          timestamp: new Date().toISOString()
        }
      };
      if (msg.subtype === "model_consent_fallback") return {
        type: "message",
        message: {
          type: "system",
          subtype: "model_consent_fallback",
          content: M1(msg.content),
          level: "warning",
          choice: msg.choice,
          originalModel: msg.original_model,
          fallbackModel: msg.fallback_model,
          persistedAsDefault: msg.persisted_as_default,
          isMeta: false,
          uuid: msg.uuid,
          timestamp: new Date().toISOString()
        }
      };
      if (msg.subtype === "informational") return {
        type: "message",
        message: {
          type: "system",
          subtype: "informational",
          content: M1(msg.content),
          level: msg.level,
          isMeta: false,
          uuid: msg.uuid,
          timestamp: new Date().toISOString(),
          ...(msg.tool_use_id && {
            toolUseID: msg.tool_use_id
          }),
          ...(msg.prevent_continuation && {
            preventContinuation: msg.prevent_continuation
          })
        }
      };
      if (msg.subtype === "permission_denied") {
        if (opts?.convertToolResults) return {
          type: "ignored"
        };
        let reasonSuffix = msg.decision_reason ? ` \u2014 ${msg.decision_reason}` : msg.decision_reason_type ? ` (${msg.decision_reason_type})` : "";
        return {
          type: "message",
          message: {
            type: "system",
            subtype: "informational",
            content: M1(`Permission denied: ${msg.tool_name}${reasonSuffix}`),
            level: "warning",
            uuid: msg.uuid,
            timestamp: new Date().toISOString(),
            toolUseID: msg.tool_use_id
          }
        };
      }
      if (msg.subtype === "local_command_output") return {
        type: "message",
        message: ej({
          content: M1(msg.content),
          uuid: () => msg.uuid
        })
      };
      return y(`[sdkMessageAdapter] Ignoring system message subtype: ${msg.subtype}`), {
        type: "ignored"
      };
    case "tool_progress":
      return {
        type: "message",
        message: adaptToolProgressMessage(msg)
      };
    case "auth_status":
      return y("[sdkMessageAdapter] Ignoring auth_status message"), {
        type: "ignored"
      };
    case "tool_use_summary":
      return y("[sdkMessageAdapter] Ignoring tool_use_summary message"), {
        type: "ignored"
      };
    case "rate_limit_event":
      return y("[sdkMessageAdapter] Ignoring rate_limit_event message"), {
        type: "ignored"
      };
    case "env_manager_log":
      {
        let rawContent = typeof msg.data?.content === "string" ? msg.data.content : typeof msg.message === "string" ? msg.message : null;
        if (rawContent === null) return y("[sdkMessageAdapter] env_manager_log without data.content/message \u2014 orchestrator wire change?", {
          level: "warn"
        }), {
          type: "env_log",
          message: ""
        };
        let lines = rawContent.split(/\r\n?|\n/),
          lastNonEmpty = "";
        for (let i = lines.length - 1; i >= 0; i--) if (lastNonEmpty = M1(lines[i]).trim(), lastNonEmpty !== "") break;
        return {
          type: "env_log",
          message: lastNonEmpty
        };
      }
    default:
      return y(`[sdkMessageAdapter] Unknown message type: ${msg.type}`), {
        type: "ignored"
      };
  }
}
function isResultMessage(msg) {
  return msg.type === "result";
}
var cQ_ = L(() => {
  UH();
  JhH();
  Aq();
});
export {isRealSdkMessage as oJl,adaptAssistantMessage as mUm,adaptStreamEvent as fUm,adaptResultMessage as hUm,adaptInitMessage as gUm,adaptStatusMessage as _Um,adaptToolProgressMessage as yUm,adaptCompactBoundaryMessage as TUm,adaptSdkMessage as _yt,isResultMessage as Xer,cQ_ as Qer};
