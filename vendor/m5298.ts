// @ts-nocheck
import {E} from "./m319.ts";
import {Cn,dr} from "./m231.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {l4l,a4l,c4l} from "../src/core/5298_weekday.ts";
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
function z8e(e){return e.type==="array"&&"items"in e&&typeof e.items==="object"&&e.items!==null&&(("enum"in e.items)||("anyOf"in e.items))}
function WWt(e){if("anyOf"in e.items)return e.items.anyOf.map((t)=>t.const);if("enum"in e.items)return e.items.enum;return[]}
function kxm(e){if("anyOf"in e.items)return e.items.anyOf.map((t)=>t.title);if("enum"in e.items)return e.items.enum;return[]}
function GWt(e,t){let n=WWt(e).indexOf(t);return n>=0?kxm(e)[n]??t:t}
function MAt(e){if("oneOf"in e)return e.oneOf.map((t)=>t.const);if("enum"in e)return e.enum;return[]}
function Hxm(e){if("oneOf"in e)return e.oneOf.map((t)=>t.title);if("enum"in e)return("enumNames"in e?e.enumNames:void 0)??e.enum;return[]}
function VWt(e,t){let n=MAt(e).indexOf(t);return n>=0?Hxm(e)[n]??t:t}
function Ixm(e){if(Zue(e)){let[t,...n]=MAt(e);if(!t)return E.never();return E.enum([t,...n])}if(e.type==="string"){let t=E.string();if(e.minLength!==void 0)t=t.min(e.minLength,{message:`Must be at least ${e.minLength} ${Cn(e.minLength,"character")}`});if(e.maxLength!==void 0)t=t.max(e.maxLength,{message:`Must be at most ${e.maxLength} ${Cn(e.maxLength,"character")}`});switch(e.format){case"email":t=t.email({message:"Must be a valid email address, e.g. user@example.com"});break;case"uri":t=t.url({message:"Must be a valid URI, e.g. https://example.com"});break;case"date":t=t.date("Must be a valid date, e.g. 2024-03-15, today, next Monday");break;case"date-time":t=t.datetime({offset:!0,message:"Must be a valid date-time, e.g. 2024-03-15T14:30:00Z, tomorrow at 3pm"});break;default:break}return t}if(e.type==="number"||e.type==="integer"){let t=e.type==="integer"?"an integer":"a number",n=e.type==="integer",r=(i)=>Number.isInteger(i)&&!n?`${i}.0`:String(i),o=e.minimum!==void 0&&e.maximum!==void 0?`Must be ${t} between ${r(e.minimum)} and ${r(e.maximum)}`:e.minimum!==void 0?`Must be ${t} >= ${r(e.minimum)}`:e.maximum!==void 0?`Must be ${t} <= ${r(e.maximum)}`:`Must be ${t}`,s=E.coerce.number({error:o});if(e.type==="integer")s=s.int({message:o});if(e.minimum!==void 0)s=s.min(e.minimum,{message:o});if(e.maximum!==void 0)s=s.max(e.maximum,{message:o});return s}if(e.type==="boolean")return E.coerce.boolean();throw Error(`Unsupported schema: ${Le(e)}`)}
function jWt(e,t){let r=Ixm(t).safeParse(e);if(r.success)return{value:r.data,isValid:!0};return{isValid:!1,error:r.error.issues.map((o)=>o.message).join("; ")}}
function KWt(e){return e.type==="string"&&"format"in e&&(e.format==="date"||e.format==="date-time")}
async function u4l(e,t,n){let r=jWt(e,t);if(r.isValid)return r;if(KWt(t)&&!l4l(e)){let o=await a4l(e,t.format,n);if(o.success){let s=jWt(o.value,t);if(s.isValid)return s}}return r}
var Zue=(e)=>e.type==="string"&&(("enum"in e)||("oneOf"in e));
var d4l=b(()=>{Xr();Xt();dr();c4l()});
export {z8e,WWt,kxm,GWt,MAt,Hxm,VWt,Ixm,jWt,KWt,u4l,Zue,d4l};
