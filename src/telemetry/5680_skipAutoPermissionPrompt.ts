// @ts-nocheck
import {getGlobalConfig as C_,saveGlobalConfig as P6,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getAutoModeEnabledState as au_,ly as Yj} from "../permissions/5185_verifyAutoModeGateAccess.ts";
import {getSettingsForSource as C6,updateSettingsForSource as Yq,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Ie as vH,Oe as IH,ln as M6} from "./0594_feature_name.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {b as L} from "../../runtime.ts";
/**
 * Migration: reset auto-mode opt-in when default offer changed.
 *
 * If the user previously accepted the auto-mode opt-in dialog
 * (`skipAutoPermissionPrompt === true` in userSettings) but did NOT choose
 * "auto" as their default mode (`permissions.defaultMode !== "auto"`), and
 * the auto-mode feature is currently enabled (`au_() === "enabled"`), this
 * migration clears `skipAutoPermissionPrompt` so the opt-in prompt can be
 * shown again for the new default-offer variant.
 *
 * Runs at most once per process: a `hasResetAutoModeOptInForDefaultOffer`
 * flag is set in the in-memory app-state store after the first execution
 * (whether or not the settings write was needed).
 *
 * Cross-module symbols (kept as-is to preserve linkage):
 *   C_   – getAppState() — current cached in-memory app state
 *   au_  – getAutoModeEnabledStatus() — returns "enabled" | "disabled" | "opt-in" | default
 *   C6   – getSettingsForSource(key) — read settings for a given source
 *   Yq   – updateSettingsForSource(key, patch) — write settings for a source
 *   c    – logEvent(eventName, props) — fire an analytics/telemetry event
 *   vH   – recordFeatureOk(featureName) — emit tengu_feature_ok telemetry
 *   P6   – updateAppState(updater) — update the in-memory app state store
 *   EH   – captureException(error) — report an error to the error-tracking sink
 *   IH   – recordFeatureBad(featureName, errorCode) — emit tengu_feature_bad
 *   L    – lazy-module initializer factory
 *   y_   – module init: core analytics sink
 *   M6   – module init: telemetry helpers (vH / IH)
 *   T8   – module init: session helpers
 *   S6   – module init: settings-source helpers (C6)
 *   Yj   – module init: autoMode / feature-flag helpers (au_)
 *   N8   – module init: settings write helpers (Yq)
 */

/**
 * Reset `skipAutoPermissionPrompt` in userSettings for users who previously
 * accepted the auto-mode opt-in but did not elect "auto" as their default
 * permission mode, so they will see the updated opt-in offer.
 *
 * Idempotent: skips immediately if the app-state guard
 * `hasResetAutoModeOptInForDefaultOffer` is already set, or if auto mode is
 * not currently enabled.
 */
function js4(): void {
  if (C_().hasResetAutoModeOptInForDefaultOffer) return;
  if (au_() !== "enabled") return;
  try {
    let userSettings = C6("userSettings");
    if (userSettings?.skipAutoPermissionPrompt && userSettings?.permissions?.defaultMode !== "auto") Yq("userSettings", {
      skipAutoPermissionPrompt: void 0
    }), c("tengu_migrate_reset_auto_opt_in_for_default_offer", {}), vH("migration_reset_auto_mode_opt_in");
    P6((appState: { hasResetAutoModeOptInForDefaultOffer?: boolean; [key: string]: unknown }) => {
      if (appState.hasResetAutoModeOptInForDefaultOffer) return appState;
      return {
        ...appState,
        hasResetAutoModeOptInForDefaultOffer: !0
      };
    });
  } catch (err: unknown) {
    EH(Error(`Failed to reset auto mode opt-in: ${err}`)), IH("migration_reset_auto_mode_opt_in", "migration_reset_auto_mode_write_failed");
  }
}

/** Lazy module initializer — ensures all dependency modules are ready. */
var Js4 = L(() => {
  y_();
  M6();
  T8();
  S6();
  Yj();
  N8();
});

export {js4 as lic,Js4 as cic};
