// @ts-nocheck
import {hja,e3n,K9t} from "./m4195.ts";
import {apo,K8a} from "./m4220.ts";
import {oI} from "./m3350.ts";
import {Bh,bC} from "../src/session/2784_uuid.ts";
import {Tja,s3n} from "./m4196.ts";
import {enforcementWarnDedup,Zle} from "../src/tui/3835_mode.ts";
import {b} from "../runtime.ts";
async function a3t(e,t){let{taskRegistry:n,setAppState:r,callerAgentId:o}=t,s=n.get(e);if(!s)throw new s6e(`No task found with ID: ${e}`,"not_found");if(s.status!=="running")throw new s6e(`Task ${e} is not running (status: ${s.status})`,"not_running");if(!hja(o,s.agentId))throw new s6e(`Task ${e} is owned by ${e3n(s.agentId)}; agent ${o} cannot stop it.`,"not_owner");let i=apo(s.type);if(!i)throw new s6e(`Unsupported task type: ${s.type}`,"unsupported_type");if(await i.kill(e,n,r),oI(s)){let l=!1;if(n.update(e,(c)=>{if(c.notified)return c;return l=!0,{...c,notified:!0}}),l)Bh(e,"stopped",{toolUseId:s.toolUseId,summary:s.description})}if(oI(s)&&s.agentId!==void 0&&o!==s.agentId)Tja({taskId:e,toolUseId:s.toolUseId,description:s.description,ownerAgentId:s.agentId});let a=oI(s)?s.command:s.description;return{taskId:e,taskType:s.type,command:a}}
function z8a(e){let{taskRegistry:t,setAppState:n}=e;for(let r of Object.values(t.all())){if(r.status!=="running"||!enforcementWarnDedup(r)||!Zle(r))continue;if(apo(r.type)?.kill(r.id,t,n),r.type==="local_agent")t.update(r.id,(o)=>o.notified?o:{...o,notified:!0}),Bh(r.id,"stopped",{toolUseId:r.toolUseId,summary:r.description})}}
var s6e;
var k3n=b(()=>{K8a();s3n();K9t();bC();s6e=class s6e extends Error{code;constructor(e,t){super(e);this.code=t;this.name="StopTaskError"}}});
export {a3t,z8a,s6e,k3n};
