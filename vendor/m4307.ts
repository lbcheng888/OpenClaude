// @ts-nocheck
import {readAgentMetadata,getAgentTranscript,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {getTeamName,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {xe,Pt,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {Dqe,Pqe,lut,po} from "../src/tools/5224_userPromptCount.ts";
import {Yxn,HI} from "../src/telemetry/3173_error.ts";
import {isCustomAgent,kg} from "../src/permissions/4476_toAgentInfos.ts";
import {markMessagesAsReadByPredicate,isStructuredProtocolMessage,Pw} from "../src/permissions/3902_writeToMailbox.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Rut,N0e} from "./m3898.ts";
import {PERMISSION_MODES,jN} from "./m721.ts";
import {updateTeamFile,sL} from "./m3897.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {Kpt,_6n} from "../src/permissions/4220_TEAMMATE_SYSTEM_PROMPT_ADDENDUM.ts";
import {b} from "../runtime.ts";
async function IQa(e){let t=await readAgentMetadata(e);return t?.taskKind==="in_process_teammate"?t:null}
async function xQa({resumableAgentId:e,prompt:t,senderName:n,meta:r,fallbackName:o,toolUseContext:s}){let i=r.name??o,a=r.teamName??getTeamName(s.getAppState().teamContext);if(!i||!a)throw xe("swarm_in_process_resume","no_team_context"),Error("Cannot resume teammate: no team is active in this session");let l,c=await getAgentTranscript(e);if(!c||c.messages.length===0)l="no_transcript";let u=c?Dqe(Pqe(lut(c.messages))):[],d=Yxn(s.contentReplacementState,u,c?.contentReplacements??[]),p;if(r.customAgentType){let f=s.options.agentDefinitions.activeAgents.find((h)=>h.agentType===r.customAgentType);if(f&&isCustomAgent(f))p=f;else l="agent_type_unresolved",p={agentType:r.customAgentType,whenToUse:"",tools:[],getSystemPrompt:()=>"",source:"projectSettings"}}await markMessagesAsReadByPredicate(i,(f)=>isStructuredProtocolMessage(f.text),a).catch((f)=>logForDebugging(`[resumeInProcessTeammate] stale protocol-frame drop failed: ${f}`));let m=await Rut({name:i,teamName:a,prompt:t,description:r.description,color:r.color,planModeRequired:r.planModeRequired??!1,model:r.model,permissionMode:r.permissionMode!==void 0&&r.permissionMode!=="bypassPermissions"&&PERMISSION_MODES.includes(r.permissionMode)?r.permissionMode:void 0,resumableAgentId:e},s);if(!m.ok)throw xe("swarm_in_process_resume","spawn_failed"),logForDebugging(`[resumeInProcessTeammate] spawn failed: ${m.error}`),Error("Failed to respawn in-process teammate");if(await updateTeamFile(a,(f)=>{if(f.members.some((h)=>h.agentId===m.agentId))return!1;f.members.push({agentId:m.agentId,name:i,color:r.color,agentType:r.customAgentType,planModeRequired:r.planModeRequired,joinedAt:Date.now(),tmuxPaneId:"in-process",cwd:isTmuxControlMode(),subscriptions:[],backendType:"in-process"})}).catch((f)=>logForDebugging(`[resumeInProcessTeammate] team file re-add failed (ad-hoc team?): ${f}`)),s.agentLifecycle.setTeammate(m.agentId,{name:i,color:r.color,agentType:r.customAgentType,tmuxSessionName:"in-process",tmuxPaneId:"in-process",cwd:isTmuxControlMode(),spawnedAt:Date.now()}),Kpt({identity:m.identity,taskId:m.taskId,prompt:t,initialFrom:n,description:r.description,agentDefinition:p,model:r.model,teammateContext:m.teammateContext,toolUseContext:{...s,messages:[]},abortController:m.abortController,resumeMessages:u,resumeReplacementState:d}),logForDebugging(`[resumeInProcessTeammate] Resumed ${m.agentId} with ${u.length} prior messages`),l)Pt("swarm_in_process_resume",l);else He("swarm_in_process_resume");return{agentId:m.agentId,taskId:m.taskId,resumedMessageCount:u.length}}
var DQa=b(()=>{mn();kg();jN();Po();qe();po();_a();Op();Pw();HI();_6n();N0e();sL()});
export {IQa,xQa,DQa};
