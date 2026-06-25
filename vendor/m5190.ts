// @ts-nocheck
import {Kd} from "./m4092.ts";
import {createBaseHookInput,executeHooksOutsideREPL,parseElicitationHookOutput,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
async function executeElicitationHooks({serverName:e,message:t,requestedSchema:n,permissionMode:r,signal:o,timeoutMs:s=Kd,mode:i,url:a,elicitationId:l}){let c={...createBaseHookInput(r),hook_event_name:"Elicitation",mcp_server_name:e,message:t,mode:i,url:a,elicitation_id:l,requested_schema:n},u=await executeHooksOutsideREPL({hookInput:c,matchQuery:e,signal:o,timeoutMs:s}),d,p;for(let m of u){let f=parseElicitationHookOutput(m,"Elicitation");if(f.blockingError)p=f.blockingError;if(f.response)d=f.response}return{elicitationResponse:d,blockingError:p}}
async function executeElicitationResultHooks({serverName:e,action:t,content:n,permissionMode:r,signal:o,timeoutMs:s=Kd,mode:i,elicitationId:a}){let l={...createBaseHookInput(r),hook_event_name:"ElicitationResult",mcp_server_name:e,elicitation_id:a,mode:i,action:t,content:n},c=await executeHooksOutsideREPL({hookInput:l,matchQuery:e,signal:o,timeoutMs:s}),u,d;for(let p of c){let m=parseElicitationHookOutput(p,"ElicitationResult");if(m.blockingError)d=m.blockingError;if(m.response)u=m.response}return{elicitationResultResponse:u,blockingError:d}}
var e4l=b(()=>{Wd()});
export {executeElicitationHooks,executeElicitationResultHooks,e4l};
