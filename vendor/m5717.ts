// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {render,ze} from "./m2452.ts";
import {AppStateProvider,Jq} from "./m3354.ts";
import {KeybindingSetup,xW} from "./m3346.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {pr} from "./m2562.ts";
import {getGlobalConfig,deleteProjectConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {Pn,bt} from "./m195.ts";
import {Rh,ok} from "./m633.ts";
import {tr,sn} from "../src/config/0047_namespace.ts";
import {$b,sk,KM,BS,QT} from "./m642.ts";
import {findCanonicalGitRoot,Ba} from "./m693.ts";
import {Kq,Nk} from "../src/agent/3316_id.ts";
import {u7,Iu} from "./m643.ts";
import {Oe,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {Fs,vI,uj,qU} from "./m5131.ts";
import {yb} from "./m4521.ts";
import {Te} from "./m2253.ts";
var Hcc={};
isFullscreenWithTTY(Hcc,{scanHistoryFile:()=>scanHistoryFile,purgeProjectHandler:()=>purgeProjectHandler});
function wNo(e=""){process.stdout.write(`${e}
`)}
function Ccc(e){let t=()=>{},n=new Promise((o)=>{t=o}),r=yZn.createInterface({input:process.stdin,output:process.stdout});return r.question(`${e} [y/N] `,(o)=>{r.close();let s=o.trim().toLowerCase();t(s==="y"||s==="yes")}),n}
async function _Te(e){try{return await yTe.stat(e),!0}catch{return!1}}
async function wcc(e,t,n){let r=()=>{},o=new Promise((a)=>{r=a}),{unmount:s,waitUntilExit:i}=await render(Iht.default.createElement(AppStateProvider,null,Iht.default.createElement(KeybindingSetup,null,Iht.default.createElement(Box,{flexDirection:"column",gap:1,paddingY:1},Iht.default.createElement(Text,{bold:!0},e),Iht.default.createElement(pr,{options:t,defaultValue:n,visibleOptionCount:10,onChange:(a)=>{r(a),s()},onCancel:()=>{r(null),s()}})))),{exitOnCtrlC:!1});return await i(),o}
function Rcc(){return Object.keys(getGlobalConfig().projects??{})}
async function Aqm(){let e=vM.resolve(getOriginalCwd()),t=Rcc(),n=new Set([e]),r=[{label:e,value:e,description:"current directory"}];for(let o of t){if(n.has(o))continue;n.add(o),r.push({label:o,value:o})}return wcc("Select a project to purge:",r,e)}
function xcc(e,t){for(let n of t)if(e===n||e.startsWith(n+vM.sep))return!0;return!1}
function hqm(e,t){if(!e)return!1;try{let n=qt(e);return typeof n.project==="string"&&xcc(n.project,t)}catch{return!1}}
async function gqm(e,t){let n;try{n=(await yTe.readdir(e)).filter((r)=>r.endsWith(".jsonl")).sort()}catch{return!1}for(let r of n){let o=kNo.createReadStream(vM.join(e,r),{encoding:"utf8"}),s=yZn.createInterface({input:o,crlfDelay:1/0}),i=0;try{for await(let a of s){if(++i>50)break;try{let l=qt(a);if(typeof l.cwd==="string")return xcc(l.cwd,t)}catch{}}}catch{}finally{s.close(),o.close()}}return!1}
async function scanHistoryFile(e,t,n){let r=yZn.createInterface({input:kNo.createReadStream(e,{encoding:"utf8"}),crlfDelay:1/0}),o=[],s=0;try{for await(let i of r)if(hqm(i,t))s++;else if(n==="filter")o.push(i)}catch(i){if(Pn(i))return 0;throw i}if(n==="filter"&&s>0)await Rh(e,o.length?`${o.join(`
`)}
`:"");return s}
async function _qm(e){let t;try{t=await yTe.readdir(e)}catch{return[]}return t.filter((n)=>n.endsWith(".jsonl")).map((n)=>n.slice(0,-6)).filter((n)=>fqm.test(n))}
async function yqm(e){let t=tr(),n=vM.resolve(e),r=await $b(n),o=new Set([n,r]),s=[];try{await yTe.stat(n);for(let y of o){let T=findCanonicalGitRoot(y);if(T)s.push(T)}}catch{}let i=[],a=[],l=new Set;for(let y of o)for(let T of await sk(y))l.add(T);let c=KM(),u=[...o].map((y)=>BS(y)+"-");try{for(let y of await yTe.readdir(c,{withFileTypes:!0})){let T=vM.join(c,y.name);if(y.isDirectory()&&!l.has(T)&&u.some((S)=>y.name.startsWith(S))&&await gqm(T,o))l.add(T)}}catch{}let d=[...l],p=new Set;for(let y of d)for(let T of await _qm(y))p.add(T);for(let y of p){let T=Kq(y);if(await _Te(T))i.push({path:T,kind:"dir",reason:`tasks for session ${y}`});let S=vM.join(t,"debug",`${y}.txt`);if(await _Te(S))i.push({path:S,kind:"file",reason:`debug log for session ${y}`});let v=vM.join(t,"file-history",y);if(await _Te(v))i.push({path:v,kind:"dir",reason:`file edit history for session ${y}`})}for(let y of d)i.push({path:y,kind:"dir",reason:"project transcripts (.jsonl) and memory/"});let m=(y)=>u7(y).replace(/\/+$/,"")||"/",f=getGlobalConfig(),A=new Set([...o,...s].map(m));for(let y of Object.keys(f.projects??{}))if(A.has(m(y)))i.push({path:y,kind:"config-key",reason:"project entry in ~/.claude.json (trust, history, MCP servers)"});let h=vM.join(t,"history.jsonl"),g=await scanHistoryFile(h,o,"count");if(g>0)i.push({path:h,kind:"history-lines",reason:`${g} prompt(s) typed in this project`,matchPaths:o});if(await _Te(vM.join(t,"shell-snapshots")))a.push("shell-snapshots/ are not project-scoped and will not be touched");let _=vM.join(t,"backups");if(await _Te(_))a.push(`backups/ may still contain this project entry in old .claude.json snapshots (${_}); at most 5 are kept and they rotate out automatically`);return{items:i,warnings:a}}
async function Tqm(){let e=tr(),t=[],n=[],r=[["projects","all project transcripts (.jsonl) and memory/"],["tasks","all session task lists"],["debug","all session debug logs"],["file-history","all session file edit history"]];for(let[i,a]of r){let l=vM.join(e,i);if(await _Te(l))t.push({path:l,kind:"dir",reason:a})}let o=vM.join(e,"history.jsonl");if(await _Te(o))t.push({path:o,kind:"file",reason:"prompt history across all projects"});for(let i of Rcc())t.push({path:i,kind:"config-key",reason:"project entry in ~/.claude.json (trust, history, MCP servers)"});if(await _Te(vM.join(e,"shell-snapshots")))n.push("shell-snapshots/ are not project-scoped and will not be touched");let s=vM.join(e,"backups");if(await _Te(s))n.push(`backups/ may still contain project entries in old .claude.json snapshots (${s}); at most 5 are kept and they rotate out automatically`);return{items:t,warnings:n}}
async function RNo(e){switch(e.kind){case"config-key":if(!deleteProjectConfig(e.path))return`Failed to remove projects["${e.path}"] from .claude.json \u2014 is your config directory writable?`;return null;case"history-lines":return await scanHistoryFile(e.path,e.matchPaths??new Set,"filter"),null;case"file":case"dir":return await yTe.rm(e.path,{recursive:e.kind==="dir",force:!0}),null}}
function xNo(e,t){if(e.length>0)Oe("cli_purge_project","config_write_failed"),Fs(`${e.length} item(s) failed:
  ${e.join(`
  `)}`);Ie("cli_purge_project"),vI(t)}
function kcc(e){let t;switch(e.kind){case"config-key":t=`config: projects["${e.path}"]`;break;case"history-lines":t=`filter: ${e.path}`;break;case"file":case"dir":t=`${e.kind}:    ${e.path}`;break}return`${t}
           ${e.reason}`}
function vcc(e,t,n){wNo(`
Purge plan for ${e}:
`);for(let r of t)wNo(`  ${kcc(r)}`);if(n.length){wNo();for(let r of n)uj(r)}}
async function purgeProjectHandler(e,t){if(t.all){if(e)Fs("Cannot specify both a path and --all.");if(t.interactive)Fs("Cannot use -i/--interactive with --all.");let{items:i,warnings:a}=await Tqm();if(i.length===0)Oe("cli_purge_project","cli_purge_project_nothing_found"),Fs(`No Claude Code project state found under ${tr()}.`);if(vcc("all projects",i,a),t.dryRun)vI(`Dry run: ${i.length} item(s) would be deleted.`);if(!t.yes){if(!await Ccc(`Delete ${i.length} item(s) for ALL projects? This cannot be undone.`))Fs("Aborted.")}let l=[];for(let c of i){let u=await RNo(c);if(u)l.push(u)}xNo(l,`Purged ${i.length} item(s) across all projects.`)}let n;if(e)n=vM.resolve(e);else{let i=await Aqm();if(i===null)Fs("Aborted.");n=i}let{items:r,warnings:o}=await yqm(n);if(r.length===0)Oe("cli_purge_project","cli_purge_project_nothing_found"),Fs(`No Claude Code project state found for ${n} under ${tr()}.`);if(vcc(n,r,o),t.dryRun)vI(`Dry run: ${r.length} item(s) would be deleted.`);if(t.interactive){let i=0,a=!1,l=[];for(let[c,u]of r.entries()){let d="delete";if(!a)d=await wcc(`[${c+1}/${r.length}] ${kcc(u)}`,[{label:"Delete",value:"delete"},{label:"Skip",value:"skip"},{label:"Delete this and all remaining",value:"all"},{label:"Abort",value:"abort"}])??"abort";if(d==="abort")Fs(`Aborted. ${i} item(s) deleted.`);if(d==="skip")continue;if(d==="all")a=!0;let p=await RNo(u);if(p){l.push(p);continue}i++}xNo(l,`Purged ${i}/${r.length} item(s) for ${n}.`)}if(!t.yes){if(!await Ccc(`Delete ${r.length} item(s) for ${n}? This cannot be undone.`))Fs("Aborted.")}let s=[];for(let i of r){let a=await RNo(i);if(a)s.push(a)}xNo(s,`Purged ${r.length} item(s) for ${n}.`)}
var kNo,yTe,vM,Iht,yZn,fqm;
var Icc=b(()=>{lt();yb();ze();xW();ln();Jq();ok();Qn();sn();bt();Ba();Iu();QT();Xt();Nk();qU();kNo=require("fs"),yTe=require("fs/promises"),vM=require("path"),Iht=M(Te(),1),yZn=require("readline"),fqm=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i});
export {Hcc,wNo,Ccc,_Te,wcc,Rcc,Aqm,xcc,hqm,gqm,scanHistoryFile,_qm,yqm,Tqm,RNo,xNo,kcc,vcc,purgeProjectHandler,kNo,yTe,vM,Iht,yZn,fqm,Icc};
