// @ts-nocheck
import {Kd} from "./m4092.ts";
import {createBaseHookInput,executeHooks,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
async function*executeMessageDisplayHooks(e,t,n,r=Kd){let o={...createBaseHookInput(void 0),hook_event_name:"MessageDisplay",turn_id:e.turnId,message_id:e.messageId,index:e.index,final:e.final,delta:e.delta};yield*executeHooks({hookInput:o,toolUseID:`${e.messageId}-${e.index}`,signal:n,timeoutMs:r,getAppState:t,forceSyncExecution:!0,suppressPerInvocationTelemetry:!0})}
var VOo=b(()=>{Wd()});
export {executeMessageDisplayHooks,VOo};
