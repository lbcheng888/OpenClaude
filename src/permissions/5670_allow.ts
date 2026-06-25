// @ts-nocheck
import {setMemoryToggledOff as C$_,lt as w_} from "../session/0132_sent.ts";
import {initializeToolPermissionContext as UTq,$6 as TU,cy as FH} from "./5219_verifyAutoModeGateAccess.ts";
import {b as L} from "../../runtime.ts";
import {lr as Yj} from "../../vendor/m233.ts";
/*
 * permissions/5589_allow.ts - permission-rule restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
function ykT(): any {
  let H = process.env.CLAUDE_BG_SESSION_PERMISSION_RULES;
  if (!H || process.env.CLAUDE_CODE_SESSION_KIND !== "bg") return;
  try {
    let _ = JSON.parse(H);
    return Array.isArray(_.allow) && Array.isArray(_.deny) ? {
      allow: _.allow,
      deny: _.deny
    } : void 0;
  } catch {
    return;
  }
}
function vkT(): any {
  if (process.env.CLAUDE_BG_MEMORY_TOGGLED_OFF === "1" && process.env.CLAUDE_CODE_SESSION_KIND === "bg") C$_(!0);
}
async function pr4(H: any): Promise<any> {
  vkT();
  let _ = await UTq({
      allowedToolsCli: H.allowedTools,
      disallowedToolsCli: H.disallowedTools,
      baseToolsCli: H.baseTools,
      permissionMode: H.permissionMode,
      allowDangerouslySkipPermissions: H.allowDangerouslySkipPermissions,
      addDirs: H.addDirs,
      bgSessionPermissionRules: ykT()
    }),
    toolPermissionContext = _.toolPermissionContext,
    {
      warnings: warnings,
      dangerousPermissions: dangerousPermissions,
      overlyBroadBashPermissions: overlyBroadBashPermissions
    } = _;
  if (H.permissionMode === "auto") toolPermissionContext = TU(toolPermissionContext);
  return {
    toolPermissionContext: toolPermissionContext,
    warnings: warnings,
    dangerousPermissions: dangerousPermissions,
    overlyBroadBashPermissions: overlyBroadBashPermissions
  };
}
var Br4 = L((): any => {
  w_();
  FH();
  Yj();
});
export {ykT as oKm,vkT as sKm,pr4 as _pc,Br4 as ypc};
