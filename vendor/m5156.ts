// @ts-nocheck
import {Ep} from "./m4028.ts";
import {createBaseHookInput,executeHooksOutsideREPL,yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
async function executeConfigChangeHooks(e,t,n=Ep){let r={...createBaseHookInput(void 0),hook_event_name:"ConfigChange",source:e,file_path:t},o=await executeHooksOutsideREPL({hookInput:r,timeoutMs:n,matchQuery:e});if(e==="policy_settings")return o.map((s)=>({...s,blocked:!1}));return o}
var A1l=b(()=>{yp()});
export {executeConfigChangeHooks,A1l};
