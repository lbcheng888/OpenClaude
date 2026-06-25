// @ts-nocheck
import {isTmuxControlMode,Po} from "./m638.ts";
import {hs,Tu} from "./m649.ts";
import {Wt,ps} from "./m230.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {pl,Wu} from "./m438.ts";
import {b} from "../runtime.ts";
import {yje,a3} from "./m642.ts";
function kMi(e,t){if(!e)return{directory:t||isTmuxControlMode(),prefix:""};let n=hs(e,t);if(e.endsWith("/")||e.endsWith(kz.sep))return{directory:n,prefix:""};let r=kz.dirname(n),o=kz.basename(e);return{directory:r,prefix:o}}
async function ZAd(e){let t=CMi.get(e);if(t)return t;try{let o=(await Wt().readdir(e)).filter((s)=>s.isDirectory()&&!s.name.startsWith(".")).map((s)=>({name:s.name,path:kz.join(e,s.name),type:"directory"})).slice(0,wMi);return CMi.set(e,o),o}catch(n){return logForDebugging(`Directory completion: failed to scan ${e}: ${n instanceof Error?n.message:String(n)}`,{level:"error"}),[]}}
async function uvn(e,t={}){if(pl())return[];let{basePath:n=isTmuxControlMode(),maxResults:r=10}=t,{directory:o,prefix:s}=kMi(e,n),i=await ZAd(o),a=s.toLowerCase();return i.filter((c)=>c.name.toLowerCase().startsWith(a)).slice(0,r).map((c)=>({id:c.path,displayText:c.name+"/",description:"directory",metadata:{type:"directory"}}))}
function HMi(e){return e.startsWith("~/")||e.startsWith("/")||e.startsWith("./")||e.startsWith("../")||e==="~"||e==="."||e===".."}
async function eRd(e,t=!1){let n=`${e}:${t}`,r=AMi.get(n);if(r)return r;try{let i=(await Wt().readdir(e)).filter((a)=>t||!a.name.startsWith(".")).map((a)=>({name:a.name,path:kz.join(e,a.name),type:a.isDirectory()?"directory":"file"})).sort((a,l)=>{if(a.type==="directory"&&l.type!=="directory")return-1;if(a.type!=="directory"&&l.type==="directory")return 1;return a.name.localeCompare(l.name)}).slice(0,wMi);return AMi.set(n,i),i}catch(o){return logForDebugging(`Failed to scan directory for path completion: ${o}`,{level:"error"}),[]}}
async function IMi(e,t={}){if(pl())return[];let{basePath:n=isTmuxControlMode(),maxResults:r=10,includeFiles:o=!0,includeHidden:s=!1}=t,{directory:i,prefix:a}=kMi(e,n),l=await eRd(i,s),c=a.toLowerCase(),u=l.filter((m)=>{if(!o&&m.type==="file")return!1;return m.name.toLowerCase().startsWith(c)}).slice(0,r),d=e.includes("/")||e.includes(kz.sep),p="";if(d){let m=e.lastIndexOf("/"),f=e.lastIndexOf(kz.sep),h=Math.max(m,f);p=e.substring(0,h+1)}if(p.startsWith("./")||p.startsWith("."+kz.sep))p=p.slice(2);return u.map((m)=>{let f=p+m.name;return{id:f,displayText:m.type==="directory"?f+"/":f,metadata:{type:m.type}}})}
var kz,RMi=500,vMi=300000,wMi=5000,CMi,AMi;
var $5r=b(()=>{yje();Po();ps();Tu();Wu();qe();kz=require("path"),CMi=new a3({max:RMi,ttl:vMi}),AMi=new a3({max:RMi,ttl:vMi})});
export {kMi,ZAd,uvn,HMi,eRd,IMi,kz,RMi,vMi,wMi,CMi,AMi,$5r};
