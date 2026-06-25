// @ts-nocheck
import {xmr,lg} from "./m327.ts";
import {Ad,h0} from "./m349.ts";
import {b} from "../runtime.ts";
function YKo(e,t){let n={type:"number"};if(!e.checks)return n;for(let r of e.checks)switch(r.kind){case"int":n.type="integer",xmr(n,"type",r.message,t);break;case"min":if(t.target==="jsonSchema7")if(r.inclusive)lg(n,"minimum",r.value,r.message,t);else lg(n,"exclusiveMinimum",r.value,r.message,t);else{if(!r.inclusive)n.exclusiveMinimum=!0;lg(n,"minimum",r.value,r.message,t)}break;case"max":if(t.target==="jsonSchema7")if(r.inclusive)lg(n,"maximum",r.value,r.message,t);else lg(n,"exclusiveMaximum",r.value,r.message,t);else{if(!r.inclusive)n.exclusiveMaximum=!0;lg(n,"maximum",r.value,r.message,t)}break;case"multipleOf":lg(n,"multipleOf",r.value,r.message,t);break}return n}
var Vmr=()=>{};
function JKo(e,t){let n=t.target==="openAi",r={type:"object",properties:{}},o=[],s=e.shape();for(let a in s){let l=s[a];if(l===void 0||l._def===void 0)continue;let c=LPc(l);if(c&&n){if(l._def.typeName==="ZodOptional")l=l._def.innerType;if(!l.isNullable())l=l.nullable();c=!1}let u=Ad(l._def,{...t,currentPath:[...t.currentPath,"properties",a],propertyPath:[...t.currentPath,"properties",a]});if(u===void 0)continue;if(r.properties[a]=u,!c)o.push(a)}if(o.length)r.required=o;let i=OPc(e,t);if(i!==void 0)r.additionalProperties=i;return r}
function OPc(e,t){if(e.catchall._def.typeName!=="ZodNever")return Ad(e.catchall._def,{...t,currentPath:[...t.currentPath,"additionalProperties"]});switch(e.unknownKeys){case"passthrough":return t.allowedAdditionalProperties;case"strict":return t.rejectedAdditionalProperties;case"strip":return t.removeAdditionalStrategy==="strict"?t.allowedAdditionalProperties:t.rejectedAdditionalProperties}}
function LPc(e){try{return e.isOptional()}catch{return!0}}
var Kmr=b(()=>{h0()});
export {YKo,Vmr,JKo,OPc,LPc,Kmr};
