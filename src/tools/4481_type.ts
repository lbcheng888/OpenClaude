// @ts-nocheck
import {isClaudeAISubscriber as Co,lo as mo} from "../config/2036_withOAuthRefreshLock.ts";
import {isPolicyAllowed as ii,Bu as sd} from "../../vendor/m2213.ts";
import {b} from "../../runtime.ts";
import {lt as ct,getIsNonInteractiveSession as kr} from "../session/0132_sent.ts";
import {bul as lnl,Sul as anl} from "../../vendor/m4479.ts";
// @ts-nocheck
function isRemoteSessionsAllowed() {
  return Co() && ii("allow_remote_sessions");
}
var yCO, isK;
var rsK = b(() => {
  ct();
  sd();
  mo();
  yCO = {
    type: "local-jsx",
    name: "autofix-pr",
    description: "Monitor and autofix any issues with the current PR",
    argumentHint: undefined,
    isEnabled: () => isRemoteSessionsAllowed() && !kr(),
    get isHidden() {
      return !isRemoteSessionsAllowed();
    },
    async load() {
      return await Promise.resolve().then(() => (lnl(), anl));
    },
    userFacingName() {
      return "autofix-pr";
    }
  }, isK = yCO;
});
export {isRemoteSessionsAllowed as Eul,yCO as ijp,isK as Cul,rsK as Aul};
