// @ts-nocheck
import {VJn as Sn6,QAt as UT_,yGt as fg_,_Gt as wg_,zJn as bn6,YJn as In6,KJn as Cn6,JJn as jg_} from "../telemetry/5377_retracted.ts";
import {bo as Zq,configProtoStore as wq} from "../../vendor/m2458.ts";
import {ZJn as un6,LOo as hZq} from "./5381_sessionKey.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {XJn as xn6,ZAt as jFH,QJn as Jg_} from "../session/5378_type.ts";
import {vPe as CRH,nu as M5,lo as zq} from "../tools/5190_userPromptCount.ts";
import {b as L,M as u} from "../../runtime.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * React hook that adapts a thin-client or remote-session transport into the local chat surface.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Bridge remote transport messages, permissions, streaming updates, and interrupts into local UI state. */
function useRemoteSessionAdapter({
  adapter: H,
  setMessages: _,
  setIsLoading: q,
  isLoading: K,
  requestDialog: O,
  toolPermissionContext: T,
  tools: z,
  permissionMode: $,
  onInit: Y,
  setStreamingToolUses: A,
  setStreamMode: w,
  setInProgressToolUseIDs: f,
  recordApiMetricsEvent: j
}: any) : any {
  let J = !!H,
    D = C2.useRef(null),
    M = C2.useRef(!1),
    X = C2.useRef(!1),
    [P] = C2.useState(Sn6),
    Z = K !== void 0,
    W = C2.useRef(K ?? !1);
  if (Z) W.current = K;
  let G = C2.useCallback(l => {
      if (l && Z && W.current) return;
      W.current = l, q(l);
    }, [q, Z]),
    R = C2.useRef(!1),
    h = C2.useCallback(() => {
      R.current = !0, G(!1);
    }, [G]),
    y = Zq(),
    E = C2.useCallback(l => y(n => n.remoteConnectionStatus === l ? n : {
      ...n,
      remoteConnectionStatus: l
    }), [y]),
    v = C2.useRef(new Set()),
    C = C2.useCallback(() => {
      let l = v.current.size;
      y(n => n.remoteBackgroundTaskCount === l ? n : {
        ...n,
        remoteBackgroundTaskCount: l
      });
    }, [y]),
    S = C2.useCallback(() => {
      v.current.clear(), C(), f?.({
        action: "clear"
      }), P.inProgressToolUses.clear();
    }, [C, f, P]),
    {
      dispatch: I,
      cancel: p
    } = un6({
      sessionKey: H,
      sendResponse: C2.useCallback((l, n) => {
        let o = D.current;
        if (!o) return;
        if (o.respondToPermissionRequest(l, n), n.behavior === "allow") G(!0);else if (n.interrupt) h();
      }, [G, h]),
      requestDialog: O,
      toolRegistry: z,
      toolPermissionContext: T,
      canInterruptTurn: !H?.readOnly
    }),
    b = C2.useRef($);
  b.current = $, C2.useEffect(() => {
    if (!H) return;
    let {
      label: l,
      createManager: n,
      onDisconnected: o,
      cleanup: i
    } = H;
    M.current = !1, N(`[${l}] connecting`);
    function t(qH: any) : any {
      if (b.current !== void 0 && !H?.readOnly) qH.setPermissionMode?.(b.current);
    }
    let a = n({
      onMessage: qH => {
        {
          let zH = UT_(qH);
          if (zH) fg_({
            index: P,
            signal: zH,
            surface: "thin_client",
            setMessages: _,
            setInProgressToolUseIDs: f
          });
        }
        if (xn6(qH)) R.current = !1, G(!1);
        if (!R.current && (qH.type === "assistant" || qH.type === "stream_event" || qH.type === "system" && qH.subtype === "status" && qH.status === "requesting")) G(!0);
        if (qH.type === "system" && qH.subtype === "init") {
          if (M.current) return;
          M.current = !0, Y?.(qH);
        }
        if (qH.type === "system") {
          if (qH.subtype === "task_started") {
            v.current.add(qH.task_id), C();
            return;
          }
          if (qH.subtype === "task_notification") {
            v.current.delete(qH.task_id), C();
            return;
          }
          if (qH.subtype === "task_progress" || qH.subtype === "task_updated" || qH.subtype === "notification") return;
        }
        if (f && qH.type === "user") {
          let zH = qH.message?.content;
          if (Array.isArray(zH)) {
            let _H = [];
            for (let OH of zH) if (OH.type === "tool_result") _H.push(OH.tool_use_id);
            if (_H.length > 0) f({
              action: "remove",
              ids: _H
            }), wg_(P, _H), bn6(P, _H, "thin_client", typeof qH.uuid === "string" ? qH.uuid : null);
          }
        }
        if (H.interceptMessage?.(qH, {
          setMessages: _
        }) === "consumed") return;
        let KH = jFH(qH, H.convertOpts ?? {
          convertToolResults: !0
        });
        if (KH.type === "message") {
          if (A?.(zH => zH.length > 0 ? [] : zH), In6(P, KH.message.uuid, "thin_client")) return;
          if (f && KH.message.type === "assistant") {
            let zH = KH.message.message.content.filter(_H => _H.type === "tool_use").map(_H => _H.id);
            if (zH.length > 0) f({
              action: "add",
              ids: zH
            }), Cn6(P, KH.message.uuid, zH);
          }
          _(zH => [...zH, KH.message]);
        } else if (KH.type === "stream_event") CRH(KH.event, {
          onMessage: zH => _(_H => [..._H, zH]),
          onUpdateLength: () => {},
          onSetStreamMode: w ?? (() => {}),
          onStreamingToolUses: A ?? (() => {}),
          onApiMetrics: j
        });
      },
      onPermissionRequest: (qH, KH) => {
        if (N(`[${l}] permission request: ${qH.tool_name}`), G(!1), H.readOnly) return;
        I({
          type: "control_request",
          request_id: KH,
          request: qH
        });
      },
      onPermissionCancelled: (qH, KH) => {
        if (N(`[${l}] permission cancelled: ${qH}`), p(qH), !R.current) G(!0);
      },
      onConnected: () => {
        N(`[${l}] connected`), X.current = !0, E("connected"), t(a);
      },
      onReconnecting: (qH, KH) => {
        if (N(`[${l}] dropped, reconnecting${qH != null ? ` (${qH}/${KH})` : ""}`), X.current = !1, E("reconnecting"), !H.replaysOnReconnect) G(!1);
        if (R.current = !1, S(), qH != null) _(zH => [...zH, M5(`Connection dropped \u2014 reconnecting (attempt ${qH}/${KH})...`, "warning")]);
      },
      onDisconnected: () => {
        N(`[${l}] disconnected`);
        let qH = X.current;
        X.current = !1, E("disconnected"), R.current = !1, G(!1), S(), o(qH);
      },
      onError: qH => {
        N(`[${l}] error: ${qH.message}`);
      }
    });
    D.current = a, a.connect(), t(a);
    let e = H.afterConnect?.(a);
    return () => {
      N(`[${l}] cleanup`), e?.(), a.disconnect(), i?.(), D.current = null;
    };
  }, [H, _, G, Y, A, w, f, j, E, C, S, I, p, P]);
  let x = C2.useCallback(async (l, n) => {
      let o = D.current;
      if (!o) return _(t => [...t, M5("Not connected to the remote session \u2014 your message wasn't sent.", "warning")]), !1;
      R.current = !1, G(!0);
      let i = await o.sendMessage(l, n);
      if (!i.ok) return _(t => [...t, M5(`Couldn't send your message \u2014 ${i.reason}. It wasn't delivered to the remote session.`, "warning")]), G(!1), !1;
      return !0;
    }, [G, _]),
    U = C2.useCallback(() => {
      if (!H?.readOnly) {
        D.current?.sendInterrupt(), h();
        return;
      }
      G(!1);
    }, [H, G, h]),
    F = C2.useCallback(() => {
      D.current?.disconnect(), D.current = null, X.current = !1;
    }, []),
    Q = H?.label,
    d = C2.useCallback(l => {
      let n = D.current;
      if (!n) return Promise.reject(Error("Remote session is not connected \u2014 try again in a moment"));
      if (!n.sendControlRequest) return Promise.reject(Error(`sendControlRequest not yet wired for ${Q ?? "this"} transport`));
      return n.sendControlRequest(l);
    }, [Q]);
  return C2.useMemo(() => ({
    isRemoteMode: J,
    sendMessage: x,
    cancelRequest: U,
    disconnect: F,
    sendControlRequest: d
  }), [J, x, U, F, d]);
}
var C2;
var VZq = L(() => {
  jg_();
  Jg_();
  wq();
  FH();
  zq();
  hZq();
  C2 = u(WH(), 1);
});
export {useRemoteSessionAdapter as eXn,C2 as sw,VZq as BOo};
