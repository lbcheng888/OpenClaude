// @ts-nocheck
import {i_,K0} from "./m3824.ts";
import {b} from "../runtime.ts";
function e8e(e,t){return{assign(n){let r=e().teammateColors,o=r.assignments.get(n);if(o)return o;let s=i_[r.index%i_.length];return t((i)=>{if(i.teammateColors.assignments.has(n))return i;let a=new Map(i.teammateColors.assignments);return a.set(n,s),{...i,teammateColors:{assignments:a,index:i.teammateColors.index+1}}}),s},get(n){return e().teammateColors.assignments.get(n)}}}
var xGn;
var Xmt=b(()=>{K0();xGn={assign:()=>i_[0],get:()=>{return}}});
export {e8e,xGn,Xmt};
