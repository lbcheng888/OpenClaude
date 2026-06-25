// @ts-nocheck
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {hasHookForEvent,createBaseHookInput,executeHooks,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
var Kd=600000,W6a=30000;
async function*executeUserPromptExpansionHooks(e,t,n,r,o,s,i){let a=i.getAppState(),l=i.agentId??getSessionId();if(!hasHookForEvent("UserPromptExpansion",a,l))return;let c={...createBaseHookInput(s),hook_event_name:"UserPromptExpansion",expansion_type:e,command_name:t,command_args:n,command_source:r,prompt:o};yield*executeHooks({hookInput:c,toolUseID:G6a.randomUUID(),signal:i.abortController.signal,timeoutMs:Kd,toolUseContext:i})}
var G6a;
var Nmo=b(()=>{lt();Wd();G6a=require("crypto")});
export {Kd,W6a,executeUserPromptExpansionHooks,G6a,Nmo};
