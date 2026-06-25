// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
/** Returns whether the "tengu_maple_sundial" feature flag is enabled (default: false). */
function VBH(): boolean {
  return Y_("tengu_maple_sundial", !1);
}
var P$q = L(() => {
  o6();
});
export {VBH as XDe,P$q as DVn};
