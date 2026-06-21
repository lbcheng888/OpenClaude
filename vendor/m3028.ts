// @ts-nocheck
import {znt,A$e} from "./m3020.ts";
import {b} from "../runtime.ts";
function ELt(e,t){return znt((n)=>{let r=n.get();if(!r||r.dependencies.length!==t.length||r.dependencies.some((o,s)=>o!==t[s])){let o=e();return n.set({value:o,dependencies:t}),o}return r.value})}
var pVi=b(()=>{A$e()});
export {ELt,pVi};
