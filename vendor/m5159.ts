// @ts-nocheck
import {Ep} from "./m4028.ts";
import {createBaseHookInput,executeHooksOutsideREPL,yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
async function executeInstructionsLoadedHooks(e,t,n,r){let{globs:o,triggerFilePath:s,parentFilePath:i,timeoutMs:a=Ep}=r??{},l={...createBaseHookInput(void 0),hook_event_name:"InstructionsLoaded",file_path:e,memory_type:t,load_reason:n,globs:o,trigger_file_path:s,parent_file_path:i};await executeHooksOutsideREPL({hookInput:l,timeoutMs:a,matchQuery:n})}
var y1l=b(()=>{yp()});
export {executeInstructionsLoadedHooks,y1l};
