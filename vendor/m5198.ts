// @ts-nocheck
import {Kd} from "./m4092.ts";
import {createBaseHookInput,executeHooks,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
async function*executeTeammateIdleHooks(e,t,n,r,o=Kd,s){let i={...createBaseHookInput(n),hook_event_name:"TeammateIdle",teammate_name:e,team_name:t};yield*executeHooks({hookInput:i,toolUseID:XXn.randomUUID(),signal:r,timeoutMs:o,toolUseContext:s})}
async function*executeTaskCreatedHooks(e,t,n,r,o,s,i,a=Kd,l){let c={...createBaseHookInput(s),hook_event_name:"TaskCreated",task_id:e,task_subject:t,task_description:n,teammate_name:r,team_name:o};yield*executeHooks({hookInput:c,toolUseID:XXn.randomUUID(),signal:i,timeoutMs:a,toolUseContext:l})}
async function*executeTaskCompletedHooks(e,t,n,r,o,s,i,a=Kd,l){let c={...createBaseHookInput(s),hook_event_name:"TaskCompleted",task_id:e,task_subject:t,task_description:n,teammate_name:r,team_name:o};yield*executeHooks({hookInput:c,toolUseID:XXn.randomUUID(),signal:i,timeoutMs:a,toolUseContext:l})}
var XXn;
var d4l=b(()=>{Wd();XXn=require("crypto")});
export {executeTeammateIdleHooks,executeTaskCreatedHooks,executeTaskCompletedHooks,XXn,d4l};
