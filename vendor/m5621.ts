// @ts-nocheck
import {isFullscreenWithTTY,b,M,ro} from "../runtime.ts";
import {Mc,bo,configProtoStore} from "./m2458.ts";
import {mcpTools,sJ} from "./m4311.ts";
import {IF,z5} from "../src/config/2700_isKairosCronEnabled.ts";
import {dd,Dd} from "./m687.ts";
import {_m,sA} from "./m2782.ts";
import {mainAgentId,setLoopTickInFlightPrompt,getProjectRoot,getLoopTickInFlightPrompt,lt} from "../src/session/0131_sent.ts";
import {vYe,oNe} from "./m1454.ts";
import {createCronScheduler,u1o} from "../src/config/5621_isRecurringTaskAged.ts";
import {jge,t2t,YHe} from "./m3881.ts";
import {nR,Ax} from "./m5146.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {mae,G5} from "./m2684.ts";
import {lFl,lo} from "../src/tools/5190_userPromptCount.ts";
import {getCronJitterConfig,xPt} from "../src/telemetry/2686_getCronJitterConfig.ts";
import {ANi,xRe,gNi,KAe} from "../src/config/2691_reason.ts";
import {Te} from "./m2253.ts";
import {b2e,S2e} from "../src/session/2690_resolveLoopFileFire.ts";
var erc={};
isFullscreenWithTTY(erc,{useScheduledTasks:()=>useScheduledTasks});
function useScheduledTasks({isLoading:e,assistantMode:t,setMessages:n}){let r=yht.useRef(e);r.current=e;let o=yht.useRef(null),s=Mc(),i=bo(),a=mcpTools();yht.useEffect(()=>{if(!IF()||dd()!==null)return;let l=(d)=>_m({value:a9m.resolveLoopDefaultFire(d),mode:"prompt",agentId:mainAgentId(),priority:"later",isMeta:!0,workload:vYe}),c=void 0,u=createCronScheduler({onFire:l,onFireTask:(d)=>{if(d.agentId){let m=jge(d.agentId,s.getState().tasks);if(m&&!nR(m.status)){t2t(m.id,d.prompt,a,{kind:"task-notification"});return}logForDebugging(`[ScheduledTasks] teammate ${d.agentId} gone, removing orphaned cron ${d.id}`),mae([d.id]);return}let p=lFl(d.kind==="loop"?`Claude resuming /loop wakeup (${Znc(new Date)})`:`Running scheduled task (${Znc(new Date)})`);if(n((m)=>[...m,p]),d.kind==="loop")setLoopTickInFlightPrompt(d.prompt);l(d.prompt)},isLoading:()=>r.current,assistantMode:t,getJitterConfig:getCronJitterConfig,isKilled:()=>!IF(),getExtraTasks:Qnc&&c?()=>Qnc.getRoutineCronTasks(getProjectRoot(),c):void 0});return u.start(),o.current=u,()=>{o.current=null,u.stop()}},[t,n,s.getState,a]),yht.useEffect(()=>{if(e)return;let l=getLoopTickInFlightPrompt();if(l!==null){if(setLoopTickInFlightPrompt(null),ANi()&&!xRe())gNi(l)}o.current?.checkNow()},[e])}
function Znc(e){return e.toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).replace(/,? at |, /," ").replace(/ ([AP]M)/,(t,n)=>n.toLowerCase())}
var yht,a9m,Qnc=null;
var trc=b(()=>{lt();sJ();lt();KAe();Dd();configProtoStore();Ax();YHe();z5();xPt();u1o();G5();qe();sA();lo();oNe();yht=M(Te(),1),a9m=(b2e(),ro(S2e))});
export {erc,useScheduledTasks,Znc,yht,a9m,Qnc,trc};
