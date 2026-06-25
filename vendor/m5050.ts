// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {Cd,lr} from "./m233.ts";
import {LYn,nxo} from "./m5049.ts";
import {OYn,txo} from "./m5047.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {r1l,o1l} from "./m5048.ts";
import {oe} from "./m2275.ts";
var a1l={};
ft(a1l,{sanitizeFilename:()=>sanitizeFilename,extractFirstPrompt:()=>extractFirstPrompt,call:()=>sTm});
function rTm(e){let t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0"),o=String(e.getHours()).padStart(2,"0"),s=String(e.getMinutes()).padStart(2,"0"),i=String(e.getSeconds()).padStart(2,"0");return`${t}-${n}-${r}-${o}${s}${i}`}
function extractFirstPrompt(e){let t=e.find((o)=>o.type==="user");if(!t||t.type!=="user")return"";let n=t.message?.content,r="";if(typeof n==="string")r=n.trim();else if(Array.isArray(n)){let o=n.find((s)=>s.type==="text");if(o&&"text"in o)r=o.text.trim()}if(r=Cd(r),r.length>50)r=r.substring(0,49)+"\u2026";return r}
function sanitizeFilename(e){return e.toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")}
async function oTm(e){let t=e.options.tools||[];return LYn(e.messages,t)}
async function sTm(e,t,n){let r=await oTm(t),o=n.trim();if(o){try{let l=await OYn(o,r);He("export_file"),e(`Conversation exported to: ${l}`)}catch(l){xe("export_file","write_failed"),e(`Failed to export conversation: ${l instanceof Error?l.message:"Unknown error"}`)}return null}let s=extractFirstPrompt(t.messages),i=rTm(new Date),a;if(s){let l=sanitizeFilename(s);a=l?`${i}-${l}.txt`:`conversation-${i}.txt`}else a=`conversation-${i}.txt`;return l1l.jsx(r1l,{content:r,defaultFilename:a,onDone:(l)=>{e(l.message)}})}
var l1l;
var c1l=b(()=>{o1l();mn();nxo();lr();txo();l1l=x(oe(),1)});
export {a1l,rTm,extractFirstPrompt,sanitizeFilename,oTm,sTm,l1l,c1l};
