// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {getGlobalConfig as C_,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {getSettingsForSource as C6,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {isAutoModeGateEnabled as sW,ly as Yj} from "../permissions/5185_verifyAutoModeGateAccess.ts";
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

export {Jr4 as src,shouldShowAutoDefaultNudge,Dr4 as irc};
