// @ts-nocheck
import {eie,ket} from "./m2242.ts";
import {mE,Jm} from "../src/config/2207_Jm.ts";
import {Zmt,gWn} from "./m4399.ts";
import {nEn,xUe,vDt} from "./m2246.ts";
import {EEi,xet} from "../src/config/2248_user.ts";
import {He,Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
function QWp(){let e;try{e=eie()}catch{return null}if(e===null)return null;let t=new Set(["MEMORY.md"]);for(let n of e){if(n.promptIndex===void 0)continue;let r=n.promptIndex.split("/");t.add(n.scope==="user"?eft.join(...r):eft.join("team",n.mount,...r))}return t}
function eGp(e){for(let t of e.split(`
`)){let n=t.replace(/^#{1,6}\s+/,"").trim();if(n)return n.slice(0,ZWp)}return null}
function tGp(e){if(typeof e!=="string")return null;let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;let n=Number(t[1]),r=Number(t[2]),o=Number(t[3]),s=new Date(n,r-1,o).getTime();return Number.isNaN(s)?null:s}
async function Z6t(e,t){let n=mE(),r=n?XWp:JWp,o=QWp();try{let i=(await psl.readdir(e,{recursive:!0})).filter((c)=>c.endsWith(".md")&&(o?!o.has(c):eft.basename(c)!=="MEMORY.md")),l=(await Promise.allSettled(i.map(async(c)=>{let u=eft.join(e,c),{content:d,mtimeMs:p}=await Zmt(u,0,r,void 0,t),{frontmatter:m,body:f}=nEn(d,u),h=xUe(m,"created"),g=(n?tGp(h):null)??p;return{filename:c,filePath:u,mtimeMs:g,description:m.description??(o?eGp(f):null),type:EEi(xUe(m,"type")),created:h,last_read:xUe(m,"last_read"),content:n?f.trim()||null:null}}))).filter((c)=>c.status==="fulfilled").map((c)=>c.value).sort((c,u)=>u.mtimeMs-c.mtimeMs).slice(0,n?YWp:jWp);return He("memory_scan"),l}catch{return Pt("memory_scan","memory_scan_readdir_failed"),[]}}
function e5t(e){return e.map((t)=>{let n=t.type?`[${t.type}] `:"",r=new Date(t.mtimeMs).toISOString(),o=`- ${n}${t.filename} (${r})`;if(t.content!==null){let s=t.content.replace(/\n/g,`
  `);return`${o}
  ${s}`}return t.description?`${o}: ${t.description}`:o}).join(`
`)}
var psl,eft,jWp=200,YWp=250,JWp=30,XWp=200,ZWp=120;
var jSo=b(()=>{mn();ket();gWn();vDt();xet();Jm();psl=require("fs/promises"),eft=require("path")});
export {QWp,eGp,tGp,Z6t,e5t,psl,eft,jWp,YWp,JWp,XWp,ZWp,jSo};
