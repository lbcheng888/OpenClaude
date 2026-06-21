// @ts-nocheck
import {getRawCurrentProjectConfigEntry as VN8,deleteCurrentProjectConfigFields as v0_,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getSettingsForSource as C6,getLocalSettingsValidationErrors as ZJH,updateSettingsForSource as Yq,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {fs as T9} from "../api/0459_getOauthConfig.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Ie as vH,Oe as IH,ln as M6} from "./0594_feature_name.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {b as L} from "../../runtime.ts";
// FIXME: unverified name: oa4
/* Migrates legacy project MCP approval fields into local settings. */
/* Restored Claude Code 2.1.177 module: MCP approval settings migration telemetry..
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
function oa4(): any {
  let H = VN8();
  if (!H) return;
  // FIXME: unverified name: _
  let _ = (T: any): any => T !== void 0 && (!Array.isArray(T) || T.length > 0),
    q = H.enableAllProjectMcpServers !== void 0,
    K = _(H.enabledMcpjsonServers),
    O = _(H.disabledMcpjsonServers);
  if (!q && !K && !O) return;
  try {
    let T = C6("localSettings");
    if (ZJH().length > 0) {
      N("migrateEnableAllProjectMcpServersToSettings: deferring \u2014 settings.local.json carries validation errors a write could compound; will retry next startup", {
        level: "error"
      });
      return;
    }
    let z = T ?? {},
      $ = {},
      Y = [];
    if (q) {
      if (H.enableAllProjectMcpServers === !0 && z.enableAllProjectMcpServers === void 0) $.enableAllProjectMcpServers = !0;
      Y.push("enableAllProjectMcpServers");
    }
    if (K) {
      if (Array.isArray(H.enabledMcpjsonServers)) {
        let A = z.enabledMcpjsonServers || [],
          w = new Set(A);
        if (H.enabledMcpjsonServers.some((f: any): any => !w.has(f))) $.enabledMcpjsonServers = T9([...A, ...H.enabledMcpjsonServers]);
      }
      Y.push("enabledMcpjsonServers");
    }
    if (O) {
      if (Array.isArray(H.disabledMcpjsonServers)) {
        let A = z.disabledMcpjsonServers || [],
          w = new Set(A);
        if (H.disabledMcpjsonServers.some((f: any): any => !w.has(f))) $.disabledMcpjsonServers = T9([...A, ...H.disabledMcpjsonServers]);
      }
      Y.push("disabledMcpjsonServers");
    }
    if (Object.keys($).length > 0) {
      let {
        error: A
      } = Yq("localSettings", $);
      if (A) {
        N(`migrateEnableAllProjectMcpServersToSettings: settings write failed (${A.message}); will retry next startup`, {
          level: "error"
        });
        return;
      }
    }
    if (Y.length > 0) {
      if (!v0_(Y)) {
        N("migrateEnableAllProjectMcpServersToSettings: settings copy landed but legacy projectConfig fields could not be removed (unwritable config?); will retry next startup", {
          level: "error"
        });
        return;
      }
    }
    c("tengu_migrate_mcp_approval_fields_success", {
      migratedCount: Y.length
    }), vH("migration_mcp_servers_to_settings");
  } catch (T) {
    EH(T), c("tengu_migrate_mcp_approval_fields_error", {}), IH("migration_mcp_servers_to_settings", "migration_mcp_servers_unexpected_error");
  }
}
var aa4 = L((): any => {
  y_();
  M6();
  T8();
  FH();
  S6();
  N8();
});

export {oa4 as Vsc,aa4 as Ksc};
