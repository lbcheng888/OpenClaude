// @ts-nocheck
import {qt as d_,Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {Bwo as $Dq,E8t as xB_} from "../session/5015_is_repl.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {T8l as mI4,QJn as Jg_} from "../session/5378_type.ts";
import {WVn as wQ6} from "./5028_type.ts";
import {b as L} from "../../runtime.ts";
/**
 * Direct WebSocket session transport.
 *
 * Restored from the Claude Code 2.1.177 bundle. Local comments and
 * TypeScript-only helper aliases document inferred intent; link-time symbols,
 * literals, operators, property names, and control flow are preserved.
 */
type RestoredUnknown = any;
type RestoredRecord = Record<string, RestoredUnknown>;
// FIXME: unverified name for preserved short bundle-local identifiers.

class NZq {
  ws = null;
  config;
  callbacks;
  constructor(H, _) {
    this.config = H, this.callbacks = _;
  }
  connect() {
    let H = {};
    if (this.config.authToken) H.authorization = `Bearer ${this.config.authToken}`;
    this.ws = new WebSocket(this.config.wsUrl, {
      headers: H
    }), this.ws.addEventListener("open", () => {
      this.callbacks.onConnected?.();
    }), this.ws.addEventListener("message", _ => {
      let K = (typeof _.data === "string" ? _.data : "").split(`
`).filter(O => O.trim());
      for (let O of K) {
        let T;
        try {
          T = d_(O);
        } catch {
          continue;
        }
        if (!$Dq(T)) continue;
        let z = T;
        if (z.type === "control_request") {
          if (z.request.subtype === "can_use_tool") this.callbacks.onPermissionRequest(z.request, z.request_id);else N(`[DirectConnect] Unsupported control request subtype: ${z.request.subtype}`), this.sendErrorResponse(z.request_id, `Unsupported control request subtype: ${z.request.subtype}`);
          continue;
        }
        if (mI4(z)) this.callbacks.onMessage(z);
      }
    }), this.ws.addEventListener("close", () => {
      this.callbacks.onDisconnected?.();
    }), this.ws.addEventListener("error", () => {
      this.callbacks.onError?.(Error("WebSocket connection error"));
    });
  }
  async sendMessage(H) {
    if (!this.ws) return {
      ok: !1,
      reason: "not connected"
    };
    if (this.ws.readyState === WebSocket.CONNECTING) return {
      ok: !1,
      reason: "the connection is still being established"
    };
    if (this.ws.readyState !== WebSocket.OPEN) return {
      ok: !1,
      reason: "the connection was closed"
    };
    let _ = bH({
      type: "user",
      message: {
        role: "user",
        content: H
      },
      parent_tool_use_id: null,
      session_id: ""
    });
    return this.ws.send(_), {
      ok: !0
    };
  }
  respondToPermissionRequest(H, _) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      N(`[DirectConnect] Dropping permission response for ${H}: socket not open`, {
        level: "error"
      });
      return;
    }
    this.ws.send(bH(wQ6(H, _)));
  }
  sendInterrupt() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    let H = bH({
      type: "control_request",
      request_id: crypto.randomUUID(),
      request: {
        subtype: "interrupt"
      }
    });
    this.ws.send(H);
  }
  sendErrorResponse(H, _) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    let q = bH({
      type: "control_response",
      response: {
        subtype: "error",
        request_id: H,
        error: _
      }
    });
    this.ws.send(q);
  }
  disconnect() {
    if (this.ws) this.ws.close(), this.ws = null;
  }
  isConnected() {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
var iI4 = L(() => {
  xB_();
  Jg_();
  FH();
  H6();
});
export {NZq as NOo,iI4 as N8l};
