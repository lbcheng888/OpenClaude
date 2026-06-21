// @ts-nocheck
import {getGlobalConfig as C_,saveGlobalConfig as P6,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getSettingsForSource as C6,updateSettingsForSource as Yq,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {je as oH,tk as Sy} from "../../vendor/m577.ts";
import {Ie as vH,Oe as IH,ln as M6} from "./0594_feature_name.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
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
export {da4 as qsc,la4 as jsc};
