// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {zd,dr} from "./m231.ts";
import {qVn,Gwo} from "./m5019.ts";
import {$Vn,Wwo} from "./m5017.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {Mkl,Nkl} from "./m5018.ts";
import {Te} from "./m2253.ts";
var $kl={};
isFullscreenWithTTY($kl,{sanitizeFilename:()=>sanitizeFilename,extractFirstPrompt:()=>extractFirstPrompt,call:()=>Kcm});
function Gcm(e){let t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0"),o=String(e.getHours()).padStart(2,"0"),s=String(e.getMinutes()).padStart(2,"0"),i=String(e.getSeconds()).padStart(2,"0");return`${t}-${n}-${r}-${o}${s}${i}`}
function extractFirstPrompt(e){let t=e.find((o)=>o.type==="user");if(!t||t.type!=="user")return"";let n=t.message?.content,r="";if(typeof n==="string")r=n.trim();else if(Array.isArray(n)){let o=n.find((s)=>s.type==="text");if(o&&"text"in o)r=o.text.trim()}if(r=zd(r),r.length>50)r=r.substring(0,49)+"\u2026";return r}
function sanitizeFilename(e){return e.toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")}
async function Vcm(e){let t=e.options.tools||[];return qVn(e.messages,t)}
async function Kcm(e,t,n){let r=await Vcm(t),o=n.trim();if(o){try{let l=await $Vn(o,r);Ie("export_file"),e(`Conversation exported to: ${l}`)}catch(l){Oe("export_file","write_failed"),e(`Failed to export conversation: ${l instanceof Error?l.message:"Unknown error"}`)}return null}let s=extractFirstPrompt(t.messages),i=Gcm(new Date),a;if(s){let l=sanitizeFilename(s);a=l?`${i}-${l}.txt`:`conversation-${i}.txt`}else a=`conversation-${i}.txt`;return Bkl.default.createElement(Mkl,{content:r,defaultFilename:a,onDone:(l)=>{e(l.message)}})}
var Bkl;
var qkl=b(()=>{Nkl();ln();Gwo();dr();Wwo();Bkl=M(Te(),1)});
export {$kl,Gcm,extractFirstPrompt,sanitizeFilename,Vcm,Kcm,Bkl,qkl};
