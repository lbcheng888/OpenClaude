// @ts-nocheck
import {yh,Nxe} from "../src/agent/4175_state.ts";
import {kc,aA} from "./m234.ts";
import {qEe} from "./m617.ts";
import {b} from "../runtime.ts";
function FOe(e){return yh(kc(e).replace(/\s+/g," ").trim(),zLm)}
function SKl(e){let t=[];for(let n of Object.values(e)){let r=jLm.has(n.status);switch(n.type){case"local_agent":case"in_process_teammate":t.push({id:n.id,kind:"agent",label:FOe(n.description),startedAt:n.startTime,doneAt:n.endTime,failed:r||void 0});break;case"local_workflow":{let o=n.workflowProgress.filter(YLm);if(o.length===0){t.push({id:n.id,kind:"workflow",label:FOe(n.title??n.workflowName??n.description),startedAt:n.startTime,doneAt:n.endTime,failed:r||void 0});break}for(let s of o)t.push({id:s.agentId??`${n.id}:${s.index}`,kind:"workflow",label:FOe(s.label),group:s.phaseTitle,startedAt:s.startedAt??s.queuedAt??n.startTime,doneAt:s.state==="done"||s.state==="error"?s.lastProgressAt??(s.startedAt!==void 0&&s.durationMs!==void 0?s.startedAt+s.durationMs:void 0):void 0,failed:s.state==="error"||void 0});break}case"local_bash":t.push({id:n.id,kind:n.kind==="monitor"?"monitor":"shell",label:FOe(n.kind==="monitor"?n.description:n.command),startedAt:n.startTime,doneAt:n.endTime,failed:r||n.result!==void 0&&n.result.code!==0||void 0});break;case"monitor_mcp":t.push({id:n.id,kind:"monitor",label:FOe(n.description||`${n.server} \xB7 ${n.tool}`),startedAt:n.startTime,doneAt:n.endTime,failed:r||void 0});break;case"mcp_task":t.push({id:n.id,kind:"mcp",label:FOe(n.statusMessage??`${n.serverName} \xB7 ${n.toolName}`),startedAt:n.startTime,doneAt:n.endTime,failed:r||n.mcpStatus==="failed"||void 0});break;case"remote_agent":case"dream":break}}return t}
function YLm(e){return e.type==="workflow_agent"}
function bKl(e){if(!e||e.length===0)return[];return e.map((t)=>({id:`todo:${qEe(t.content).toString(36)}`,kind:"todo",label:FOe(t.status==="in_progress"?t.activeForm:t.content),startedAt:t.status==="pending"?void 0:0,doneAt:t.status==="completed"?0:void 0}))}
function EKl(e){if(!e||e.length===0)return[];return e.map((t)=>({id:`todo:${t.id}`,kind:"todo",label:FOe(t.status==="in_progress"?t.activeForm??t.subject:t.subject),startedAt:t.status==="pending"?void 0:0,doneAt:t.status==="completed"?0:void 0}))}
var zLm=200,jLm;
var CKl=b(()=>{aA();Nxe();jLm=new Set(["failed","cancelled","killed","error"])});
export {FOe,SKl,YLm,bKl,EKl,zLm,jLm,CKl};
