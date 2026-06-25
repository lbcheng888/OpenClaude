// @ts-nocheck
import {Ad,h0} from "./m349.ts";
import {b} from "../runtime.ts";
function FKo(e){return{type:"string",enum:Array.from(e.values)}}
function BKo(e,t){let n=[Ad(e.left._def,{...t,currentPath:[...t.currentPath,"allOf","0"]}),Ad(e.right._def,{...t,currentPath:[...t.currentPath,"allOf","1"]})].filter((s)=>!!s),r=t.target==="jsonSchema2019-09"?{unevaluatedProperties:!1}:void 0,o=[];return n.forEach((s)=>{if(xPc(s)){if(o.push(...s.allOf),s.unevaluatedProperties===void 0)r=void 0}else{let i=s;if("additionalProperties"in s&&s.additionalProperties===!1){let{additionalProperties:a,...l}=s;i=l}else r=void 0;o.push(i)}}),o.length?{allOf:o,...r}:void 0}
var xPc=(e)=>{if("type"in e&&e.type==="string")return!1;return"allOf"in e};
var Bmr=b(()=>{h0()});
export {FKo,BKo,xPc,Bmr};
