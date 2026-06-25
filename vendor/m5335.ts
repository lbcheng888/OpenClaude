// @ts-nocheck
import {C} from "./m321.ts";
import {Sn,lr} from "./m233.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {_7l,g7l,y7l} from "../src/core/5335_weekday.ts";
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
function BGe(e){return e.type==="array"&&"items"in e&&typeof e.items==="object"&&e.items!==null&&(("enum"in e.items)||("anyOf"in e.items))}
function C7t(e){if("anyOf"in e.items)return e.items.anyOf.map((t)=>t.const);if("enum"in e.items)return e.items.enum;return[]}
function o1m(e){if("anyOf"in e.items)return e.items.anyOf.map((t)=>t.title);if("enum"in e.items)return e.items.enum;return[]}
function A7t(e,t){let n=C7t(e).indexOf(t);return n>=0?o1m(e)[n]??t:t}
function Z_t(e){if("oneOf"in e)return e.oneOf.map((t)=>t.const);if("enum"in e)return e.enum;return[]}
function s1m(e){if("oneOf"in e)return e.oneOf.map((t)=>t.title);if("enum"in e)return("enumNames"in e?e.enumNames:void 0)??e.enum;return[]}
function R7t(e,t){let n=Z_t(e).indexOf(t);return n>=0?s1m(e)[n]??t:t}
function i1m(e){if(ide(e)){let[t,...n]=Z_t(e);if(!t)return C.never();return C.enum([t,...n])}if(e.type==="string"){let t=C.string();if(e.minLength!==void 0)t=t.min(e.minLength,{message:`Must be at least ${e.minLength} ${Sn(e.minLength,"character")}`});if(e.maxLength!==void 0)t=t.max(e.maxLength,{message:`Must be at most ${e.maxLength} ${Sn(e.maxLength,"character")}`});switch(e.format){case"email":t=t.email({message:"Must be a valid email address, e.g. user@example.com"});break;case"uri":t=t.url({message:"Must be a valid URI, e.g. https://example.com"});break;case"date":t=t.date("Must be a valid date, e.g. 2024-03-15, today, next Monday");break;case"date-time":t=t.datetime({offset:!0,message:"Must be a valid date-time, e.g. 2024-03-15T14:30:00Z, tomorrow at 3pm"});break;default:break}return t}if(e.type==="number"||e.type==="integer"){let t=e.type==="integer"?"an integer":"a number",n=e.type==="integer",r=(i)=>Number.isInteger(i)&&!n?`${i}.0`:String(i),o=e.minimum!==void 0&&e.maximum!==void 0?`Must be ${t} between ${r(e.minimum)} and ${r(e.maximum)}`:e.minimum!==void 0?`Must be ${t} >= ${r(e.minimum)}`:e.maximum!==void 0?`Must be ${t} <= ${r(e.maximum)}`:`Must be ${t}`,s=C.coerce.number({error:o});if(e.type==="integer")s=s.int({message:o});if(e.minimum!==void 0)s=s.min(e.minimum,{message:o});if(e.maximum!==void 0)s=s.max(e.maximum,{message:o});return s}if(e.type==="boolean")return C.coerce.boolean();throw Error(`Unsupported schema: ${TeamDeleteToolName(e)}`)}
function E7t(e,t){let r=i1m(t).safeParse(e);if(r.success)return{value:r.data,isValid:!0};return{isValid:!1,error:r.error.issues.map((o)=>o.message).join("; ")}}
function v7t(e){return e.type==="string"&&"format"in e&&(e.format==="date"||e.format==="date-time")}
async function T7l(e,t,n){let r=E7t(e,t);if(r.isValid)return r;if(v7t(t)&&!_7l(e)){let o=await g7l(e,t.format,n);if(o.success){let s=E7t(o.value,t);if(s.isValid)return s}}return r}
var ide=(e)=>e.type==="string"&&(("enum"in e)||("oneOf"in e));
var S7l=b(()=>{Qr();tn();lr();y7l()});
export {BGe,C7t,o1m,A7t,Z_t,s1m,R7t,i1m,E7t,v7t,T7l,ide,S7l};
