// @ts-nocheck
import {Zfe,cO} from "../src/telemetry/2249_cO.ts";
import {g3e,Hpa,JFt} from "../src/telemetry/3265_JFt.ts";
import {y7e,aA} from "./m234.ts";
import {b} from "../runtime.ts";
function RPn(e,t){let n=Zfe(e),r=!n&&g3e()&&Hpa(e);if(!n&&!r)return null;let o=y7e(t);if(o.length===0)return null;let s=o.map((i)=>i.label).join(", ");if(n)return`Content contains potential secrets (${s}) and cannot be written to team memory. Team memory is shared with all repository collaborators. Remove the sensitive content and try again.`;return`Content contains potential secrets (${s}) and cannot be written to memory. Memory is synced to your account. Remove the sensitive content and try again.`}
var XZr=b(()=>{JFt();cO();aA()});
export {RPn,XZr};
