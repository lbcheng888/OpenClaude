// @ts-nocheck
import {De,Rn} from "../src/session/0615_length.ts";
import {Gtn,xAr,kAr,nts} from "./m700.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
import {u8,CR} from "./m637.ts";
function V3(e){return e.startsWith("\uFEFF")?e.slice(1):e}
function n1e(e){if(typeof e!=="object"||e===null||Array.isArray(e))return!1;let t=Object.entries(e);if(t.length!==1)return!1;let[n,r]=t[0];return n===V7e&&typeof r==="object"&&r!==null&&typeof r.raw==="string"&&typeof r.len==="number"}
function _oe(e){if(!n1e(e))return null;let{len:t}=e[V7e];return`input JSON failed to parse \u2014 ${t} bytes`}
function ots(e,t){try{return{ok:!0,value:JSON.parse(V3(e))}}catch(n){if(t)De(n);return{ok:!1}}}
function B2(e){return e.trim().replace(/^```[a-zA-Z]*\s*/,"").replace(/\s*```$/,"").trim()}
function tEt(e){if(!e)return null;try{return Gtn(V3(e))}catch(t){return logForDebugging(`Failed to parse JSONC: ${t instanceof Error?t.message:String(t)}`,{level:"error"}),null}}
function iXc(){return Bun.JSONL?.parseChunk}
function aXc(e,t){let n=e.length,r=t(e);if(!r.error||r.done||r.read>=n)return r.values;let{values:o,read:s}=r;while(s<n){let i=typeof e==="string"?e.indexOf(`
`,s):e.indexOf(10,s);if(i===-1)break;s=i+1;let a=t(e,s);if(a.values.length>0)o=o.concat(a.values);if(!a.error||a.done||a.read>=n)break;s=a.read}return o}
function lXc(e){let t=e.length,n=0;if(e[0]===239&&e[1]===187&&e[2]===191)n=3;let r=[];while(n<t){let o=e.indexOf(10,n);if(o===-1)o=t;let s=e.toString("utf8",n,o).trim();if(n=o+1,!s)continue;try{r.push(JSON.parse(s))}catch{}}return r}
function cXc(e){let t=V3(e),n=t.length,r=0,o=[];while(r<n){let s=t.indexOf(`
`,r);if(s===-1)s=n;let i=t.substring(r,s).trim();if(r=s+1,!i)continue;try{o.push(JSON.parse(i))}catch{}}return o}
function gbe(e){let t=iXc();if(t)return aXc(e,t);if(typeof e==="string")return cXc(e);return lXc(e)}
async function K7e(e){let{size:t}=await G7e.stat(e);if(t<=eEt)return gbe(await G7e.readFile(e));await using n=await G7e.open(e,"r");let r=Buffer.allocUnsafe(eEt),o=0,s=t-eEt;while(o<eEt){let{bytesRead:a}=await n.read(r,o,eEt-o,s+o);if(a===0)break;o+=a}let i=r.indexOf(10);if(i!==-1&&i<o-1)return gbe(r.subarray(i+1,o));return gbe(r.subarray(0,o))}
function HAr(e,t,n){if(!e||e.trim()==="")return Le({[t]:n},null,4);let r=V3(e);try{let o=[],s=Gtn(r,o);if(o.length>0||s===null||typeof s!=="object"||Array.isArray(s))return e;let i=xAr(r,[t],n,{formattingOptions:{insertSpaces:!0,tabSize:4}});if(!i||i.length===0)return r;return kAr(r,i)}catch(o){return logForDebugging(`Failed to set JSONC property "${t}": ${o instanceof Error?o.message:String(o)}`,{level:"error"}),e}}
function sts(e,t){try{if(!e||e.trim()==="")return Le([t],null,4);let n=V3(e),r=Gtn(n);if(Array.isArray(r)){let o=r.length,a=xAr(n,o===0?[0]:[o],t,{formattingOptions:{insertSpaces:!0,tabSize:4},isArrayInsertion:!0});if(!a||a.length===0){let l=[...r,t];return Le(l,null,4)}return kAr(n,a)}else return Le([t],null,4)}catch(n){return logForDebugging(`Failed to insert item into user JSONC array, falling back to overwrite: ${n instanceof Error?n.message:String(n)}`,{level:"error"}),Le([t],null,4)}}
var G7e,V7e="__unparsedToolInput",sXc=8192,rts,Fa,eEt=104857600;
var Pd=b(()=>{nts();qe();Rn();u8();Xt();G7e=require("fs/promises");rts=CR(ots,(e)=>e,50);Fa=Object.assign(function(t,n=!0){if(!t)return null;let r=t.length>sXc?ots(t,n):rts(t,n);return r.ok?r.value:null},{cache:rts.cache})});
export {V3,n1e,_oe,ots,B2,tEt,iXc,aXc,lXc,cXc,gbe,K7e,HAr,sts,G7e,V7e,sXc,rts,Fa,eEt,Pd};
