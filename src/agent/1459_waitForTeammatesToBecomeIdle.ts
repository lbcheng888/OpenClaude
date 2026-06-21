// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {runWithTeammateContext,isInProcessTeammate,getTeammateContext,createTeammateContext,Q2} from "../../vendor/m1457.ts";
import {je} from "../../vendor/m577.ts";
import {getIsInteractive,lt} from "../session/0131_sent.ts";
import {Lr} from "../../vendor/m578.ts";
var QRr={};
isFullscreenWithTTY(QRr,{waitForTeammatesToBecomeIdle:()=>waitForTeammatesToBecomeIdle,setDynamicTeamContext:()=>setDynamicTeamContext,runWithTeammateContext:()=>runWithTeammateContext,isTeammate:()=>isTeammate,isTeamLead:()=>isTeamLead,isPlanModeRequired:()=>isPlanModeRequired,isNestedInteractiveClaudeSession:()=>isNestedInteractiveClaudeSession,isModelDrivenSession:()=>isModelDrivenSession,isInProcessTeammate:()=>isInProcessTeammate,hasWorkingInProcessTeammates:()=>hasWorkingInProcessTeammates,hasNonLeadTeammate:()=>hasNonLeadTeammate,hasActiveInProcessTeammates:()=>hasActiveInProcessTeammates,getTeammateContext:()=>getTeammateContext,getTeammateColor:()=>getTeammateColor,getTeamName:()=>getTeamName,getParentSessionId:()=>u4,getDynamicTeamContext:()=>getDynamicTeamContext,getAgentName:()=>getAgentName,getAgentId:()=>getAgentId,createTeammateContext:()=>createTeammateContext,clearDynamicTeamContext:()=>clearDynamicTeamContext,_tmuxGlobalEnvOutputHasMarker:()=>_tmuxGlobalEnvOutputHasMarker,_setAmbientMarkerProbeForTesting:()=>_setAmbientMarkerProbeForTesting});
function u4(){let e=getTeammateContext();if(e)return e.parentSessionId;return F8?.parentSessionId}
function setDynamicTeamContext(e){F8=e}
function clearDynamicTeamContext(){F8=null}
function getDynamicTeamContext(){return F8}
function getAgentId(){let e=getTeammateContext();if(e)return e.agentId;return F8?.agentId}
function getAgentName(){let e=getTeammateContext();if(e)return e.agentName;return F8?.agentName}
function getTeamName(e){let t=getTeammateContext();if(t)return t.teamName;if(F8?.teamName)return F8.teamName;return e?.teamName}
function isTeammate(){if(getTeammateContext())return!0;return!!(F8?.agentId&&F8?.teamName)}
function isModelDrivenSession(e){return e!==void 0||isTeammate()||je.CLAUDE_CODE_CHILD_SESSION}
function isNestedInteractiveClaudeSession(){if(je.CLAUDE_CODE_FORCE_SESSION_PERSISTENCE)return!1;if(!(je.CLAUDE_CODE_CHILD_SESSION&&getIsInteractive()&&!isTeammate()))return!1;return!gOu()}
function _setAmbientMarkerProbeForTesting(e){YRr=e,Qun=null}
function gOu(){if(Qun===null)Qun=_Ou();return Qun}
function _Ou(){if(YRr)try{return YRr()}catch{return!1}if(!je.TMUX)return!1;let e;try{e=V$s.spawnSync("tmux",["show-environment","-g","CLAUDE_CODE_CHILD_SESSION"],{encoding:"utf8",timeout:250,stdio:["ignore","pipe","ignore"]})}catch{return!1}if(e.status!==0)return!1;return _tmuxGlobalEnvOutputHasMarker(e.stdout)}
function _tmuxGlobalEnvOutputHasMarker(e){return e.split(`
`).some((t)=>t.startsWith("CLAUDE_CODE_CHILD_SESSION="))}
function getTeammateColor(){let e=getTeammateContext();if(e)return e.color;return F8?.color}
function isPlanModeRequired(){let e=getTeammateContext();if(e)return e.planModeRequired;if(F8!==null)return F8.planModeRequired;return je.CLAUDE_CODE_PLAN_MODE_REQUIRED}
function hasNonLeadTeammate(e){if(!e)return!1;let{leadAgentId:t,teammates:n}=e;return Object.keys(n).some((r)=>r!==t)}
function isTeamLead(e){if(!e?.leadAgentId)return!1;let t=getAgentId(),n=e.leadAgentId;if(t===n)return!0;if(!t)return!0;return!1}
function hasActiveInProcessTeammates(e){for(let t of Object.values(e.tasks))if(t.type==="in_process_teammate"&&t.status==="running")return!0;return!1}
function hasWorkingInProcessTeammates(e){for(let t of Object.values(e.tasks))if(t.type==="in_process_teammate"&&t.status==="running"&&!t.isIdle)return!0;return!1}
function waitForTeammatesToBecomeIdle(e,t){let n=[];for(let[r,o]of Object.entries(t.tasks))if(o.type==="in_process_teammate"&&o.status==="running"&&!o.isIdle)n.push(r);if(n.length===0)return Promise.resolve();return new Promise((r)=>{let o=n.length,s=()=>{if(o--,o===0)r()};e((i)=>{let a={...i.tasks};for(let l of n){let c=a[l];if(c&&c.type==="in_process_teammate")if(c.isIdle)s();else a[l]={...c,onIdleCallbacks:[...c.onIdleCallbacks??[],s]}}return{...i,tasks:a}})})}
var V$s,F8=null,Qun=null,YRr=null;
var Am=b(()=>{Q2();lt();Lr();Q2();V$s=require("child_process")});
export {QRr,u4,setDynamicTeamContext,clearDynamicTeamContext,getDynamicTeamContext,getAgentId,getAgentName,getTeamName,isTeammate,isModelDrivenSession,isNestedInteractiveClaudeSession,_setAmbientMarkerProbeForTesting,gOu,_Ou,_tmuxGlobalEnvOutputHasMarker,getTeammateColor,isPlanModeRequired,hasNonLeadTeammate,isTeamLead,hasActiveInProcessTeammates,hasWorkingInProcessTeammates,waitForTeammatesToBecomeIdle,V$s,F8,Qun,YRr,Am};
