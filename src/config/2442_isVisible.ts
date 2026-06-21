// @ts-nocheck
import {je as Ge} from "../../vendor/m577.ts";
import {B4 as v4,vZe as aZe,rwe as qve} from "../../vendor/m2381.ts";
import {useTerminalViewport as Qve,d0t as WIt} from "../../vendor/m2440.ts";
import {SSn as BTn,twe as Uve} from "../../vendor/m2380.ts";
import {gF as lF} from "../../vendor/m2379.ts";
import {b,M as L} from "../../runtime.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function M2r(e) {
  return Ge.CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT ? Math.max(e, Jz) : e;
}
function clampIntervalForFullRepaint(e = 16) {
  let t = JFe.useContext(v4),
    [n, {
      isVisible: r
    }, o] = Qve(),
    s = BTn(),
    i = JFe.useRef(s),
    a = r;
  if (i.current !== s) i.current = s, a = o();
  let l = !!t && a && e !== null,
    c = e === null ? null : Math.ceil(M2r(e) / lF) * lF,
    u = JFe.useRef(0),
    d = JFe.useSyncExternalStore(l ? t.subscribeKeepAlive : aZe, () => l ? u.current = Math.max(u.current, Math.floor(t.now() / c) * c) : u.current);
  return [n, d];
}
var JFe,
  Jz = 480;
var VSH = b(() => {
  Or();
  qve();
  Uve();
  WIt();
  JFe = L(Te(), 1);
});

export {M2r as k$r,clampIntervalForFullRepaint as useAnimationFrame,JFe as TUe,Jz as yld,VSH as p0t};
