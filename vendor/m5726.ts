// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {getInheritedTeamName,setInheritedTeamName,getSessionId,getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {bQ} from "./m1459.ts";
import {Dd,wB} from "../src/config/3893_wB.ts";
import {getTeamFilePath,readTeamFileAsync,writeTeamFileAsync,logTeamFileWriteFailure,registerTeamForSessionCleanup,sL} from "./m3897.ts";
import {Qha,cq,bto,oH} from "../src/agent/3332_id.ts";
import {__,ix} from "./m3842.ts";
var khc={};
ft(khc,{sessionTeamName:()=>sessionTeamName,initializeSessionTeam:()=>initializeSessionTeam,_resetInheritedTeamNameForTesting:()=>_resetInheritedTeamNameForTesting});
function sessionTeamName(e){return`${w7m}-${e.slice(0,8)}`}
function k7m(){if(getInheritedTeamName()===void 0){let e=process.env.CLAUDE_INTERNAL_ASSISTANT_TEAM_NAME||null;delete process.env.CLAUDE_INTERNAL_ASSISTANT_TEAM_NAME,setInheritedTeamName(e)}return getInheritedTeamName()??null}
function _resetInheritedTeamNameForTesting(){setInheritedTeamName(void 0)}
async function initializeSessionTeam(e){let t=e?.existingTeamName||k7m(),n=t??sessionTeamName(getSessionId()),r=bQ(Dd,n),o=getTeamFilePath(n);if(!(t?await readTeamFileAsync(n):null)){let l={name:n,createdAt:Date.now(),leadAgentId:r,leadSessionId:getSessionId(),members:[{agentId:r,name:Dd,agentType:Dd,joinedAt:Date.now(),tmuxPaneId:"leader",cwd:getOriginalCwd(),subscriptions:[],backendType:"in-process"}]};await writeTeamFileAsync(n,l).catch((c)=>logTeamFileWriteFailure(n,c))}Qha(n);let i=getSessionId();if(n!==i)await vhc.rename(cq(i),cq(n)).catch(()=>{});await bto(n),registerTeamForSessionCleanup(n);let a=__[0];return{teamContext:{teamName:n,teamFilePath:o,leadAgentId:r,teammates:{[r]:{name:Dd,agentType:Dd,color:a,tmuxSessionName:"in-process",tmuxPaneId:"leader",cwd:getOriginalCwd(),spawnedAt:Date.now()}}},teammateColors:{assignments:new Map([[r,a]]),index:1}}}
var vhc,w7m="session";
var Hhc=b(()=>{lt();ix();oH();wB();sL();vhc=require("fs/promises")});
export {khc,sessionTeamName,k7m,_resetInheritedTeamNameForTesting,initializeSessionTeam,vhc,w7m,Hhc};
