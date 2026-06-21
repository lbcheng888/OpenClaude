// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {getSettings_DEPRECATED as nq,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {b as L} from "../../runtime.ts";
/**
 * Returns true when the bypassPermissions mode is disabled — either by a
 * GrowthBook feature flag (`tengu_disable_bypass_permissions_mode`) or by the
 * `permissions.disableBypassPermissionsMode === "disable"` setting coming from
 * the external config helpers (`nq()`).
 *
 * Exported as `isBypassPermissionsModeDisabled`.
 */
function isBypassPermissionsModeDisabled(): boolean {
  let featureFlagDisabled: boolean = Y_("tengu_disable_bypass_permissions_mode", !1),
    settingsDisabled: boolean = (nq() || {}).permissions?.disableBypassPermissionsMode === "disable";
  return featureFlagDisabled || settingsDisabled;
}

/** Lazy initialiser chunk for this module; depends on GrowthBook (o6) and settings (N8). */
var _CH = L(() => {
  o6();
  N8();
});

export {isBypassPermissionsModeDisabled,_CH as kFe};
