// @ts-nocheck
import {Ne as Ge} from "../../vendor/m583.ts";
import {s4 as v4,vtt as aZe,$ve as qve} from "../../vendor/m2391.ts";
import {useTerminalViewport as Qve,$Pt as WIt} from "../../vendor/m2450.ts";
import {aAn as BTn,Uve} from "../../vendor/m2390.ts";
import {UF as lF} from "../../vendor/m2389.ts";
import {b,x as L} from "../../runtime.ts";
import {Ir as Or} from "../../vendor/m584.ts";
import {et as Te} from "../../vendor/m2261.ts";
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
export {M2r as i6r,clampIntervalForFullRepaint as useAnimationFrame,JFe as _2e,Jz as Gyd,VSH as qPt};
