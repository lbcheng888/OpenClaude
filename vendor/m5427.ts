// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {or,dn} from "../src/config/0137_namespace.ts";
import {r5t,TWn} from "../src/tools/4404_isAllowedAutoMemWritePath.ts";
import {H9i,xrt} from "./m2692.ts";
import {Psl,XSo} from "../src/telemetry/4408_minHours.ts";
import {Bbl,K7n} from "../src/telemetry/4709_scope.ts";
import {getIsInteractive,getLastInteractionTime,lt} from "../src/session/0132_sent.ts";
import {tXl,fBo} from "./m5426.ts";
import {touchSessionTranscript,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {WJl,GJl} from "../src/agent/5425_errors.ts";
import {sp,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b$t} from "../src/config/3778_level.ts";
import {rY} from "./m3778.ts";
var iXl={};
ft(iXl,{startBackgroundHousekeeping:()=>startBackgroundHousekeeping,isLastCleanupSentinelFresh:()=>isLastCleanupSentinelFresh,TRANSCRIPT_HEARTBEAT_INTERVAL_MS:()=>TRANSCRIPT_HEARTBEAT_INTERVAL_MS,STALE_CLEANUP_CATCHUP_DELAY_MS:()=>STALE_CLEANUP_CATCHUP_DELAY_MS,DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION:()=>DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION});
async function isLastCleanupSentinelFresh(){try{let e=await ltr.stat(hBo.join(or(),".last-cleanup"));return Date.now()-e.mtimeMs<a2m}catch{return!1}}
async function startBackgroundHousekeeping(){{let{initExtractMemories:r}=await Promise.resolve().then(() => (r5t(),TWn));r()}if(H9i(),Psl(),Bbl(),getIsInteractive())tXl(),touchSessionTranscript(),setInterval(touchSessionTranscript,TRANSCRIPT_HEARTBEAT_INTERVAL_MS).unref();let e=!0,t=!1;async function n(){if(getIsInteractive()&&getLastInteractionTime()>Date.now()-60000){setTimeout(n,DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION).unref();return}if(e){if(!t){if(t=!0,await isLastCleanupSentinelFresh()){setTimeout(n,DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION).unref();return}}e=!1,await WJl(),await ltr.writeFile(hBo.join(or(),".last-cleanup"),new Date().toISOString()).catch((r)=>sp(r)?logForDebugging(`.last-cleanup write failed: ${r.code} ${r.message}`,{level:"error"}):Ie(r))}if(getIsInteractive()&&getLastInteractionTime()>Date.now()-60000){setTimeout(n,DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION).unref();return}await b$t()}setTimeout(n,STALE_CLEANUP_CATCHUP_DELAY_MS).unref()}
var ltr,hBo,a2m=86400000,DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION=600000,STALE_CLEANUP_CATCHUP_DELAY_MS=5000,TRANSCRIPT_HEARTBEAT_INTERVAL_MS=3600000;
var _Bo=b(()=>{lt();xrt();XSo();GJl();qe();fBo();dn();Ct();vn();rY();K7n();_a();ltr=require("fs/promises"),hBo=require("path")});
export {iXl,isLastCleanupSentinelFresh,startBackgroundHousekeeping,ltr,hBo,a2m,DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION,STALE_CLEANUP_CATCHUP_DELAY_MS,TRANSCRIPT_HEARTBEAT_INTERVAL_MS,_Bo};
