// @ts-nocheck
import {ft,b,x,oo} from "../runtime.ts";
import {gc,bo,uo} from "./m2468.ts";
import {shellToolNames,isReplMode} from "./m4331.ts";
import {isKairosCronEnabled,cW} from "../src/config/2712_isKairosCronEnabled.ts";
import {Nu,Wu} from "./m438.ts";
import {rd,ef} from "./m2794.ts";
import {mainAgentId,setLoopTickInFlightPrompt,getProjectRoot,getLoopTickInFlightPrompt,lt} from "../src/session/0132_sent.ts";
import {CXe,eFe} from "./m1459.ts";
import {createCronScheduler,P2o} from "../src/config/5658_isRecurringTaskAged.ts";
import {iye,k9t,F0e} from "./m3899.ts";
import {lv,vw} from "./m5178.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {uae,iW} from "./m2696.ts";
import {J6l,po} from "../src/tools/5224_userPromptCount.ts";
import {getCronJitterConfig,iMt} from "../src/telemetry/2698_getCronJitterConfig.ts";
import {e3i,pke,n3i,age} from "../src/config/2703_reason.ts";
import {et} from "./m2261.ts";
import {k$e,w$e} from "../src/session/2702_resolveLoopFileFire.ts";
var Udc={};
ft(Udc,{useScheduledTasks:()=>useScheduledTasks});
function useScheduledTasks({isLoading:e,assistantMode:t,setMessages:n}){let r=$yt.useRef(e);r.current=e;let o=$yt.useRef(null),s=gc(),i=bo(),a=shellToolNames();$yt.useEffect(()=>{if(!isKairosCronEnabled()||Nu()!==null)return;let l=(d)=>rd({value:PVm.resolveLoopDefaultFire(d),mode:"prompt",agentId:mainAgentId(),priority:"later",isMeta:!0,workload:CXe}),c=void 0,u=createCronScheduler({onFire:l,onFireTask:(d)=>{if(d.agentId){let m=iye(d.agentId,s.getState().tasks);if(m&&!lv(m.status)){k9t(m.id,d.prompt,a,{kind:"task-notification"});return}logForDebugging(`[ScheduledTasks] teammate ${d.agentId} gone, removing orphaned cron ${d.id}`),uae([d.id]);return}let p=J6l(d.kind==="loop"?`Claude resuming /loop wakeup (${Bdc(new Date)})`:`Running scheduled task (${Bdc(new Date)})`);if(n((m)=>[...m,p]),d.kind==="loop")setLoopTickInFlightPrompt(d.prompt);l(d.prompt)},isLoading:()=>r.current,assistantMode:t,getJitterConfig:getCronJitterConfig,isKilled:()=>!isKairosCronEnabled(),getExtraTasks:Fdc&&c?()=>Fdc.getRoutineCronTasks(getProjectRoot(),c):void 0});return u.start(),o.current=u,()=>{o.current=null,u.stop()}},[t,n,s.getState,a]),$yt.useEffect(()=>{if(e)return;let l=getLoopTickInFlightPrompt();if(l!==null){if(setLoopTickInFlightPrompt(null),e3i()&&!pke())n3i(l)}o.current?.checkNow()},[e])}
function Bdc(e){return e.toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).replace(/,? at |, /," ").replace(/ ([AP]M)/,(t,n)=>n.toLowerCase())}
var $yt,PVm,Fdc=null;
var $dc=b(()=>{lt();isReplMode();lt();age();Wu();uo();vw();F0e();cW();iMt();P2o();iW();qe();ef();po();eFe();$yt=x(et(),1),PVm=(k$e(),oo(w$e))});
export {Udc,useScheduledTasks,Bdc,$yt,PVm,Fdc,$dc};
