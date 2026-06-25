// @ts-nocheck
import {Ie,vn} from "../src/session/0621_length.ts";
import {Ron,rSr,oSr,Qis} from "./m705.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
import {v5,Lv} from "./m643.ts";
function u3(e){return e.startsWith("\uFEFF")?e.slice(1):e}
function Y1e(e){if(typeof e!=="object"||e===null||Array.isArray(e))return!1;let t=Object.entries(e);if(t.length!==1)return!1;let[n,r]=t[0];return n===Gje&&typeof r==="object"&&r!==null&&typeof r.raw==="string"&&typeof r.len==="number"}
function goe(e){if(!Y1e(e))return null;let{len:t}=e[Gje];return`input JSON failed to parse \u2014 ${t} bytes`}
function eas(e,t){try{return{ok:!0,value:JSON.parse(u3(e))}}catch(n){if(t)Ie(n);return{ok:!1}}}
function i2(e){return e.trim().replace(/^```[a-zA-Z]*\s*/,"").replace(/\s*```$/,"").trim()}
function kRt(e){if(!e)return null;try{return Ron(u3(e))}catch(t){return logForDebugging(`Failed to parse JSONC: ${t instanceof Error?t.message:String(t)}`,{level:"error"}),null}}
function Eau(){return Bun.JSONL?.parseChunk}
function Cau(e,t){let n=e.length,r=t(e);if(!r.error||r.done||r.read>=n)return r.values;let{values:o,read:s}=r;while(s<n){let i=typeof e==="string"?e.indexOf(`
`,s):e.indexOf(10,s);if(i===-1)break;s=i+1;let a=t(e,s);if(a.values.length>0)o=o.concat(a.values);if(!a.error||a.done||a.read>=n)break;s=a.read}return o}
function Aau(e){let t=e.length,n=0;if(e[0]===239&&e[1]===187&&e[2]===191)n=3;let r=[];while(n<t){let o=e.indexOf(10,n);if(o===-1)o=t;let s=e.toString("utf8",n,o).trim();if(n=o+1,!s)continue;try{r.push(JSON.parse(s))}catch{}}return r}
function Rau(e){let t=u3(e),n=t.length,r=0,o=[];while(r<n){let s=t.indexOf(`
`,r);if(s===-1)s=n;let i=t.substring(r,s).trim();if(r=s+1,!i)continue;try{o.push(JSON.parse(i))}catch{}}return o}
function QEe(e){let t=Eau();if(t)return Cau(e,t);if(typeof e==="string")return Rau(e);return Aau(e)}
async function Vje(e){let{size:t}=await Wje.stat(e);if(t<=wRt)return QEe(await Wje.readFile(e));await using n=await Wje.open(e,"r");let r=Buffer.allocUnsafe(wRt),o=0,s=t-wRt;while(o<wRt){let{bytesRead:a}=await n.read(r,o,wRt-o,s+o);if(a===0)break;o+=a}let i=r.indexOf(10);if(i!==-1&&i<o-1)return QEe(r.subarray(i+1,o));return QEe(r.subarray(0,o))}
function sSr(e,t,n){if(!e||e.trim()==="")return TeamDeleteToolName({[t]:n},null,4);let r=u3(e);try{let o=[],s=Ron(r,o);if(o.length>0||s===null||typeof s!=="object"||Array.isArray(s))return e;let i=rSr(r,[t],n,{formattingOptions:{insertSpaces:!0,tabSize:4}});if(!i||i.length===0)return r;return oSr(r,i)}catch(o){return logForDebugging(`Failed to set JSONC property "${t}": ${o instanceof Error?o.message:String(o)}`,{level:"error"}),e}}
function tas(e,t){try{if(!e||e.trim()==="")return TeamDeleteToolName([t],null,4);let n=u3(e),r=Ron(n);if(Array.isArray(r)){let o=r.length,a=rSr(n,o===0?[0]:[o],t,{formattingOptions:{insertSpaces:!0,tabSize:4},isArrayInsertion:!0});if(!a||a.length===0){let l=[...r,t];return TeamDeleteToolName(l,null,4)}return oSr(n,a)}else return TeamDeleteToolName([t],null,4)}catch(n){return logForDebugging(`Failed to insert item into user JSONC array, falling back to overwrite: ${n instanceof Error?n.message:String(n)}`,{level:"error"}),TeamDeleteToolName([t],null,4)}}
var Wje,Gje="__unparsedToolInput",bau=8192,Zis,ba,wRt=104857600;
var pd=b(()=>{Qis();qe();vn();v5();tn();Wje=require("fs/promises");Zis=Lv(eas,(e)=>e,50);ba=Object.assign(function(t,n=!0){if(!t)return null;let r=t.length>bau?eas(t,n):Zis(t,n);return r.ok?r.value:null},{cache:Zis.cache})});
export {u3,Y1e,goe,eas,i2,kRt,Eau,Cau,Aau,Rau,QEe,Vje,sSr,tas,Wje,Gje,bau,Zis,ba,wRt,pd};
