// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {tr,sn} from "../src/config/0047_namespace.ts";
import {I4t,Zqn} from "../src/tools/4382_isAllowedAutoMemWritePath.ts";
import {W1i,xtt} from "./m2681.ts";
import {JQa,iho} from "../src/telemetry/4386_minHours.ts";
import {zml,cWn} from "../src/telemetry/4681_scope.ts";
import {getIsInteractive,getLastInteractionTime,lt} from "../src/session/0131_sent.ts";
import {g5l,YOo} from "./m5392.ts";
import {touchSessionTranscript,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {s5l,i5l} from "../src/agent/5391_errors.ts";
import {qp,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {GFt} from "../src/config/3762_level.ts";
import {wY} from "./m3762.ts";
var b5l={};
isFullscreenWithTTY(b5l,{startBackgroundHousekeeping:()=>startBackgroundHousekeeping,isLastCleanupSentinelFresh:()=>isLastCleanupSentinelFresh,TRANSCRIPT_HEARTBEAT_INTERVAL_MS:()=>TRANSCRIPT_HEARTBEAT_INTERVAL_MS,STALE_CLEANUP_CATCHUP_DELAY_MS:()=>STALE_CLEANUP_CATCHUP_DELAY_MS,DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION:()=>DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION});
async function isLastCleanupSentinelFresh(){try{let e=await aXn.stat(JOo.join(tr(),".last-cleanup"));return Date.now()-e.mtimeMs<QDm}catch{return!1}}
async function startBackgroundHousekeeping(){{let{initExtractMemories:r}=await Promise.resolve().then(() => (I4t(),Zqn));r()}if(W1i(),JQa(),zml(),getIsInteractive())g5l(),touchSessionTranscript(),setInterval(touchSessionTranscript,TRANSCRIPT_HEARTBEAT_INTERVAL_MS).unref();let e=!0,t=!1;async function n(){if(getIsInteractive()&&getLastInteractionTime()>Date.now()-60000){setTimeout(n,DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION).unref();return}if(e){if(!t){if(t=!0,await isLastCleanupSentinelFresh()){setTimeout(n,DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION).unref();return}}e=!1,await s5l(),await aXn.writeFile(JOo.join(tr(),".last-cleanup"),new Date().toISOString()).catch((r)=>qp(r)?logForDebugging(`.last-cleanup write failed: ${r.code} ${r.message}`,{level:"error"}):De(r))}if(getIsInteractive()&&getLastInteractionTime()>Date.now()-60000){setTimeout(n,DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION).unref();return}await GFt()}setTimeout(n,STALE_CLEANUP_CATCHUP_DELAY_MS).unref()}
var aXn,JOo,QDm=86400000,DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION=600000,STALE_CLEANUP_CATCHUP_DELAY_MS=5000,TRANSCRIPT_HEARTBEAT_INTERVAL_MS=3600000;
var QOo=b(()=>{lt();xtt();iho();i5l();qe();YOo();sn();bt();Rn();wY();cWn();ja();aXn=require("fs/promises"),JOo=require("path")});
export {b5l,isLastCleanupSentinelFresh,startBackgroundHousekeeping,aXn,JOo,QDm,DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION,STALE_CLEANUP_CATCHUP_DELAY_MS,TRANSCRIPT_HEARTBEAT_INTERVAL_MS,QOo};
