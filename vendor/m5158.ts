// @ts-nocheck
import {executeHooksOutsideREPL,createBaseHookInput,yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
import {Tnt,K2e} from "./m2764.ts";
import {Ep} from "./m4028.ts";
import {b} from "../runtime.ts";
async function g1l(e,t){let n=await executeHooksOutsideREPL({hookInput:e,timeoutMs:t});if(n.length>0)Tnt();let r=n.flatMap((s)=>s.watchPaths??[]),o=n.map((s)=>s.systemMessage).filter((s)=>!!s);return{results:n,watchPaths:r,systemMessages:o}}
function executeCwdChangedHooks(e,t,n=Ep){let r={...createBaseHookInput(void 0),hook_event_name:"CwdChanged",old_cwd:e,new_cwd:t};return g1l(r,n)}
function executeFileChangedHooks(e,t,n=Ep){let r={...createBaseHookInput(void 0),hook_event_name:"FileChanged",file_path:e,event:t};return g1l(r,n)}
var _1l=b(()=>{yp();K2e()});
export {g1l,executeCwdChangedHooks,executeFileChangedHooks,_1l};
