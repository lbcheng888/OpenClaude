// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
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

export {Pr as kz,le7 as yUi,GIH as M2e};
