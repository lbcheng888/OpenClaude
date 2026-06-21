// @ts-nocheck
import {Ep} from "./m4028.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {hasHookForEvent,createBaseHookInput,executeHooksOutsideREPL,executeHooks,yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
import {wc,_P,lo} from "../src/tools/5190_userPromptCount.ts";
import {b1l,E1l,C1l} from "./m5163.ts";
import {hP,ry} from "../src/agent/2772_withFileTypes.ts";
import {b} from "../runtime.ts";
async function executeStopFailureHooks(e,t,n=Ep){let r=t?.getAppState(),o=getSessionId();if(!hasHookForEvent("StopFailure",r,o))return;let s=wc(e.message.content,`
`).trim()||void 0,i=e.error??"unknown",a={...createBaseHookInput(void 0,void 0,t),hook_event_name:"StopFailure",error:i,error_details:e.errorDetails,last_assistant_message:s};await executeHooksOutsideREPL({getAppState:t?.getAppState,hookInput:a,timeoutMs:n,matchQuery:i})}
async function*executeStopHooks(e,t,n=Ep,r=!1,o,s,i,a){let l=o?"SubagentStop":"Stop",c=s?.getAppState(),u=s?.agentId??getSessionId();if(!hasHookForEvent(l,c,u))return;let d=i?_P(i):void 0,p=d?wc(d.message.content,`
`).trim()||void 0:void 0,m=s?{background_tasks:b1l(s.taskRegistry.all()),session_crons:E1l()}:void 0,f=o?{...createBaseHookInput(e,void 0,s),hook_event_name:"SubagentStop",stop_hook_active:r,agent_id:o,agent_transcript_path:hP(o),agent_type:a??"",last_assistant_message:p,...m}:{...createBaseHookInput(e,void 0,s),hook_event_name:"Stop",stop_hook_active:r,last_assistant_message:p,...m},A;yield*executeHooks({hookInput:f,extendedHookInput:A,toolUseID:v1l.randomUUID(),signal:t,timeoutMs:n,toolUseContext:s,messages:i})}
var v1l;
var w1l=b(()=>{lt();yp();lo();ry();C1l();v1l=require("crypto")});
export {executeStopFailureHooks,executeStopHooks,v1l,w1l};
