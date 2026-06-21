// @ts-nocheck
import {Yd,JI} from "./m347.ts";
import {b} from "../runtime.ts";
function j6o(e){return{type:"string",enum:Array.from(e.values)}}
function W6o(e,t){let n=[Yd(e.left._def,{...t,currentPath:[...t.currentPath,"allOf","0"]}),Yd(e.right._def,{...t,currentPath:[...t.currentPath,"allOf","1"]})].filter((s)=>!!s),r=t.target==="jsonSchema2019-09"?{unevaluatedProperties:!1}:void 0,o=[];return n.forEach((s)=>{if(RCc(s)){if(o.push(...s.allOf),s.unevaluatedProperties===void 0)r=void 0}else{let i=s;if("additionalProperties"in s&&s.additionalProperties===!1){let{additionalProperties:a,...l}=s;i=l}else r=void 0;o.push(i)}}),o.length?{allOf:o,...r}:void 0}
var RCc=(e)=>{if("type"in e&&e.type==="string")return!1;return"allOf"in e};
var pcr=b(()=>{JI()});
export {j6o,W6o,RCc,pcr};
