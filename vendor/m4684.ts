// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {H0i,Oet} from "./m2585.ts";
import {GH,gs,sh} from "./m2589.ts";
import {tM,hS} from "../src/config/4438_source.ts";
import {fs} from "../src/api/0459_getOauthConfig.ts";
import {$f,HF} from "../src/core/2683_HF.ts";
import {RA,iF,Ev} from "./m2211.ts";
import {Gce,D6} from "../src/agent/5186_bigint.ts";
import {wfo,x6} from "../src/tools/4332_displayName.ts";
import {u$e,Z5} from "../src/api/4416_type.ts";
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,_o,bt} from "./m195.ts";
import {De,Rn} from "../src/session/0615_length.ts";
var pfl={};
isFullscreenWithTTY(pfl,{scaleCharsToTokens:()=>scaleCharsToTokens,getPluginInventory:()=>getPluginInventory,computePluginTokenCost:()=>computePluginTokenCost});
async function getPluginInventory(e,t){if(t==="builtin"){let m=H0i(e.name);if(!m)throw Error(`Built-in plugin ${e.name} not found`);return{commands:[],agents:[],skills:m.skills?.map((f)=>({name:f.name}))??[],hooks:m.hooks?Object.keys(m.hooks):[],mcpServers:m.mcpServers?Object.keys(m.mcpServers):[],lspServers:[]}}let n=GH(t),r=gs(e.source).name||e.name,o=n?void 0:(await tM(t)).plugins.find((m)=>m.name===r);if(!o&&!n)throw Error(`Plugin ${r} not found in marketplace ${t}`);let[s,i,a]=await Promise.all([cfl([e.commandsPath,...e.commandsPaths??[]]),cfl([e.agentsPath,...e.agentsPaths??[]]),XYp([e.skillsPath,...e.skillsPaths??[]])]),l=e.hooksConfig?Object.keys(e.hooksConfig):fWn(o?.hooks),c=e.mcpServers?Object.keys(e.mcpServers):await YYp(e.path),u=c.length>0?c:fWn(o?.mcpServers),d=e.lspServers?Object.keys(e.lspServers):(await JYp(e.path)).concat(fWn(e.manifest.lspServers)),p=d.length>0?fs(d):fWn(o?.lspServers);return{commands:s,agents:i,skills:a,hooks:l,mcpServers:u,lspServers:p}}
async function computePluginTokenCost(e,t,n){let[r,o,s]=await Promise.all([Promise.all(e.skills.map((u)=>obo(u.path?tj.join(u.path,"SKILL.md"):void 0,afl(u,n)))),Promise.all(e.agents.map((u)=>obo(u.path,u.name))),Promise.all(e.commands.map((u)=>obo(u.path,afl(u,n))))]),i=[...r,...o,...s],a=i.map((u)=>u.alwaysOn).filter(Boolean).join(`
`),l=i.map((u)=>u.onInvoke).filter(Boolean).join(`

`),c={};for(let u of t){let[d,p]=await Promise.all([lfl(a,u),lfl(l,u)]);if(d!==null&&p!==null)c[u]={always_on:d,on_invoke:p}}return{tokens:c,inventory:{...e,skills:sbo(e.skills,r),agents:sbo(e.agents,o),commands:sbo(e.commands,s)}}}
function scaleCharsToTokens(e,t,n,r=4){if(n!==void 0&&t>0)return Math.round(e/t*n);return $f(" ".repeat(e),r)}
function afl(e,t){if(!t)return e.name;return`${t}:${e.name.replace(/[^a-zA-Z0-9_-]/g,"-")}`}
async function obo(e,t){if(!e)return{alwaysOn:"",onInvoke:""};let n;try{n=await dfl(e,ufl)}catch(l){return abo(e,l),{alwaysOn:"",onInvoke:""}}let{frontmatter:r,content:o}=RA(n,e,{normalizeKeys:!0}),s=iF(r.description,t)??Gce(o,"Skill"),i=r.when_to_use!=null?String(r.when_to_use):void 0;return{alwaysOn:wfo({name:t,description:s,whenToUse:i}),onInvoke:o.trim()}}
async function dfl(e,t){let n=await kne.open(e,"r");try{let{size:r}=await n.stat(),o=Math.min(r,t),s=Buffer.alloc(o),{bytesRead:i}=await n.read(s,0,o,0);return s.toString("utf8",0,i)}finally{await n.close()}}
function sbo(e,t){return e.map((n,r)=>{let o=t[r];if(!o)return n;return{...n,chars:{always_on:o.alwaysOn.length,on_invoke:o.onInvoke.length}}})}
async function lfl(e,t){if(!e)return 0;return u$e([{role:"user",content:e}],[],t)}
function fWn(e){return[e].flat().filter((t)=>t!=null&&typeof t==="object").flatMap(Object.keys)}
async function YYp(e){try{let t=await kne.readFile(tj.join(e,".mcp.json"),"utf-8"),n=qt(t);if(n==null||typeof n!=="object")return[];let r="mcpServers"in n&&typeof n.mcpServers==="object"?n.mcpServers:n;return r==null?[]:Object.keys(r)}catch{return[]}}
async function JYp(e){try{let t=await kne.readFile(tj.join(e,".lsp.json"),"utf-8"),n=qt(t);if(n==null||typeof n!=="object")return[];return Object.keys(n)}catch{return[]}}
async function cfl(e){let t=[],n=new Set;for(let r of e){if(!r)continue;let o;try{o=await kne.readdir(r,{withFileTypes:!0})}catch(s){abo(r,s);continue}for(let s of o)if(s.isFile()&&s.name.endsWith(".md")){let i=tj.join(r,s.name),a=tj.resolve(i);if(n.has(a))continue;n.add(a),t.push({name:tj.basename(s.name,".md"),path:i})}}return t}
async function XYp(e){let t=[],n=new Set,r=(o,s)=>{let i=tj.resolve(s);if(n.has(i))return;n.add(i),t.push({name:o,path:s})};for(let o of e){if(!o)continue;try{let i=tj.join(o,"SKILL.md");if((await kne.stat(i)).isFile()){let l="";try{let c=await dfl(i,ufl),{frontmatter:u}=RA(c,i);l=typeof u.name==="string"?u.name.trim():""}catch{}r(l||tj.basename(o),o);continue}}catch{}let s;try{s=await kne.readdir(o,{withFileTypes:!0})}catch(i){abo(o,i);continue}for(let i of s){if(!i.isDirectory()&&!i.isSymbolicLink())continue;let a=tj.join(o,i.name);try{if((await kne.stat(tj.join(a,"SKILL.md"))).isFile())r(i.name,a)}catch{}}}return t}
function abo(e,t){logForDebugging(`Failed to read plugin components from ${e}: ${Se(t)}`,{level:"error"}),De(_o(t))}
var kne,tj,ufl=1048576;
var lbo=b(()=>{Oet();HF();Z5();x6();qe();bt();Ev();Rn();D6();Xt();hS();sh();kne=M(require("fs/promises")),tj=M(require("path"))});
export {pfl,getPluginInventory,computePluginTokenCost,scaleCharsToTokens,afl,obo,dfl,sbo,lfl,fWn,YYp,JYp,cfl,XYp,abo,kne,tj,ufl,lbo};
