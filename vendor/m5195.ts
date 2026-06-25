// @ts-nocheck
import {Kd} from "./m4092.ts";
import {createBaseHookInput,executeHooks,executeHooksOutsideREPL,SESSION_END_HOOK_TIMEOUT_MS_DEFAULT,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {getCurrentSessionTitle,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {FT,xS} from "./m122.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {Bmo,vY} from "./m4097.ts";
import {b} from "../runtime.ts";
async function*executeSessionStartHooks(e,t,n,r,o,s,i=Kd,a){let l={...createBaseHookInput(void 0,t),hook_event_name:"SessionStart",source:e,agent_type:r,model:o,session_title:n??getCurrentSessionTitle(t!==void 0?FT(t):getSessionId())};yield*executeHooks({hookInput:l,toolUseID:YXn.randomUUID(),matchQuery:e,signal:s,timeoutMs:i,forceSyncExecution:a})}
async function*executeSetupHooks(e,t,n=Kd,r){let o={...createBaseHookInput(void 0),hook_event_name:"Setup",trigger:e};yield*executeHooks({hookInput:o,toolUseID:YXn.randomUUID(),matchQuery:e,signal:t,timeoutMs:n,forceSyncExecution:r})}
async function*executeSubagentStartHooks(e,t,n,r=Kd,o){let s={...createBaseHookInput(void 0),hook_event_name:"SubagentStart",agent_id:e,agent_type:t};yield*executeHooks({hookInput:s,toolUseID:YXn.randomUUID(),matchQuery:t,signal:n,timeoutMs:r,getAppState:o})}
async function executeSessionEndHooks(e,t){let{getAppState:n,setAppState:r,signal:o}=t||{},s={...createBaseHookInput(void 0),hook_event_name:"SessionEnd",reason:e},i=await executeHooksOutsideREPL({getAppState:n,hookInput:s,matchQuery:e,signal:o,timeoutMs:SESSION_END_HOOK_TIMEOUT_MS_DEFAULT});for(let a of i)if(!a.succeeded&&a.output)process.stderr.write(`SessionEnd hook [${a.command}] failed: ${a.output}
`);if(r){let a=getSessionId();Bmo(r,a)}}
var YXn;
var s4l=b(()=>{lt();xS();Wd();_a();vY();YXn=require("crypto")});
export {executeSessionStartHooks,executeSetupHooks,executeSubagentStartHooks,executeSessionEndHooks,YXn,s4l};
