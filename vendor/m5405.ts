// @ts-nocheck
import {readTeamFile,setMemberActive,BL} from "./m3879.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Yg,lx} from "./m2777.ts";
import {Dct,x9} from "./m4033.ts";
import {createIdleNotification,getLastPeerDmSummary,writeToMailbox,Tx} from "../src/permissions/3886_writeToMailbox.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {getTeammateColor,Am} from "../src/agent/1459_waitForTeammatesToBecomeIdle.ts";
import {b} from "../runtime.ts";
function rLo(e,t,n){let{teamName:r,agentId:o,agentName:s}=n,i=readTeamFile(r);if(!i){logForDebugging(`[TeammateInit] Team file not found for team: ${r}`);return}let a=i.leadAgentId;if(i.teamAllowedPaths&&i.teamAllowedPaths.length>0){logForDebugging(`[TeammateInit] Found ${i.teamAllowedPaths.length} team-wide allowed path(s)`);for(let u of i.teamAllowedPaths){let d=u.path.startsWith("/")?`/${u.path}/**`:`${u.path}/**`;logForDebugging(`[TeammateInit] Applying team permission: ${u.toolName} allowed in ${u.path} (rule: ${d})`),e((p)=>({...p,toolPermissionContext:Yg(p.toolPermissionContext,{type:"addRules",rules:[{toolName:u.toolName,ruleContent:d}],behavior:"allow",destination:"session"})}))}}let c=i.members.find((u)=>u.agentId===a)?.name||"team-lead";if(o===a){logForDebugging("[TeammateInit] This agent is the team leader - skipping idle notification hook");return}logForDebugging(`[TeammateInit] Registering Stop hook for teammate ${s} to notify leader ${c}`),Dct(e,t,"Stop","",async(u,d)=>{setMemberActive(r,s,!1);let p=createIdleNotification(s,{idleReason:"available",summary:getLastPeerDmSummary(u)});return await writeToMailbox(c,{from:s,text:Le(p),timestamp:new Date().toISOString(),color:getTeammateColor()}),logForDebugging(`[TeammateInit] Sent idle notification to leader ${c}`),!0},"Failed to send idle notification to team leader",{timeout:1e4})}
var Y5l=b(()=>{qe();x9();lx();Xt();Am();Tx();BL()});
export {rLo,Y5l};
