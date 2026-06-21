// @ts-nocheck
import {HOOK_EVENTS} from "./m718.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Qao,E$t,x9} from "./m4033.ts";
import {b} from "../runtime.ts";
import {sQ} from "./m721.ts";
function xFa(e,t,n,r,o){let s=0;for(let i of HOOK_EVENTS){let a=n[i];if(!a)continue;for(let l of a)for(let c of l.hooks){let u=c.once?()=>{logForDebugging(`Removing one-shot hook for event ${i} in skill '${r}'`),Qao(e,t,i,c)}:void 0;E$t(e,t,i,l.matcher||"",c,u,o),s++}}if(s>0)logForDebugging(`Registered ${s} hooks from skill '${r}'`)}
var kFa=b(()=>{sQ();qe();x9()});
export {xFa,kFa};
