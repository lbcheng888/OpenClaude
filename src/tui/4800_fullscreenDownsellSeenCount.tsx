// @ts-nocheck
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
import {Ove,Pp} from "../config/2273_loggedTmuxCcDisable.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {cY,rge} from "../../vendor/m3334.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {getInitialSettings,updateSettingsForSource,yr} from "../config/0740_updateSettingsForSource.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Box} from "../../vendor/m2422.ts";
import {Gyl,Vyl} from "../../vendor/m4798.ts";
import {Text} from "../../vendor/m2423.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function zyl() {
  if (Ove() !== "downsell_on") return !1;
  return (getGlobalConfig().fullscreenDownsellSeenCount ?? 0) < Kyl;
}
function Yyl() {
  let cachedNode = rCo.c(1);
  cY("fullscreen-downsell", Stm);
  let node: any;
  if (cachedNode[0] === Symbol.for("react.memo_cache_sentinel")) node = KP.createElement(btm, null), cachedNode[0] = node;else node = cachedNode[0];
  return node;
}
function Stm() {
  let seenCount = 0;
  if (saveGlobalConfig((cfg: any) => (seenCount = (cfg.fullscreenDownsellSeenCount ?? 0) + 1, {
    ...cfg,
    fullscreenDownsellSeenCount: seenCount
  })), logEvent("tengu_fullscreen_downsell_shown", {
    seen_count: seenCount
  }), seenCount >= Kyl && getInitialSettings().tui === void 0) {
    let {
      error: graduateError
    } = updateSettingsForSource("userSettings", {
      tui: "fullscreen"
    });
    if (graduateError) {
      logForDebugging(`fullscreen downsell graduation persist failed: ${graduateError.message}`, {
        level: "error"
      });
      return;
    }
    logEvent("tengu_fullscreen_downsell_persisted", {
      seen_count: seenCount
    });
  }
}
function btm() {
  let cachedEl = rCo.c(1),
    el: any;
  if (cachedEl[0] === Symbol.for("react.memo_cache_sentinel")) el = KP.createElement(Box, {
    flexDirection: "column"
  }, KP.createElement(Box, {
    flexDirection: "row"
  }, KP.createElement(Gyl, null), KP.createElement(Text, {
    color: "autoAccept"
  }, " Using flicker-free rendering")), KP.createElement(Text, {
    dimColor: !0
  }, "  ", "\xB7 Scroll with your trackpad, scroll wheel, or PageUp/PageDown"), KP.createElement(Text, {
    dimColor: !0
  }, "  ", "\xB7 Select text to copy \u2014 copying is automatic (/config to disable)"), KP.createElement(Text, {
    dimColor: !0
  }, "  ", "\xB7 Click to move your cursor or expand collapsed results"), KP.createElement(Text, {
    dimColor: !0
  }, "  ", "\xB7 /tui default to go back (saved to your preferences)")), cachedEl[0] = el;else el = cachedEl[0];
  return el;
}
var rCo: any,
  KP: any,
  Kyl = 5;
var Jyl = b(() => {
  ze();
  Ct();
  Qn();
  qe();
  Pp();
  yr();
  Vyl();
  rge();
  rCo = M(rt(), 1), KP = M(Te(), 1);
});
export {zyl,Yyl,Stm,btm,rCo,KP,Kyl,Jyl};
