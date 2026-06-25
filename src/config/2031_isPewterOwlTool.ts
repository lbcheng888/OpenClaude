// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {getCachedClientData as pI,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Ne,AR} from "../../vendor/m583.ts";
import {getIsNonInteractiveSession as kr,lt} from "../session/0132_sent.ts";
import {getCanonicalName as So,getMainLoopModel as gs,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
var wai = {};
ft(wai, {
  isPewterOwlTool: () => isPewterOwlTool,
  isPewterOwlHeader: () => isPewterOwlHeader,
  isPewterOwlBrief: () => isPewterOwlBrief
});

/**
 * Returns the configured pewter-owl model string, preferring clientDataCache
 * over the tengu feature flag, and falling back to an empty string.
 */
function sed(): string {
  let pewterOwlModel = pI()?.pewter_owl_model;
  if (typeof pewterOwlModel === "string" && pewterOwlModel !== "") return pewterOwlModel;
  return it("tengu_pewter_owl_model", "");
}

/**
 * Core check for whether a specific pewter-owl feature flag is enabled.
 *
 * Returns false when:
 *   - The CLAUDE_CODE_PEWTER_OWL env var explicitly disables it,
 *   - Running in API mode (kr()),
 *   - The configured pewter-owl model is not present in the current
 *     (normalized) active model string.
 *
 * Otherwise delegates to the tengu feature flag or clientDataCache entry.
 */
function QFr(flagKey: string): boolean {
  if (Ne.CLAUDE_CODE_PEWTER_OWL !== void 0) return Ne.CLAUDE_CODE_PEWTER_OWL;
  if (kr()) return !1;
  let pewterOwlModel = sed();
  if (pewterOwlModel !== "" && !So(gs()).includes(pewterOwlModel)) return !1;
  return it(`tengu_${flagKey}`, !1) || pI()?.[flagKey] === !0;
}

/** Returns true when the pewter-owl header feature is enabled. */
function isPewterOwlHeader(): boolean {
  return QFr("pewter_owl_header");
}

/**
 * Returns true when the pewter-owl tool feature is enabled.
 * Checks the CLAUDE_CODE_PEWTER_OWL_TOOL env var override first.
 */
function isPewterOwlTool(): boolean {
  if (Ne.CLAUDE_CODE_PEWTER_OWL_TOOL !== void 0) return Ne.CLAUDE_CODE_PEWTER_OWL_TOOL;
  return QFr("pewter_owl_tool");
}

/** Returns true when the pewter-owl brief feature is enabled. */
function isPewterOwlBrief(): boolean {
  return QFr("pewter_owl_brief");
}

var aZe = b(() => {
  lt();
  jn();
  tr();
  AR();
  Ro();
});

export {wai,sed,QFr,isPewterOwlHeader,isPewterOwlTool,isPewterOwlBrief,aZe};
