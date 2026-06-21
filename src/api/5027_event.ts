// @ts-nocheck
import {PMe as fMe,SB as pB,coe as Qre,bR as SR,fp as Ap,xpe as cpe,Cbt as ZSt,HMe as dMe,initKp as Dp} from "../../vendor/m609.ts";
import {nZ as VQ} from "../../vendor/m2207.ts";
import {bte as dte,vlt as rlt} from "../../vendor/m3882.ts";
import {Dl as Ol,lo} from "../tools/5190_userPromptCount.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {getOauthConfig as Is,Dc as Hc} from "./0459_getOauthConfig.ts";
import {getProxyFetchOptions as sT,Z_} from "../config/1021_shouldBypassProxyWithCidr.ts";
import {isTmuxControlMode as Bt,Oe as Pe,Ie as He,ln as cn} from "../telemetry/0594_feature_name.ts";
import {Se,_o,bt as St} from "../../vendor/m195.ts";
import {qt as Wt,Le as Oe,Xt} from "../config/0228_encoding.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {getClientPlatform as qx,tg as Yh} from "../config/0048_ISSUES_EXPLAINER.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function uB_(rawText) {
  let frames = [],
    pos = 0,
    boundaryIdx;
  while ((boundaryIdx = rawText.indexOf(`

`, pos)) !== -1) {
    let chunk = rawText.slice(pos, boundaryIdx);
    if (pos = boundaryIdx + 2, !chunk.trim()) continue;
    let frame = {},
      hasComment = false;
    for (let line of chunk.split(`
`)) {
      if (line.startsWith(":")) {
        hasComment = true;
        continue;
      }
      let colonIdx = line.indexOf(":");
      if (colonIdx === -1) continue;
      let fieldName = line.slice(0, colonIdx),
        fieldValue = line[colonIdx + 1] === " " ? line.slice(colonIdx + 2) : line.slice(colonIdx + 1);
      switch (fieldName) {
        case "event":
          frame.event = fieldValue;
          break;
        case "id":
          frame.id = fieldValue;
          break;
        case "data":
          frame.data = frame.data ? frame.data + `
` + fieldValue : fieldValue;
          break;
      }
    }
    if (frame.data || hasComment) frames.push(frame);
  }
  return {
    frames: frames,
    remaining: rawText.slice(pos)
  };
}
function zX4(text) {
  if (text.startsWith("<bash-stdout") || text.startsWith("<bash-stderr") || text.startsWith("<local-command-stdout") || text.startsWith("<local-command-stderr") || text.startsWith(fMe) || text.startsWith(`<${pB} `) || text.startsWith(`<${pB}>`)) return true;
  if ((text.startsWith(VQ) || text.startsWith(dte)) && text.startsWith("<", text.indexOf(`
`) + 1)) return true;
  if (Ol(text, Qre) !== null) return true;
  return text.includes("<bash-input>") || text.includes(`<${SR}>`) || text.includes("<user-memory-input>") || text.includes(`<${Ap}`) || text.includes("<mcp-resource-update") || text.includes("<mcp-polling-update") || text.includes(`<${cpe}>`) || text.includes(`<${ZSt}`) || text.includes(`<${dMe}>`);
}
function AX4(payload) {
  if (payload.tool_use_result !== undefined) return true;
  let content = payload.message?.content;
  if (typeof content === "string") return zX4(content);
  return Array.isArray(content) && content.some(block => typeof block === "object" && block !== null && "type" in block && (block.type === "tool_result" || block.type === "text" && "text" in block && typeof block.text === "string" && zX4(block.text)));
}
function $X4(value) {
  return typeof value === "object" && value !== null && "type" in value && typeof value.type === "string";
}
function J6T(event) {
  if (!("type" in event)) return true;
  switch (event.type) {
    case "message_start":
      {
        if (!("message" in event)) return false;
        let msg = event.message;
        return typeof msg === "object" && msg !== null && "id" in msg && typeof msg.id === "string";
      }
    case "content_block_start":
      {
        if (!("content_block" in event) || typeof event.content_block !== "object" || event.content_block === null) return false;
        let block = event.content_block;
        if ("type" in block && block.type === "tool_use") return "id" in block && typeof block.id === "string" && "name" in block && typeof block.name === "string";
        return true;
      }
    case "content_block_delta":
      {
        if (!("delta" in event)) return false;
        let delta = event.delta;
        if (typeof delta !== "object" || delta === null) return false;
        if (!("type" in delta)) return true;
        switch (delta.type) {
          case "text_delta":
            return "text" in delta && typeof delta.text === "string";
          case "input_json_delta":
            return "partial_json" in delta && typeof delta.partial_json === "string";
          case "signature_delta":
            return "signature" in delta && typeof delta.signature === "string";
          default:
            return true;
        }
      }
    default:
      return true;
  }
}
class WDq {
  sessionId;
  orgUuid;
  getAccessToken;
  callbacks;
  onAuth401;
  state = "idle";
  abortController = null;
  reconnectAttempts = 0;
  exhaustedBudget = false;
  reconnectTimer = null;
  livenessTimer = null;
  driftTimer = null;
  lastDriftCheck = 0;
  lastSequenceNum = 0;
  issuedRequestIds = new Set();
  constructor(sessionId, orgUuid, getAccessToken, callbacks, onAuth401) {
    this.sessionId = sessionId;
    this.orgUuid = orgUuid;
    this.getAccessToken = getAccessToken;
    this.callbacks = callbacks;
    this.onAuth401 = onAuth401;
  }
  async connect() {
    if (this.state === "connecting" || this.state === "connected") {
      v("[SessionsV2Client] Already connecting/connected");
      return;
    }
    this.state = "connecting";
    let url = new URL(`${Is().BASE_API_URL}/v1/code/sessions/${this.sessionId}/events/stream`);
    if (this.lastSequenceNum > 0) url.searchParams.set("from_sequence_num", String(this.lastSequenceNum));
    let headers = {
      ...this.authHeaders(),
      Accept: "text/event-stream"
    };
    if (this.lastSequenceNum > 0) headers["Last-Event-ID"] = String(this.lastSequenceNum);
    v(`[SessionsV2Client] Connecting to ${url.href} (from_sequence_num=${this.lastSequenceNum})`), this.abortController = new AbortController(), this.readStream(url, headers, this.abortController);
  }
  async readStream(url, headers, abortCtrl) {
    let response,
      timedOut = false,
      connectTimeoutId = setTimeout(() => {
        timedOut = true, abortCtrl.abort();
      }, TX4);
    try {
      response = await fetch(url.href, {
        method: "GET",
        headers: headers,
        signal: abortCtrl.signal,
        ...sT({
          url: url.href
        })
      }), clearTimeout(connectTimeoutId);
    } catch (err) {
      if (clearTimeout(connectTimeoutId), timedOut) {
        v(`[SessionsV2Client] Connect timed out after ${TX4}ms, reconnecting`, {
          level: "error"
        }), Bt("remote_connect", "remote_connect_timeout"), this.handleStreamEnd();
        return;
      }
      if (abortCtrl.signal.aborted) return;
      v(`[SessionsV2Client] Connect error: ${Se(err)}`, {
        level: "error"
      }), Bt("remote_connect", "remote_connect_request_failed"), this.callbacks.onError?.(_o(err)), this.handleStreamEnd();
      return;
    }
    if (!response.ok || !response.body) {
      if (v(`[SessionsV2Client] HTTP ${response.status} on SSE connect`, {
        level: "error"
      }), response.body?.cancel(), response.status === 401 && this.onAuth401) {
        v("[SessionsV2Client] 401 on SSE connect \u2014 refreshing"), Pe("remote_connect", "remote_connect_auth_401"), await this.onAuth401(this.getAccessToken()), this.handleStreamEnd();
        return;
      }
      if (w6T.has(response.status)) {
        Pe("remote_connect", "remote_connect_permanent_failure"), this.state = "closed", this.callbacks.onClose?.();
        return;
      }
      Bt("remote_connect", "remote_connect_http_error"), this.handleStreamEnd();
      return;
    }
    this.state = "connected", this.reconnectAttempts = 0, this.resetLivenessTimer(), this.startDriftWatch(), v("[SessionsV2Client] Connected"), He("remote_connect"), this.callbacks.onConnected?.();
    let reader = response.body.getReader(),
      decoder = new TextDecoder(),
      buffer = "";
    try {
      while (true) {
        let {
          done: done,
          value: value
        } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, j6T);
        let {
          frames: frames,
          remaining: remaining
        } = uB_(buffer);
        buffer = remaining;
        for (let frame of frames) if (this.resetLivenessTimer(), frame.event && frame.data) this.handleFrame(frame.event, frame.id, frame.data);
      }
    } catch (err) {
      if (abortCtrl.signal.aborted) return;
      v(`[SessionsV2Client] Stream read error: ${Se(err)}`, {
        level: "error"
      }), Bt("remote_connect", "remote_connect_stream_error");
    } finally {
      reader.releaseLock();
    }
    if (!abortCtrl.signal.aborted) v("[SessionsV2Client] Stream ended"), this.handleStreamEnd();
  }
  handleFrame(eventType, eventId, rawData) {
    let parsed;
    try {
      parsed = Wt(rawData);
    } catch (err) {
      Ie(Error(`[SessionsV2Client] Failed to parse ${eventType} frame: ${Se(err)}`)), Bt("remote_connect", "remote_connect_frame_parse_failed");
      return;
    }
    switch (eventType) {
      case "client_event":
        {
          let clientEvent = parsed,
            seqNum = parseInt(eventId ?? String(clientEvent.sequence_num), 10);
          if (!isNaN(seqNum) && seqNum > this.lastSequenceNum) this.lastSequenceNum = seqNum;
          if (!$X4(clientEvent.payload)) {
            v(`[SessionsV2Client] Dropping client_event with no payload.type (event_type=${clientEvent.event_type})`);
            return;
          }
          if (clientEvent.payload.type === "control_response") {
            let {
              response: controlResp
            } = clientEvent.payload;
            if (!controlResp || typeof controlResp !== "object" || typeof controlResp.request_id !== "string") {
              v(`[SessionsV2Client] Dropping malformed control_response from source=${clientEvent.source}`, {
                level: "warn"
              });
              return;
            }
          }
          if (clientEvent.payload.type === "user") {
            if (clientEvent.source !== "worker" && AX4(clientEvent.payload)) {
              v(`[SessionsV2Client] Dropping worker-output-shaped user frame from source=${clientEvent.source} \u2014 only the worker produces tool results and execution output`, {
                level: "warn"
              });
              return;
            }
            let contentBlocks = clientEvent.payload.message?.content;
            if (Array.isArray(contentBlocks) && !contentBlocks.every(block => typeof block === "object" && block !== null && (block.type !== "text" || typeof block.text === "string"))) {
              v(`[SessionsV2Client] Dropping user frame with malformed content from source=${clientEvent.source}`, {
                level: "warn"
              });
              return;
            }
          }
          if (clientEvent.source !== "worker") {
            if (clientEvent.payload.type === "control_response") {
              if (this.issuedRequestIds.has(clientEvent.payload.response.request_id)) {
                v(`[SessionsV2Client] Dropping control_response for this client's request_id from source=${clientEvent.source} \u2014 only the worker may answer our RPCs`, {
                  level: "warn"
                });
                return;
              }
              if (clientEvent.payload.response.pending_user_dialog_requests || clientEvent.payload.response.pending_permission_requests) {
                v(`[SessionsV2Client] Stripping prompt-redelivery fields from control_response with source=${clientEvent.source}`);
                let {
                  pending_user_dialog_requests: _pendingDialogs,
                  pending_permission_requests: _pendingPerms,
                  ...strippedResponse
                } = clientEvent.payload.response;
                this.callbacks.onMessage({
                  ...clientEvent.payload,
                  response: strippedResponse
                });
                return;
              }
            } else if (!YX4.has(clientEvent.payload.type)) {
              v(`[SessionsV2Client] Dropping ${clientEvent.payload.type} from source=${clientEvent.source}`);
              return;
            }
          } else if (clientEvent.payload.type === "control_response") this.issuedRequestIds.delete(clientEvent.payload.response.request_id);
          this.callbacks.onMessage(clientEvent.payload);
          return;
        }
      case "ephemeral_event":
        {
          let ephemeralEvent = parsed;
          if ($X4(ephemeralEvent.payload)) {
            if (ephemeralEvent.payload.type === "system" && ephemeralEvent.payload.subtype === "thinking_tokens") {
              this.callbacks.onMessage({
                type: "system",
                subtype: "thinking_tokens",
                estimated_tokens: ephemeralEvent.payload.estimated_tokens,
                estimated_tokens_delta: ephemeralEvent.payload.estimated_tokens_delta,
                uuid: ephemeralEvent.payload.uuid,
                session_id: ephemeralEvent.payload.session_id
              });
              return;
            }
            if (ephemeralEvent.payload.type !== "stream_event") {
              v(`[SessionsV2Client] Dropping ${ephemeralEvent.payload.type} on ephemeral channel`);
              return;
            }
            if (typeof ephemeralEvent.payload.event !== "object" || ephemeralEvent.payload.event === null || !J6T(ephemeralEvent.payload.event)) {
              v("[SessionsV2Client] Dropping malformed stream_event on ephemeral channel", {
                level: "warn"
              });
              return;
            }
            this.callbacks.onMessage(ephemeralEvent.payload);
          }
          return;
        }
      case "catch_up_truncated":
        v("[SessionsV2Client] catch_up_truncated \u2014 transcript gap"), Bt("remote_connect", "remote_catch_up_truncated"), this.callbacks.onCatchUpTruncated?.();
        return;
      case "session_update":
      case "delivery_update":
        v(`[SessionsV2Client] Ignoring ${eventType} frame`);
        return;
      default:
        v(`[SessionsV2Client] Unknown SSE event type '${eventType}'`, {
          level: "warn"
        });
        return;
    }
  }
  handleStreamEnd() {
    if (this.clearLivenessTimer(), this.clearDriftWatch(), this.state === "closed") return;
    if (this.abortController = null, this.reconnectAttempts >= PDq) {
      v(`[SessionsV2Client] Reconnect budget exhausted (${PDq}), closing`), Pe("remote_connect", "remote_connect_reconnect_exhausted"), this.state = "closed", this.exhaustedBudget = true, this.callbacks.onClose?.();
      return;
    }
    this.reconnectAttempts++, this.state = "idle";
    let delayMs = Math.min($6T * 2 ** (this.reconnectAttempts - 1), Y6T);
    v(`[SessionsV2Client] Reconnecting in ${delayMs}ms (attempt ${this.reconnectAttempts}/${PDq}, from_sequence_num=${this.lastSequenceNum})`), this.callbacks.onReconnecting?.(), this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null, this.connect();
    }, delayMs);
  }
  onLivenessTimeout = () => {
    this.livenessTimer = null, v("[SessionsV2Client] Liveness timeout, reconnecting", {
      level: "warn"
    }), this.abortController?.abort(), this.abortController = null, this.handleStreamEnd();
  };
  resetLivenessTimer() {
    this.clearLivenessTimer(), this.livenessTimer = setTimeout(this.onLivenessTimeout, A6T);
  }
  clearLivenessTimer() {
    if (this.livenessTimer) clearTimeout(this.livenessTimer), this.livenessTimer = null;
  }
  startDriftWatch() {
    this.clearDriftWatch(), this.lastDriftCheck = Date.now(), this.driftTimer = setInterval(() => {
      let now = Date.now(),
        elapsed = now - this.lastDriftCheck;
      if (this.lastDriftCheck = now, elapsed > OX4 * 2 && this.state === "connected") v(`[SessionsV2Client] Wall-clock drift ${elapsed}ms \u2014 reconnecting after suspend`), this.reconnect();
    }, OX4), this.driftTimer.unref?.();
  }
  clearDriftWatch() {
    if (this.driftTimer) clearInterval(this.driftTimer), this.driftTimer = null;
  }
  async sendEvent(payload) {
    if (this.state === "closed") return v("[SessionsV2Client] Cannot send: closed", {
      level: "warn"
    }), Pe("remote_send_event", "remote_send_event_closed"), null;
    let postUrl = `${Is().BASE_API_URL}/v1/code/sessions/${this.sessionId}/events`,
      body = {
        session_id: this.sessionId,
        events: [{
          payload: payload
        }]
      };
    try {
      let resp = await fetch(postUrl, {
        method: "POST",
        headers: this.authHeaders(),
        body: Oe(body),
        signal: AbortSignal.timeout(30000),
        ...sT({
          url: postUrl
        })
      });
      if (!resp.ok) {
        if (resp.body?.cancel(), resp.status === 401 && this.onAuth401) {
          if (v("[SessionsV2Client] 401 on POST \u2014 refreshing + retry"), await this.onAuth401(this.getAccessToken())) {
            let retryResp = await fetch(postUrl, {
              method: "POST",
              headers: this.authHeaders(),
              body: Oe(body),
              signal: AbortSignal.timeout(30000),
              ...sT({
                url: postUrl
              })
            });
            if (retryResp.ok) {
              let firstResult = (await retryResp.json()).results?.[0],
                seqNum = firstResult ? parseInt(String(firstResult.sequence_num), 10) : NaN;
              return He("remote_send_event"), {
                sequence_num: isNaN(seqNum) ? 0 : seqNum
              };
            }
            retryResp.body?.cancel();
          }
        }
        return v(`[SessionsV2Client] POST /events returned ${resp.status}`, {
          level: "warn"
        }), Pe("remote_send_event", "remote_send_event_http_error"), null;
      }
      let firstResult = (await resp.json()).results?.[0],
        seqNum = firstResult ? parseInt(String(firstResult.sequence_num), 10) : NaN;
      return He("remote_send_event"), {
        sequence_num: isNaN(seqNum) ? 0 : seqNum
      };
    } catch (err) {
      return v(`[SessionsV2Client] POST /events failed: ${Se(err)}`, {
        level: "warn"
      }), Pe("remote_send_event", "remote_send_event_request_failed"), null;
    }
  }
  sendControlResponse(payload) {
    v("[SessionsV2Client] Sending control_response"), this.sendEvent({
      ...payload,
      uuid: AQ6.randomUUID()
    });
  }
  sendControlRequest(request) {
    if (this.state === "closed") return v("[SessionsV2Client] Cannot send control_request: closed", {
      level: "warn"
    }), null;
    let requestId = AQ6.randomUUID();
    if (this.issuedRequestIds.add(requestId), this.issuedRequestIds.size > f6T) {
      v("[SessionsV2Client] issuedRequestIds overflow \u2014 evicting oldest unanswered request_id", {
        level: "warn"
      });
      let oldest = this.issuedRequestIds.values().next().value;
      if (oldest !== undefined) this.issuedRequestIds.delete(oldest);
    }
    let eventPayload = {
      type: "control_request",
      request_id: requestId,
      request: request,
      uuid: AQ6.randomUUID()
    };
    return v(`[SessionsV2Client] Sending control_request: ${request.subtype}`), this.sendEvent(eventPayload), requestId;
  }
  isConnected() {
    return this.state === "connected";
  }
  close() {
    if (v("[SessionsV2Client] Closing"), this.state = "closed", this.exhaustedBudget = false, this.clearLivenessTimer(), this.clearDriftWatch(), this.reconnectTimer) clearTimeout(this.reconnectTimer), this.reconnectTimer = null;
    this.abortController?.abort(), this.abortController = null;
  }
  reconnect() {
    if (v("[SessionsV2Client] Force reconnect"), this.reconnectAttempts = 0, this.exhaustedBudget = false, this.clearLivenessTimer(), this.clearDriftWatch(), this.reconnectTimer) clearTimeout(this.reconnectTimer), this.reconnectTimer = null;
    this.abortController?.abort(), this.abortController = null, this.state = "idle", this.connect();
  }
  reviveAfterExhaustion() {
    if (this.state !== "closed" || !this.exhaustedBudget) return false;
    return Bt("remote_connect", "remote_connect_revived_by_user_send"), this.reconnect(), true;
  }
  authHeaders() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "anthropic-client-platform": qx(),
      "x-organization-uuid": this.orgUuid,
      "User-Agent": Yh()
    };
  }
}
var AQ6,
  $6T = 1000,
  Y6T = 30000,
  PDq = 5,
  A6T = 45000,
  OX4 = 5000,
  TX4 = 30000,
  w6T,
  f6T = 500,
  j6T,
  YX4;
var ZDq = b(() => {
  Hc();
  rlt();
  Dp();
  cn();
  je();
  St();
  wn();
  lo();
  Z_();
  Xt();
  AQ6 = require("crypto"), w6T = new Set([401, 403, 404]), j6T = {
    stream: true
  }, YX4 = new Set(["user", "env_manager_log"]);
});

export {uB_ as v8t,zX4 as Qkl,AX4 as oum,$X4 as Zkl,J6T as sum,WDq as Jwo,AQ6 as jVn,$6T as Xcm,Y6T as Qcm,PDq as Ywo,A6T as Zcm,OX4 as Jkl,TX4 as Xkl,w6T as eum,f6T as tum,j6T as num,YX4 as rum,ZDq as eHl};
