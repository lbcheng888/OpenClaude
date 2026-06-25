// @ts-nocheck
import {getSessionId as kt,onSessionSwitch as iX,lt as ct} from "../session/0132_sent.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {xr as Br,QT as BS} from "../../vendor/m1461.ts";
import {Le as Ue} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function Ze4(permissionContext) {
  let extraFields = {},
    currentSessionId = kt();
  return {
    unsubscribe: iX((newSessionId, switchSource) => {
      if (newSessionId === currentSessionId) return;
      let prevSessionId = currentSessionId;
      currentSessionId = newSessionId, j("tengu_session_start", {
        previous_session_id: Br(prevSessionId),
        source: Ue(switchSource),
        permissionMode: permissionContext.permissionMode,
        dangerouslySkipPermissionsPassed: permissionContext.dangerouslySkipPermissionsPassed,
        modeIsBypass: permissionContext.modeIsBypass,
        print: permissionContext.print,
        ...extraFields
      });
    }),
    updateContext(newFields) {
      extraFields = {
        ...extraFields,
        ...newFields
      };
    }
  };
}
var Ge4 = b(() => {
  ct();
  Ct();
  BS();
});
export {Ze4 as fpc,Ge4 as hpc};
