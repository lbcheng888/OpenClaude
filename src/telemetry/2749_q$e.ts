// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
/** Fires the tengu_idle_amber_finch telemetry event. */
function Pr(): ReturnType<typeof Y_> {
  return Y_("tengu_idle_amber_finch", !1);
}

/** Fires the tengu_quiet_slate_wren telemetry event. */
function le7(): ReturnType<typeof Y_> {
  return Y_("tengu_quiet_slate_wren", !1);
}

/** Module initializer — calls o6() to register this telemetry module. */
var GIH = L(() => {
  o6();
});
export {Pr as rj,le7 as u6i,GIH as q$e};
