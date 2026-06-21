// @ts-nocheck
import {KQl,VQl,zQl,YQl} from "./m5541.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {JLe,C2,YT} from "../src/tools/0323_ttl.ts";
import {fp,J_,__,Mf,initKp} from "./m609.ts";
import {isAmberSentinelEnabled,QH} from "./m2784.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {sleep} from "../src/telemetry/1483_withTimeout.ts";
import {pLt,mLt} from "../src/telemetry/2807__meta.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {_m,sA} from "./m2782.ts";
import {mainAgentId,lt} from "../src/session/0131_sent.ts";
import {Ikn,Dkn} from "./m3143.ts";
import {uI,Ax} from "./m5146.ts";
import {b} from "../runtime.ts";
async function YGt(e){try{await KQl(e)}catch(t){logForDebugging(`removeMcpTaskMetadata failed: ${String(t)}`)}}
function bMo(e){return e==="completed"||e==="failed"||e==="cancelled"}
function HUm(e,t,n){let r=EMo.get(e);if(!r)r=new Map,EMo.set(e,r),e.setNotificationHandler(JLe,(o)=>{EMo.get(e)?.get(o.params.taskId)?.(o.params.status,o.params.statusMessage)});return r.set(t,n),()=>{r.delete(t)}}
function XQl(e){let n=`MCP task ${e.mcpTaskId.slice(0,8)} (${e.serverName}/${e.toolName}) ${e.status}.`,r=e.status==="completed"?e.resultText??"":e.status==="failed"?`Task failed: ${e.statusMessage??"no detail"}`:"Task was cancelled by the server.";return`<${fp}>
<${J_}>${e.registryId}</${J_}>
<${__}>${e.status}</${__}>
<${Mf}>${isAmberSentinelEnabled(n)}</${Mf}>
<result>
${isAmberSentinelEnabled(r)}
</result>
</${fp}>`}
function IUm(e){return DUm(e).catch((t)=>De(t))}
async function DUm({client:e,taskRegistry:t,taskState:n,pollIntervalMs:r}){let{id:o,mcpTaskId:s,serverName:i,toolName:a}=n,l=n.mcpStatus,c=n.statusMessage;VQl(o,{taskId:o,serverName:i,toolName:a,mcpTaskId:s,pollIntervalMs:r,spawnedAt:n.startTime,toolUseId:n.toolUseId}).catch((A)=>logForDebugging(`writeMcpTaskMetadata ${o}: ${String(A)}`));let u=(A,h)=>{if(A===l&&h===c)return;if(bMo(l)&&!bMo(A))return;l=A,c=h,t.update(o,(g)=>({...g,mcpStatus:A,statusMessage:h}))},d=HUm(e,s,u),p=Math.min(Math.max(r??wUm,RUm),xUm),m=0,f;try{while(!bMo(l)){if(l==="input_required")try{await e.experimental.tasks.getTaskResult(s,C2)}catch(h){logForDebugging(`mcp task ${s} getTaskResult during input_required: ${h}`)}if(await sleep(p),t.get(o)?.status==="killed"){e.experimental.tasks.cancelTask(s).catch((h)=>logForDebugging(`mcp task ${s} cancel after kill: ${h}`)),YGt(o);return}try{let h=await e.experimental.tasks.getTask(s);m=0,u(h.status,h.statusMessage)}catch(h){if(m++,logForDebugging(`mcp task ${s} poll failed: ${h}`),m>=kUm){l="failed",c=`Task polling failed repeatedly: ${String(h)}`,f="poll_failed_repeatedly";break}}}let A;if(l==="completed")try{let g=((await e.experimental.tasks.getTaskResult(s,C2)).content??[]).map((y)=>y.type==="text"?y.text:`[${y.type}]`).join(`
`),_=await pLt(g);A=typeof _==="string"?_:g}catch(h){l="failed",c=`Failed to fetch task result: ${String(h)}`,f="result_fetch_failed"}if(t.get(o)?.status==="killed"){e.experimental.tasks.cancelTask(s).catch((h)=>logForDebugging(`mcp task ${s} cancel after kill: ${h}`)),YGt(o);return}if(l==="completed")Ie("mcp_task_complete");else if(l==="cancelled")Oe("mcp_task_complete","cancelled_by_server");else Oe("mcp_task_complete",f??"failed");t.update(o,(h)=>({...h,status:l==="completed"?"completed":"failed",mcpStatus:l,statusMessage:c,endTime:Date.now(),notified:!0})),YGt(o),_m({value:XQl({registryId:o,mcpTaskId:s,serverName:i,toolName:a,status:l,resultText:A,statusMessage:c}),mode:"task-notification",agentId:mainAgentId(),priority:"next"})}finally{d()}}
async function JGt(e){if(!Ikn())return;let t;try{t=await zQl()}catch(n){Oe("mcp_task_restore","list_failed"),logForDebugging(`restoreMcpTasks list failed: ${String(n)}`);return}for(let n of t)PUm(n,e).catch((r)=>logForDebugging(`restoreMcpTasks ${n.taskId}: ${String(r)}`));Ie("mcp_task_restore")}
async function PUm(e,{taskRegistry:t,getMcpClients:n}){let r={...uI(e.taskId,"mcp_task",`${e.serverName}/${e.toolName}`,e.toolUseId),type:"mcp_task",status:"running",serverName:e.serverName,toolName:e.toolName,mcpTaskId:e.mcpTaskId,mcpStatus:"working",statusMessage:"reconnecting\u2026",pollIntervalMs:e.pollIntervalMs,startTime:e.spawnedAt};t.register(r);let o=Date.now()+JQl,s,i;while(Date.now()<o){if(t.get(e.taskId)?.status==="killed"){YGt(e.taskId);return}let a=n().find((l)=>l.name===e.serverName);if(a?.type==="connected"){s=a.client;break}if(a?.type==="failed"||a?.type==="disabled"||a?.type==="needs-auth"){i=`server '${e.serverName}' is ${a.type}`;break}await sleep(500)}if(!s){i??=`server '${e.serverName}' did not connect within ${JQl/1000}s`,t.update(e.taskId,(a)=>({...a,status:"failed",mcpStatus:"failed",statusMessage:i,endTime:Date.now(),notified:!0})),YGt(e.taskId),_m({value:XQl({registryId:e.taskId,mcpTaskId:e.mcpTaskId,serverName:e.serverName,toolName:e.toolName,status:"failed",statusMessage:`Could not reconnect after resume: ${i}`}),mode:"task-notification",agentId:mainAgentId(),priority:"next"});return}IUm({client:s,taskRegistry:t,taskState:r,pollIntervalMs:e.pollIntervalMs})}
var wUm=2000,RUm=100,xUm=60000,kUm=10,JQl=30000,EMo;
var CMo=b(()=>{YT();lt();initKp();Ax();qe();Rn();YQl();mLt();sA();QH();ln();Dkn();EMo=new WeakMap});
export {YGt,bMo,HUm,XQl,IUm,DUm,JGt,PUm,wUm,RUm,xUm,kUm,JQl,EMo,CMo};
