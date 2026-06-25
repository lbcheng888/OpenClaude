// @ts-nocheck
import {getGlobalConfig as C_,saveGlobalConfig as P6,tr as T8} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {hasSkipDangerousModePermissionPrompt as RI,ao as Yq,br as N8} from "../config/0745_updateSettingsForSource.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {He as vH,xe as IH,mn as M6} from "./0600_feature_name.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
/**
 * Migration: bypass-permissions accepted → user settings file.
 *
 * Moves the legacy `bypassPermissionsModeAccepted` flag stored in the
 * in-memory/cached settings into the persisted `userSettings` file as
 * `skipDangerousModePermissionPrompt`, then removes the old key from the
 * in-memory store.  Emits telemetry for both success and failure paths.
 *
 * Cross-module symbols (kept as-is to preserve linkage):
 *   C_   – get current cached settings object
 *   RI   – check whether running in a read-only / CI environment
 *   Yq   – write a settings source (e.g. "userSettings")
 *   c    – fire a telemetry event
 *   P6   – mutate the in-memory settings store via an updater function
 *   vH   – record a "feature_ok" telemetry event
 *   N    – log a message (with optional level)
 *   IH   – record a "feature_bad" telemetry event
 *   L    – lazy-module initializer factory
 *   y_   – module init: core logging
 *   M6   – module init: telemetry helpers (vH / IH)
 *   T8   – module init: session helpers
 *   FH   – module init: settings helpers (C_ / P6 / Yq)
 *   N8   – module init: settings write helpers
 */

/**
 * Migrate the legacy `bypassPermissionsModeAccepted` flag out of the
 * in-memory settings and into the persisted `userSettings` file as
 * `skipDangerousModePermissionPrompt`.
 *
 * No-op when `bypassPermissionsModeAccepted` is not set, or when the
 * environment is read-only (`RI()` returns truthy).
 */
function na4(): void {
  if (!C_().bypassPermissionsModeAccepted) return;
  try {
    if (!RI()) Yq("userSettings", {
      skipDangerousModePermissionPrompt: !0
    });
    c("tengu_migrate_bypass_permissions_accepted", {}), P6((_: Record<string, unknown>) => {
      if (!("bypassPermissionsModeAccepted" in _)) return _;
      let {
        bypassPermissionsModeAccepted: _removedFlag,
        ...settingsWithoutFlag
      } = _;
      return settingsWithoutFlag;
    }), vH("migration_bypass_permissions_to_settings");
  } catch (err: unknown) {
    N(`Failed to migrate bypass permissions accepted: ${err}`, {
      level: "error"
    }), IH("migration_bypass_permissions_to_settings", "migration_bypass_permissions_write_failed");
  }
}

/** Lazy module initializer — ensures all dependency modules are ready. */
var ia4 = L(() => {
  y_();
  M6();
  T8();
  FH();
  N8();
});
export {na4 as Pfc,ia4 as Ofc};
