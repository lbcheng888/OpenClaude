// @ts-nocheck
import {getSessionCronTasks,removeSessionCronTasks,mainAgentId,addSessionCronTask,lt} from "../src/session/0132_sent.ts";
import {tXn,DPo,PPo} from "./m5163.ts";
import {jk,D_} from "../src/agent/2784_withFileTypes.ts";
import {cd,xS} from "./m122.ts";
import {Fte,g5e} from "../src/agent/4190_runId.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {pauseWorkflowTask,isLocalWorkflowTask,Hce} from "../src/agent/4186_parse.ts";
import {flushSessionStorage,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {rd,ef} from "./m2794.ts";
import {bc,yp,Qd,Fu,Ud} from "./m615.ts";
import {Ml,Yk} from "./m2796.ts";
import {vf,Pv} from "./m639.ts";
import {cn,Ct} from "./m197.ts";
import {rc,hS} from "../src/agent/4362_toolUseCount.ts";
import {YA} from "./m3366.ts";
import {zn} from "../src/api/0465_getOauthConfig.ts";
import {b} from "../runtime.ts";
import {MS} from "./m460.ts";
import {ve} from "./m461.ts";
import {jt} from "./m253.ts";
function N$l(){return!0}
async function nXn(e){let t=p_t(e),n=Object.values(e).filter((u)=>URm(u,t)),r=Object.values(e).filter((u)=>$Rm(u,t)),o=Object.values(e).filter((u)=>qRm(u,t)),s=getSessionCronTasks().filter((u)=>m_t(u,t));if(n.length===0&&r.length===0&&o.length===0&&s.length===0)return null;let i=[];for(let u of n){let d=u.shellCommand?.detach?.();if(d===void 0)continue;i.push({taskId:u.id,pid:d,startTimeTicks:await tXn(d)??void 0,command:u.command,description:u.description,outputPath:u.shellCommand.taskOutput.path,lastReportedTotalLines:u.lastReportedTotalLines,toolUseId:u.toolUseId,kind:u.kind,agentId:u.agentId})}let a=await Promise.all(r.map(async(u)=>{let d=jk(cd(u.agentId));return{agentId:u.agentId,agentType:u.agentType,description:u.description,toolUseId:u.toolUseId,spawnDepth:u.spawnDepth,startTime:u.startTime,transcriptPath:await Hx.realpath(d).catch(()=>d),parentAgentId:u.parentAgentId}})),l=await Promise.all(o.map(async(u)=>{let d=Fte(u.workflowRunId);return{taskId:u.id,workflowRunId:u.workflowRunId,scriptPath:u.scriptPath,argsJson:u.args!==void 0?TeamDeleteToolName(u.args):void 0,description:u.description,startTime:u.startTime,transcriptDir:await Hx.realpath(d).catch(()=>d)}}));if(i.length===0&&a.length===0&&l.length===0&&s.length===0)return null;let c=!1;return{payload:{writtenAtMs:Date.now(),shells:i,cron:s.map((u)=>({id:u.id,cron:u.cron,prompt:u.prompt,createdAt:u.createdAt,recurring:u.recurring,agentId:u.agentId,kind:u.kind})),agents:a,workflows:l},checkpointAgents:async(u)=>{for(let d of o)d.abortController?.abort("background"),pauseWorkflowTask(d.id,u);if(a.length===0)return;for(let d of i)if(d.agentId!==void 0)u.remove(d.taskId);for(let d of r)d.abortController.abort("background");await M$l.setImmediate(),await flushSessionStorage().catch((d)=>{Pt("task_local_agent","adopt_checkpoint_flush_failed"),logForDebugging(`[adopt] checkpoint flush: ${d}`,{level:"warn"})})},disown:(u)=>{for(let d of i)u.remove(d.taskId);for(let d of a)u.remove(d.agentId);for(let d of l)u.remove(d.taskId);if(s.length>0)removeSessionCronTasks(s.map((d)=>d.id))},abandon:()=>{if(c)return;c=!0;for(let u of n)try{u.shellCommand?.kill()}catch(d){logForDebugging(`[adopt] abandon ${u.id}: ${d}`,{level:"warn"})}for(let u of r)rd({value:`<${bc}>
<${yp}>${Ml(u.agentId)}</${yp}>
<${Qd}>failed</${Qd}>
<${Fu}>Background agent "${Ml(u.description)}" was checkpointed for the background fork but the fork failed to spawn; the agent was not resumed.</${Fu}>
</${bc}>`,agentId:mainAgentId(),mode:"task-notification",priority:"next"});if(r.length>0)Pt("task_local_agent","adopt_spawn_failed");for(let u of o)rd({value:`<${bc}>
<${yp}>${Ml(u.id)}</${yp}>
<${Qd}>failed</${Qd}>
<${Fu}>Background workflow "${Ml(u.description)}" was checkpointed for the background fork but the fork failed to spawn; it was not resumed. To resume manually: Workflow({scriptPath: '${Ml(u.scriptPath??"")}', resumeFromRunId: '${Ml(u.workflowRunId??"")}'}).</${Fu}>
</${bc}>`,agentId:mainAgentId(),mode:"task-notification",priority:"next"});if(o.length>0)Pt("task_local_workflow","adopt_spawn_failed")}}}
async function rXn(e,t){await vf(mGe.join(e,"adopt.json"),JSON.stringify(t))}
async function F$l(e){if(!e)return null;let t=mGe.join(e,"adopt.json"),n=`${t}.${process.pid}`;try{await Hx.rename(t,n)}catch(o){if(cn(o)==="ENOENT")return null;return logForDebugging(`[adopt] rename failed: ${o}`,{level:"warn"}),null}let r=Date.now();try{let o=await Hx.readFile(n,"utf-8"),s=BRm().safeParse(JSON.parse(o));if(!s.success)return logForDebugging(`[adopt] schema rejected: ${s.error.message}`,{level:"warn"}),null;let i=r-s.data.writtenAtMs;if(i>jVt)return logForDebugging(`[adopt] stale (age ${i}ms)`,{level:"warn"}),null;return s.data}catch(o){return logForDebugging(`[adopt] read/parse failed: ${o}`,{level:"warn"}),null}finally{await Hx.unlink(n).catch(()=>{})}}
async function B$l(e){if(!e.transcriptPath)return;let t=jk(cd(e.agentId));if(t===e.transcriptPath)return;let n=(r)=>r.replace(/\.jsonl$/,".meta.json");await Hx.stat(n(e.transcriptPath)),await Hx.mkdir(mGe.dirname(t),{recursive:!0});for(let[r,o]of[[t,e.transcriptPath],[n(t),n(e.transcriptPath)]])await Hx.unlink(r).catch(()=>{}),await Hx.symlink(o,r)}
function U$l(e){return DPo(e.pid,e.startTimeTicks)}
async function $$l(e){let t=Fte(e.workflowRunId);if(t===e.transcriptDir)return;await Hx.stat(mGe.join(e.transcriptDir,"journal.jsonl")),await Hx.mkdir(mGe.dirname(t),{recursive:!0}),await Hx.unlink(t).catch(()=>{}),await Hx.symlink(e.transcriptDir,t)}
function OPo(e,t){rd({value:`<${bc}>
<${yp}>${Ml(e.taskId)}</${yp}>
<${Qd}>failed</${Qd}>
<${Fu}>Background workflow "${Ml(e.description)}" was checkpointed for the background fork but could not be resumed (${Ml(t)}). To resume manually: Workflow({scriptPath: '${Ml(e.scriptPath)}', resumeFromRunId: '${Ml(e.workflowRunId)}'}).</${Fu}>
</${bc}>`,agentId:mainAgentId(),mode:"task-notification",priority:"next"})}
function q$l(e){return e.mcp.clientsInitialized===!0&&!e.mcp.clients.some((t)=>t.type==="pending")}
function oXn(e,t,n){let r=e.parentAgentId!==void 0&&rc(n.get(e.parentAgentId))?cd(e.parentAgentId):mainAgentId();rd({value:`<${bc}>
<${yp}>${Ml(e.agentId)}</${yp}>
<${Qd}>failed</${Qd}>
<${Fu}>Background agent "${Ml(e.description??e.agentId)}" was checkpointed for the background fork but could not be resumed (${Ml(t)}).</${Fu}>
</${bc}>`,agentId:r,mode:"task-notification",priority:"next"})}
function W$l(e){let t=new Set(getSessionCronTasks().map((n)=>n.id));for(let n of e)if(!t.has(n.id))addSessionCronTask(n),t.add(n.id)}
function p_t(e){let t=new Map;if(!N$l())return t;let n=(i)=>rc(i)?i.parentAgentId:("agentId"in i)?i.agentId:void 0,r=new Map;for(let i of Object.values(e)){if(i.status!=="running"&&i.status!=="pending")continue;let a=n(i);if(a!==void 0){let l=r.get(a)??[];l.push(i),r.set(a,l)}}let o=(i)=>{if(rc(i))return i.agentType!=="main-session"&&i.status==="running"&&i.isBackgrounded&&i.abortController!==void 0;if(YA(i))return i.kind!=="monitor"&&i.status==="running"&&i.isBackgrounded&&i.shellCommand!==null&&i.shellCommand.detach!==void 0;if(isLocalWorkflowTask(i))return i.status==="running"&&i.scriptPath!==void 0&&i.workflowRunId!==void 0&&i.abortController!==void 0;return!1},s=(i,a)=>{a.push(i.id);let l=o(i);for(let c of r.get(i.id)??[])l=s(c,a)&&l;return l};for(let i of Object.values(e)){if(!(rc(i)?i.parentAgentId===void 0:YA(i)?i.agentId===void 0:isLocalWorkflowTask(i)))continue;let l=[],c=s(i,l);for(let u of l)t.set(u,c)}return t}
function URm(e,t){return YA(e)&&(t.get(e.id)??!1)}
function m_t(e,t){return N$l()&&(e.agentId===void 0||(t.get(e.agentId)??!1))}
function $Rm(e,t){return rc(e)&&(t.get(e.id)??!1)}
function qRm(e,t){return isLocalWorkflowTask(e)&&(t.get(e.id)??!1)}
function YVt(e,t){return t.get(e.id)??!1}
function JVt(e,t=p_t(e)){return zn(Object.values(e),(n)=>YVt(n,t))+zn(getSessionCronTasks(),(n)=>m_t(n,t))}
function sXn(e){return{adopted_shells:e?.shells.length??0,adopted_agents:e?.agents?.length??0,adopted_workflows:e?.workflows?.length??0,adopted_cron:e?.cron.length??0}}
var Hx,mGe,M$l,jVt=120000,zVt,LRm,MRm,NRm,FRm,BRm;
var iXn=b(()=>{MS();lt();Ud();mn();hS();Hce();g5e();xS();PPo();Pv();qe();Ct();ef();D_();_a();tn();Yk();Hx=require("fs/promises"),mGe=require("path"),M$l=require("timers/promises"),zVt=/^[\w-]+$/,LRm=ve(()=>jt.object({taskId:jt.string().regex(zVt),pid:jt.number().int().positive(),startTimeTicks:jt.number().int().optional(),command:jt.string(),description:jt.string(),outputPath:jt.string(),lastReportedTotalLines:jt.number().int(),toolUseId:jt.string().optional(),kind:jt.enum(["bash","monitor"]).optional(),agentId:jt.string().regex(zVt).optional()})),MRm=ve(()=>jt.object({id:jt.string(),cron:jt.string(),prompt:jt.string(),createdAt:jt.number(),recurring:jt.boolean().optional(),agentId:jt.string().optional(),kind:jt.literal("loop").optional()})),NRm=ve(()=>jt.object({taskId:jt.string().regex(zVt),workflowRunId:jt.string().regex(/^wf_[a-z0-9-]{6,}$/),scriptPath:jt.string(),argsJson:jt.string().optional(),description:jt.string(),startTime:jt.number().optional(),transcriptDir:jt.string()})),FRm=ve(()=>jt.object({agentId:jt.string().regex(zVt),agentType:jt.string().optional(),description:jt.string().optional(),toolUseId:jt.string().optional(),spawnDepth:jt.number().int().optional(),startTime:jt.number().optional(),transcriptPath:jt.string().optional(),parentAgentId:jt.string().regex(zVt).optional()})),BRm=ve(()=>jt.object({writtenAtMs:jt.number(),shells:jt.array(LRm()),cron:jt.array(MRm()),agents:jt.array(FRm()).optional(),workflows:jt.array(NRm()).optional()}))});
export {N$l,nXn,rXn,F$l,B$l,U$l,$$l,OPo,q$l,oXn,W$l,p_t,URm,m_t,$Rm,qRm,YVt,JVt,sXn,Hx,mGe,M$l,jVt,zVt,LRm,MRm,NRm,FRm,BRm,iXn};
