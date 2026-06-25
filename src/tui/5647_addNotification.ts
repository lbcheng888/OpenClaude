// @ts-nocheck
import {Ci as r7,fd as rO} from "../../vendor/m2469.ts";
import {_t as J_,uo as wq} from "../../vendor/m2468.ts";
import {FE as _M,V1 as SV} from "../../vendor/m4006.ts";
import {getIsRemoteMode as VK,lt as w_} from "../session/0132_sent.ts";
import {dG as vQ,U0e as V0H,$0e as y0H,Yqe as qxH,yte as _HH} from "../config/3910_claude_haiku_4_5.ts";
import {b as L,x as u} from "../../runtime.ts";
import {tt as __} from "../../vendor/m2263.ts";
import {et as WH} from "../../vendor/m2261.ts";
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
export {yi4 as sdc,bhT as uVm,IhT as dVm,Vi4 as odc,xr6 as Jnr,vi4 as idc};
