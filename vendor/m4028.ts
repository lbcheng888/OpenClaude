// @ts-nocheck
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {hasHookForEvent,createBaseHookInput,executeHooks,yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
var Ep=600000,hFa=30000;
async function*executeUserPromptExpansionHooks(e,t,n,r,o,s,i){let a=i.getAppState(),l=i.agentId??getSessionId();if(!hasHookForEvent("UserPromptExpansion",a,l))return;let c={...createBaseHookInput(s),hook_event_name:"UserPromptExpansion",expansion_type:e,command_name:t,command_args:n,command_source:r,prompt:o};yield*executeHooks({hookInput:c,toolUseID:gFa.randomUUID(),signal:i.abortController.signal,timeoutMs:Ep,toolUseContext:i})}
var gFa;
var Xao=b(()=>{lt();yp();gFa=require("crypto")});
export {Ep,hFa,executeUserPromptExpansionHooks,gFa,Xao};
