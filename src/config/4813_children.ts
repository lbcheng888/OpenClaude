// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Ne} from "../../vendor/m583.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {$En,hg} from "../../vendor/m2280.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * TUI renderer-switch hint UI.
 *
 * Renders the contextual help message shown right after the terminal UI
 * renderer mode was switched (flicker-free "fullscreen" vs. classic
 * "default"), based on the `CLAUDE_CODE_TUI_JUST_SWITCHED` runtime flag.
 *
 * The React elements are produced once and cached in a memo-cache array
 * (`Wvl.c(6)`) keyed by `Symbol.for("react.memo_cache_sentinel")`.
 */

/**
 * Whether the ochre/hollow experimental TUI variant is enabled.
 * Reads the "tengu_ochre_hollow" gate, defaulting to disabled.
 */
function Wzn(): boolean {
  return it("tengu_ochre_hollow", !1);
}

/**
 * Build the hint element describing the renderer mode that was just switched
 * to. Returns the cached React node for the active "just switched" mode, or
 * `null` when no switch hint applies.
 */
function Gvl(): unknown {
  let memoCache = Wvl.c(6);
  switch (Ne.CLAUDE_CODE_TUI_JUST_SWITCHED) {
    case "fullscreen":
      {
        let usingFlickerFreeLine, cursorHintLine, expandHintLine, autoCopyHintLine;
        if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) usingFlickerFreeLine = _J.jsxs(v, {
          children: [_J.jsx(bs, {
            status: "success",
            withSpace: !0
          }), _J.jsx(v, {
            color: "success",
            children: "Using flicker-free rendering"
          }), _J.jsx(v, {
            dimColor: !0,
            children: " \xB7 if you want to go back, use /tui default"
          })]
        }), cursorHintLine = _J.jsxs(v, {
          dimColor: !0,
          children: ["  ", "\xB7 Click to move your cursor in the text input"]
        }), expandHintLine = _J.jsxs(v, {
          dimColor: !0,
          children: ["  ", "\xB7 Click to expand collapsed tool results"]
        }), autoCopyHintLine = _J.jsxs(v, {
          dimColor: !0,
          children: ["  ", "\xB7 By default, text auto-copies when you select it (/config to change)"]
        }), memoCache[0] = usingFlickerFreeLine, memoCache[1] = cursorHintLine, memoCache[2] = expandHintLine, memoCache[3] = autoCopyHintLine;else usingFlickerFreeLine = memoCache[0], cursorHintLine = memoCache[1], expandHintLine = memoCache[2], autoCopyHintLine = memoCache[3];
        let fullscreenHint;
        if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) fullscreenHint = _J.jsxs($, {
          flexDirection: "column",
          children: [usingFlickerFreeLine, cursorHintLine, expandHintLine, autoCopyHintLine, _J.jsxs(v, {
            dimColor: !0,
            children: ["  ", "\xB7 Hold ", $En(), " while selecting to use your terminal's native copy instead"]
          })]
        }), memoCache[4] = fullscreenHint;else fullscreenHint = memoCache[4];
        return fullscreenHint;
      }
    case "default":
      {
        let classicHint;
        if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) classicHint = _J.jsx(v, {
          dimColor: !0,
          children: "Switched back to the classic renderer"
        }), memoCache[5] = classicHint;else classicHint = memoCache[5];
        return classicHint;
      }
    default:
      return null;
  }
}
var Wvl, _J;
var Gzn = b(() => {
  hg();
  je();
  jn();
  Ir();
  ff();
  Wvl = x(tt(), 1), _J = x(oe(), 1);
});

export {Wzn,Gvl,Wvl,_J,Gzn};
