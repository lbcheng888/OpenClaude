// @ts-nocheck
import {getDynamicTeamContext,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {readTeamFile,getTeamFilePath,sL} from "./m3897.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
function xXl(){let e=getDynamicTeamContext();if(!e?.teamName||!e?.agentName){logForDebugging("[Reconnection] computeInitialTeamContext: No teammate context set (not a teammate)");return}let{teamName:t,agentId:n,agentName:r}=e,o=readTeamFile(t);if(!o){Ie(Error(`[computeInitialTeamContext] Could not read team file for ${t}`));return}let s=getTeamFilePath(t),i=!n;return logForDebugging(`[Reconnection] Computed initial team context for ${i?"leader":`teammate ${r}`} in team ${t}`),{teamName:t,teamFilePath:s,leadAgentId:o.leadAgentId,selfAgentId:n,selfAgentName:r,isLeader:i,teammates:{}}}
function DXl(e,t,n){let r=readTeamFile(t);if(!r){logForDebugging(`[initializeTeammateContextFromSession] Could not read team file for ${t} (agent: ${n}) \u2014 team may have been disbanded`,{level:"error"});return}let o=r.members.find((a)=>a.name===n);if(!o)logForDebugging(`[Reconnection] Member ${n} not found in team ${t} - may have been removed`);let s=o?.agentId,i=getTeamFilePath(t);e((a)=>({...a,teamContext:{teamName:t,teamFilePath:i,leadAgentId:r.leadAgentId,selfAgentId:s,selfAgentName:n,isLeader:!1,teammates:{}}})),logForDebugging(`[Reconnection] Initialized agent context from session for ${n} in team ${t}`)}
var CBo=b(()=>{qe();vn();Op();sL()});
export {xXl,DXl,CBo};
