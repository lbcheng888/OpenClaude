// @ts-nocheck
import {znt,rVi,A$e} from "./m3020.ts";
import {b} from "../runtime.ts";
function lN(e){return znt((t)=>{let n=(o)=>{if(t.get()!==o)t.set(o),rVi()};if(t.initialized)return[t.get(),n];let r=typeof e==="function"?e():e;return t.set(r),[r,n]})}
var xxn=b(()=>{A$e()});
export {lN,xxn};
