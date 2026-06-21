// @ts-nocheck
import {Ep} from "./m4028.ts";
import {createBaseHookInput,executeHooks,yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
async function*executeTeammateIdleHooks(e,t,n,r,o=Ep,s){let i={...createBaseHookInput(n),hook_event_name:"TeammateIdle",teammate_name:e,team_name:t};yield*executeHooks({hookInput:i,toolUseID:rzn.randomUUID(),signal:r,timeoutMs:o,toolUseContext:s})}
async function*executeTaskCreatedHooks(e,t,n,r,o,s,i,a=Ep,l){let c={...createBaseHookInput(s),hook_event_name:"TaskCreated",task_id:e,task_subject:t,task_description:n,teammate_name:r,team_name:o};yield*executeHooks({hookInput:c,toolUseID:rzn.randomUUID(),signal:i,timeoutMs:a,toolUseContext:l})}
async function*executeTaskCompletedHooks(e,t,n,r,o,s,i,a=Ep,l){let c={...createBaseHookInput(s),hook_event_name:"TaskCompleted",task_id:e,task_subject:t,task_description:n,teammate_name:r,team_name:o};yield*executeHooks({hookInput:c,toolUseID:rzn.randomUUID(),signal:i,timeoutMs:a,toolUseContext:l})}
var rzn;
var R1l=b(()=>{yp();rzn=require("crypto")});
export {executeTeammateIdleHooks,executeTaskCreatedHooks,executeTaskCompletedHooks,rzn,R1l};
