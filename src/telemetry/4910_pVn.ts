// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
/**
 * Returns the cached GrowthBook feature-flag value for
 * `"tengu_immediate_model_command"` (default: `false`).
 *
 * When the flag is enabled the app applies "immediate model command" behaviour
 * (exact semantics determined by call sites).  Uses
 * `getFeatureValue_CACHED_MAY_BE_STALE` (cross-module `Y_`) so no async wait
 * is required.
 */
function getImmediateModelCommandFlag(): boolean {
  return Y_("tengu_immediate_model_command", !1);
}

/** Lazy module initialiser — depends on the GrowthBook feature-flag module (`o6`). */
var Eg6 = L(() => {
  o6();
});

export {getImmediateModelCommandFlag as cft,Eg6 as pVn};
