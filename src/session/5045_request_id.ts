// @ts-nocheck
import {Iot,SW} from "../telemetry/2793_consumer.ts";
import {uje,dje} from "../../vendor/m618.ts";
import {qt,tn} from "../config/0230_encoding.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {$E,Opt} from "../core/4189_input_tokens.ts";
import {nw} from "../../vendor/m2215.ts";
import {b} from "../../runtime.ts";
/**
 * REPL bridge: control-message ingress/egress between a transport and the REPL.
 *
 * Handles normalization of `requestId` -> `request_id`, classification of
 * control_request / control_response / SDK messages, echo/redelivery dedup,
 * and dispatch of control_request subtypes to their registered callbacks.
 */

/**
 * Normalize a message's camelCase `requestId` field (and a nested
 * `response.requestId`) into snake_case `request_id` in place.
 * Returns the same value it was given (non-objects pass through untouched).
 */
function IYn(message: any): any {
  if (message === null || typeof message !== "object") return message;
  let obj = message;
  if ("requestId" in obj && !("request_id" in obj)) obj.request_id = obj.requestId, delete obj.requestId;
  if ("response" in obj && obj.response !== null && typeof obj.response === "object") {
    let nestedResponse = obj.response;
    if ("requestId" in nestedResponse && !("request_id" in nestedResponse)) nestedResponse.request_id = nestedResponse.requestId, delete nestedResponse.requestId;
  }
  return message;
}

/**
 * Sanitize a list of supported dialog kinds: keep only non-empty strings up to
 * 64 chars, capped at the first 32 entries.
 */
function nSe(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(entry => typeof entry === "string" && entry.length > 0 && entry.length <= 64).slice(0, 32);
}

var $Gt = 32;

/** True if the value is an object carrying a string `type` discriminator. */
function J0o(value: any): boolean {
  return value !== null && typeof value === "object" && "type" in value && typeof value.type === "string";
}

/** True if the value is a `control_response` message with a `response` field. */
function zym(value: any): boolean {
  return value !== null && typeof value === "object" && "type" in value && value.type === "control_response" && "response" in value;
}

/** True if the value is a `control_request` message with `request_id` and `request`. */
function jym(value: any): boolean {
  return value !== null && typeof value === "object" && "type" in value && value.type === "control_request" && "request_id" in value && "request" in value;
}

/**
 * True if the SDK message should be forwarded: real user/assistant messages
 * (not virtual) and `local_command` system messages.
 */
function X0o(message: any): boolean {
  if ((message.type === "user" || message.type === "assistant") && message.isVirtual) return !1;
  return message.type === "user" || message.type === "assistant" || message.type === "system" && message.subtype === "local_command";
}

/**
 * Extract a slash-command-like token from the first text block of a message,
 * if any. Returns undefined when no parseable text is present.
 */
function YMl(message: any): any {
  if (!Iot(message)) return;
  let content = message.message.content,
    text;
  if (typeof content === "string") text = content;else for (let block of content) if (block.type === "text") {
    text = block.text;
    break;
  }
  if (!text) return;
  return uje(text) || void 0;
}

/**
 * Parse and route a raw inbound REPL message.
 * Dispatches control_response/control_request to their handlers, drops echoed
 * and re-delivered user messages, and forwards genuine inbound user messages.
 *
 * @param raw raw serialized message payload
 * @param echoUuids set of UUIDs we ourselves emitted (to ignore echoes)
 * @param inboundUuids set of UUIDs already delivered inbound (to ignore re-delivery)
 * @param onUserMessage handler for genuine inbound user messages
 * @param onControlResponse handler for control_response messages
 * @param onControlRequest handler for control_request messages
 */
