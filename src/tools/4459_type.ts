// @ts-nocheck
import {isClaudeAISubscriber as Co,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {isPolicyAllowed as ii,rd as sd} from "../../vendor/m2205.ts";
import {b} from "../../runtime.ts";
import {lt as ct,getIsNonInteractiveSession as kr} from "../session/0131_sent.ts";
import {Lrl as lnl,Orl as anl} from "../../vendor/m4457.ts";
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

export {isRemoteSessionsAllowed as Mrl,yCO as b6p,isK as Nrl,rsK as Brl};
