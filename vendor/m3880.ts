// @ts-nocheck
import {vQ} from "./m1454.ts";
import {d9,uI,Ax} from "./m5146.ts";
import {mO,MM} from "./m126.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Jl,ch} from "./m2727.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {createTeammateContext,Q2} from "./m1457.ts";
import {Phe,EHn,W$e,Zrt} from "../src/config/3183_agentId.ts";
import {Fr,Ql} from "./m4405.ts";
import {od,RE} from "../src/agent/4342_toolUseCount.ts";
import {yS} from "./m3824.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {removeMemberByAgentId,BL} from "./m3879.ts";
import {iy,vC} from "./m5145.ts";
import {Bh,bC} from "../src/session/2784_uuid.ts";
import {kDa,MY} from "../src/agent/4311_register.ts";
import {b} from "../runtime.ts";
function Qhp(e,t){if(t)return"plan";if(e==="plan"||e==="dontAsk")return"default";return e}
async function Clt(e,t){let{name:n,teamName:r,prompt:o,color:s,planModeRequired:i,model:a}=e,{taskRegistry:l}=t,c=vQ(n,r),u=d9("in_process_teammate"),d=e.resumableAgentId??mO(n);logForDebugging(`[spawnInProcessTeammate] Spawning ${c} (taskId: ${u})`);try{let p=Jl(),m=getSessionId(),f={agentId:c,agentName:n,teamName:r,color:s,planModeRequired:i,parentSessionId:m,resumableAgentId:d},A=createTeammateContext({agentId:c,agentName:n,teamName:r,color:s,planModeRequired:i,parentSessionId:m,abortController:p});if(Phe())EHn(c,n,m);let h=e.description??`${o.substring(0,50)}${o.length>50?"...":""}`,g={...uI(u,"in_process_teammate",h,t.toolUseId),type:"in_process_teammate",status:"running",identity:f,prompt:e.description??o,model:a,abortController:p,awaitingPlanApproval:!1,permissionMode:e.permissionMode??Qhp(Fr(t).mode,i),isIdle:!1,shutdownRequested:!1,lastReportedToolCount:0,lastReportedTokenCount:0,pendingUserMessages:[]};l.register(g);let _=t.getAppState(),y=_.agentNameRegistry.get(n);if(y!==d){let T=y!==void 0?_.tasks[y]:void 0,v=y!==void 0&&(T?.status==="running"||od(T)||Object.values(_.tasks).some((R)=>yS(R)&&R.status==="running"&&R.identity.resumableAgentId===y))?t.agentLifecycle.allocateName(n):n;if(v!==n)logForDebugging(`[spawnInProcessTeammate] name "${n}" already routes to live ${y}; registry entry uses "${v}" instead`);t.agentLifecycle.registerName(v,d)}return logForDebugging(`[spawnInProcessTeammate] Registered ${c} in AppState`),Ie("swarm_in_process_spawn"),{ok:!0,agentId:c,identity:f,taskId:u,abortController:p,teammateContext:A}}catch(p){let m=p instanceof Error?p.message:"Unknown error during spawn";return logForDebugging(`[spawnInProcessTeammate] Failed to spawn ${c}: ${m}`),Oe("swarm_in_process_spawn","spawn_failed"),{ok:!1,agentId:c,error:m}}}
function KHe(e,t,n){let r=!1,o=null,s=null,i,a;if(t.update(e,(l)=>{if(l.status!=="running")return l;return o=l.identity.teamName,s=l.identity.agentId,i=l.toolUseId,a=l.description,l.abortController?.abort(),r=!0,l.onIdleCallbacks?.forEach((c)=>c()),{...l,status:"killed",notified:!0,endTime:Date.now(),onIdleCallbacks:[],pendingUserMessages:[],abortController:void 0,currentWorkAbortController:void 0,evictAfter:void 0}}),r&&s)n((l)=>{if(!l.teamContext?.teammates?.[s])return l;let{[s]:c,...u}=l.teamContext.teammates;return{...l,teamContext:{...l.teamContext,teammates:u}}});if(o&&s)removeMemberByAgentId(o,s);if(r)iy(e),Bh(e,"stopped",{toolUseId:i,summary:a}),setTimeout((l,c)=>l.evictTerminal(c),kDa,t,e);if(s)W$e(s);return Ie("swarm_in_process_kill"),r}
var zHe=b(()=>{lt();ln();Ax();RE();ch();Ql();qe();bC();vC();MY();Q2();Zrt();MM();BL()});
export {Qhp,Clt,KHe,zHe};
