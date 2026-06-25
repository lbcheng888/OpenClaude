// @ts-nocheck
import {Ci,fd} from "../../vendor/m2469.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {pl,Wu} from "../../vendor/m438.ts";
import {xxo,Dxo,GNl,VNl,jNl,tVt} from "../../vendor/m5086.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Idle-upsell notification effect.
 *
 * Watches how long the session has been idle and, after a fixed idle threshold
 * (GNl minutes), surfaces a one-time upsell notification:
 *   - "rc"   -> remote-control upsell ("/remote-control")
 *   - "push" -> push-notification upsell ("/config")
 *
 * Only one upsell is shown per effect lifetime; the timer is cleared and the
 * notifications removed on cleanup.
 *
 * @param idleStartMs  timestamp (Date.now) when the session went idle; 0 disables.
 * @param suppressed   when truthy, the effect does nothing.
 */
function Lcc(idleStartMs, suppressed) {
  let {
      addNotification,
      removeNotification
    } = Ci(),
    replBridgeAvailable = _t(state => state.replBridgeEnabled && !state.replBridgeOutboundOnly),
    replBridgeAvailableRef = xzt.useRef(replBridgeAvailable);
  replBridgeAvailableRef.current = replBridgeAvailable;
  let shownRef = xzt.useRef(!1),
    scheduler = As();
  xzt.useEffect(() => {
    if (pl() || idleStartMs === 0 || suppressed || shownRef.current) return;
    let upsellKind = !replBridgeAvailableRef.current && xxo() ? "rc" : Dxo() ? "push" : null;
    if (upsellKind === null) return;
    let elapsedMs = Date.now() - idleStartMs,
      remainingMs = GNl * 60000 - elapsedMs,
      cancelTimeout = scheduler.setTimeout(() => {
        if (shownRef.current) return;
        let idleMinutes = Math.round((Date.now() - idleStartMs) / 60000);
        if (upsellKind === "rc") {
          if (replBridgeAvailableRef.current || !xxo()) return;
          shownRef.current = !0, VNl(), addNotification({
            key: Pcc,
            kind: "upsell",
            jsx: Jne.jsxs(Jne.Fragment, {
              children: [Jne.jsx(v, {
                dimColor: !0,
                children: "control this session from your phone \xB7 "
              }), Jne.jsx(v, {
                color: "suggestion",
                children: "/remote-control"
              })]
            }),
            priority: "medium",
            timeoutMs: 2147483647
          }), W("tengu_rc_upsell_notification_shown", {
            idleMinutes
          });
        } else {
          if (!Dxo()) return;
          shownRef.current = !0, jNl(), addNotification({
            key: Occ,
            kind: "upsell",
            jsx: Jne.jsxs(Jne.Fragment, {
              children: [Jne.jsxs(v, {
                dimColor: !0,
                children: ["get pinged when Claude finishes \xB7 enable push notifications in", " "]
              }), Jne.jsx(v, {
                color: "suggestion",
                children: "/config"
              })]
            }),
            priority: "medium",
            timeoutMs: 2147483647
          }), W("tengu_push_notif_upsell_notification_shown", {
            idleMinutes
          });
        }
      }, Math.max(0, remainingMs));
    return () => {
      cancelTimeout(), removeNotification(Pcc), removeNotification(Occ);
    };
  }, [idleStartMs, suppressed, addNotification, removeNotification, scheduler]);
}
var xzt,
  Jne,
  Pcc = "rc-idle-upsell",
  Occ = "push-idle-upsell";
var Mcc = b(() => {
  fd();
  je();
  Wu();
  kt();
  tVt();
  uo();
  xzt = x(et(), 1), Jne = x(oe(), 1);
});

export {Lcc,xzt,Jne,Pcc,Occ,Mcc};
