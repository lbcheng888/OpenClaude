// @ts-nocheck
import {Kd} from "./m4092.ts";
import {createBaseHookInput,executeHooksOutsideREPL,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
async function executeNotificationHooks(e,t=Kd){let{message:n,title:r,notificationType:o}=e,s={...createBaseHookInput(void 0),hook_event_name:"Notification",message:n,title:r,notification_type:o};await executeHooksOutsideREPL({hookInput:s,timeoutMs:t,matchQuery:o})}
var o4l=b(()=>{Wd()});
export {executeNotificationHooks,o4l};
