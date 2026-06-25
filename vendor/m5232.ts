// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {enableConfigs,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {cYe,fCe} from "./m741.ts";
import {O6e,L6e} from "../src/config/4012_ANTHROPIC_UNIX_SOCKET.ts";
import {q5l,jMo} from "./m5231.ts";
import {Esn,Aoe,tNe} from "../src/config/0744_level.ts";
import {getBasePolicySettings,getBasePolicySettingsOrigin,br} from "../src/config/0745_updateSettingsForSource.ts";
import {IXe} from "./m1483.ts";
var ASe={};
ft(ASe,{runFastPathPolicyHelper:()=>runFastPathPolicyHelper,resetFastPathPolicyForTesting:()=>resetFastPathPolicyForTesting,loadFastPathPolicy:()=>loadFastPathPolicy,ensureFastPathSettingsLoaded:()=>ensureFastPathSettingsLoaded});
async function ensureFastPathSettingsLoaded(){if(YMo)return;YMo=!0,enableConfigs(),await cYe(),O6e();let e=q5l();if(e)process.stderr.write(`${e}
`),process.exit(1)}
async function runFastPathPolicyHelper(){if(N_t)return N_t.error;if(N_t={error:null},N_t.error=await Esn(getBasePolicySettings(),getBasePolicySettingsOrigin()),Aoe())O6e();return N_t.error}
async function loadFastPathPolicy(){return await ensureFastPathSettingsLoaded(),runFastPathPolicyHelper()}
function resetFastPathPolicyForTesting(){YMo=!1,N_t=null}
var YMo=!1,N_t=null;
var rde=b(()=>{tr();L6e();jMo();IXe();fCe();tNe();br()});
export {ASe,ensureFastPathSettingsLoaded,runFastPathPolicyHelper,loadFastPathPolicy,resetFastPathPolicyForTesting,YMo,N_t,rde};
