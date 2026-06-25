// @ts-nocheck
import {k7a,o6n,lqt} from "./m4211.ts";
import {n_o,mja} from "./m4238.ts";
import {YA} from "./m3366.ts";
import {hf,RE} from "../src/session/2796_uuid.ts";
import {D7a,c6n} from "./m4212.ts";
import {isCronFeatureEnabled,cte} from "../src/tui/3853_mode.ts";
import {b} from "../runtime.ts";
async function Aqt(e,t){let{taskRegistry:n,setAppState:r,callerAgentId:o,killedBy:s="user"}=t,i=n.get(e);if(!i)throw new H5e(`No task found with ID: ${e}`,"not_found");if(i.status!=="running")throw new H5e(`Task ${e} is not running (status: ${i.status})`,"not_running");if(!k7a(o,i.agentId))throw new H5e(`Task ${e} is owned by ${o6n(i.agentId)}; agent ${o} cannot stop it.`,"not_owner");let a=n_o(i.type);if(!a)throw new H5e(`Unsupported task type: ${i.type}`,"unsupported_type");if(await a.kill(e,n,r,s),YA(i)){let c=!1;if(n.update(e,(u)=>{if(u.notified)return u;return c=!0,{...u,notified:!0}}),c)hf(e,"stopped",{toolUseId:i.toolUseId,summary:i.description})}if(YA(i)&&i.agentId!==void 0&&o!==i.agentId)D7a({taskId:e,toolUseId:i.toolUseId,description:i.description,ownerAgentId:i.agentId});let l=YA(i)?i.command:i.description;return{taskId:e,taskType:i.type,command:l}}
function r_o(e){let{taskRegistry:t,setAppState:n}=e;for(let r of Object.values(t.all())){if(r.status!=="running"||!isCronFeatureEnabled(r)||!cte(r))continue;if(n_o(r.type)?.kill(r.id,t,n,"system"),r.type==="local_agent")t.update(r.id,(o)=>o.notified?o:{...o,notified:!0}),hf(r.id,"stopped",{toolUseId:r.toolUseId,summary:r.description})}}
var H5e;
var L6n=b(()=>{mja();c6n();lqt();RE();H5e=class H5e extends Error{code;constructor(e,t){super(e);this.code=t;this.name="StopTaskError"}}});
export {Aqt,r_o,H5e,L6n};
