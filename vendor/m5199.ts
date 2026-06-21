// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {enableConfigs,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {dKe,Dbe} from "./m736.ts";
import {M8e,yAt} from "../src/config/5198_ANTHROPIC_UNIX_SOCKET.ts";
import {ZFl,k0o} from "./m5198.ts";
import {Fnn,woe,l1e} from "../src/config/0739_level.ts";
import {getBasePolicySettings,getBasePolicySettingsOrigin,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {DYe} from "./m1478.ts";
var zye={};
isFullscreenWithTTY(zye,{runFastPathPolicyHelper:()=>runFastPathPolicyHelper,resetFastPathPolicyForTesting:()=>resetFastPathPolicyForTesting,loadFastPathPolicy:()=>loadFastPathPolicy,ensureFastPathSettingsLoaded:()=>ensureFastPathSettingsLoaded});
async function ensureFastPathSettingsLoaded(){if(H0o)return;H0o=!0,enableConfigs(),await dKe(),M8e();let e=ZFl();if(e)process.stderr.write(`${e}
`),process.exit(1)}
async function runFastPathPolicyHelper(){if(TAt)return TAt.error;if(TAt={error:null},TAt.error=await Fnn(getBasePolicySettings(),getBasePolicySettingsOrigin()),woe())M8e();return TAt.error}
async function loadFastPathPolicy(){return await ensureFastPathSettingsLoaded(),runFastPathPolicyHelper()}
function resetFastPathPolicyForTesting(){H0o=!1,TAt=null}
var H0o=!1,TAt=null;
var Jue=b(()=>{Qn();yAt();k0o();DYe();Dbe();l1e();yr()});
export {zye,ensureFastPathSettingsLoaded,runFastPathPolicyHelper,loadFastPathPolicy,resetFastPathPolicyForTesting,H0o,TAt,Jue};
