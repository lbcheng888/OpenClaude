// @ts-nocheck
import {Ui as r7,Ld as rO} from "../../vendor/m2459.ts";
import {mt as J_,configProtoStore as wq} from "../../vendor/m2458.ts";
import {kE as _M,jL as SV} from "../../vendor/m3944.ts";
import {getIsRemoteMode as VK,lt as w_} from "../session/0131_sent.ts";
import {VW as vQ,oIe as V0H,sIe as y0H,X4e as qxH,Hte as _HH} from "../config/3934_claude_haiku_4_5.ts";
import {b as L,M as u} from "../../runtime.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/*
 * tui/5566_addNotification.tsx - React/Ink terminal UI restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
function yi4(): any {
  let H = Vi4.c(5),
    {
      addNotification: addNotification
    } = r7(),
    q = J_(IhT),
    K = _M(),
    O = xr6.useRef(void 0),
    T,
    z;
  if (H[0] !== addNotification || H[1] !== q || H[2] !== K) T = (): any => {
    if (VK() || !vQ()) return;
    if (!q || !V0H(K) || !y0H(q)) {
      O.current = void 0;
      return;
    }
    let $ = qxH(K, q) ? "on" : "pairing";
    if (O.current === $) return;
    O.current = $, addNotification({
      key: "advisor-experimental",
      kind: "event",
      text: $ === "on" ? "Advisor Tool (experimental) is on and may use more tokens \xB7 /advisor" : "Advisor will not activate on the main model (advisor is less capable); subagents may still use it and may use more tokens \xB7 /advisor",
      priority: "medium",
      fold: bhT
    });
  }, z = [q, K, addNotification], H[0] = addNotification, H[1] = q, H[2] = K, H[3] = T, H[4] = z;else T = H[3], z = H[4];
  xr6.useEffect(T, z);
}
function bhT(H: any, _: any): any {
  return _;
}
function IhT(H: any): any {
  return H.advisorModel;
}
var Vi4, xr6;
var vi4 = L((): any => {
  w_();
  rO();
  SV();
  wq();
  _HH();
  Vi4 = u(__(), 1), xr6 = u(WH(), 1);
});

export {yi4 as ync,bhT as B$m,IhT as F$m,Vi4 as _nc,xr6 as KQn,vi4 as Tnc};
