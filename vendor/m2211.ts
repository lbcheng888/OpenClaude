// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {fs} from "../src/api/0459_getOauthConfig.ts";
import {b} from "../runtime.ts";
import {dAi} from "./m2210.ts";
function Ofe(e){return Bun.YAML.parse(e)}
function z_n(e){return Bun.YAML.stringify(e,null,2)+`
`}
function OXu(e){let t=e.split(`
`),n=[];for(let r of t){let o=r.match(/^([a-zA-Z_-]+):\s+(.+)$/);if(o){let[,s,i]=o;if(!s||!i){n.push(r);continue}if(i.startsWith('"')&&i.endsWith('"')||i.startsWith("'")&&i.endsWith("'")){n.push(r);continue}if(i.startsWith("[")&&i.endsWith("]"))try{if(Array.isArray(Ofe(i))){n.push(r);continue}}catch{}if(PXu.test(i)){let a=i.replaceAll("\\","\\\\").replaceAll('"',"\\\"");n.push(`${s}: "${a}"`);continue}}n.push(r)}return n.join(`
`)}
function RA(e,t,n){let r=e.match(Lfe);if(!r)return{frontmatter:{},content:e};let o=r[1]||"",s=e.slice(r[0].length),i=(l)=>l,a={};try{a=i(pAi(Ofe(o)))}catch{try{let l=OXu(o).replace(/^\t+/gm,(c)=>"  ".repeat(c.length));a=i(pAi(Ofe(l)))}catch(l){let c=t?` in ${t}`:"";logForDebugging(`Failed to parse YAML frontmatter${c}: ${l instanceof Error?l.message:l}`,{level:"warn"})}}return{frontmatter:a,content:s}}
function pAi(e){if(e&&typeof e==="object"&&!Array.isArray(e))return e;return{}}
function $Ht(e){if(Array.isArray(e))return e.flatMap($Ht);if(typeof e!=="string")return[];let t=[],n="",r=0;for(let s=0;s<e.length;s++){let i=e[s];if(i==="{")r++,n+=i;else if(i==="}")r--,n+=i;else if(i===","&&r===0){let a=n.trim();if(a)t.push(a);n=""}else n+=i}let o=n.trim();if(o)t.push(o);return t.filter((s)=>s.length>0).flatMap((s)=>fAi(s))}
function fAi(e){let t=e.match(/^([^{]*)\{([^}]+)\}(.*)$/);if(!t)return[e];let n=t[1]||"",r=t[2]||"",o=t[3]||"",s=r.split(",").map((a)=>a.trim()),i=[];for(let a of s){let l=n+a+o,c=fAi(l);i.push(...c)}return i}
function Y_n(e){if(e===void 0||e===null)return;let t=typeof e==="number"?e:parseInt(String(e),10);if(Number.isInteger(t)&&t>0)return t;return}
function iF(e,t,n){if(e==null)return null;if(typeof e==="string")return e.trim()||null;if(typeof e==="number"||typeof e==="boolean")return String(e);let r=n?`${n}:${t}`:t??"unknown";return logForDebugging(`Description invalid for ${r} - omitting`,{level:"warn"}),null}
function J_n(e){let t=(n)=>n!=null&&typeof n==="object"&&!Array.isArray(n)?Object.keys(n):[];return fs([...Object.keys(e),...t(e.metadata),...t(e.experimental)])}
function AQe(e){return e===!0||e==="true"}
function CFe(e){if(e===!0||e==="true")return!0;if(e===!1||e==="false")return!1;return}
function X_n(e,t){if(e==null)return;let n=String(e).trim().toLowerCase();if(n==="")return;if(mAi.includes(n))return n;logForDebugging(`Frontmatter 'shell: ${e}' in ${t} is not recognized. Valid values: ${mAi.join(", ")}. Falling back to bash.`,{level:"warn"});return}
var PXu,Lfe,mAi;
var Ev=b(()=>{qe();dAi();PXu=/[{}[\]*&#!|>%@`]|: /;Lfe=/^---\s*\n([\s\S]*?)---\s*\n?/;mAi=["bash","powershell"]});
export {Ofe,z_n,OXu,RA,pAi,$Ht,fAi,Y_n,iF,J_n,AQe,CFe,X_n,PXu,Lfe,mAi,Ev};
