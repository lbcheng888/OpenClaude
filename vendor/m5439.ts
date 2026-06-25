// @ts-nocheck
import {readTeamFile,setMemberActive,sL} from "./m3897.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {i_,Sw} from "./m2789.ts";
import {Q6a,vY} from "./m4097.ts";
import {createIdleNotification,getLastPeerDmSummary,writeToMailbox,Pw} from "../src/permissions/3902_writeToMailbox.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {getTeammateColor,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {b} from "../runtime.ts";
function ABo(e,t,n){let{teamName:r,agentId:o,agentName:s}=n,i=readTeamFile(r);if(!i){logForDebugging(`[TeammateInit] Team file not found for team: ${r}`);return}let a=i.leadAgentId;if(i.teamAllowedPaths&&i.teamAllowedPaths.length>0){logForDebugging(`[TeammateInit] Found ${i.teamAllowedPaths.length} team-wide allowed path(s)`);for(let u of i.teamAllowedPaths){let d=u.path.startsWith("/")?`/${u.path}/**`:`${u.path}/**`;logForDebugging(`[TeammateInit] Applying team permission: ${u.toolName} allowed in ${u.path} (rule: ${d})`),e((p)=>({...p,toolPermissionContext:i_(p.toolPermissionContext,{type:"addRules",rules:[{toolName:u.toolName,ruleContent:d}],behavior:"allow",destination:"session"})}))}}let c=i.members.find((u)=>u.agentId===a)?.name||"team-lead";if(o===a){logForDebugging("[TeammateInit] This agent is the team leader - skipping idle notification hook");return}logForDebugging(`[TeammateInit] Registering Stop hook for teammate ${s} to notify leader ${c}`),Q6a(e,t,"Stop","",async(u,d)=>{setMemberActive(r,s,!1);let p=createIdleNotification(s,{idleReason:"available",summary:getLastPeerDmSummary(u)});return await writeToMailbox(c,{from:s,text:TeamDeleteToolName(p),timestamp:new Date().toISOString(),color:getTeammateColor()}),logForDebugging(`[TeammateInit] Sent idle notification to leader ${c}`),!0},"Failed to send idle notification to team leader",{timeout:1e4})}
var PXl=b(()=>{qe();vY();Sw();tn();Op();Pw();sL()});
export {ABo,PXl};
