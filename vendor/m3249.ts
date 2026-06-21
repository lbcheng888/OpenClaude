// @ts-nocheck
import {qfe,GO} from "../src/telemetry/2241_GO.ts";
import {a9e,Esa,y1t} from "../src/telemetry/3249_y1t.ts";
import {SGe,tv} from "./m232.ts";
import {b} from "../runtime.ts";
function LIn(e,t){let n=qfe(e),r=!n&&a9e()&&Esa(e);if(!n&&!r)return null;let o=SGe(t);if(o.length===0)return null;let s=o.map((i)=>i.label).join(", ");if(n)return`Content contains potential secrets (${s}) and cannot be written to team memory. Team memory is shared with all repository collaborators. Remove the sensitive content and try again.`;return`Content contains potential secrets (${s}) and cannot be written to memory. Memory is synced to your account. Remove the sensitive content and try again.`}
var fYr=b(()=>{y1t();GO();tv()});
export {LIn,fYr};
