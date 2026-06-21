// @ts-nocheck
import {isAgentsFleetEnabled,bv} from "../src/config/2204_shouldShowLaunchComposer.ts";
import {getIsRemoteMode,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function AJ(){return isAgentsFleetEnabled()&&!getIsRemoteMode()}
var Bpt=b(()=>{lt();bv()});
export {AJ,Bpt};
