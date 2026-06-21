// @ts-nocheck
import {Uh,VIe} from "../src/agent/4162_state.ts";
import {Kc,tv} from "./m232.ts";
import {abe} from "./m611.ts";
import {b} from "../runtime.ts";
function j8e(e){return Uh(Kc(e).replace(/\s+/g," ").trim(),_Rm)}
function p3l(e){let t=[];for(let n of Object.values(e)){let r=yRm.has(n.status);switch(n.type){case"local_agent":case"in_process_teammate":t.push({id:n.id,kind:"agent",label:j8e(n.description),startedAt:n.startTime,doneAt:n.endTime,failed:r||void 0});break;case"local_workflow":{let o=n.workflowProgress.filter(TRm);if(o.length===0){t.push({id:n.id,kind:"workflow",label:j8e(n.title??n.workflowName??n.description),startedAt:n.startTime,doneAt:n.endTime,failed:r||void 0});break}for(let s of o)t.push({id:s.agentId??`${n.id}:${s.index}`,kind:"workflow",label:j8e(s.label),group:s.phaseTitle,startedAt:s.startedAt??s.queuedAt??n.startTime,doneAt:s.state==="done"||s.state==="error"?s.lastProgressAt??(s.startedAt!==void 0&&s.durationMs!==void 0?s.startedAt+s.durationMs:void 0):void 0,failed:s.state==="error"||void 0});break}case"local_bash":t.push({id:n.id,kind:n.kind==="monitor"?"monitor":"shell",label:j8e(n.kind==="monitor"?n.description:n.command),startedAt:n.startTime,doneAt:n.endTime,failed:r||n.result!==void 0&&n.result.code!==0||void 0});break;case"monitor_mcp":t.push({id:n.id,kind:"monitor",label:j8e(n.description||`${n.server} \xB7 ${n.tool}`),startedAt:n.startTime,doneAt:n.endTime,failed:r||void 0});break;case"mcp_task":t.push({id:n.id,kind:"mcp",label:j8e(n.statusMessage??`${n.serverName} \xB7 ${n.toolName}`),startedAt:n.startTime,doneAt:n.endTime,failed:r||n.mcpStatus==="failed"||void 0});break;case"remote_agent":case"dream":break}}return t}
function TRm(e){return e.type==="workflow_agent"}
function m3l(e){if(!e||e.length===0)return[];return e.map((t)=>({id:`todo:${abe(t.content).toString(36)}`,kind:"todo",label:j8e(t.status==="in_progress"?t.activeForm:t.content),startedAt:t.status==="pending"?void 0:0,doneAt:t.status==="completed"?0:void 0}))}
var _Rm=200,yRm;
var f3l=b(()=>{tv();VIe();yRm=new Set(["failed","cancelled","killed","error"])});
export {j8e,p3l,TRm,m3l,_Rm,yRm,f3l};
