// @ts-nocheck
import {getGlobalConfig as C_,DEFAULT_GLOBAL_CONFIG as Xn,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getSettingsForSource as C6,updateSettingsForSource as Yq,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {$Qe as VrH,Ug as jf} from "../../vendor/m2264.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Ie as vH,Oe as IH,ln as M6} from "./0594_feature_name.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {b as L} from "../../runtime.ts";
/**
 * Migration: copy user-intent keys from global config into userSettings.
 *
 * Scans every key listed in VrH (the user-intent key list).  For each key:
 *  - skip if not present in global config
 *  - skip if the value is already the default (Xn[key])
 *  - skip if userSettings already has a value for that key
 * Writes the collected overrides to userSettings, fires a telemetry event
 * with the count, and marks the feature as successful via vH().
 * On write failure, reports the error via EH() and records a feature-bad
 * event via IH().
 */
function migrateUserIntentToSettings(): void {
  let globalConfig = C_(),
    currentUserSettings = C6("userSettings"),
    settingsToMigrate: Record<string, unknown> = {};

  for (let key of VrH) {
    let currentValue = globalConfig[key];
    if (currentValue === void 0) continue;
    if (currentValue === Xn[key]) continue;
    if (currentUserSettings?.[key] !== void 0) continue;
    settingsToMigrate[key] = currentValue;
  }

  if (Object.keys(settingsToMigrate).length === 0) return;

  try {
    Yq("userSettings", settingsToMigrate),
      c("tengu_migrate_user_intent_to_settings", {
        migrated_count: Object.keys(settingsToMigrate).length
      }),
      vH("migration_user_intent_to_settings");
  } catch (err) {
    EH(Error(`Failed to migrate user-intent settings: ${err}`)),
      IH("migration_user_intent_to_settings", "migration_user_intent_write_failed");
  }
}

/** Lazy-init block: ensures all dependent modules are initialised. */
var migrateUserIntentToSettings_init = L(() => {
  M6();
  y_();
  T8();
  S6();
  jf();
  N8();
});

export {migrateUserIntentToSettings as iic,migrateUserIntentToSettings_init as aic};
