// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0131_sent.ts";
import {ra,Ap} from "../src/config/0614_Ap.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {execFileNoThrow,oa} from "./m684.ts";
import {qt,Le,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Pn,bt} from "./m195.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {fs} from "../src/api/0459_getOauthConfig.ts";
import {b} from "../runtime.ts";
function z4l(){return QYn.join(tr(),"cache","my-closed-issues.json")}
function pkm(e){return new Date(e-dkm*24*60*60*1000).toISOString().slice(0,10)}
async function Y4l(){if(getIsNonInteractiveSession())return null;if(ra())return null;let e=getGlobalConfig(),t=Date.now();if(t-(e.closedIssuesLastChecked??0)<ukm)return null;let n=t,{stdout:r,code:o}=await execFileNoThrow("gh",["issue","list","-R","anthropics/claude-code","--author","@me","--state","closed","--search",`closed:>${pkm(t)}`,"--json","number,title,closedAt,stateReason","--limit","30"],{timeout:ckm,preserveOutputOnError:!1}),s=Date.now()-n,i=null;if(o===0)try{i=qt(r).filter((d)=>d.stateReason==="COMPLETED").map((d)=>({number:d.number,title:d.title,closedAt:d.closedAt}))}catch(u){logForDebugging(`Failed to parse gh issue list output: ${u}`,{level:"error"})}if(i!==null)try{let u=z4l();await UAt.mkdir(QYn.dirname(u),{recursive:!0}),await UAt.writeFile(u,Le(i),{encoding:"utf-8"})}catch(u){logForDebugging(`Failed to write closed-issues cache: ${u}`,{level:"error"})}let a=e.closedIssuesAcknowledged??[],l=a;if(i!==null){let u=new Set(i.map((d)=>d.number));l=a.filter((d)=>u.has(d))}let c=l.length!==a.length||l.some((u,d)=>u!==a[d]);return saveGlobalConfig((u)=>({...u,closedIssuesLastChecked:t,...c&&{closedIssuesAcknowledged:l}})),s}
async function EPo(){try{let e=await UAt.readFile(z4l(),{encoding:"utf-8"}),t=qt(e);return Array.isArray(t)?t:[]}catch(e){if(!Pn(e))De(e);return[]}}
function CPo(e){let t=new Set(getGlobalConfig().closedIssuesAcknowledged??[]);return e.filter((n)=>!t.has(n.number))}
function J4l(e){if(e.length===0)return;let t=getGlobalConfig().closedIssuesAcknowledged??[],n=fs([...t,...e]);if(n.length===t.length)return;saveGlobalConfig((r)=>({...r,closedIssuesAcknowledged:n}))}
var UAt,QYn,ckm=5000,ukm=86400000,dkm=30;
var X4l=b(()=>{lt();Qn();qe();sn();bt();oa();Rn();Ap();Xt();UAt=require("fs/promises"),QYn=require("path")});
export {z4l,pkm,Y4l,EPo,CPo,J4l,UAt,QYn,ckm,ukm,dkm,X4l};
