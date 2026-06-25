// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {os} from "../src/api/0465_getOauthConfig.ts";
import {b} from "../runtime.ts";
import {D$r} from "./m2218.ts";
function Gfe(e){return Bun.YAML.parse(e)}
function Ibn(e){return Bun.YAML.stringify(e,null,2)+`
`}
function rld(e){let t=e.split(`
`),n=[];for(let r of t){let o=r.match(/^([a-zA-Z_-]+):\s+(.+)$/);if(o){let[,s,i]=o;if(!s||!i){n.push(r);continue}if(i.startsWith('"')&&i.endsWith('"')||i.startsWith("'")&&i.endsWith("'")){n.push(r);continue}if(i.startsWith("[")&&i.endsWith("]"))try{if(Array.isArray(Gfe(i))){n.push(r);continue}}catch{}if(nld.test(i)){let a=i.replaceAll("\\","\\\\").replaceAll('"',"\\\"");n.push(`${s}: "${a}"`);continue}}n.push(r)}return n.join(`
`)}
function xf(e,t,n){let r=e.match(Vfe);if(!r)return{frontmatter:{},content:e};let o=r[1]||"",s=e.slice(r[0].length),i=(c)=>c,a={},l;try{a=i(pbi(Gfe(o)))}catch{try{let c=rld(o).replace(/^\t+/gm,(u)=>"  ".repeat(u.length));a=i(pbi(Gfe(c)))}catch(c){l=c instanceof Error?c.message:String(c);let u=t?` in ${t}`:"";logForDebugging(`Failed to parse YAML frontmatter${u}: ${l}`,{level:"warn"})}}return{frontmatter:a,content:s,...l!==void 0&&{parseError:l}}}
function pbi(e){if(e&&typeof e==="object"&&!Array.isArray(e))return e;return{}}
function hDt(e){if(Array.isArray(e))return e.flatMap(hDt);if(typeof e!=="string")return[];let t=[],n="",r=0;for(let s=0;s<e.length;s++){let i=e[s];if(i==="{")r++,n+=i;else if(i==="}")r--,n+=i;else if(i===","&&r===0){let a=n.trim();if(a)t.push(a);n=""}else n+=i}let o=n.trim();if(o)t.push(o);return t.filter((s)=>s.length>0).flatMap((s)=>fbi(s))}
function fbi(e){let t=e.match(/^([^{]*)\{([^}]+)\}(.*)$/);if(!t)return[e];let n=t[1]||"",r=t[2]||"",o=t[3]||"",s=r.split(",").map((a)=>a.trim()),i=[];for(let a of s){let l=n+a+o,c=fbi(l);i.push(...c)}return i}
function xbn(e){if(e===void 0||e===null)return;let t=typeof e==="number"?e:parseInt(String(e),10);if(Number.isInteger(t)&&t>0)return t;return}
function HF(e,t,n){if(e==null)return null;if(typeof e==="string")return e.trim()||null;if(typeof e==="number"||typeof e==="boolean")return String(e);let r=n?`${n}:${t}`:t??"unknown";return logForDebugging(`Description invalid for ${r} - omitting`,{level:"warn"}),null}
function Dbn(e){let t=(n)=>n!=null&&typeof n==="object"&&!Array.isArray(n)?Object.keys(n):[];return os([...Object.keys(e),...t(e.metadata),...t(e.experimental)])}
function get(e){return e===!0||e==="true"}
function bUe(e){if(e===!0||e==="true")return!0;if(e===!1||e==="false")return!1;return}
function Pbn(e,t){if(e==null)return;let n=String(e).trim().toLowerCase();if(n==="")return;if(mbi.includes(n))return n;logForDebugging(`Frontmatter 'shell: ${e}' in ${t} is not recognized. Valid values: ${mbi.join(", ")}. Falling back to bash.`,{level:"warn"});return}
var nld,Vfe,mbi;
var HA=b(()=>{qe();D$r();nld=/[{}[\]*&#!|>%@`]|: /;Vfe=/^---\s*\n([\s\S]*?)---\s*\n?/;mbi=["bash","powershell"]});
export {Gfe,Ibn,rld,xf,pbi,hDt,fbi,xbn,HF,Dbn,get,bUe,Pbn,nld,Vfe,mbi,HA};
