// @ts-nocheck
import {Yx,lr} from "./m233.ts";
import {b} from "../runtime.ts";
function tql(e){let{hasThinking:t=!1}=e??{};if(t)return{edits:[{type:"clear_thinking_20251015",keep:"all"}]};return}
function nql(e,t){let n=e==="document"?"Document":"Image",r=Yx(t.replace(/.*messages[.[]\d+[\].]+content[.[]\d+[\].]+\S*:?\s*/,"").replace(/["}]+\s*$/,"").replace(/\s+/g," ").trim(),200),o=r.length>0?` (${r})`:"";return`[${n} removed: the API could not process this ${e}${o}. The file may be unsupported or corrupt; do not retry reading it. If you need to inspect it, use a shell command instead.]`}
function rql(e,t,n){if(t(e))return n;if(e.type==="tool_result"&&"content"in e&&Array.isArray(e.content)&&e.content.some(t))return{...e,content:e.content.map((r)=>t(r)?n:r)};return e}
function oql(e,t,n){let r=e[t.messageIdx];if(r?.type!=="user"||!Array.isArray(r.message.content))return e;let o=r.message.content[t.contentIdx];if(!o)return e;let s=rql(o,(a)=>a.type===t.kind,{type:"text",text:nql(t.kind,n)});if(s===o)return e;let i={...r,message:{...r.message,content:r.message.content.map((a,l)=>l===t.contentIdx?s:a)}};return e.map((a,l)=>l===t.messageIdx?i:a)}
function DHm(e,t){if(e.type!==t||!("source"in e))return!1;let n=e.source;return typeof n==="object"&&n!==null&&"type"in n&&n.type==="base64"}
function PHm(e,t,n){if(e.type!=="user"||!Array.isArray(e.message.content))return e;let r=!1,o=e.message.content.map((s)=>{let i=rql(s,t,n);if(i!==s)r=!0;return i});return r?{...e,message:{...e.message,content:o}}:e}
function sql(e,t,n){let r={type:"text",text:nql(t,n)},o=(s)=>DHm(s,t);for(let s=e.length-1;s>=0;s--){let i=e[s];if(!i)continue;let a=PHm(i,o,r);if(a!==i)return{messages:e.map((l,c)=>c===s?a:l),carrierIdx:s}}return}
var iql=b(()=>{lr()});
export {tql,nql,rql,oql,DHm,PHm,sql,iql};
