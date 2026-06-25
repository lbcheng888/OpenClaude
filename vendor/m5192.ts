// @ts-nocheck
import {Kd} from "./m4092.ts";
import {createBaseHookInput,executeHooksOutsideREPL,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
async function executeInstructionsLoadedHooks(e,t,n,r){let{globs:o,triggerFilePath:s,parentFilePath:i,timeoutMs:a=Kd}=r??{},l={...createBaseHookInput(void 0),hook_event_name:"InstructionsLoaded",file_path:e,memory_type:t,load_reason:n,globs:o,trigger_file_path:s,parent_file_path:i};await executeHooksOutsideREPL({hookInput:l,timeoutMs:a,matchQuery:n})}
var r4l=b(()=>{Wd()});
export {executeInstructionsLoadedHooks,r4l};