function JMl(
  raw: unknown,
  echoUuids: Set<string>,
  inboundUuids: Set<string>,
  onUserMessage?: (msg: any) => void,
  onControlResponse?: (msg: any) => void,
  onControlRequest?: (msg: any) => void,
): void {
  try {
    let message = IYn(qt(raw));
    if (zym(message)) {
      A("[bridge:repl] Ingress message type=control_response"), onControlResponse?.(message);
      return;
    }
    if (jym(message)) {
      A(`[bridge:repl] Inbound control_request subtype=${message.request.subtype}`), onControlRequest?.(message);
      return;
    }
    if (!J0o(message)) return;
    let uuid = "uuid" in message && typeof message.uuid === "string" ? message.uuid : void 0;
    if (uuid && echoUuids.has(uuid)) {
      A(`[bridge:repl] Ignoring echo: type=${message.type} uuid=${uuid}`);
      return;
    }
    if (uuid && inboundUuids.has(uuid)) {
      A(`[bridge:repl] Ignoring re-delivered inbound: type=${message.type} uuid=${uuid}`);
      return;
    }
    if (A(`[bridge:repl] Ingress message type=${message.type}${uuid ? ` uuid=${uuid}` : ""}`), message.type === "user") {
      if (uuid) inboundUuids.add(uuid);
      W("tengu_bridge_message_received", {
        is_repl: !0
      }), He("bridge_message_receive"), onUserMessage?.(message);
    } else A(`[bridge:repl] Ignoring non-user inbound message: type=${message.type}`);
  } catch (err) {
    A(`[bridge:repl] Failed to parse ingress message: ${Ce(err)}`), xe("bridge_message_receive", "bridge_message_receive_parse_failed");
  }
}

/**
 * Handle a single inbound control_request: invoke the matching registered
 * callback for its subtype, build the appropriate control_response, and write
 * it back to the transport. Async subtypes (file_suggestions, read_file,
 * usage queries, mcp_*) write their response directly and return early.
 */
