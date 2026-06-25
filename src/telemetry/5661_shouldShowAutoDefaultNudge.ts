// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {getGlobalConfig as C_,tr as T8} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {getSettingsForSource as C6,br as N8} from "../config/0745_updateSettingsForSource.ts";
import {isAutoModeGateEnabled as sW,cy as Yj} from "../permissions/5219_verifyAutoModeGateAccess.ts";
var Jr4 = {};
j_(Jr4, {
  shouldShowAutoDefaultNudge: () => shouldShowAutoDefaultNudge
});

/**
 * Determines whether to show the auto-default nudge to the user.
 *
 * Returns the user's configured default mode string if all conditions are met:
 * - Onboarding has been completed
 * - The auto-default nudge has not yet been shown
 * - The "tengu_maple_pier" feature flag is enabled
 * - The user has a non-"auto" defaultMode in their userSettings
 * - No other settings source (project/local/flag/policy) overrides defaultMode
 * - sW() passes (e.g. some additional eligibility check)
 *
 * Returns null if any condition is not met.
 */
function shouldShowAutoDefaultNudge(): string | null {
  {
    let appState = C_();
    if (!appState.hasCompletedOnboarding || appState.hasSeenAutoDefaultNudge || !Y_("tengu_maple_pier", !1)) return null;
    let userDefaultMode = C6("userSettings")?.permissions?.defaultMode,
      hasOverrideDefaultMode = ["projectSettings", "localSettings", "flagSettings", "policySettings"].some((settingsKey: string) => C6(settingsKey)?.permissions?.defaultMode);
    if (userDefaultMode && userDefaultMode !== "auto" && !hasOverrideDefaultMode && sW()) return userDefaultMode;
  }
  return null;
}
var Dr4 = L(() => {
  o6();
  T8();
  N8();
  Yj();
});
export {Jr4 as Kdc,shouldShowAutoDefaultNudge,Dr4 as zdc};
