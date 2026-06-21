// @ts-nocheck
import {readAgentMetadata,getAgentTranscript,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {getTeamName,Am} from "../src/agent/1459_waitForTeammatesToBecomeIdle.ts";
import {Oe,isTmuxControlMode,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {A4e,h4e,clt,lo} from "../src/tools/5190_userPromptCount.ts";
import {aHn,eI} from "../src/telemetry/3157_error.ts";
import {isCustomAgent,scrubPathsConfig} from "../src/permissions/4454_toAgentInfos.ts";
import {markMessagesAsReadByPredicate,isStructuredProtocolMessage,Tx} from "../src/permissions/3886_writeToMailbox.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Clt,zHe} from "./m3880.ts";
import {PERMISSION_MODES,U2} from "./m716.ts";
import {updateTeamFile,BL} from "./m3879.ts";
import {Pt,Go} from "./m632.ts";
import {Wut,d3n} from "../src/permissions/4203_TEAMMATE_SYSTEM_PROMPT_ADDENDUM.ts";
import {b} from "../runtime.ts";
async function c7a(e){let t=await readAgentMetadata(e);return t?.taskKind==="in_process_teammate"?t:null}
async function u7a({resumableAgentId:e,prompt:t,senderName:n,meta:r,fallbackName:o,toolUseContext:s}){let i=r.name??o,a=r.teamName??getTeamName(s.getAppState().teamContext);if(!i||!a)throw Oe("swarm_in_process_resume","no_team_context"),Error("Cannot resume teammate: no team is active in this session");let l,c=await getAgentTranscript(e);if(!c||c.messages.length===0)l="no_transcript";let u=c?A4e(h4e(clt(c.messages))):[],d=aHn(s.contentReplacementState,u,c?.contentReplacements??[]),p;if(r.customAgentType){let f=s.options.agentDefinitions.activeAgents.find((A)=>A.agentType===r.customAgentType);if(f&&isCustomAgent(f))p=f;else l="agent_type_unresolved",p={agentType:r.customAgentType,whenToUse:"",tools:[],getSystemPrompt:()=>"",source:"projectSettings"}}await markMessagesAsReadByPredicate(i,(f)=>isStructuredProtocolMessage(f.text),a).catch((f)=>logForDebugging(`[resumeInProcessTeammate] stale protocol-frame drop failed: ${f}`));let m=await Clt({name:i,teamName:a,prompt:t,description:r.description,color:r.color,planModeRequired:r.planModeRequired??!1,model:r.model,permissionMode:r.permissionMode!==void 0&&r.permissionMode!=="bypassPermissions"&&PERMISSION_MODES.includes(r.permissionMode)?r.permissionMode:void 0,resumableAgentId:e},s);if(!m.ok)throw Oe("swarm_in_process_resume","spawn_failed"),logForDebugging(`[resumeInProcessTeammate] spawn failed: ${m.error}`),Error("Failed to respawn in-process teammate");if(await updateTeamFile(a,(f)=>{if(f.members.some((A)=>A.agentId===m.agentId))return!1;f.members.push({agentId:m.agentId,name:i,color:r.color,agentType:r.customAgentType,planModeRequired:r.planModeRequired,joinedAt:Date.now(),tmuxPaneId:"in-process",cwd:Pt(),subscriptions:[],backendType:"in-process"})}).catch((f)=>logForDebugging(`[resumeInProcessTeammate] team file re-add failed (ad-hoc team?): ${f}`)),s.agentLifecycle.setTeammate(m.agentId,{name:i,color:r.color,agentType:r.customAgentType,tmuxSessionName:"in-process",tmuxPaneId:"in-process",cwd:Pt(),spawnedAt:Date.now()}),Wut({identity:m.identity,taskId:m.taskId,prompt:t,initialFrom:n,description:r.description,agentDefinition:p,model:r.model,teammateContext:m.teammateContext,toolUseContext:{...s,messages:[]},abortController:m.abortController,resumeMessages:u,resumeReplacementState:d}),logForDebugging(`[resumeInProcessTeammate] Resumed ${m.agentId} with ${u.length} prior messages`),l)isTmuxControlMode("swarm_in_process_resume",l);else Ie("swarm_in_process_resume");return{agentId:m.agentId,taskId:m.taskId,resumedMessageCount:u.length}}
var d7a=b(()=>{ln();scrubPathsConfig();U2();Go();qe();lo();ja();Am();Tx();eI();d3n();zHe();BL()});
export {c7a,u7a,d7a};
