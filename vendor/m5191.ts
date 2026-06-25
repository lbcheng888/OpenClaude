// @ts-nocheck
import {executeHooksOutsideREPL,createBaseHookInput,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {Rot,Z$e} from "./m2776.ts";
import {Kd} from "./m4092.ts";
import {b} from "../runtime.ts";
async function t4l(e,t){let n=await executeHooksOutsideREPL({hookInput:e,timeoutMs:t});if(n.length>0)Rot();let r=n.flatMap((s)=>s.watchPaths??[]),o=n.map((s)=>s.systemMessage).filter((s)=>!!s);return{results:n,watchPaths:r,systemMessages:o}}
function executeCwdChangedHooks(e,t,n=Kd){let r={...createBaseHookInput(void 0),hook_event_name:"CwdChanged",old_cwd:e,new_cwd:t};return t4l(r,n)}
function executeFileChangedHooks(e,t,n=Kd){let r={...createBaseHookInput(void 0),hook_event_name:"FileChanged",file_path:e,event:t};return t4l(r,n)}
var n4l=b(()=>{Wd();Z$e()});
export {t4l,executeCwdChangedHooks,executeFileChangedHooks,n4l};
