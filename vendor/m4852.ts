// @ts-nocheck
import {__,ix} from "./m3842.ts";
import {b} from "../runtime.ts";
function PWe(e,t){return{assign(n){let r=e().teammateColors,o=r.assignments.get(n);if(o)return o;let s=__[r.index%__.length];return t((i)=>{if(i.teammateColors.assignments.has(n))return i;let a=new Map(i.teammateColors.assignments);return a.set(n,s),{...i,teammateColors:{assignments:a,index:i.teammateColors.index+1}}}),s},get(n){return e().teammateColors.assignments.get(n)}}}
var _jn;
var ugt=b(()=>{ix();_jn={assign:()=>__[0],get:()=>{return}}});
export {PWe,_jn,ugt};
