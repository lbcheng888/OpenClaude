// @ts-nocheck
import {Pt,Go} from "./m632.ts";
import {Ds,Iu} from "./m643.ts";
import {jt,ws} from "./m228.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {ec,Dd} from "./m687.ts";
import {b} from "../runtime.ts";
import {S7e,j3} from "./m636.ts";
function oIi(e,t){if(!e)return{directory:t||Pt(),prefix:""};let n=Ds(e,t);if(e.endsWith("/")||e.endsWith(ZK.sep))return{directory:n,prefix:""};let r=ZK.dirname(n),o=ZK.basename(e);return{directory:r,prefix:o}}
async function Rfd(e){let t=ZHi.get(e);if(t)return t;try{let o=(await jt().readdir(e)).filter((s)=>s.isDirectory()&&!s.name.startsWith(".")).map((s)=>({name:s.name,path:ZK.join(e,s.name),type:"directory"})).slice(0,rIi);return ZHi.set(e,o),o}catch(n){return logForDebugging(`Directory completion: failed to scan ${e}: ${n instanceof Error?n.message:String(n)}`,{level:"error"}),[]}}
async function bEn(e,t={}){if(ec())return[];let{basePath:n=Pt(),maxResults:r=10}=t,{directory:o,prefix:s}=oIi(e,n),i=await Rfd(o),a=s.toLowerCase();return i.filter((c)=>c.name.toLowerCase().startsWith(a)).slice(0,r).map((c)=>({id:c.path,displayText:c.name+"/",description:"directory",metadata:{type:"directory"}}))}
function sIi(e){return e.startsWith("~/")||e.startsWith("/")||e.startsWith("./")||e.startsWith("../")||e==="~"||e==="."||e===".."}
async function xfd(e,t=!1){let n=`${e}:${t}`,r=eIi.get(n);if(r)return r;try{let i=(await jt().readdir(e)).filter((a)=>t||!a.name.startsWith(".")).map((a)=>({name:a.name,path:ZK.join(e,a.name),type:a.isDirectory()?"directory":"file"})).sort((a,l)=>{if(a.type==="directory"&&l.type!=="directory")return-1;if(a.type!=="directory"&&l.type==="directory")return 1;return a.name.localeCompare(l.name)}).slice(0,rIi);return eIi.set(n,i),i}catch(o){return logForDebugging(`Failed to scan directory for path completion: ${o}`,{level:"error"}),[]}}
async function iIi(e,t={}){if(ec())return[];let{basePath:n=Pt(),maxResults:r=10,includeFiles:o=!0,includeHidden:s=!1}=t,{directory:i,prefix:a}=oIi(e,n),l=await xfd(i,s),c=a.toLowerCase(),u=l.filter((m)=>{if(!o&&m.type==="file")return!1;return m.name.toLowerCase().startsWith(c)}).slice(0,r),d=e.includes("/")||e.includes(ZK.sep),p="";if(d){let m=e.lastIndexOf("/"),f=e.lastIndexOf(ZK.sep),A=Math.max(m,f);p=e.substring(0,A+1)}if(p.startsWith("./")||p.startsWith("."+ZK.sep))p=p.slice(2);return u.map((m)=>{let f=p+m.name;return{id:f,displayText:m.type==="directory"?f+"/":f,metadata:{type:m.type}}})}
var ZK,tIi=500,nIi=300000,rIi=5000,ZHi,eIi;
var u3r=b(()=>{S7e();Go();ws();Iu();Dd();qe();ZK=require("path"),ZHi=new j3({max:tIi,ttl:nIi}),eIi=new j3({max:tIi,ttl:nIi})});
export {oIi,Rfd,bEn,sIi,xfd,iIi,ZK,tIi,nIi,rIi,ZHi,eIi,u3r};
