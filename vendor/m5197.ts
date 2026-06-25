// @ts-nocheck
import {Kd} from "./m4092.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {hasHookForEvent,createBaseHookInput,executeHooksOutsideREPL,executeHooks,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {Kl,xD,po} from "../src/tools/5224_userPromptCount.ts";
import {i4l,a4l,l4l} from "./m5196.ts";
import {jk,D_} from "../src/agent/2784_withFileTypes.ts";
import {b} from "../runtime.ts";
async function executeStopFailureHooks(e,t,n=Kd){let r=t?.getAppState(),o=getSessionId();if(!hasHookForEvent("StopFailure",r,o))return;let s=Kl(e.message.content,`
`).trim()||void 0,i=e.error??"unknown",a={...createBaseHookInput(void 0,void 0,t),hook_event_name:"StopFailure",error:i,error_details:e.errorDetails,last_assistant_message:s};await executeHooksOutsideREPL({getAppState:t?.getAppState,hookInput:a,timeoutMs:n,matchQuery:i})}
async function*executeStopHooks(e,t,n=Kd,r=!1,o,s,i,a){let l=o?"SubagentStop":"Stop",c=s?.getAppState(),u=s?.agentId??getSessionId();if(!hasHookForEvent(l,c,u))return;let d=i?xD(i):void 0,p=d?Kl(d.message.content,`
`).trim()||void 0:void 0,m=s?{background_tasks:i4l(s.taskRegistry.all()),session_crons:a4l()}:void 0,f=o?{...createBaseHookInput(e,void 0,s),hook_event_name:"SubagentStop",stop_hook_active:r,agent_id:o,agent_transcript_path:jk(o),agent_type:a??"",last_assistant_message:p,...m}:{...createBaseHookInput(e,void 0,s),hook_event_name:"Stop",stop_hook_active:r,last_assistant_message:p,...m},h;yield*executeHooks({hookInput:f,extendedHookInput:h,toolUseID:c4l.randomUUID(),signal:t,timeoutMs:n,toolUseContext:s,messages:i})}
var c4l;
var u4l=b(()=>{lt();Wd();po();D_();l4l();c4l=require("crypto")});
export {executeStopFailureHooks,executeStopHooks,c4l,u4l};