function XMl(controlRequest: any, handlers: any): void {
  let {
    transport,
    sessionId,
    outboundOnly,
    getInitializeState,
    onInterrupt,
    onDialogKindsDeclared,
    onSetModel,
    onSetMaxThinkingTokens,
    onSetPermissionMode,
    onRenameSession,
    onSetColor,
    onFileSuggestions,
    onReadFile,
    onGetContextUsage,
    onGetUsage,
    onMcpAuthenticate,
    onMcpOauthCallbackUrl,
    onMcpReconnect,
    onMcpStatus
  } = handlers;
  if (!transport) {
    A("[bridge:repl] Cannot respond to control_request: transport not configured");
    return;
  }
  let response;
  if (outboundOnly && controlRequest.request.subtype !== "initialize") {
    response = {
      type: "control_response",
      response: {
        subtype: "error",
        request_id: controlRequest.request_id,
        error: Yym
      }
    };
    let rejectionEnvelope = {
      ...response,
      session_id: sessionId
    };
    transport.write(rejectionEnvelope), A(`[bridge:repl] Rejected ${controlRequest.request.subtype} (outbound-only) request_id=${controlRequest.request_id}`);
    return;
  }
  switch (controlRequest.request.subtype) {
    case "initialize":
      {
        try {
          let dialogKinds = nSe(controlRequest.request.supportedDialogKinds);
          if (dialogKinds.length > 0) onDialogKindsDeclared?.(dialogKinds);
        } catch (dialogErr) {
          A(`[bridge:repl] dialog-kind capture failed; acking initialize anyway: ${Ce(dialogErr)}`);
        }
        response = {
          type: "control_response",
          response: {
            subtype: "success",
            request_id: controlRequest.request_id,
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
        let result = onSetModel?.(controlRequest.request.model);
        if (result && !result.ok) response = {
          type: "control_response",
          response: {
            subtype: "error",
            request_id: controlRequest.request_id,
            error: result.error
          }
        };else response = {
          type: "control_response",
          response: {
            subtype: "success",
            request_id: controlRequest.request_id
          }
        };
        break;
      }
    case "set_max_thinking_tokens":
      onSetMaxThinkingTokens?.(controlRequest.request.max_thinking_tokens, controlRequest.request.thinking_display), response = {
        type: "control_response",
        response: {
          subtype: "success",
          request_id: controlRequest.request_id
        }
      };
      break;
    case "set_permission_mode":
      {
        let result = onSetPermissionMode?.(controlRequest.request.mode) ?? {
          ok: !1,
          error: "set_permission_mode is not supported in this context (onSetPermissionMode callback not registered)"
        };
        if (result.ok) response = {
          type: "control_response",
          response: {
            subtype: "success",
            request_id: controlRequest.request_id
          }
        };else response = {
          type: "control_response",
          response: {
            subtype: "error",
            request_id: controlRequest.request_id,
            error: result.error
          }
        };
        break;
      }
    case "rename_session":
      {
        let result = onRenameSession?.(controlRequest.request.title) ?? {
          ok: !1,
          error: "rename_session is not supported in this context (onRenameSession callback not registered)"
        };
        if (result.ok) response = {
          type: "control_response",
          response: {
            subtype: "success",
            request_id: controlRequest.request_id
          }
        };else response = {
          type: "control_response",
          response: {
            subtype: "error",
            request_id: controlRequest.request_id,
            error: result.error
          }
        };
        break;
      }
    case "set_color":
      {
        let result = onSetColor?.(controlRequest.request.color) ?? {
          ok: !1,
          error: "set_color is not supported in this context (onSetColor callback not registered)"
        };
        if (result.ok) response = {
          type: "control_response",
          response: {
            subtype: "success",
            request_id: controlRequest.request_id
          }
        };else response = {
          type: "control_response",
          response: {
            subtype: "error",
            request_id: controlRequest.request_id,
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
              request_id: controlRequest.request_id,
              error: "file_suggestions is not supported in this context (onFileSuggestions callback not registered)"
            }
          };
          break;
        }
        onFileSuggestions(controlRequest.request.query).then(suggestions => ({
          type: "control_response",
          response: {
            subtype: "success",
            request_id: controlRequest.request_id,
            response: {
              suggestions: suggestions
            }
          }
        })).catch(suggestErr => ({
          type: "control_response",
          response: {
            subtype: "error",
            request_id: controlRequest.request_id,
            error: Ce(suggestErr)
          }
        })).then(asyncResponse => {
          let envelope = {
            ...asyncResponse,
            session_id: sessionId
          };
          transport.write(envelope), A(`[bridge:repl] Sent control_response for file_suggestions request_id=${controlRequest.request_id} result=${asyncResponse.response.subtype}`);
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
              request_id: controlRequest.request_id,
              error: "read_file is not supported in this context (onReadFile callback not registered)"
            }
          };
          break;
        }
        onReadFile(controlRequest.request.path, controlRequest.request.max_bytes, controlRequest.request.encoding).then(fileResult => ({
          type: "control_response",
          response: {
            subtype: "success",
            request_id: controlRequest.request_id,
            response: fileResult
          }
        })).catch(readErr => ({
          type: "control_response",
          response: {
            subtype: "error",
            request_id: controlRequest.request_id,
            error: Ce(readErr)
          }
        })).then(asyncResponse => {
          let envelope = {
            ...asyncResponse,
            session_id: sessionId
          };
          transport.write(envelope), A(`[bridge:repl] Sent control_response for read_file request_id=${controlRequest.request_id} result=${asyncResponse.response.subtype}`);
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
              request_id: controlRequest.request_id,
              error: "get_context_usage is not supported in this context (onGetContextUsage callback not registered)"
            }
          };
          break;
        }
        onGetContextUsage().then(usage => ({
          type: "control_response",
          response: {
            subtype: "success",
            request_id: controlRequest.request_id,
            response: {
              ...usage
            }
          }
        })).catch(usageErr => ({
          type: "control_response",
          response: {
            subtype: "error",
            request_id: controlRequest.request_id,
            error: Ce(usageErr)
          }
        })).then(asyncResponse => {
          let envelope = {
            ...asyncResponse,
            session_id: sessionId
          };
          transport.write(envelope), A(`[bridge:repl] Sent control_response for get_context_usage request_id=${controlRequest.request_id} result=${asyncResponse.response.subtype}`);
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
              request_id: controlRequest.request_id,
              error: "get_usage is not supported in this context (onGetUsage callback not registered)"
            }
          };
          break;
        }
        onGetUsage().then(usage => ({
          type: "control_response",
          response: {
            subtype: "success",
            request_id: controlRequest.request_id,
            response: {
              ...usage
            }
          }
        })).catch(usageErr => ({
          type: "control_response",
          response: {
            subtype: "error",
            request_id: controlRequest.request_id,
            error: Ce(usageErr)
          }
        })).then(asyncResponse => {
          let envelope = {
            ...asyncResponse,
            session_id: sessionId
          };
          transport.write(envelope), A(`[bridge:repl] Sent control_response for get_usage request_id=${controlRequest.request_id} result=${asyncResponse.response.subtype}`);
        });
        return;
      }
    case "mcp_status":
      response = {
        type: "control_response",
        response: {
          subtype: "success",
          request_id: controlRequest.request_id,
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
        let mcpRequest = controlRequest.request,
          {
            subtype: mcpSubtype,
            serverName: mcpServerName
          } = mcpRequest,
          mcpHandler = mcpRequest.subtype === "mcp_authenticate" ? onMcpAuthenticate && (server => onMcpAuthenticate(server, mcpRequest.redirectUri)) : mcpRequest.subtype === "mcp_oauth_callback_url" ? onMcpOauthCallbackUrl && (server => onMcpOauthCallbackUrl(server, mcpRequest.callbackUrl)) : onMcpReconnect;
        if (!mcpHandler) {
          response = {
            type: "control_response",
            response: {
              subtype: "error",
              request_id: controlRequest.request_id,
              error: `${mcpSubtype} is not supported in this context (callback not registered)`
            }
          };
          break;
        }
        mcpHandler(mcpServerName).then(mcpResult => ({
          type: "control_response",
          response: {
            subtype: "success",
            request_id: controlRequest.request_id,
            response: mcpResult ?? {}
          }
        })).catch(mcpErr => ({
          type: "control_response",
          response: {
            subtype: "error",
            request_id: controlRequest.request_id,
            error: Ce(mcpErr)
          }
        })).then(asyncResponse => {
          let envelope = {
            ...asyncResponse,
            session_id: sessionId
          };
          transport.write(envelope), A(`[bridge:repl] Sent control_response for ${mcpSubtype} request_id=${controlRequest.request_id} result=${asyncResponse.response.subtype}`);
        });
        return;
      }
    case "interrupt":
      onInterrupt?.(), response = {
        type: "control_response",
        response: {
          subtype: "success",
          request_id: controlRequest.request_id
        }
      };
      break;
    default:
      response = {
        type: "control_response",
        response: {
          subtype: "error",
          request_id: controlRequest.request_id,
          error: `REPL bridge does not handle control_request subtype: ${controlRequest.request.subtype}`
        }
      };
  }
  let envelope = {
    ...response,
    session_id: sessionId
  };
  transport.write(envelope), A(`[bridge:repl] Sent control_response for ${controlRequest.request.subtype} request_id=${controlRequest.request_id} result=${response.response.subtype}`);
}

