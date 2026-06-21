// @ts-nocheck
import {De,Rn} from "../src/session/0615_length.ts";
import {Oe,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {b} from "../runtime.ts";
async function tWl(e){let{ctx:t,updatedInput:n,suggestions:r,permissionMode:o}=e,s=!1;try{let i=await t.runHooks(o,r,n);if(i&&!("reprompted"in i))return i;let a=null;if(a)return a}catch(i){if(s=!0,i instanceof Error)De(i);else De(Error(`Automated permission check failed: ${String(i)}`))}finally{if(s)Oe("permission_coordinator_check","permission_coordinator_check_failed");else Ie("permission_coordinator_check")}return null}
var nWl=b(()=>{ln();Rn()});
export {tWl,nWl};
