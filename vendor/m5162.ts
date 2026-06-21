// @ts-nocheck
import {Ep} from "./m4028.ts";
import {createBaseHookInput,executeHooks,executeHooksOutsideREPL,SESSION_END_HOOK_TIMEOUT_MS_DEFAULT,yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
import {getCurrentSessionTitle,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {qT,zE} from "./m125.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {_qe,x9} from "./m4033.ts";
import {b} from "../runtime.ts";
async function*executeSessionStartHooks(e,t,n,r,o,s,i=Ep,a){let l={...createBaseHookInput(void 0,t),hook_event_name:"SessionStart",source:e,agent_type:r,model:o,session_title:n??getCurrentSessionTitle(t!==void 0?qT(t):getSessionId())};yield*executeHooks({hookInput:l,toolUseID:tzn.randomUUID(),matchQuery:e,signal:s,timeoutMs:i,forceSyncExecution:a})}
async function*executeSetupHooks(e,t,n=Ep,r){let o={...createBaseHookInput(void 0),hook_event_name:"Setup",trigger:e};yield*executeHooks({hookInput:o,toolUseID:tzn.randomUUID(),matchQuery:e,signal:t,timeoutMs:n,forceSyncExecution:r})}
async function*executeSubagentStartHooks(e,t,n,r=Ep,o){let s={...createBaseHookInput(void 0),hook_event_name:"SubagentStart",agent_id:e,agent_type:t};yield*executeHooks({hookInput:s,toolUseID:tzn.randomUUID(),matchQuery:t,signal:n,timeoutMs:r,getAppState:o})}
async function executeSessionEndHooks(e,t){let{getAppState:n,setAppState:r,signal:o}=t||{},s={...createBaseHookInput(void 0),hook_event_name:"SessionEnd",reason:e},i=await executeHooksOutsideREPL({getAppState:n,hookInput:s,matchQuery:e,signal:o,timeoutMs:SESSION_END_HOOK_TIMEOUT_MS_DEFAULT});for(let a of i)if(!a.succeeded&&a.output)process.stderr.write(`SessionEnd hook [${a.command}] failed: ${a.output}
`);if(r){let a=getSessionId();_qe(r,a)}}
var tzn;
var S1l=b(()=>{lt();zE();yp();ja();x9();tzn=require("crypto")});
export {executeSessionStartHooks,executeSetupHooks,executeSubagentStartHooks,executeSessionEndHooks,tzn,S1l};
