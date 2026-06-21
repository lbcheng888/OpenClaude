// @ts-nocheck
import {tie,RQe} from "./m2234.ts";
import {lE,tA} from "../src/config/2201_tA.ts";
import {Zdt,Jqn} from "./m4377.ts";
import {yyn,OFe,JHt} from "./m2238.ts";
import {Shi,HQe} from "../src/config/2240_user.ts";
import {Ie,isTmuxControlMode,ln} from "../src/telemetry/0594_feature_name.ts";
import {b} from "../runtime.ts";
function h$p(){let e;try{e=tie()}catch{return null}if(e===null)return null;let t=new Set(["MEMORY.md"]);for(let n of e){if(n.promptIndex===void 0)continue;let r=n.promptIndex.split("/");t.add(n.scope==="user"?ept.join(...r):ept.join("team",n.mount,...r))}return t}
function _$p(e){for(let t of e.split(`
`)){let n=t.replace(/^#{1,6}\s+/,"").trim();if(n)return n.slice(0,g$p)}return null}
function y$p(e){if(typeof e!=="string")return null;let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;let n=Number(t[1]),r=Number(t[2]),o=Number(t[3]),s=new Date(n,r-1,o).getTime();return Number.isNaN(s)?null:s}
async function R4t(e,t){let n=lE(),r=n?A$p:f$p,o=h$p();try{let i=(await kQa.readdir(e,{recursive:!0})).filter((c)=>c.endsWith(".md")&&(o?!o.has(c):ept.basename(c)!=="MEMORY.md")),l=(await Promise.allSettled(i.map(async(c)=>{let u=ept.join(e,c),{content:d,mtimeMs:p}=await Zdt(u,0,r,void 0,t),{frontmatter:m,body:f}=yyn(d,u),A=OFe(m,"created"),h=(n?y$p(A):null)??p;return{filename:c,filePath:u,mtimeMs:h,description:m.description??(o?_$p(f):null),type:Shi(OFe(m,"type")),created:A,last_read:OFe(m,"last_read"),content:n?f.trim()||null:null}}))).filter((c)=>c.status==="fulfilled").map((c)=>c.value).sort((c,u)=>u.mtimeMs-c.mtimeMs).slice(0,n?m$p:p$p);return Ie("memory_scan"),l}catch{return isTmuxControlMode("memory_scan","memory_scan_readdir_failed"),[]}}
function x4t(e){return e.map((t)=>{let n=t.type?`[${t.type}] `:"",r=new Date(t.mtimeMs).toISOString(),o=`- ${n}${t.filename} (${r})`;if(t.content!==null){let s=t.content.replace(/\n/g,`
  `);return`${o}
  ${s}`}return t.description?`${o}: ${t.description}`:o}).join(`
`)}
var kQa,ept,p$p=200,m$p=250,f$p=30,A$p=200,g$p=120;
var rho=b(()=>{ln();RQe();Jqn();JHt();HQe();tA();kQa=require("fs/promises"),ept=require("path")});
export {h$p,_$p,y$p,R4t,x4t,kQa,ept,p$p,m$p,f$p,A$p,g$p,rho};
