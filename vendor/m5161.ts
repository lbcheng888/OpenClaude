// @ts-nocheck
import {Ep} from "./m4028.ts";
import {createBaseHookInput,executeHooksOutsideREPL,yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
async function executeNotificationHooks(e,t=Ep){let{message:n,title:r,notificationType:o}=e,s={...createBaseHookInput(void 0),hook_event_name:"Notification",message:n,title:r,notification_type:o};await executeHooksOutsideREPL({hookInput:s,timeoutMs:t,matchQuery:o})}
var T1l=b(()=>{yp()});
export {executeNotificationHooks,T1l};
