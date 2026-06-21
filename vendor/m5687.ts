// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {getInheritedTeamName,setInheritedTeamName,getSessionId,getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {vQ} from "./m1454.ts";
import {np,aU} from "../src/config/3875_aU.ts";
import {getTeamFilePath,readTeamFileAsync,writeTeamFileAsync,logTeamFileWriteFailure,registerTeamForSessionCleanup,BL} from "./m3879.ts";
import {qla,Kq,FJr,Nk} from "../src/agent/3316_id.ts";
import {i_,K0} from "./m3824.ts";
var Bic={};
isFullscreenWithTTY(Bic,{sessionTeamName:()=>sessionTeamName,initializeSessionTeam:()=>initializeSessionTeam,_resetInheritedTeamNameForTesting:()=>_resetInheritedTeamNameForTesting});
function sessionTeamName(e){return`${e4m}-${e.slice(0,8)}`}
function t4m(){if(getInheritedTeamName()===void 0){let e=process.env.CLAUDE_INTERNAL_ASSISTANT_TEAM_NAME||null;delete process.env.CLAUDE_INTERNAL_ASSISTANT_TEAM_NAME,setInheritedTeamName(e)}return getInheritedTeamName()??null}
function _resetInheritedTeamNameForTesting(){setInheritedTeamName(void 0)}
async function initializeSessionTeam(e){let t=e?.existingTeamName||t4m(),n=t??sessionTeamName(getSessionId()),r=vQ(np,n),o=getTeamFilePath(n);if(!(t?await readTeamFileAsync(n):null)){let l={name:n,createdAt:Date.now(),leadAgentId:r,leadSessionId:getSessionId(),members:[{agentId:r,name:np,agentType:np,joinedAt:Date.now(),tmuxPaneId:"leader",cwd:getOriginalCwd(),subscriptions:[],backendType:"in-process"}]};await writeTeamFileAsync(n,l).catch((c)=>logTeamFileWriteFailure(n,c))}qla(n);let i=getSessionId();if(n!==i)await Mic.rename(Kq(i),Kq(n)).catch(()=>{});await FJr(n),registerTeamForSessionCleanup(n);let a=i_[0];return{teamContext:{teamName:n,teamFilePath:o,leadAgentId:r,teammates:{[r]:{name:np,agentType:np,color:a,tmuxSessionName:"in-process",tmuxPaneId:"leader",cwd:getOriginalCwd(),spawnedAt:Date.now()}}},teammateColors:{assignments:new Map([[r,a]]),index:1}}}
var Mic,e4m="session";
var Fic=b(()=>{lt();K0();Nk();aU();BL();Mic=require("fs/promises")});
export {Bic,sessionTeamName,t4m,_resetInheritedTeamNameForTesting,initializeSessionTeam,Mic,e4m,Fic};
