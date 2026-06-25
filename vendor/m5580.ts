// @ts-nocheck
import {Lac,Oac,Mac,Nac} from "./m5579.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {WMe,VU,Qy} from "../src/tools/0325_ttl.ts";
import {bc,yp,Qd,Fu,Ud} from "./m615.ts";
import {Ml,Yk} from "./m2796.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {sleep} from "../src/telemetry/1488_withTimeout.ts";
import {U1t,$1t} from "../src/telemetry/2820__meta.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {rd,ef} from "./m2794.ts";
import {mainAgentId,lt} from "../src/session/0132_sent.ts";
import {Sxn,bxn} from "./m3153.ts";
import {av,vw} from "./m5178.ts";
import {b} from "../runtime.ts";
async function Rzt(e){try{await Lac(e)}catch(t){logForDebugging(`removeMcpTaskMetadata failed: ${String(t)}`)}}
function KUo(e){return e==="completed"||e==="failed"||e==="cancelled"}
function sWm(e,t,n){let r=zUo.get(e);if(!r)r=new Map,zUo.set(e,r),e.setNotificationHandler(WMe,(o)=>{zUo.get(e)?.get(o.params.taskId)?.(o.params.status,o.params.statusMessage)});return r.set(t,n),()=>{r.delete(t)}}
function Bac(e){let n=`MCP task ${e.mcpTaskId.slice(0,8)} (${e.serverName}/${e.toolName}) ${e.status}.`,r=e.status==="completed"?e.resultText??"":e.status==="failed"?`Task failed: ${e.statusMessage??"no detail"}`:"Task was cancelled by the server.";return`<${bc}>
<${yp}>${e.registryId}</${yp}>
<${Qd}>${e.status}</${Qd}>
<${Fu}>${Ml(n)}</${Fu}>
<result>
${Ml(r)}
</result>
</${bc}>`}
function iWm(e){return aWm(e).catch((t)=>Ie(t))}
async function aWm({client:e,taskRegistry:t,taskState:n,pollIntervalMs:r}){let{id:o,mcpTaskId:s,serverName:i,toolName:a}=n,l=n.mcpStatus,c=n.statusMessage;Oac(o,{taskId:o,serverName:i,toolName:a,mcpTaskId:s,pollIntervalMs:r,spawnedAt:n.startTime,toolUseId:n.toolUseId}).catch((h)=>logForDebugging(`writeMcpTaskMetadata ${o}: ${String(h)}`));let u=(h,g)=>{if(h===l&&g===c)return;if(KUo(l)&&!KUo(h))return;l=h,c=g,t.update(o,(_)=>({..._,mcpStatus:h,statusMessage:g}))},d=sWm(e,s,u),p=Math.min(Math.max(r??tWm,nWm),rWm),m=0,f;try{while(!KUo(l)){if(l==="input_required")try{await e.experimental.tasks.getTaskResult(s,VU)}catch(g){logForDebugging(`mcp task ${s} getTaskResult during input_required: ${g}`)}if(await sleep(p),t.get(o)?.status==="killed"){e.experimental.tasks.cancelTask(s).catch((g)=>logForDebugging(`mcp task ${s} cancel after kill: ${g}`)),Rzt(o);return}try{let g=await e.experimental.tasks.getTask(s);m=0,u(g.status,g.statusMessage)}catch(g){if(m++,logForDebugging(`mcp task ${s} poll failed: ${g}`),m>=oWm){l="failed",c=`Task polling failed repeatedly: ${String(g)}`,f="poll_failed_repeatedly";break}}}let h;if(l==="completed")try{let _=((await e.experimental.tasks.getTaskResult(s,VU)).content??[]).map((y)=>y.type==="text"?y.text:`[${y.type}]`).join(`
`),T=await U1t(_);h=typeof T==="string"?T:_}catch(g){l="failed",c=`Failed to fetch task result: ${String(g)}`,f="result_fetch_failed"}if(t.get(o)?.status==="killed"){e.experimental.tasks.cancelTask(s).catch((g)=>logForDebugging(`mcp task ${s} cancel after kill: ${g}`)),Rzt(o);return}if(l==="completed")He("mcp_task_complete");else if(l==="cancelled")xe("mcp_task_complete","cancelled_by_server");else xe("mcp_task_complete",f??"failed");t.update(o,(g)=>({...g,status:l==="completed"?"completed":"failed",mcpStatus:l,statusMessage:c,endTime:Date.now(),notified:!0})),Rzt(o),rd({value:Bac({registryId:o,mcpTaskId:s,serverName:i,toolName:a,status:l,resultText:h,statusMessage:c}),mode:"task-notification",agentId:mainAgentId(),priority:"next"})}finally{d()}}
async function vzt(e){if(!Sxn())return;let t;try{t=await Mac()}catch(n){xe("mcp_task_restore","list_failed"),logForDebugging(`restoreMcpTasks list failed: ${String(n)}`);return}for(let n of t)lWm(n,e).catch((r)=>logForDebugging(`restoreMcpTasks ${n.taskId}: ${String(r)}`));He("mcp_task_restore")}
async function lWm(e,{taskRegistry:t,getMcpClients:n}){let r={...av(e.taskId,"mcp_task",`${e.serverName}/${e.toolName}`,e.toolUseId),type:"mcp_task",status:"running",serverName:e.serverName,toolName:e.toolName,mcpTaskId:e.mcpTaskId,mcpStatus:"working",statusMessage:"reconnecting\u2026",pollIntervalMs:e.pollIntervalMs,startTime:e.spawnedAt};t.register(r);let o=Date.now()+Fac,s,i;while(Date.now()<o){if(t.get(e.taskId)?.status==="killed"){Rzt(e.taskId);return}let a=n().find((l)=>l.name===e.serverName);if(a?.type==="connected"){s=a.client;break}if(a?.type==="failed"||a?.type==="disabled"||a?.type==="needs-auth"){i=`server '${e.serverName}' is ${a.type}`;break}await sleep(500)}if(!s){i??=`server '${e.serverName}' did not connect within ${Fac/1000}s`,t.update(e.taskId,(a)=>({...a,status:"failed",mcpStatus:"failed",statusMessage:i,endTime:Date.now(),notified:!0})),Rzt(e.taskId),rd({value:Bac({registryId:e.taskId,mcpTaskId:e.mcpTaskId,serverName:e.serverName,toolName:e.toolName,status:"failed",statusMessage:`Could not reconnect after resume: ${i}`}),mode:"task-notification",agentId:mainAgentId(),priority:"next"});return}iWm({client:s,taskRegistry:t,taskState:r,pollIntervalMs:e.pollIntervalMs})}
var tWm=2000,nWm=100,rWm=60000,oWm=10,Fac=30000,zUo;
var jUo=b(()=>{Qy();lt();Ud();vw();qe();vn();Nac();$1t();ef();Yk();mn();bxn();zUo=new WeakMap});
export {Rzt,KUo,sWm,Bac,iWm,aWm,vzt,lWm,tWm,nWm,rWm,oWm,Fac,zUo,jUo};
