// @ts-nocheck
import {getSessionId as kt,onSessionSwitch as iX,lt as ct} from "../session/0131_sent.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Br,WS as BS} from "../../vendor/m1456.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
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

export {Ze4 as wrc,Ge4 as Rrc};
