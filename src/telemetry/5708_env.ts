// @ts-nocheck
import {getGlobalConfig as C_,saveGlobalConfig as P6,tr as T8} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getSettingsForSource as C6,ao as Yq,br as N8} from "../config/0745_updateSettingsForSource.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Ne as oH,AR as Sy} from "../../vendor/m583.ts";
import {He as vH,xe as IH,mn as M6} from "./0600_feature_name.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
/**
 * Auto-update migration into settings env.
 *
 * Restored from the Claude Code 2.1.177 bundle. Local comments and
 * TypeScript-only helper aliases document inferred intent; link-time symbols,
 * literals, operators, property names, and control flow are preserved.
 */
type RestoredUnknown = any;
type RestoredRecord = Record<string, RestoredUnknown>;
// FIXME: unverified name for preserved short bundle-local identifiers.

function da4(): RestoredUnknown {
  let H = C_();
  if (H.autoUpdates !== !1 || H.autoUpdatesProtectedForNative === !0) return;
  try {
    let _ = C6("userSettings") || {};
    Yq("userSettings", {
      ..._,
      env: {
        ..._.env,
        DISABLE_AUTOUPDATER: "1"
      }
    }), c("tengu_migrate_autoupdates_to_settings", {
      was_user_preference: !0,
      already_had_env_var: !!_.env?.DISABLE_AUTOUPDATER
    }), oH.set("DISABLE_AUTOUPDATER", !0), P6(q => {
      let {
        autoUpdates: K,
        autoUpdatesProtectedForNative: O,
        ...T
      } = q;
      return T;
    }), vH("migration_auto_updates_to_settings");
  } catch (_) {
    N(`Failed to migrate auto-updates: ${_}`, {
      level: "error"
    }), c("tengu_migrate_autoupdates_error", {
      has_error: !0
    }), IH("migration_auto_updates_to_settings", "migration_auto_updates_write_failed");
  }
}
var la4 = L(() => {
  y_();
  M6();
  T8();
  FH();
  Sy();
  N8();
});
export {da4 as xfc,la4 as Dfc};
