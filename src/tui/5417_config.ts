// @ts-nocheck
import {_r as mr,ui as ki} from "../../vendor/m2463.ts";
import {useClock} from "../../vendor/m2442.ts";
import {bo,uo as configProtoStore} from "../../vendor/m2468.ts";
import {l_e as Yhe,Oeo as XYr,Zae as ele} from "../../vendor/m3309.ts";
import {Bgt as Eft,WGt as E8t} from "../session/5045_request_id.ts";
import {etr as ZJn,eBo as LOo} from "./5415_sessionKey.ts";
import {mJl as k8l,fJl as H8l} from "../../vendor/m5415.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {lxo as Xwo,FYn as GVn} from "../api/5058_type.ts";
import {gyt as QAt,K7t as yGt,V7t as _Gt,jer as zJn,Yer as YJn,zer as KJn,rJl as y8l,Jer as JJn} from "../telemetry/5410_retracted.ts";
import {_yt as ZAt,Xer as XJn,Qer as QJn} from "../session/5411_type.ts";
import {truncateToWidth} from "../../vendor/m239.ts";
import {lu as yd,zf as ng} from "../../vendor/m133.ts";
import {setCwdState,lt} from "../session/0132_sent.ts";
import {COe as vPe,wc as nu,Kl as wc,po as lo} from "../tools/5224_userPromptCount.ts";
import {iJl as b8l,lJl as C8l,cJl as v8l,uJl as w8l} from "../../vendor/m5411.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {reportClientPresence,markSessionRead,updateSessionTitle,NR as Dw} from "../api/2195_updateSessionTitle.ts";
import {Ce as Se,Ct as bt} from "../../vendor/m197.ts";
import {Aue as vue,RWe as Kje} from "../config/4798_systemPrompt.ts";
import {b,x as M} from "../../runtime.ts";
import {je as ze} from "../../vendor/m2462.ts";
import {Xo as ps} from "../../vendor/m240.ts";
import {et as Te} from "../../vendor/m2261.ts";
function P8l({
  config: e,
  setMessages: t,
  setIsLoading: n,
  isLoading: r,
  onInit: o,
  requestDialog: s,
  toolPermissionContext: i,
  tools: a,
  onPermissionModeChange: l,
  setStreamingToolUses: c,
  setStreamMode: u,
  setInProgressToolUseIDs: d,
  recordApiMetricsEvent: p,
  onUpdateLength: m,
  onStreamingText: f,
  onTurnEnd: A,
  retraction: h
}) {
  let g = !!e,
    _ = qA.useRef(m);
  _.current = m;
  let y = qA.useRef(f);
  y.current = f;
  let T = qA.useRef(A);
  T.current = A;
  let S = qA.useRef(l);
  S.current = l;
  let v = qA.useRef(r);
  v.current = r;
  let {
      columns: R
    } = mr(),
    k = qA.useRef(R);
  k.current = R;
  let x = qA.useCallback(_e => {
      if (_e && v.current) return;
      v.current = _e, n(_e);
    }, [n]),
    H = qA.useRef(!1),
    I = qA.useRef(!1),
    P = qA.useCallback(() => {
      y.current(() => null), c(_e => _e.length > 0 ? [] : _e);
    }, [c]),
    L = useClock(),
    D = bo(),
    N = qA.useCallback(_e => D(fe => fe.remoteConnectionStatus === _e ? fe : {
      ...fe,
      remoteConnectionStatus: _e
    }), [D]),
    O = qA.useRef(new Set()),
    $ = qA.useCallback(() => {
      let _e = O.current.size;
      D(fe => fe.remoteBackgroundTaskCount === _e ? fe : {
        ...fe,
        remoteBackgroundTaskCount: _e
      });
    }, [D]),
    U = qA.useRef(null),
    W = qA.useCallback(() => {
      if (U.current) U.current(), U.current = null;
    }, []),
    G = qA.useRef(0),
    V = qA.useCallback(() => {
      G.current++, W();
    }, [W]),
    Q = qA.useCallback(() => {
      V(), H.current = !0, I.current = !0, x(!1);
    }, [V, x]),
    K = qA.useRef(D8l.randomUUID()),
    Y = qA.useRef(!1),
    J = qA.useRef(null),
    ee = qA.useCallback(() => {
      let _e = J.current;
      if (_e === null) return;
      if (J.current = null, Yhe().overrideMessage === _e) XYr(null);
    }, []),
    te = qA.useRef(null),
    ne = qA.useRef(!1),
    re = qA.useRef(!1),
    oe = qA.useRef(new Eft(50)),
    {
      dispatch: ce,
      cancel: ue
    } = ZJn({
      sessionKey: e,
      sendResponse: qA.useCallback((_e, fe) => {
        let ie = te.current;
        if (!ie) return;
        if (ie.respondToPermissionRequest(_e, fe), fe.behavior === "allow") x(!0);else if (fe.interrupt) Q();
      }, [x, Q]),
      requestDialog: s,
      toolRegistry: a,
      toolPermissionContext: i,
      canInterruptTurn: !e?.viewerOnly
    }),
    {
      dispatch: ae,
      cancel: he
    } = k8l({
      sessionKey: e,
      sendResponse: qA.useCallback((_e, fe) => {
        te.current?.respondToUserDialogRequest(_e, fe);
      }, []),
      requestDialog: s
    });
  qA.useEffect(() => {
    if (!e) {
      if (ne.current) ne.current = !1, N("connecting"), x(!1), re.current = !1, Y.current = !1, H.current = !1, I.current = !1, ee(), O.current.clear(), $(), d({
        action: "clear"
      }), h.inProgressToolUses.clear(), P(), T.current();
      return;
    }
    if (ne.current = !0, e.initialPromptUuid) oe.current.add(e.initialPromptUuid);
    logForDebugging(`[useRemoteSession] Initializing for session ${e.sessionId}`);
    let _e = !1,
      fe = !1,
      ie = new Xwo(e, {
        onMessage: Ce => {
          let xe = [`type=${Ce.type}`];
          if ("subtype" in Ce) xe.push(`subtype=${Ce.subtype}`);
          if (Ce.type === "user") {
            let Me = Ce.message?.content;
            xe.push(`content=${Array.isArray(Me) ? Me.map(Ke => Ke.type).join(",") : typeof Me}`);
          }
          logForDebugging(`[useRemoteSession] Received ${xe.join(" ")}`);
          {
            let Me = QAt(Ce);
            if (Me) yGt({
              index: h,
              signal: Me,
              surface: "ccr",
              setMessages: t,
              setInProgressToolUseIDs: d
            });
          }
          if (W(), Ce.type === "env_manager_log") {
            if (H.current) return;
            let Me = ZAt(Ce);
            if (Me.type === "env_log" && Me.message !== "") {
              x(!0);
              let Ke = Yhe().overrideMessage;
              if (Ke === null || Ke === J.current) {
                let He = truncateToWidth(Me.message, Math.max(40, k.current - 8));
                XYr(He), J.current = He;
              }
            }
            return;
          }
          if (ee(), !H.current && (Ce.type === "assistant" || Ce.type === "stream_event" || Ce.type === "system" && Ce.subtype === "status" && Ce.status === "requesting")) x(!0);
          if (Ce.type === "user" && Ce.uuid && oe.current.has(Ce.uuid)) {
            let Me = Ce.uuid;
            if (Me === e.initialPromptUuid) {
              let Ke = ZAt(Ce, {
                convertUserTextMessages: !0
              });
              t(He => Ke.type !== "message" || He.some(Ge => Ge.uuid === Me) ? He : [...He, Ke.message]);
              return;
            }
            t(Ke => {
              let He = Ke.findLastIndex(Ye => Ye.uuid === Me);
              if (He === -1 || He === Ke.length - 1) return Ke;
              let Ge = Ke[He];
              return Ke.slice(0, He).concat(Ke.slice(He + 1), Ge);
            }), logForDebugging(`[useRemoteSession] Reconciled echoed user message ${Me} to canonical position`);
            return;
          }
          if (Ce.type === "system" && Ce.subtype === "init") {
            if (logForDebugging(`[useRemoteSession] Init received with ${Ce.slash_commands.length} slash commands`), Ce.cwd) if (yd(Ce.cwd)) logForDebugging("[useRemoteSession] init reported a UNC cwd \u2014 not adopting", {
              level: "warn"
            });else setCwdState(Ce.cwd);
            o(Ce);
          }
          if (Ce.type === "system" && "permissionMode" in Ce && Ce.permissionMode) S.current(Ce.permissionMode);
          if (Ce.type === "system") {
            if (Ce.subtype === "task_started") {
              O.current.add(Ce.task_id), $();
              return;
            }
            if (Ce.subtype === "task_notification") {
              O.current.delete(Ce.task_id), $();
              return;
            }
            if (Ce.subtype === "task_progress" || Ce.subtype === "task_updated" || Ce.subtype === "notification") return;
            if (Ce.subtype === "status") {
              let Me = Y.current;
              if (Y.current = Ce.status === "compacting", Me && Y.current) return;
            }
            if (Ce.subtype === "compact_boundary") Y.current = !1;
          }
          if (XJn(Ce)) Y.current = !1, H.current = !1, I.current = !1, x(!1), P(), T.current();
          if (Ce.type === "user") {
            let Me = Ce.message?.content;
            if (Array.isArray(Me)) {
              let Ke = [];
              for (let He of Me) if (He.type === "tool_result") Ke.push(He.tool_use_id);
              if (Ke.length > 0) d({
                action: "remove",
                ids: Ke
              }), _Gt(h, Ke), zJn(h, Ke, "ccr", typeof Ce.uuid === "string" ? Ce.uuid : null);
            }
          }
          let Re = ZAt(Ce, e.viewerOnly ? {
            convertToolResults: !0,
            convertUserTextMessages: !0
          } : {
            convertUserTextMessages: !0
          });
          if (Re.type === "message") {
            if (c(Ke => Ke.length > 0 ? [] : Ke), Re.message.type === "assistant") y.current(() => null);
            if (YJn(h, Re.message.uuid, "ccr")) return;
            if (Re.message.type === "assistant") {
              let Ke = Re.message.message.content.filter(He => He.type === "tool_use").map(He => He.id);
              if (Ke.length > 0) d({
                action: "add",
                ids: Ke
              }), KJn(h, Re.message.uuid, Ke);
            }
            let Me = Re.message.uuid;
            t(Ke => Me && Ke.some(He => He.uuid === Me) ? Ke : [...Ke, Re.message]);
          } else if (Re.type === "stream_event") {
            if (I.current) return;
            vPe(Re.event, {
              onMessage: Me => t(Ke => [...Ke, Me]),
              onUpdateLength: Me => _.current(Me),
              onSetStreamMode: u,
              onStreamingToolUses: c,
              onApiMetrics: p,
              onStreamingText: Me => y.current(Me)
            });
          }
        },
        onPermissionRequest: (Ce, xe) => {
          if (logForDebugging(`[useRemoteSession] Permission request for tool: ${Ce.tool_name}`), x(!1), e.viewerOnly) return;
          ce({
            type: "control_request",
            request_id: xe,
            request: Ce
          });
        },
        onPermissionCancelled: (Ce, xe) => {
          if (logForDebugging(`[useRemoteSession] Permission request cancelled: ${Ce}`), ue(Ce), !H.current) x(!0);
        },
        onUserDialogRequest: (Ce, xe) => {
          if (logForDebugging(`[useRemoteSession] User dialog request: ${Ce.dialog_kind}`), x(!1), e.viewerOnly) return;
          ae({
            type: "control_request",
            request_id: xe,
            request: Ce
          });
        },
        onUserDialogCancelled: Ce => {
          logForDebugging(`[useRemoteSession] User dialog request cancelled: ${Ce}`), he(Ce);
        },
        onConnected: () => {
          logForDebugging("[useRemoteSession] Connected"), N("connected");
        },
        onReconnecting: () => {
          logForDebugging("[useRemoteSession] Reconnecting"), N("reconnecting"), H.current = !1, I.current = !1, O.current.clear(), $(), d({
            action: "clear"
          }), h.inProgressToolUses.clear();
        },
        onCatchUpTruncated: () => {
          if (logForDebugging("[useRemoteSession] Catch-up truncated \u2014 transcript gap"), t(Ce => [...Ce, nu("Some earlier messages from this session could not be loaded after reconnecting.", "warning")]), _e) fe = !0;else {
            _e = !0;
            let Ce = e.sessionId;
            (async () => {
              try {
                do {
                  fe = !1;
                  try {
                    if ((await xe()) === "stale") return;
                  } catch {}
                } while (fe);
              } finally {
                _e = !1;
              }
            })();
            async function xe() {
              let Re = await b8l(Ce);
              if (te.current !== ie) return "stale";
              let Me = await C8l(Re, void 0, {
                  reportFeatureHealth: !1
                }),
                Ke = 0,
                He = 0;
              while (Me && He < I8l) {
                if (te.current !== ie) return "stale";
                He++, Ke += y8l({
                  index: h,
                  events: Me.events,
                  surface: "truncation_harvest",
                  setMessages: t,
                  setInProgressToolUseIDs: d
                }), Me = He < I8l && Me.hasMore && Me.firstId ? await v8l(Re, Me.firstId) : null;
              }
              if (te.current !== ie) return "stale";
              return logEvent("tengu_refusal_retraction_truncation_harvest", {
                signal_count: Ke,
                page_count: He
              }), "done";
            }
          }
        },
        onDisconnected: () => {
          logForDebugging("[useRemoteSession] Disconnected"), V(), N("disconnected"), H.current = !1, I.current = !1, x(!1), ee(), O.current.clear(), $(), d({
            action: "clear"
          }), h.inProgressToolUses.clear(), P(), T.current();
        },
        onError: Ce => {
          logForDebugging(`[useRemoteSession] Error: ${Ce.message}`);
        }
      });
    te.current = ie, ie.connect();
    let Ae = K.current,
      ge = null;
    return reportClientPresence(e.sessionId, Ae).then(Ce => {
      if (te.current !== ie || Ce == null) return;
      let xe = Ce * 1000,
        Re = () => {
          try {
            reportClientPresence(e.sessionId, Ae);
          } finally {
            ge = L.setTimeout(Re, xe);
          }
        };
      ge = L.setTimeout(Re, xe);
    }), e.preflightCheck?.catch(Ce => {
      if (te.current !== ie) return;
      t(xe => [...xe, nu(Se(Ce), "warning")]), ie.disconnect(), te.current = null, V(), N("disconnected"), x(!1), H.current = !1, I.current = !1, ee(), O.current.clear(), $(), d({
        action: "clear"
      }), h.inProgressToolUses.clear(), P(), T.current();
    }), () => {
      if (logForDebugging("[useRemoteSession] Cleanup - disconnecting"), V(), ge) ge(), ge = null;
      reportClientPresence(e.sessionId, Ae, !0), markSessionRead(e.sessionId), ee(), ie.disconnect(), te.current = null;
    };
  }, [e, t, x, o, c, u, d, N, $, p, L, ce, ue, ae, he, W, V, P, ee, h]);
  let se = qA.useCallback(async (_e, fe) => {
      let ie = te.current;
      if (!ie) return logForDebugging("[useRemoteSession] Cannot send - no manager"), !1;
      W();
      let Ae = G.current;
      if (H.current = !1, x(!0), fe?.uuid) oe.current.add(fe.uuid);
      let ge = await ie.sendMessage(_e, fe);
      if (!ge.ok) return t(Ce => [...Ce, nu(`Couldn't send your message \u2014 ${ge.reason}. It wasn't delivered to the cloud session.`, "warning")]), x(!1), !1;
      if (!re.current && e && !e.initialPromptUuid && !e.viewerOnly && !e.isAttachToExisting) {
        re.current = !0;
        let Ce = e.sessionId,
          xe = typeof _e === "string" ? _e : wc(_e, " ");
        if (xe) vue(xe, new AbortController().signal).then(Re => {
          updateSessionTitle(Ce, Re ?? truncateToWidth(xe, 75));
        });
      }
      if (!e?.viewerOnly && G.current === Ae) {
        let Ce = Y.current ? ADm : fDm;
        U.current = L.setTimeout(() => {
          logForDebugging("[useRemoteSession] Response timeout - attempting reconnect");
          let xe = nu("Cloud session may be unresponsive. Attempting to reconnect\u2026", "warning");
          t(Re => [...Re, xe]), ie.reconnect();
        }, Ce);
      }
      return !0;
    }, [e, x, t, L, W]),
    le = qA.useCallback(() => {
      if (ee(), !e?.viewerOnly) {
        te.current?.cancelSession(), Q();
        return;
      }
      V(), x(!1);
    }, [e, x, V, Q, ee]),
    pe = qA.useCallback(_e => {
      let fe = te.current;
      if (!fe) return Promise.reject(Error("[useRemoteSession] Cannot send control request: no manager"));
      return fe.sendControlRequest(_e);
    }, []),
    de = qA.useCallback(() => {
      V(), te.current?.disconnect(), te.current = null;
    }, [V]);
  return qA.useMemo(() => ({
    isRemoteMode: g,
    sendMessage: se,
    cancelRequest: le,
    disconnect: de,
    sendControlRequest: pe
  }), [g, se, le, de, pe]);
}
var D8l,
  qA,
  fDm = 60000,
  ADm = 180000,
  I8l = 3;
var O8l = b(() => {
  lt();
  E8t();
  ele();
  ze();
  GVn();
  JJn();
  QJn();
  w8l();
  Ct();
  configProtoStore();
  ng();
  qe();
  bt();
  ps();
  lo();
  Kje();
  Dw();
  ki();
  LOo();
  H8l();
  D8l = require("crypto"), qA = M(Te(), 1);
});
export {P8l as _Jl,D8l as gJl,qA as qf,fDm as AUm,ADm as RUm,I8l as hJl,O8l as yJl};
