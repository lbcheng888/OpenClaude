// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {fIt,QFe,Pp} from "./2273_loggedTmuxCcDisable.ts";
import {S5e,GXn} from "../../vendor/m5535.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {je} from "../../vendor/m577.ts";
import {Lr} from "../../vendor/m578.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var qGt = {};
isFullscreenWithTTY(qGt, {
  applyFleetViewHostWindowsEnv: () => applyFleetViewHostWindowsEnv,
  FleetViewScreen: () => FleetViewScreen
});
/** Renders children inside a mouse-tracking fullscreen pane when iTTY is active. */
function FleetViewScreen(props: any) {
  let cache = YXl.c(3),
    {
      children: children
    } = props;
  if (fIt()) {
    let mouseTrackingSetup: any;
    if (cache[0] === Symbol.for("react.memo_cache_sentinel")) mouseTrackingSetup = QFe(), cache[0] = mouseTrackingSetup;else mouseTrackingSetup = cache[0];
    let renderedNode: any;
    if (cache[1] !== children) renderedNode = KLo.createElement(S5e, {
      mouseTracking: mouseTrackingSetup
    }, children), cache[1] = children, cache[2] = renderedNode;else renderedNode = cache[2];
    return renderedNode;
  }
  return children;
}
/** Sets CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT=1 when running on Windows or inside Windows Terminal. */
function applyFleetViewHostWindowsEnv() {
  if (zt() === "windows" || je.WT_SESSION) process.env.CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT ??= "1";
}
var YXl, KLo;
// Module initializer: sets up React compiler cache and imports React-related modules
var cht = b(() => {
  GXn();
  Lr();
  Pp();
  qs();
  YXl = M(rt(), 1), KLo = M(Te(), 1);
});
export {qGt,FleetViewScreen,applyFleetViewHostWindowsEnv,YXl,KLo,cht};
