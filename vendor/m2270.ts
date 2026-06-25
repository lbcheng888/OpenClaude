// @ts-nocheck
import {kKe} from "./m126.ts";
import {b} from "../runtime.ts";
import {bre} from "./m129.ts";
function q0(e,t){let n=e,r=new Set,o=t&&kKe(t);return{getState:()=>n,setState:(s)=>{let i=n,a=s(i);if(Object.is(a,i))return;n=a,o?.({newState:a,oldState:i});for(let l of r)l()},subscribe:(s)=>{let i=kKe(s);return r.add(i),()=>r.delete(i)}}}
var lZ=b(()=>{bre()});
export {q0,lZ};
