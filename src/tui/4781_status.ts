// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Bs as Os,rA as lA} from "../../vendor/m2550.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {nTn as _yn,lg as og} from "../../vendor/m2269.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function hWn() {
  return ut("tengu_ochre_hollow", false);
}
function Cgl() {
  let e = Egl.c(6);
  switch (Ge.CLAUDE_CODE_TUI_JUST_SWITCHED) {
    case "fullscreen":
      {
        let t, n, r, o;
        if (e[0] === Symbol.for("react.memo_cache_sentinel")) t = hI.createElement(w, null, hI.createElement(Os, {
          status: "success",
          withSpace: true
        }), hI.createElement(w, {
          color: "success"
        }, "Using flicker-free rendering"), hI.createElement(w, {
          dimColor: true
        }, " \xB7 if you want to go back, use /tui default")), n = hI.createElement(w, {
          dimColor: true
        }, "  ", "\xB7 Click to move your cursor in the text input"), r = hI.createElement(w, {
          dimColor: true
        }, "  ", "\xB7 Click to expand collapsed tool results"), o = hI.createElement(w, {
          dimColor: true
        }, "  ", "\xB7 By default, text auto-copies when you select it (/config to change)"), e[0] = t, e[1] = n, e[2] = r, e[3] = o;else t = e[0], n = e[1], r = e[2], o = e[3];
        let s;
        if (e[4] === Symbol.for("react.memo_cache_sentinel")) s = hI.createElement(B, {
          flexDirection: "column"
        }, t, n, r, o, hI.createElement(w, {
          dimColor: true
        }, "  ", "\xB7 Hold ", _yn(), " while selecting to use your terminal's native copy instead")), e[4] = s;else s = e[4];
        return s;
      }
    case "default":
      {
        let t;
        if (e[5] === Symbol.for("react.memo_cache_sentinel")) t = hI.createElement(w, {
          dimColor: true
        }, "Switched back to the classic renderer"), e[5] = t;else t = e[5];
        return t;
      }
    default:
      return null;
  }
}
var Egl, hI;
var initTuiStatusModule = b(() => {
  og();
  Je();
  Yn();
  Or();
  lA();
  Egl = L(nt(), 1), hI = L(Te(), 1);
});

export {hWn as rGn,Cgl as V_l,Egl as G_l,hI as bI,initTuiStatusModule as oGn};
