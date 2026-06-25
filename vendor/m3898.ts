// @ts-nocheck
import {bQ} from "./m1459.ts";
import {M$,av,vw} from "./m5178.ts";
import {OP,YL} from "./m123.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {kl,lh} from "./m2739.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {createTeammateContext,b2} from "./m1462.ts";
import {Vge,fDn,X9e,Zst} from "../src/config/3197_agentId.ts";
import {Mr,xl} from "./m4427.ts";
import {rc,hS} from "../src/agent/4362_toolUseCount.ts";
import {mS} from "./m3842.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {removeMemberByAgentId,sL} from "./m3897.ts";
import {p_,wE} from "./m5177.ts";
import {hf,RE} from "../src/session/2796_uuid.ts";
import {vut,HB} from "../src/agent/4331_register.ts";
import {b} from "../runtime.ts";
function Wwp(e,t){if(t)return"plan";if(e==="plan"||e==="dontAsk")return"default";return e}
async function Rut(e,t){let{name:n,teamName:r,prompt:o,color:s,planModeRequired:i,model:a}=e,{taskRegistry:l}=t,c=bQ(n,r),u=M$("in_process_teammate"),d=e.resumableAgentId??OP(n);logForDebugging(`[spawnInProcessTeammate] Spawning ${c} (taskId: ${u})`);try{let p=kl(),m=getSessionId(),f={agentId:c,agentName:n,teamName:r,color:s,planModeRequired:i,parentSessionId:m,resumableAgentId:d},h=createTeammateContext({agentId:c,agentName:n,teamName:r,color:s,planModeRequired:i,parentSessionId:m,abortController:p});if(Vge())fDn(c,n,m);let g=e.description??`${o.substring(0,50)}${o.length>50?"...":""}`,_={...av(u,"in_process_teammate",g,t.toolUseId),type:"in_process_teammate",status:"running",identity:f,prompt:e.description??o,model:a,abortController:p,awaitingPlanApproval:!1,permissionMode:e.permissionMode??Wwp(Mr(t).mode,i),isIdle:!1,shutdownRequested:!1,lastReportedToolCount:0,lastReportedTokenCount:0,pendingUserMessages:[]};l.register(_);let T=t.getAppState(),y=T.agentNameRegistry.get(n);if(y!==d){let S=y!==void 0?T.tasks[y]:void 0,R=y!==void 0&&(S?.status==="running"||rc(S)||Object.values(T.tasks).some((w)=>mS(w)&&w.status==="running"&&w.identity.resumableAgentId===y))?t.agentLifecycle.allocateName(n):n;if(R!==n)logForDebugging(`[spawnInProcessTeammate] name "${n}" already routes to live ${y}; registry entry uses "${R}" instead`);t.agentLifecycle.registerName(R,d)}return logForDebugging(`[spawnInProcessTeammate] Registered ${c} in AppState`),He("swarm_in_process_spawn"),{ok:!0,agentId:c,identity:f,taskId:u,abortController:p,teammateContext:h}}catch(p){let m=p instanceof Error?p.message:"Unknown error during spawn";return logForDebugging(`[spawnInProcessTeammate] Failed to spawn ${c}: ${m}`),xe("swarm_in_process_spawn","spawn_failed"),{ok:!1,agentId:c,error:m}}}
function M0e(e,t,n){let r=!1,o=null,s=null,i,a;if(t.update(e,(l)=>{if(l.status!=="running")return l;return o=l.identity.teamName,s=l.identity.agentId,i=l.toolUseId,a=l.description,l.abortController?.abort(),r=!0,l.onIdleCallbacks?.forEach((c)=>c()),{...l,status:"killed",notified:!0,endTime:Date.now(),onIdleCallbacks:[],pendingUserMessages:[],abortController:void 0,currentWorkAbortController:void 0,evictAfter:void 0}}),r&&s)n((l)=>{if(!l.teamContext?.teammates?.[s])return l;let{[s]:c,...u}=l.teamContext.teammates;return{...l,teamContext:{...l.teamContext,teammates:u}}});if(o&&s)removeMemberByAgentId(o,s);if(r)p_(e),hf(e,"stopped",{toolUseId:i,summary:a}),setTimeout((l,c)=>l.evictTerminal(c),vut,t,e);if(s)X9e(s);return He("swarm_in_process_kill"),r}
var N0e=b(()=>{lt();mn();vw();hS();lh();xl();qe();RE();wE();HB();b2();Zst();YL();sL()});
export {Wwp,Rut,M0e,N0e};
