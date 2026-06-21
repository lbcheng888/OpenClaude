// @ts-nocheck
import {jsonStringifyReplacer,pp} from "./m254.ts";
import {b} from "../runtime.ts";
import {WGe,$constructor} from "./m253.ts";
function flattenError(e,t=(n)=>n.message){let n={},r=[];for(let o of e.issues)if(o.path.length>0)n[o.path[0]]=n[o.path[0]]||[],n[o.path[0]].push(t(o));else r.push(t(o));return{formErrors:r,fieldErrors:n}}
function formatError(e,t){let n=t||function(s){return s.message},r={_errors:[]},o=(s)=>{for(let i of s.issues)if(i.code==="invalid_union"&&i.errors.length)i.errors.map((a)=>o({issues:a}));else if(i.code==="invalid_key")o({issues:i.issues});else if(i.code==="invalid_element")o({issues:i.issues});else if(i.path.length===0)r._errors.push(n(i));else{let a=r,l=0;while(l<i.path.length){let c=i.path[l];if(l!==i.path.length-1)a[c]=a[c]||{_errors:[]};else a[c]=a[c]||{_errors:[]},a[c]._errors.push(n(i));a=a[c],l++}}};return o(e),r}
function treeifyError(e,t){let n=t||function(s){return s.message},r={errors:[]},o=(s,i=[])=>{var a,l;for(let c of s.issues)if(c.code==="invalid_union"&&c.errors.length)c.errors.map((u)=>o({issues:u},c.path));else if(c.code==="invalid_key")o({issues:c.issues},c.path);else if(c.code==="invalid_element")o({issues:c.issues},c.path);else{let u=[...i,...c.path];if(u.length===0){r.errors.push(n(c));continue}let d=r,p=0;while(p<u.length){let m=u[p],f=p===u.length-1;if(typeof m==="string")d.properties??(d.properties={}),(a=d.properties)[m]??(a[m]={errors:[]}),d=d.properties[m];else d.items??(d.items=[]),(l=d.items)[m]??(l[m]={errors:[]}),d=d.items[m];if(f)d.errors.push(n(c));p++}}};return o(e),r}
function toDotPath(e){let t=[];for(let n of e)if(typeof n==="number")t.push(`[${n}]`);else if(typeof n==="symbol")t.push(`[${JSON.stringify(String(n))}]`);else if(/[^\w$]/.test(n))t.push(`[${JSON.stringify(n)}]`);else{if(t.length)t.push(".");t.push(n)}return t.join("")}
function prettifyError(e){let t=[],n=[...e.issues].sort((r,o)=>r.path.length-o.path.length);for(let r of n)if(t.push(`\u2716 ${r.message}`),r.path?.length)t.push(`  \u2192 at ${toDotPath(r.path)}`);return t.join(`
`)}
var l4o=(e,t)=>{e.name="$ZodError",Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),Object.defineProperty(e,"message",{get(){return JSON.stringify(t,jsonStringifyReplacer,2)},enumerable:!0})},$ZodError,$ZodRealError;
var Usr=b(()=>{WGe();pp();$ZodError=$constructor("$ZodError",l4o),$ZodRealError=$constructor("$ZodError",l4o,{Parent:Error})});
export {flattenError,formatError,treeifyError,toDotPath,prettifyError,l4o,$ZodError,$ZodRealError,Usr};
