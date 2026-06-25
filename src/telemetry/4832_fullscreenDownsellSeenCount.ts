// @ts-nocheck
import {Sve,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Bj,__e} from "../../vendor/m3350.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {getInitialSettings as Fr,ao,br} from "../config/0745_updateSettingsForSource.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Vwl,Kwl} from "../../vendor/m4830.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Fullscreen downsell visibility tracking.
 *
 * Drives a one-time promo for the flicker-free fullscreen TUI mode. The promo is
 * shown a limited number of times (`zwl`); once the seen-count crosses that
 * threshold the user is auto-graduated into fullscreen mode and the choice is
 * persisted to user settings.
 */

/**
 * Whether the fullscreen downsell promo should currently be shown.
 *
 * Returns `false` unless the experiment flag is in the `"downsell_on"` arm and
 * the user has seen the promo fewer than `zwl` times.
 */
function jwl(): boolean {
  if (Sve() !== "downsell_on") return !1;
  return (Ot().fullscreenDownsellSeenCount ?? 0) < zwl;
}

/**
 * React component entry for the fullscreen downsell.
 *
 * Registers the `Oum` callback for the `"fullscreen-downsell"` lifecycle event,
 * then renders the memoized promo body (`Lum`) via the React compiler cache.
 */
function Ywl() {
  let memoCache = bHo.c(1);
  Bj("fullscreen-downsell", Oum);
  let element;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) element = Cne.jsx(Lum, {}), memoCache[0] = element;else element = memoCache[0];
  return element;
}

/**
 * Fired when the downsell promo is shown. Increments the persisted seen-count,
 * emits the `tengu_fullscreen_downsell_shown` metric, and — once the count
 * reaches `zwl` and no explicit TUI mode is configured — graduates the user into
 * fullscreen mode by writing `userSettings.tui = "fullscreen"`.
 */
function Oum(): void {
  let seenCount = 0;
  if (hn(prev => (seenCount = (prev.fullscreenDownsellSeenCount ?? 0) + 1, {
    ...prev,
    fullscreenDownsellSeenCount: seenCount
  })), W("tengu_fullscreen_downsell_shown", {
    seen_count: seenCount
  }), seenCount >= zwl && Fr().tui === void 0) {
    let {
      error: persistError
    } = ao("userSettings", {
      tui: "fullscreen"
    });
    if (persistError) {
      A(`fullscreen downsell graduation persist failed: ${persistError.message}`, {
        level: "error"
      });
      return;
    }
    W("tengu_fullscreen_downsell_persisted", {
      seen_count: seenCount
    });
  }
}

/**
 * Memoized promo body. Lists the benefits and controls of flicker-free
 * fullscreen rendering.
 */
function Lum() {
  let memoCache = bHo.c(1),
    element;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) element = Cne.jsxs($, {
    flexDirection: "column",
    children: [Cne.jsxs($, {
      flexDirection: "row",
      children: [Cne.jsx(Vwl, {}), Cne.jsx(v, {
        color: "autoAccept",
        children: " Using flicker-free rendering"
      })]
    }), Cne.jsxs(v, {
      dimColor: !0,
      children: ["  ", "\xB7 Scroll with your trackpad, scroll wheel, or PageUp/PageDown"]
    }), Cne.jsxs(v, {
      dimColor: !0,
      children: ["  ", "\xB7 Select text to copy \u2014 copying is automatic (/config to disable)"]
    }), Cne.jsxs(v, {
      dimColor: !0,
      children: ["  ", "\xB7 Click to move your cursor or expand collapsed results"]
    }), Cne.jsxs(v, {
      dimColor: !0,
      children: ["  ", "\xB7 /tui default to go back (saved to your preferences)"]
    })]
  }), memoCache[0] = element;else element = memoCache[0];
  return element;
}

var bHo: any,
  Cne: any,
  /** Number of times the downsell promo is shown before auto-graduation. */
  zwl = 5;

/** Lazy module initializer: wires up cross-module deps and JSX runtime handles. */
var Jwl = b(() => {
  je();
  kt();
  tr();
  qe();
  tp();
  br();
  Kwl();
  __e();
  bHo = x(tt(), 1), Cne = x(oe(), 1);
});

export {jwl,Ywl,Oum,Lum,bHo,Cne,zwl,Jwl};
