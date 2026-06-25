// @ts-nocheck
import {HOOK_EVENTS} from "./m723.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Fmo,l4t,vY} from "./m4097.ts";
import {b} from "../runtime.ts";
import {isBundledSkillsDisabled} from "./m726.ts";
function n5a(e,t,n,r,o){let s=0;for(let i of HOOK_EVENTS){let a=n[i];if(!a)continue;for(let l of a)for(let c of l.hooks){let u=c.once?()=>{logForDebugging(`Removing one-shot hook for event ${i} in skill '${r}'`),Fmo(e,t,i,c)}:void 0;l4t(e,t,i,l.matcher||"",c,u,o),s++}}if(s>0)logForDebugging(`Registered ${s} hooks from skill '${r}'`)}
var r5a=b(()=>{isBundledSkillsDisabled();qe();vY()});
export {n5a,r5a};
