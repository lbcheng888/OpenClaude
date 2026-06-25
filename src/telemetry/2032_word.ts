// @ts-nocheck
import {getInitialSettings as n8,getSettingsWithErrors as ZF,br as N8} from "../config/0745_updateSettingsForSource.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {m8 as us,G0t as oK6} from "../../vendor/m2029.ts";
import {getCanonicalName as _9,Ro as iq} from "../permissions/1458_swapShrinksContextWindow.ts";
import {hasFirstPartyCapabilities as ry,getProviderForModel as jw,Ps as V7} from "../api/1287_usesFirstPartyModelIds.ts";
import {b as L} from "../../runtime.ts";
/**
 * Thinking-mode capability checks and rainbow-color utilities for the
 * "ultrathink" keyword feature (tengu_turtle_carbon gate).
 *
 * Exported names (H56, eyH, Eg9, _56, QF, MP8, LrH, hrH, OMH) are
 * cross-module and must not be renamed.
 */

/** Returns whether the "show thinking summaries" setting is enabled. */
function H56(): boolean {
  return n8().showThinkingSummaries ?? !1;
}

/** Returns whether the tengu_turtle_carbon feature flag is enabled. */
function eyH(): boolean {
  return Y_("tengu_turtle_carbon", !0);
}

/** Returns true if `text` contains the word "ultrathink" (case-insensitive). */
function Eg9(text: string): boolean {
  return /\bultrathink\b/i.test(text);
}

/** Match entry produced by {@link _56}. */
interface UltrathinkMatch {
  word: string;
  start: number;
  end: number;
}

/**
 * Finds all occurrences of the word "ultrathink" in `text` and returns their
 * positions as an array of `{ word, start, end }` records.
 */
function _56(text: string): UltrathinkMatch[] {
  let matches: UltrathinkMatch[] = [],
    matchIterator = text.matchAll(/\bultrathink\b/gi);
  for (let match of matchIterator) if (match.index !== void 0) matches.push({
    word: match[0],
    start: match.index,
    end: match.index + match[0].length
  });
  return matches;
}

/**
 * Returns a rainbow color name for the given `colorIndex`.
 * When `shimmer` is true, returns the shimmer variant of the color.
 */
function QF(colorIndex: number, shimmer: boolean = !1): string {
  let colorArray = shimmer ? rainbowShimmerColors : rainbowColors;
  return colorArray[colorIndex % colorArray.length];
}

/**
 * Returns true if the given model supports the thinking feature.
 * Checks an explicit override first; falls back to a model-name heuristic
 * (any model that is NOT a claude-3-* family is considered to support thinking).
 */
function MP8(model: string): boolean {
  let thinkingOverride = us(model, "thinking");
  if (thinkingOverride !== void 0) return thinkingOverride;
  return !_9(model).includes("claude-3-");
}

/**
 * Returns true if the given model supports extended (non-adaptive) thinking.
 * claude-3-* and several Opus/Sonnet/Haiku 4.x models return false;
 * claude-fable-5 returns true; newer models fall back to a feature-flag check.
 */
function LrH(model: string): boolean {
  let shortName = _9(model);
  if (shortName.includes("claude-3-") || shortName === "claude-opus-4-0" || shortName === "claude-opus-4-1" || shortName === "claude-opus-4-5" || shortName === "claude-opus-4-6" || shortName === "claude-opus-4-7" || shortName === "claude-opus-4-8" || shortName === "claude-sonnet-4-0" || shortName === "claude-sonnet-4-5" || shortName === "claude-sonnet-4-6" || shortName === "claude-haiku-4-5") return !1;
  if (shortName === "claude-fable-5") return !0;
  return ry(jw(model));
}

/**
 * Returns true if the given model supports adaptive thinking.
 * Checks an explicit override first, then uses model-name allow/deny lists,
 * and finally falls back to a feature-flag check.
 */
function hrH(model: string): boolean {
  let adaptiveOverride = us(model, "adaptive_thinking");
  if (adaptiveOverride !== void 0) return adaptiveOverride;
  let shortName = _9(model);
  if (shortName.includes("claude-3-") || shortName === "claude-opus-4-0" || shortName === "claude-opus-4-1" || shortName === "claude-opus-4-5" || shortName === "claude-sonnet-4-0" || shortName === "claude-sonnet-4-5" || shortName === "claude-haiku-4-5") return !1;
  if (shortName === "claude-fable-5" || shortName === "claude-mythos-5" || shortName === "claude-opus-4-8" || shortName === "claude-opus-4-7" || shortName === "claude-opus-4-6" || shortName === "claude-sonnet-4-6") return !0;
  return ry(jw(model));
}

/**
 * Returns true when "always thinking" mode is active.
 * Overridden to false by the `MAX_THINKING_TOKENS=0` env var or by an explicit
 * `alwaysThinkingEnabled: false` setting; otherwise defaults to true.
 */
function OMH(): boolean {
  if (process.env.MAX_THINKING_TOKENS) return parseInt(process.env.MAX_THINKING_TOKENS, 10) > 0;
  let {
    settings: settings
  } = ZF();
  if (settings.alwaysThinkingEnabled === !1) return !1;
  return !0;
}

/** Plain rainbow colors (non-shimmer), one per spectral band. */
var rainbowColors: string[], rainbowShimmerColors: string[];
var Yv = L(() => {
  o6();
  iq();
  oK6();
  V7();
  N8();
  rainbowColors = ["rainbow_red", "rainbow_orange", "rainbow_yellow", "rainbow_green", "rainbow_blue", "rainbow_indigo", "rainbow_violet"], rainbowShimmerColors = ["rainbow_red_shimmer", "rainbow_orange_shimmer", "rainbow_yellow_shimmer", "rainbow_green_shimmer", "rainbow_blue_shimmer", "rainbow_indigo_shimmer", "rainbow_violet_shimmer"];
});
export {H56 as Oyn,eyH as LBe,Eg9 as kai,_56 as Lyn,QF as f8,MP8 as tBr,LrH as MBe,hrH as lZe,OMH as vse,rainbowColors as ied,rainbowShimmerColors as aed,Yv as $M};
