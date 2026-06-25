// @ts-nocheck
import {Qot,y9e} from "./m3030.ts";
import {b} from "../runtime.ts";
function X1t(e,t){return Qot((n)=>{let r=n.get();if(!r||r.dependencies.length!==t.length||r.dependencies.some((o,s)=>o!==t[s])){let o=e();return n.set({value:o,dependencies:t}),o}return r.value})}
var sQi=b(()=>{y9e()});
export {X1t,sQi};
