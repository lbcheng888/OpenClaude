// @ts-nocheck
import {Kd} from "./m4092.ts";
import {createBaseHookInput,executeHooksOutsideREPL,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
async function executeConfigChangeHooks(e,t,n=Kd){let r={...createBaseHookInput(void 0),hook_event_name:"ConfigChange",source:e,file_path:t},o=await executeHooksOutsideREPL({hookInput:r,timeoutMs:n,matchQuery:e});if(e==="policy_settings")return o.map((s)=>({...s,blocked:!1}));return o}
var Z3l=b(()=>{Wd()});
export {executeConfigChangeHooks,Z3l};