/** Build a synthetic terminal `result` (success) SDK message for a session. */
function Q0o(sessionId: string): any {
  return {
    type: "result",
    subtype: "success",
    duration_ms: 0,
    duration_api_ms: 0,
    is_error: !1,
    num_turns: 0,
    result: "",
    stop_reason: null,
    total_cost_usd: 0,
    usage: {
      ...$E
    },
    modelUsage: {},
    permission_denials: [],
    session_id: sessionId,
    uuid: qGt.randomUUID()
  };
}

/** Build a synthetic `worker_shutting_down` system SDK message. */
function QMl(sessionId: string, reason: any): any {
  return {
    type: "system",
    subtype: "worker_shutting_down",
    reason: reason,
    session_id: sessionId,
    uuid: qGt.randomUUID()
  };
}

/** Build a synthetic assistant SDK message carrying a single text block. */
function ZMl(text: string, sessionId: string): any {
  return {
    type: "assistant",
    message: {
      id: qGt.randomUUID(),
      container: null,
      model: nw,
      role: "assistant",
      stop_details: null,
      stop_reason: "stop_sequence",
      stop_sequence: "",
      type: "message",
      usage: {
        ...$E
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
    uuid: qGt.randomUUID()
  };
}

/**
 * Fixed-capacity ring buffer of seen UUIDs with O(1) membership, used for
 * echo / re-delivery deduplication. Adding past capacity evicts the oldest.
 */
class Bgt {
  capacity: number;
  ring: (string | undefined)[];
  set = new Set<string>();
  writeIdx = 0;
  constructor(capacity: number) {
    this.capacity = capacity, this.ring = Array(capacity);
  }
  add(value: string): void {
    if (this.set.has(value)) return;
    let evicted = this.ring[this.writeIdx];
    if (evicted !== void 0) this.set.delete(evicted);
    this.ring[this.writeIdx] = value, this.set.add(value), this.writeIdx = (this.writeIdx + 1) % this.capacity;
  }
  has(value: string): boolean {
    return this.set.has(value);
  }
  clear(): void {
    this.set.clear(), this.ring.fill(void 0), this.writeIdx = 0;
  }
}

var qGt: typeof import("crypto"),
  Yym = "This session is outbound-only. Enable Remote Control locally to allow inbound control.";
var WGt = b(() => {
  mn();
  kt();
  Opt();
  qe();
  dje();
  Ct();
  SW();
  tn();
  qGt = require("crypto");
});

export {IYn,nSe,$Gt as MAX_DECLARED_DIALOG_KINDS,J0o,zym,jym,X0o,YMl,JMl,XMl,Q0o,QMl,ZMl,Bgt,qGt,Yym,WGt};
