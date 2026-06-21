// @ts-nocheck
import {ocr,og} from "./m325.ts";
import {Yd,JI} from "./m347.ts";
import {b} from "../runtime.ts";
function ejo(e,t){let n={type:"number"};if(!e.checks)return n;for(let r of e.checks)switch(r.kind){case"int":n.type="integer",ocr(n,"type",r.message,t);break;case"min":if(t.target==="jsonSchema7")if(r.inclusive)og(n,"minimum",r.value,r.message,t);else og(n,"exclusiveMinimum",r.value,r.message,t);else{if(!r.inclusive)n.exclusiveMinimum=!0;og(n,"minimum",r.value,r.message,t)}break;case"max":if(t.target==="jsonSchema7")if(r.inclusive)og(n,"maximum",r.value,r.message,t);else og(n,"exclusiveMaximum",r.value,r.message,t);else{if(!r.inclusive)n.exclusiveMaximum=!0;og(n,"maximum",r.value,r.message,t)}break;case"multipleOf":og(n,"multipleOf",r.value,r.message,t);break}return n}
var _cr=()=>{};
function tjo(e,t){let n=t.target==="openAi",r={type:"object",properties:{}},o=[],s=e.shape();for(let a in s){let l=s[a];if(l===void 0||l._def===void 0)continue;let c=ICc(l);if(c&&n){if(l._def.typeName==="ZodOptional")l=l._def.innerType;if(!l.isNullable())l=l.nullable();c=!1}let u=Yd(l._def,{...t,currentPath:[...t.currentPath,"properties",a],propertyPath:[...t.currentPath,"properties",a]});if(u===void 0)continue;if(r.properties[a]=u,!c)o.push(a)}if(o.length)r.required=o;let i=HCc(e,t);if(i!==void 0)r.additionalProperties=i;return r}
function HCc(e,t){if(e.catchall._def.typeName!=="ZodNever")return Yd(e.catchall._def,{...t,currentPath:[...t.currentPath,"additionalProperties"]});switch(e.unknownKeys){case"passthrough":return t.allowedAdditionalProperties;case"strict":return t.rejectedAdditionalProperties;case"strip":return t.removeAdditionalStrategy==="strict"?t.allowedAdditionalProperties:t.rejectedAdditionalProperties}}
function ICc(e){try{return e.isOptional()}catch{return!0}}
var ycr=b(()=>{JI()});
export {ejo,_cr,tjo,HCc,ICc,ycr};
