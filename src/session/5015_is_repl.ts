// @ts-nocheck
import {vnt as Elt,_q as Zle} from "../telemetry/2781_consumer.ts";
import {m7e as YVe,f7e as JVe} from "../../vendor/m612.ts";
import {MFn as ZBn} from "../permissions/3895_request_id.ts";
import {qt as Wt,Xt} from "../config/0228_encoding.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Ie as He,Oe as Pe,ln as cn} from "../telemetry/0594_feature_name.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {PE as xE,Lut as uut} from "../core/4176_input_tokens.ts";
import {WR as DH} from "../../vendor/m2207.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function filterValidDialogKinds(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter(item => typeof item === "string" && item.length > 0 && item.length <= 64).slice(0, 32);
}
var MAX_DECLARED_DIALOG_KINDS = 32;
function isTypedMessage(msg) {
  return msg !== null && typeof msg === "object" && "type" in msg && typeof msg.type === "string";
}
function isControlResponse(msg) {
  return msg !== null && typeof msg === "object" && "type" in msg && msg.type === "control_response" && "response" in msg;
}
function isControlRequest(msg) {
  return msg !== null && typeof msg === "object" && "type" in msg && msg.type === "control_request" && "request_id" in msg && "request" in msg;
}
function isReplLoggableMessage(msg) {
  if ((msg.type === "user" || msg.type === "assistant") && msg.isVirtual) return false;
  return msg.type === "user" || msg.type === "assistant" || msg.type === "system" && msg.subtype === "local_command";
}
function extractFirstPromptText(msg) {
  if (!Elt(msg)) return;
  let t = msg.message.content,
    content;
  if (typeof t === "string") content = t;else for (let o of t) if (o.type === "text") {
    content = o.text;
    break;
  }
  if (!content) return;
  return YVe(content) || undefined;
}
function handleIngressBridgeMessage(rawJson, echoedUuids, seenInboundUuids, onUserMessage, onControlResponse, onControlRequest) {
  try {
    let parsed = ZBn(Wt(rawJson));
    if (isControlResponse(parsed)) {
      v("[bridge:repl] Ingress message type=control_response"), onControlResponse?.(parsed);
      return;
    }
    if (isControlRequest(parsed)) {
      v(`[bridge:repl] Inbound control_request subtype=${parsed.request.subtype}`), onControlRequest?.(parsed);
      return;
    }
    if (!isTypedMessage(parsed)) return;
    let uuid = "uuid" in parsed && typeof parsed.uuid === "string" ? parsed.uuid : undefined;
    if (uuid && echoedUuids.has(uuid)) {
      v(`[bridge:repl] Ignoring echo: type=${parsed.type} uuid=${uuid}`);
      return;
    }
    if (uuid && seenInboundUuids.has(uuid)) {
      v(`[bridge:repl] Ignoring re-delivered inbound: type=${parsed.type} uuid=${uuid}`);
      return;
    }
    if (v(`[bridge:repl] Ingress message type=${parsed.type}${uuid ? ` uuid=${uuid}` : ""}`), parsed.type === "user") {
      if (uuid) seenInboundUuids.add(uuid);
      j("tengu_bridge_message_received", {
        is_repl: true
      }), He("bridge_message_receive"), onUserMessage?.(parsed);
    } else v(`[bridge:repl] Ignoring non-user inbound message: type=${parsed.type}`);
  } catch (err) {
    v(`[bridge:repl] Failed to parse ingress message: ${Se(err)}`), Pe("bridge_message_receive", "bridge_message_receive_parse_failed");
  }
}
function handleControlRequest(request, opts) {
  let {
    transport: transport,
    sessionId: sessionId,
    outboundOnly: outboundOnly,
    getInitializeState: getInitializeState,
    onInterrupt: onInterrupt,
    onDialogKindsDeclared: onDialogKindsDeclared,
    onSetModel: onSetModel,
    onSetMaxThinkingTokens: onSetMaxThinkingTokens,
    onSetPermissionMode: onSetPermissionMode,
    onRenameSession: onRenameSession,
    onSetColor: onSetColor,
    onFileSuggestions: onFileSuggestions,
    onReadFile: onReadFile,
    onGetContextUsage: onGetContextUsage,
    onGetUsage: onGetUsage,
    onMcpAuthenticate: onMcpAuthenticate,
    onMcpOauthCallbackUrl: onMcpOauthCallbackUrl,
    onMcpReconnect: onMcpReconnect,
    onMcpStatus: onMcpStatus
  } = opts;
  if (!transport) {
    v("[bridge:repl] Cannot respond to control_request: transport not configured");
    return;
  }
  let response;
  if (outboundOnly && request.request.subtype !== "initialize") {
    response = {
      type: "control_response",
      response: {
        subtype: "error",
        request_id: request.request_id,
        error: OUTBOUND_ONLY_ERROR_MSG
      }
    };
    let outMsg = {
      ...response,
      session_id: sessionId
    };
    transport.write(outMsg), v(`[bridge:repl] Rejected ${request.request.subtype} (outbound-only) request_id=${request.request_id}`);
    return;
  }
  switch (request.request.subtype) {
    case "initialize":
      {
        try {
          let kinds = filterValidDialogKinds(request.request.supportedDialogKinds);
          if (kinds.length > 0) onDialogKindsDeclared?.(kinds);
        } catch (err) {
          v(`[bridge:repl] dialog-kind capture failed; acking initialize anyway: ${Se(err)}`);
        }
        response = {
          type: "control_response",
          response: {
            subtype: "success",
            request_id: request.request_id,
            response: {
              commands: [],
              agents: [],
              output_style: "normal",
              available_output_styles: ["normal"],
              models: [],
              account: {},
              pid: process.pid,
              ...getInitializeState?.()
            }
          }
        };
        break;
      }
    case "set_model":
      {
        let result = onSetModel?.(request.request.model);
        if (result && !result.ok) response = {
          type: "control_response",
          response: {
            subtype: "error",
            request_id: request.request_id,
            error: result.error
          }
        };else response = {
          type: "control_response",
          response: {
            subtype: "success",
            request_id: request.request_id
          }
        };
        break;
      }
    case "set_max_thinking_tokens":
      onSetMaxThinkingTokens?.(request.request.max_thinking_tokens, request.request.thinking_display), response = {
        type: "control_response",
        response: {
          subtype: "success",
          request_id: request.request_id
        }
      };
      break;
    case "set_permission_mode":
      {
        let result = onSetPermissionMode?.(request.request.mode) ?? {
          ok: false,
          error: "set_permission_mode is not supported in this context (onSetPermissionMode callback not registered)"
        };
        if (result.ok) response = {
          type: "control_response",
          response: {
            subtype: "success",
            request_id: request.request_id
          }
        };else response = {
          type: "control_response",
          response: {
            subtype: "error",
            request_id: request.request_id,
            error: result.error
          }
        };
        break;
      }
    case "rename_session":
      {
        let result = onRenameSession?.(request.request.title) ?? {
          ok: false,
          error: "rename_session is not supported in this context (onRenameSession callback not registered)"
        };
        if (result.ok) response = {
          type: "control_response",
          response: {
            subtype: "success",
            request_id: request.request_id
          }
        };else response = {
          type: "control_response",
          response: {
            subtype: "error",
            request_id: request.request_id,
            error: result.error
          }
        };
        break;
      }
    case "set_color":
      {
        let result = onSetColor?.(request.request.color) ?? {
          ok: false,
          error: "set_color is not supported in this context (onSetColor callback not registered)"
        };
        if (result.ok) response = {
          type: "control_response",
          response: {
            subtype: "success",
            request_id: request.request_id
          }
        };else response = {
          type: "control_response",
          response: {
            subtype: "error",
            request_id: request.request_id,
            error: result.error
          }
        };
        break;
      }
    case "file_suggestions":
      {
        if (!onFileSuggestions) {
          response = {
            type: "control_response",
            response: {
              subtype: "error",
              request_id: request.request_id,
              error: "file_suggestions is not supported in this context (onFileSuggestions callback not registered)"
            }
          };
          break;
        }
        onFileSuggestions(request.request.query).then(suggestions => ({
          type: "control_response",
          response: {
            subtype: "success",
            request_id: request.request_id,
            response: {
              suggestions: suggestions
            }
          }
        })).catch(err => ({
          type: "control_response",
          response: {
            subtype: "error",
            request_id: request.request_id,
            error: Se(err)
          }
        })).then(resp => {
          let outMsg = {
            ...resp,
            session_id: sessionId
          };
          transport.write(outMsg), v(`[bridge:repl] Sent control_response for file_suggestions request_id=${request.request_id} result=${resp.response.subtype}`);
        });
        return;
      }
    case "read_file":
      {
        if (!onReadFile) {
          response = {
            type: "control_response",
            response: {
              subtype: "error",
              request_id: request.request_id,
              error: "read_file is not supported in this context (onReadFile callback not registered)"
            }
          };
          break;
        }
        onReadFile(request.request.path, request.request.max_bytes, request.request.encoding).then(data => ({
          type: "control_response",
          response: {
            subtype: "success",
            request_id: request.request_id,
            response: data
          }
        })).catch(err => ({
          type: "control_response",
          response: {
            subtype: "error",
            request_id: request.request_id,
            error: Se(err)
          }
        })).then(resp => {
          let outMsg = {
            ...resp,
            session_id: sessionId
          };
          transport.write(outMsg), v(`[bridge:repl] Sent control_response for read_file request_id=${request.request_id} result=${resp.response.subtype}`);
        });
        return;
      }
    case "get_context_usage":
      {
        if (!onGetContextUsage) {
          response = {
            type: "control_response",
            response: {
              subtype: "error",
              request_id: request.request_id,
              error: "get_context_usage is not supported in this context (onGetContextUsage callback not registered)"
            }
          };
          break;
        }
        onGetContextUsage().then(data => ({
          type: "control_response",
          response: {
            subtype: "success",
            request_id: request.request_id,
            response: {
              ...data
            }
          }
        })).catch(err => ({
          type: "control_response",
          response: {
            subtype: "error",
            request_id: request.request_id,
            error: Se(err)
          }
        })).then(resp => {
          let outMsg = {
            ...resp,
            session_id: sessionId
          };
          transport.write(outMsg), v(`[bridge:repl] Sent control_response for get_context_usage request_id=${request.request_id} result=${resp.response.subtype}`);
        });
        return;
      }
    case "get_usage":
      {
        if (!onGetUsage) {
          response = {
            type: "control_response",
            response: {
              subtype: "error",
              request_id: request.request_id,
              error: "get_usage is not supported in this context (onGetUsage callback not registered)"
            }
          };
          break;
        }
        onGetUsage().then(data => ({
          type: "control_response",
          response: {
            subtype: "success",
            request_id: request.request_id,
            response: {
              ...data
            }
          }
        })).catch(err => ({
          type: "control_response",
          response: {
            subtype: "error",
            request_id: request.request_id,
            error: Se(err)
          }
        })).then(resp => {
          let outMsg = {
            ...resp,
            session_id: sessionId
          };
          transport.write(outMsg), v(`[bridge:repl] Sent control_response for get_usage request_id=${request.request_id} result=${resp.response.subtype}`);
        });
        return;
      }
    case "mcp_status":
      response = {
        type: "control_response",
        response: {
          subtype: "success",
          request_id: request.request_id,
          response: {
            mcpServers: onMcpStatus?.() ?? []
          }
        }
      };
      break;
    case "mcp_authenticate":
    case "mcp_oauth_callback_url":
    case "mcp_reconnect":
      {
        let req = request.request,
          {
            subtype: subtypeStr,
            serverName: serverName
          } = req,
          callbackFn = req.subtype === "mcp_authenticate" ? onMcpAuthenticate && (s => onMcpAuthenticate(s, req.redirectUri)) : req.subtype === "mcp_oauth_callback_url" ? onMcpOauthCallbackUrl && (s => onMcpOauthCallbackUrl(s, req.callbackUrl)) : onMcpReconnect;
        if (!callbackFn) {
          response = {
            type: "control_response",
            response: {
              subtype: "error",
              request_id: request.request_id,
              error: `${subtypeStr} is not supported in this context (callback not registered)`
            }
          };
          break;
        }
        callbackFn(serverName).then(result => ({
          type: "control_response",
          response: {
            subtype: "success",
            request_id: request.request_id,
            response: result ?? {}
          }
        })).catch(err => ({
          type: "control_response",
          response: {
            subtype: "error",
            request_id: request.request_id,
            error: Se(err)
          }
        })).then(resp => {
          let outMsg = {
            ...resp,
            session_id: sessionId
          };
          transport.write(outMsg), v(`[bridge:repl] Sent control_response for ${subtypeStr} request_id=${request.request_id} result=${resp.response.subtype}`);
        });
        return;
      }
    case "interrupt":
      onInterrupt?.(), response = {
        type: "control_response",
        response: {
          subtype: "success",
          request_id: request.request_id
        }
      };
      break;
    default:
      response = {
        type: "control_response",
        response: {
          subtype: "error",
          request_id: request.request_id,
          error: `REPL bridge does not handle control_request subtype: ${request.request.subtype}`
        }
      };
  }
  let outMsg = {
    ...response,
    session_id: sessionId
  };
  transport.write(outMsg), v(`[bridge:repl] Sent control_response for ${request.request.subtype} request_id=${request.request_id} result=${response.response.subtype}`);
}
function buildSuccessResultMessage(sessionId) {
  return {
    type: "result",
    subtype: "success",
    duration_ms: 0,
    duration_api_ms: 0,
    is_error: false,
    num_turns: 0,
    result: "",
    stop_reason: null,
    total_cost_usd: 0,
    usage: {
      ...xE
    },
    modelUsage: {},
    permission_denials: [],
    session_id: sessionId,
    uuid: cryptoModule.randomUUID()
  };
}
function buildWorkerShuttingDownMessage(sessionId, reason) {
  return {
    type: "system",
    subtype: "worker_shutting_down",
    reason: reason,
    session_id: sessionId,
    uuid: cryptoModule.randomUUID()
  };
}
function buildAssistantTextMessage(text, sessionId) {
  return {
    type: "assistant",
    message: {
      id: cryptoModule.randomUUID(),
      container: null,
      model: DH,
      role: "assistant",
      stop_details: null,
      stop_reason: "stop_sequence",
      stop_sequence: "",
      type: "message",
      usage: {
        ...xE
      },
      content: [{
        type: "text",
        text: text,
        citations: null
      }],
      context_management: null
    },
    parent_tool_use_id: null,
    session_id: sessionId,
    uuid: cryptoModule.randomUUID()
  };
}
class RingDedupeSet {
  capacity;
  ring;
  set = new Set();
  writeIdx = 0;
  constructor(capacity) {
    this.capacity = capacity, this.ring = Array(capacity);
  }
  add(uuid) {
    if (this.set.has(uuid)) return;
    let evicted = this.ring[this.writeIdx];
    if (evicted !== undefined) this.set.delete(evicted);
    this.ring[this.writeIdx] = uuid, this.set.add(uuid), this.writeIdx = (this.writeIdx + 1) % this.capacity;
  }
  has(uuid) {
    return this.set.has(uuid);
  }
  clear() {
    this.set.clear(), this.ring.fill(undefined), this.writeIdx = 0;
  }
}
var cryptoModule,
  OUTBOUND_ONLY_ERROR_MSG = "This session is outbound-only. Enable Remote Control locally to allow inbound control.";
var JF_ = b(() => {
  cn();
  Ct();
  uut();
  je();
  JVe();
  St();
  Zle();
  Xt();
  cryptoModule = require("crypto");
});

export {filterValidDialogKinds as Rye,MAX_DECLARED_DIALOG_KINDS,isTypedMessage as Bwo,isControlResponse as Lcm,isControlRequest as Mcm,isReplLoggableMessage as Fwo,extractFirstPromptText as xkl,handleIngressBridgeMessage as kkl,handleControlRequest as Hkl,buildSuccessResultMessage as Uwo,buildWorkerShuttingDownMessage as Ikl,buildAssistantTextMessage as Dkl,RingDedupeSet as Eft,cryptoModule as b8t,OUTBOUND_ONLY_ERROR_MSG as Ncm,JF_ as E8t};
