// @ts-nocheck
import {Ie,vn} from "../src/session/0621_length.ts";
import {xe,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
async function E$n(e){let{ctx:t,updatedInput:n,suggestions:r,permissionMode:o}=e,s=!1;try{let i=await t.runHooks(o,r,n);if(i&&!("reprompted"in i))return i;let a=null;if(a)return a}catch(i){if(s=!0,i instanceof Error)Ie(i);else Ie(Error(`Automated permission check failed: ${String(i)}`))}finally{if(s)xe("permission_coordinator_check","permission_coordinator_check_failed");else He("permission_coordinator_check")}return null}
var puo=b(()=>{mn();vn()});
export {E$n,puo};
