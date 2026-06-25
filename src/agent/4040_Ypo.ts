// @ts-nocheck
import {getIsNonInteractiveSession as u8,lt as w_} from "../session/0132_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
/**
 * Coordinator panel feature-flag helper.
 *
 * Exposes a single predicate that answers whether the coordinator panel UI
 * feature should be active for the current session.  The panel is suppressed
 * in non-interactive (headless / SDK / `-p`) sessions so the check is guarded
 * by `u8()` before consulting the GrowthBook flag.
 */

/**
 * Returns `true` when the coordinator panel UI feature is enabled.
 *
 * The check short-circuits to `false` in headless/non-interactive sessions
 * (`u8()` returns truthy) because the panel has no meaning outside the TUI.
 * In interactive sessions the value of the `"tengu_coordinator_panel"`
 * GrowthBook flag is returned (default `true`).
 */
function rC6(): boolean {
  if (u8()) return !1;
  return Y_("tengu_coordinator_panel", !0);
}

/** Lazy module initialiser — ensures the session and GrowthBook API modules
 *  are ready before this module's exports are used. */
var _7q = L(() => {
  w_();
  o6();
});
export {rC6 as S3n,_7q as Ypo};
