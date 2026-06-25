// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {lNi,Bnt} from "./m2596.ts";
import {EI,ts,oh} from "./m2600.ts";
import {TL,dS} from "../src/config/4460_source.ts";
import {os} from "../src/api/0465_getOauthConfig.ts";
import {pm,l1} from "../src/core/2694_l1.ts";
import {xf,HF,HA} from "./m2219.ts";
import {$ce,Xq} from "../src/agent/5220_bigint.ts";
import {ETo,$q} from "../src/tools/4352_displayName.ts";
import {m9e,fW} from "../src/api/4438_type.ts";
import {qt,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,mo,Ct} from "./m197.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
var aEl={};
ft(aEl,{scaleCharsToTokens:()=>scaleCharsToTokens,getPluginInventory:()=>getPluginInventory,computePluginTokenCost:()=>computePluginTokenCost});
async function getPluginInventory(e,t){if(t==="builtin"){let m=lNi(e.name);if(!m)throw Error(`Built-in plugin ${e.name} not found`);return{commands:[],agents:[],skills:m.skills?.map((f)=>({name:f.name}))??[],hooks:m.hooks?Object.keys(m.hooks):[],mcpServers:m.mcpServers?Object.keys(m.mcpServers):[],lspServers:[]}}let n=EI(t),r=ts(e.source).name||e.name,o=n?void 0:(await TL(t)).plugins.find((m)=>m.name===r);if(!o&&!n)throw Error(`Plugin ${r} not found in marketplace ${t}`);let[s,i,a]=await Promise.all([oEl([e.commandsPath,...e.commandsPaths??[]]),oEl([e.agentsPath,...e.agentsPaths??[]]),tsm([e.skillsPath,...e.skillsPaths??[]])]),l=e.hooksConfig?Object.keys(e.hooksConfig):Q7n(o?.hooks),c=e.mcpServers?Object.keys(e.mcpServers):await Zom(e.path),u=c.length>0?c:Q7n(o?.mcpServers),d=e.lspServers?Object.keys(e.lspServers):(await esm(e.path)).concat(Q7n(e.manifest.lspServers)),p=d.length>0?os(d):Q7n(o?.lspServers);return{commands:s,agents:i,skills:a,hooks:l,mcpServers:u,lspServers:p}}
async function computePluginTokenCost(e,t,n){let[r,o,s]=await Promise.all([Promise.all(e.skills.map((u)=>bwo(u.path?caughtError.join(u.path,"SKILL.md"):void 0,nEl(u,n)))),Promise.all(e.agents.map((u)=>bwo(u.path,u.name))),Promise.all(e.commands.map((u)=>bwo(u.path,nEl(u,n))))]),i=[...r,...o,...s],a=i.map((u)=>u.alwaysOn).filter(Boolean).join(`
`),l=i.map((u)=>u.onInvoke).filter(Boolean).join(`

`),c={};for(let u of t){let[d,p]=await Promise.all([rEl(a,u),rEl(l,u)]);if(d!==null&&p!==null)c[u]={always_on:d,on_invoke:p}}return{tokens:c,inventory:{...e,skills:Ewo(e.skills,r),agents:Ewo(e.agents,o),commands:Ewo(e.commands,s)}}}
function scaleCharsToTokens(e,t,n,r=4){if(n!==void 0&&t>0)return Math.round(e/t*n);return pm(" ".repeat(e),r)}
function nEl(e,t){if(!t)return e.name;return`${t}:${e.name.replace(/[^a-zA-Z0-9_-]/g,"-")}`}
async function bwo(e,t){if(!e)return{alwaysOn:"",onInvoke:""};let n;try{n=await iEl(e,sEl)}catch(l){return Awo(e,l),{alwaysOn:"",onInvoke:""}}let{frontmatter:r,content:o}=xf(n,e,{normalizeKeys:!0}),s=HF(r.description,t)??$ce(o,"Skill"),i=r.when_to_use!=null?String(r.when_to_use):void 0;return{alwaysOn:ETo({name:t,description:s,whenToUse:i}),onInvoke:o.trim()}}
async function iEl(e,t){let n=await bne.open(e,"r");try{let{size:r}=await n.stat(),o=Math.min(r,t),s=Buffer.alloc(o),{bytesRead:i}=await n.read(s,0,o,0);return s.toString("utf8",0,i)}finally{await n.close()}}
function Ewo(e,t){return e.map((n,r)=>{let o=t[r];if(!o)return n;return{...n,chars:{always_on:o.alwaysOn.length,on_invoke:o.onInvoke.length}}})}
async function rEl(e,t){if(!e)return 0;return m9e([{role:"user",content:e}],[],t)}
function Q7n(e){return[e].flat().filter((t)=>t!=null&&typeof t==="object").flatMap(Object.keys)}
async function Zom(e){try{let t=await bne.readFile(caughtError.join(e,".mcp.json"),"utf-8"),n=qt(t);if(n==null||typeof n!=="object")return[];let r="mcpServers"in n&&typeof n.mcpServers==="object"?n.mcpServers:n;return r==null?[]:Object.keys(r)}catch{return[]}}
async function esm(e){try{let t=await bne.readFile(caughtError.join(e,".lsp.json"),"utf-8"),n=qt(t);if(n==null||typeof n!=="object")return[];return Object.keys(n)}catch{return[]}}
async function oEl(e){let t=[],n=new Set;for(let r of e){if(!r)continue;let o;try{o=await bne.readdir(r,{withFileTypes:!0})}catch(s){Awo(r,s);continue}for(let s of o)if(s.isFile()&&s.name.endsWith(".md")){let i=caughtError.join(r,s.name),a=caughtError.resolve(i);if(n.has(a))continue;n.add(a),t.push({name:caughtError.basename(s.name,".md"),path:i})}}return t}
async function tsm(e){let t=[],n=new Set,r=(o,s)=>{let i=caughtError.resolve(s);if(n.has(i))return;n.add(i),t.push({name:o,path:s})};for(let o of e){if(!o)continue;try{let i=caughtError.join(o,"SKILL.md");if((await bne.stat(i)).isFile()){let l="";try{let c=await iEl(i,sEl),{frontmatter:u}=xf(c,i);l=typeof u.name==="string"?u.name.trim():""}catch{}r(l||caughtError.basename(o),o);continue}}catch{}let s;try{s=await bne.readdir(o,{withFileTypes:!0})}catch(i){Awo(o,i);continue}for(let i of s){if(!i.isDirectory()&&!i.isSymbolicLink())continue;let a=caughtError.join(o,i.name);try{if((await bne.stat(caughtError.join(a,"SKILL.md"))).isFile())r(i.name,a)}catch{}}}return t}
function Awo(e,t){logForDebugging(`Failed to read plugin components from ${e}: ${Ce(t)}`,{level:"error"}),Ie(mo(t))}
var bne,caughtError,sEl=1048576;
var Rwo=b(()=>{Bnt();l1();fW();$q();qe();Ct();HA();vn();Xq();tn();dS();oh();bne=x(require("fs/promises")),caughtError=x(require("path"))});
export {aEl,getPluginInventory,computePluginTokenCost,scaleCharsToTokens,nEl,bwo,iEl,Ewo,rEl,Q7n,Zom,esm,oEl,tsm,Awo,bne,caughtError,sEl,Rwo};
