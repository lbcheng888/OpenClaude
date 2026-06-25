// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0132_sent.ts";
import {Vi,$d} from "../src/config/0620_$d.ts";
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {execFileNoThrow,Ii} from "./m690.ts";
import {qt,TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {In,Ct} from "./m197.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {os} from "../src/api/0465_getOauthConfig.ts";
import {b} from "../runtime.ts";
function nzl(){return uer.join(or(),"cache","my-closed-issues.json")}
function $1m(e){return new Date(e-U1m*24*60*60*1000).toISOString().slice(0,10)}
async function rzl(){if(getIsNonInteractiveSession())return null;if(Vi())return null;let e=getGlobalConfig(),t=Date.now();if(t-(e.closedIssuesLastChecked??0)<B1m)return null;let n=t,{stdout:r,code:o}=await execFileNoThrow("gh",["issue","list","-R","anthropics/claude-code","--author","@me","--state","closed","--search",`closed:>${$1m(t)}`,"--json","number,title,closedAt,stateReason","--limit","30"],{timeout:F1m,preserveOutputOnError:!1}),s=Date.now()-n,i=null;if(o===0)try{i=qt(r).filter((d)=>d.stateReason==="COMPLETED").map((d)=>({number:d.number,title:d.title,closedAt:d.closedAt}))}catch(u){logForDebugging(`Failed to parse gh issue list output: ${u}`,{level:"error"})}if(i!==null)try{let u=nzl();await oyt.mkdir(uer.dirname(u),{recursive:!0}),await oyt.writeFile(u,TeamDeleteToolName(i),{encoding:"utf-8"})}catch(u){logForDebugging(`Failed to write closed-issues cache: ${u}`,{level:"error"})}let a=e.closedIssuesAcknowledged??[],l=a;if(i!==null){let u=new Set(i.map((d)=>d.number));l=a.filter((d)=>u.has(d))}let c=l.length!==a.length||l.some((u,d)=>u!==a[d]);return saveGlobalConfig((u)=>({...u,closedIssuesLastChecked:t,...c&&{closedIssuesAcknowledged:l}})),s}
async function ZNo(){try{let e=await oyt.readFile(nzl(),{encoding:"utf-8"}),t=qt(e);return Array.isArray(t)?t:[]}catch(e){if(!In(e))Ie(e);return[]}}
function eFo(e){let t=new Set(getGlobalConfig().closedIssuesAcknowledged??[]);return e.filter((n)=>!t.has(n.number))}
function ozl(e){if(e.length===0)return;let t=getGlobalConfig().closedIssuesAcknowledged??[],n=os([...t,...e]);if(n.length===t.length)return;saveGlobalConfig((r)=>({...r,closedIssuesAcknowledged:n}))}
var oyt,uer,F1m=5000,B1m=86400000,U1m=30;
var szl=b(()=>{lt();tr();qe();dn();Ct();Ii();vn();$d();tn();oyt=require("fs/promises"),uer=require("path")});
export {nzl,$1m,rzl,ZNo,eFo,ozl,oyt,uer,F1m,B1m,U1m,szl};
