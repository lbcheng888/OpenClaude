// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {render,je} from "./m2462.ts";
import {AppStateProvider,pq} from "./m3370.ts";
import {KeybindingSetup,WW} from "./m3362.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {hr} from "./m2573.ts";
import {getGlobalConfig,deleteProjectConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {qt,tn} from "../src/config/0230_encoding.ts";
import {In,Ct} from "./m197.ts";
import {vf,Pv} from "./m639.ts";
import {or,dn} from "../src/config/0137_namespace.ts";
import {Vb,Sk,aM,NS,VT} from "./m648.ts";
import {findCanonicalGitRoot,ia} from "./m698.ts";
import {cq,oH} from "../src/agent/3332_id.ts";
import {NK,Tu} from "./m649.ts";
import {xe,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {Rs,ZI,B6,_N} from "./m5161.ts";
import {TS} from "./m4541.ts";
import {oe} from "./m2275.ts";
var NTc={};
ft(NTc,{scanHistoryFile:()=>scanHistoryFile,purgeProjectHandler:()=>purgeProjectHandler});
function y9o(e=""){process.stdout.write(`${e}
`)}
function xTc(e){let t=()=>{},n=new Promise((o)=>{t=o}),r=Frr.createInterface({input:process.stdin,output:process.stdout});return r.question(`${e} [y/N] `,(o)=>{r.close();let s=o.trim().toLowerCase();t(s==="y"||s==="yes")}),n}
async function ZSe(e){try{return await ebe.stat(e),!0}catch{return!1}}
async function PTc(e,t,n){let r=()=>{},o=new Promise((a)=>{r=a}),{unmount:s,waitUntilExit:i}=await render(EVe.jsx(AppStateProvider,{children:EVe.jsx(KeybindingSetup,{children:EVe.jsxs(Box,{flexDirection:"column",gap:1,paddingY:1,children:[EVe.jsx(Text,{bold:!0,children:e}),EVe.jsx(hr,{options:t,defaultValue:n,visibleOptionCount:10,onChange:(a)=>{r(a),s()},onCancel:()=>{r(null),s()}})]})})}),{exitOnCtrlC:!1});return await i(),o}
function OTc(){return Object.keys(getGlobalConfig().projects??{})}
async function EJm(){let e=BL.resolve(getOriginalCwd()),t=OTc(),n=new Set([e]),r=[{label:e,value:e,description:"current directory"}];for(let o of t){if(n.has(o))continue;n.add(o),r.push({label:o,value:o})}return PTc("Select a project to purge:",r,e)}
function LTc(e,t){for(let n of t)if(e===n||e.startsWith(n+BL.sep))return!0;return!1}
function CJm(e,t){if(!e)return!1;try{let n=qt(e);return typeof n.project==="string"&&LTc(n.project,t)}catch{return!1}}
async function AJm(e,t){let n;try{n=(await ebe.readdir(e)).filter((r)=>r.endsWith(".jsonl")).sort()}catch{return!1}for(let r of n){let o=b9o.createReadStream(BL.join(e,r),{encoding:"utf8"}),s=Frr.createInterface({input:o,crlfDelay:1/0}),i=0;try{for await(let a of s){if(++i>50)break;try{let l=qt(a);if(typeof l.cwd==="string")return LTc(l.cwd,t)}catch{}}}catch{}finally{s.close(),o.close()}}return!1}
async function scanHistoryFile(e,t,n){let r=Frr.createInterface({input:b9o.createReadStream(e,{encoding:"utf8"}),crlfDelay:1/0}),o=[],s=0;try{for await(let i of r)if(CJm(i,t))s++;else if(n==="filter")o.push(i)}catch(i){if(In(i))return 0;throw i}if(n==="filter"&&s>0)await vf(e,o.length?`${o.join(`
`)}
`:"");return s}
async function RJm(e){let t;try{t=await ebe.readdir(e)}catch{return[]}return t.filter((n)=>n.endsWith(".jsonl")).map((n)=>n.slice(0,-6)).filter((n)=>bJm.test(n))}
async function vJm(e){let t=or(),n=BL.resolve(e),r=await Vb(n),o=new Set([n,r]),s=[];try{await ebe.stat(n);for(let y of o){let S=findCanonicalGitRoot(y);if(S)s.push(S)}}catch{}let i=[],a=[],l=new Set;for(let y of o)for(let S of await Sk(y))l.add(S);let c=aM(),u=[...o].map((y)=>NS(y)+"-");try{for(let y of await ebe.readdir(c,{withFileTypes:!0})){let S=BL.join(c,y.name);if(y.isDirectory()&&!l.has(S)&&u.some((E)=>y.name.startsWith(E))&&await AJm(S,o))l.add(S)}}catch{}let d=[...l],p=new Set;for(let y of d)for(let S of await RJm(y))p.add(S);for(let y of p){let S=cq(y);if(await ZSe(S))i.push({path:S,kind:"dir",reason:`tasks for session ${y}`});let E=BL.join(t,"debug",`${y}.txt`);if(await ZSe(E))i.push({path:E,kind:"file",reason:`debug log for session ${y}`});let R=BL.join(t,"file-history",y);if(await ZSe(R))i.push({path:R,kind:"dir",reason:`file edit history for session ${y}`})}for(let y of d)i.push({path:y,kind:"dir",reason:"project transcripts (.jsonl) and memory/"});let m=(y)=>NK(y).replace(/\/+$/,"")||"/",f=getGlobalConfig(),h=new Set([...o,...s].map(m));for(let y of Object.keys(f.projects??{}))if(h.has(m(y)))i.push({path:y,kind:"config-key",reason:"project entry in ~/.claude.json (trust, history, MCP servers)"});let g=BL.join(t,"history.jsonl"),_=await scanHistoryFile(g,o,"count");if(_>0)i.push({path:g,kind:"history-lines",reason:`${_} prompt(s) typed in this project`,matchPaths:o});if(await ZSe(BL.join(t,"shell-snapshots")))a.push("shell-snapshots/ are not project-scoped and will not be touched");let T=BL.join(t,"backups");if(await ZSe(T))a.push(`backups/ may still contain this project entry in old .claude.json snapshots (${T}); at most 5 are kept and they rotate out automatically`);return{items:i,warnings:a}}
async function wJm(){let e=or(),t=[],n=[],r=[["projects","all project transcripts (.jsonl) and memory/"],["tasks","all session task lists"],["debug","all session debug logs"],["file-history","all session file edit history"]];for(let[i,a]of r){let l=BL.join(e,i);if(await ZSe(l))t.push({path:l,kind:"dir",reason:a})}let o=BL.join(e,"history.jsonl");if(await ZSe(o))t.push({path:o,kind:"file",reason:"prompt history across all projects"});for(let i of OTc())t.push({path:i,kind:"config-key",reason:"project entry in ~/.claude.json (trust, history, MCP servers)"});if(await ZSe(BL.join(e,"shell-snapshots")))n.push("shell-snapshots/ are not project-scoped and will not be touched");let s=BL.join(e,"backups");if(await ZSe(s))n.push(`backups/ may still contain project entries in old .claude.json snapshots (${s}); at most 5 are kept and they rotate out automatically`);return{items:t,warnings:n}}
async function T9o(e){switch(e.kind){case"config-key":if(!deleteProjectConfig(e.path))return`Failed to remove projects["${e.path}"] from .claude.json \u2014 is your config directory writable?`;return null;case"history-lines":return await scanHistoryFile(e.path,e.matchPaths??new Set,"filter"),null;case"file":case"dir":return await ebe.rm(e.path,{recursive:e.kind==="dir",force:!0}),null}}
function S9o(e,t){if(e.length>0)xe("cli_purge_project","config_write_failed"),Rs(`${e.length} item(s) failed:
  ${e.join(`
  `)}`);He("cli_purge_project"),ZI(t)}
function MTc(e){let t;switch(e.kind){case"config-key":t=`config: projects["${e.path}"]`;break;case"history-lines":t=`filter: ${e.path}`;break;case"file":case"dir":t=`${e.kind}:    ${e.path}`;break}return`${t}
           ${e.reason}`}
function DTc(e,t,n){y9o(`
Purge plan for ${e}:
`);for(let r of t)y9o(`  ${MTc(r)}`);if(n.length){y9o();for(let r of n)B6(r)}}
async function purgeProjectHandler(e,t){if(t.all){if(e)Rs("Cannot specify both a path and --all.");if(t.interactive)Rs("Cannot use -i/--interactive with --all.");let{items:i,warnings:a}=await wJm();if(i.length===0)xe("cli_purge_project","cli_purge_project_nothing_found"),Rs(`No Claude Code project state found under ${or()}.`);if(DTc("all projects",i,a),t.dryRun)ZI(`Dry run: ${i.length} item(s) would be deleted.`);if(!t.yes){if(!await xTc(`Delete ${i.length} item(s) for ALL projects? This cannot be undone.`))Rs("Aborted.")}let l=[];for(let c of i){let u=await T9o(c);if(u)l.push(u)}S9o(l,`Purged ${i.length} item(s) across all projects.`)}let n;if(e)n=BL.resolve(e);else{let i=await EJm();if(i===null)Rs("Aborted.");n=i}let{items:r,warnings:o}=await vJm(n);if(r.length===0)xe("cli_purge_project","cli_purge_project_nothing_found"),Rs(`No Claude Code project state found for ${n} under ${or()}.`);if(DTc(n,r,o),t.dryRun)ZI(`Dry run: ${r.length} item(s) would be deleted.`);if(t.interactive){let i=0,a=!1,l=[];for(let[c,u]of r.entries()){let d="delete";if(!a)d=await PTc(`[${c+1}/${r.length}] ${MTc(u)}`,[{label:"Delete",value:"delete"},{label:"Skip",value:"skip"},{label:"Delete this and all remaining",value:"all"},{label:"Abort",value:"abort"}])??"abort";if(d==="abort")Rs(`Aborted. ${i} item(s) deleted.`);if(d==="skip")continue;if(d==="all")a=!0;let p=await T9o(u);if(p){l.push(p);continue}i++}S9o(l,`Purged ${i}/${r.length} item(s) for ${n}.`)}if(!t.yes){if(!await xTc(`Delete ${r.length} item(s) for ${n}? This cannot be undone.`))Rs("Aborted.")}let s=[];for(let i of r){let a=await T9o(i);if(a)s.push(a)}S9o(s,`Purged ${r.length} item(s) for ${n}.`)}
var b9o,ebe,BL,Frr,EVe,bJm;
var FTc=b(()=>{lt();TS();je();WW();mn();pq();Pv();tr();dn();Ct();ia();Tu();VT();tn();oH();_N();b9o=require("fs"),ebe=require("fs/promises"),BL=require("path"),Frr=require("readline"),EVe=x(oe(),1),bJm=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i});
export {NTc,y9o,xTc,ZSe,PTc,OTc,EJm,LTc,CJm,AJm,scanHistoryFile,RJm,vJm,wJm,T9o,S9o,MTc,DTc,purgeProjectHandler,b9o,ebe,BL,Frr,EVe,bJm,FTc};
