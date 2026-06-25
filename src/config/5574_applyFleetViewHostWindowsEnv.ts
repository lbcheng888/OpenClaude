// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {$Dt,zet,tp} from "./2284_loggedTmuxCcDisable.ts";
import {wyt,Ktr} from "../../vendor/m5572.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {Ne} from "../../vendor/m583.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
var _zt = {};
ft(_zt, {
  applyFleetViewHostWindowsEnv: () => applyFleetViewHostWindowsEnv,
  FleetViewScreen: () => FleetViewScreen
});
/** Renders children inside a mouse-tracking fullscreen pane when iTTY is active. */
function FleetViewScreen(props: any) {
  let cache = Lic.c(3),
    {
      children: children
    } = props;
  if ($Dt()) {
    let mouseTrackingSetup: any;
    if (cache[0] === Symbol.for("react.memo_cache_sentinel")) mouseTrackingSetup = zet(), cache[0] = mouseTrackingSetup;else mouseTrackingSetup = cache[0];
    let renderedNode: any;
    if (cache[1] !== children) renderedNode = Mic.jsx(wyt, {
      mouseTracking: mouseTrackingSetup,
      children: children
    }), cache[1] = children, cache[2] = renderedNode;else renderedNode = cache[2];
    return renderedNode;
  }
  return children;
}
/** Sets CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT=1 when running on Windows or inside Windows Terminal. */
function applyFleetViewHostWindowsEnv() {
  if (Yt() === "windows" || Ne.WT_SESSION) process.env.CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT ??= "1";
}
var Lic, Mic;
// Module initializer: sets up React compiler cache and imports React-related modules
var kyt = b(() => {
  Ktr();
  Ir();
  tp();
  Es();
  Lic = x(tt(), 1), Mic = x(oe(), 1);
});

export {_zt,FleetViewScreen,applyFleetViewHostWindowsEnv,Lic,Mic,kyt};
