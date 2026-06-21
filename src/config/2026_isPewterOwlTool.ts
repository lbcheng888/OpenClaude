// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {getGlobalConfig as C_,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {je as oH,tk as Sy} from "../../vendor/m577.ts";
import {getIsNonInteractiveSession as u8,lt as w_} from "../session/0131_sent.ts";
import {getCanonicalName as _9,getMainLoopModel as g9,Mo as iq} from "../permissions/1453_swapShrinksContextWindow.ts";
var _47 = {};
j_(_47, {
  isPewterOwlTool: () => isPewterOwlTool,
  isPewterOwlHeader: () => isPewterOwlHeader,
  isPewterOwlBrief: () => isPewterOwlBrief
});

/**
 * Returns the configured pewter-owl model string, preferring clientDataCache
 * over the tengu feature flag, and falling back to an empty string.
 */
function getPewterOwlModel(): string {
  let pewterOwlModel = C_().clientDataCache?.pewter_owl_model;
  if (typeof pewterOwlModel === "string" && pewterOwlModel !== "") return pewterOwlModel;
  return Y_("tengu_pewter_owl_model", "");
}

/**
 * Core check for whether a specific pewter-owl feature flag is enabled.
 *
 * Returns false when:
 *   - The CLAUDE_CODE_PEWTER_OWL env var explicitly disables it,
 *   - Running in API mode (u8()),
 *   - The configured pewter-owl model is not present in the current
 *     (normalized) active model string.
 *
 * Otherwise delegates to the tengu feature flag or clientDataCache entry.
 */
function isPewterOwlFeatureEnabled(flagKey: string): boolean {
  if (oH.CLAUDE_CODE_PEWTER_OWL !== void 0) return oH.CLAUDE_CODE_PEWTER_OWL;
  if (u8()) return !1;
  let pewterOwlModel = getPewterOwlModel();
  if (pewterOwlModel !== "" && !_9(g9()).includes(pewterOwlModel)) return !1;
  return Y_(`tengu_${flagKey}`, !1) || C_().clientDataCache?.[flagKey] === !0;
}

/** Returns true when the pewter-owl header feature is enabled. */
function isPewterOwlHeader(): boolean {
  return isPewterOwlFeatureEnabled("pewter_owl_header");
}

/**
 * Returns true when the pewter-owl tool feature is enabled.
 * Checks the CLAUDE_CODE_PEWTER_OWL_TOOL env var override first.
 */
function isPewterOwlTool(): boolean {
  if (oH.CLAUDE_CODE_PEWTER_OWL_TOOL !== void 0) return oH.CLAUDE_CODE_PEWTER_OWL_TOOL;
  return isPewterOwlFeatureEnabled("pewter_owl_tool");
}

/** Returns true when the pewter-owl brief feature is enabled. */
function isPewterOwlBrief(): boolean {
  return isPewterOwlFeatureEnabled("pewter_owl_brief");
}

var qaH = L(() => {
  w_();
  o6();
  T8();
  Sy();
  iq();
});

export {_47 as Iti,getPewterOwlModel as qWu,isPewterOwlFeatureEnabled as bLr,isPewterOwlHeader,isPewterOwlTool,isPewterOwlBrief,qaH as cXe};
