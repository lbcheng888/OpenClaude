// @ts-nocheck
import {Ui as r7,Ld as rO} from "../../vendor/m2459.ts";
import {mt as J_,configProtoStore as wq} from "../../vendor/m2458.ts";
import {useClock as u9} from "../../vendor/m2432.ts";
import {ec as b4,Dd as X3} from "../../vendor/m687.ts";
import {ERo as lDq,CRo as nDq,_Il as y24,yIl as v24,bIl as C24,D8t as QB_} from "../../vendor/m5056.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/*
 * telemetry/5539_addNotification.ts - telemetry and background-event restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
function _n4(H: any, _: any): any {
  let {
      addNotification: addNotification,
      removeNotification: removeNotification
    } = r7(),
    O = J_((Y: any): any => Y.replBridgeEnabled && !Y.replBridgeOutboundOnly),
    T = ig_.useRef(O);
  T.current = O;
  let z = ig_.useRef(!1),
    $ = u9();
  ig_.useEffect((): any => {
    if (b4() || H === 0 || _ || z.current) return;
    let Y = !T.current && lDq() ? "rc" : nDq() ? "push" : null;
    if (Y === null) return;
    let A = Date.now() - H,
      w = y24 * 60000 - A,
      f = $.setTimeout((): any => {
        if (z.current) return;
        let idleMinutes = Math.round((Date.now() - H) / 60000);
        if (Y === "rc") {
          if (T.current || !lDq()) return;
          z.current = !0, v24(), addNotification({
            key: el4,
            kind: "upsell",
            jsx: jy.createElement(jy.Fragment, null, jy.createElement(V, {
              dimColor: !0
            }, "control this session from your phone \xB7 "), jy.createElement(V, {
              color: "suggestion"
            }, "/remote-control")),
            priority: "medium",
            timeoutMs: 2147483647
          }), c("tengu_rc_upsell_notification_shown", {
            idleMinutes: idleMinutes
          });
        } else {
          if (!nDq()) return;
          z.current = !0, C24(), addNotification({
            key: Hn4,
            kind: "upsell",
            jsx: jy.createElement(jy.Fragment, null, jy.createElement(V, {
              dimColor: !0
            }, "get pinged when Claude finishes \xB7 enable push notifications in", " "), jy.createElement(V, {
              color: "suggestion"
            }, "/config")),
            priority: "medium",
            timeoutMs: 2147483647
          }), c("tengu_push_notif_upsell_notification_shown", {
            idleMinutes: idleMinutes
          });
        }
      }, Math.max(0, w));
    return (): any => {
      f(), removeNotification(el4), removeNotification(Hn4);
    };
  }, [H, _, addNotification, removeNotification, $]);
}
var jy,
  ig_,
  el4 = "rc-idle-upsell",
  Hn4 = "push-idle-upsell";
var qn4 = L((): any => {
  rO();
  nH();
  X3();
  y_();
  QB_();
  wq();
  jy = u(WH(), 1), ig_ = u(WH(), 1);
});

export {_n4 as Kec,jy as EM,ig_ as rVt,el4 as Gec,Hn4 as Vec,qn4 as zec};
