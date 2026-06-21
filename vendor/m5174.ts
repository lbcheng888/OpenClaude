// @ts-nocheck
import {ND,dr} from "./m231.ts";
import {b} from "../runtime.ts";
function pNl(e){let{hasThinking:t=!1}=e??{};if(t)return{edits:[{type:"clear_thinking_20251015",keep:"all"}]};return}
function mNl(e,t){let n=e==="document"?"Document":"Image",r=ND(t.replace(/.*messages[.[]\d+[\].]+content[.[]\d+[\].]+\S*:?\s*/,"").replace(/["}]+\s*$/,"").replace(/\s+/g," ").trim(),200),o=r.length>0?` (${r})`:"";return`[${n} removed: the API could not process this ${e}${o}. The file may be unsupported or corrupt; do not retry reading it. If you need to inspect it, use a shell command instead.]`}
function fNl(e,t,n){if(t(e))return n;if(e.type==="tool_result"&&"content"in e&&Array.isArray(e.content)&&e.content.some(t))return{...e,content:e.content.map((r)=>t(r)?n:r)};return e}
function ANl(e,t,n){let r=e[t.messageIdx];if(r?.type!=="user"||!Array.isArray(r.message.content))return e;let o=r.message.content[t.contentIdx];if(!o)return e;let s=fNl(o,(a)=>a.type===t.kind,{type:"text",text:mNl(t.kind,n)});if(s===o)return e;let i={...r,message:{...r.message,content:r.message.content.map((a,l)=>l===t.contentIdx?s:a)}};return e.map((a,l)=>l===t.messageIdx?i:a)}
function dTm(e,t){if(e.type!==t||!("source"in e))return!1;let n=e.source;return typeof n==="object"&&n!==null&&"type"in n&&n.type==="base64"}
function pTm(e,t,n){if(e.type!=="user"||!Array.isArray(e.message.content))return e;let r=!1,o=e.message.content.map((s)=>{let i=fNl(s,t,n);if(i!==s)r=!0;return i});return r?{...e,message:{...e.message,content:o}}:e}
function hNl(e,t,n){let r={type:"text",text:mNl(t,n)},o=(s)=>dTm(s,t);for(let s=e.length-1;s>=0;s--){let i=e[s];if(!i)continue;let a=pTm(i,o,r);if(a!==i)return{messages:e.map((l,c)=>c===s?a:l),carrierIdx:s}}return}
var gNl=b(()=>{dr()});
export {pNl,mNl,fNl,ANl,dTm,pTm,hNl,gNl};
