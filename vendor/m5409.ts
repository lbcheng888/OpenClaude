// @ts-nocheck
import {isAgentSwarmsEnabled,cb} from "../src/config/3298_isAgentSwarmsEnabled.ts";
import {$ct,H2n,I2n,qct} from "../src/core/4042_id.ts";
import {y9n,T9n} from "../src/tools/4164_resolve.ts";
import {IFn,Blt} from "./m3888.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {_o,bt} from "./m195.ts";
import {b} from "../runtime.ts";
async function rWl(e){if(!isAgentSwarmsEnabled()||!$ct())return null;let{ctx:t,description:n,updatedInput:r,suggestions:o}=e,s=r??t.input,i=null;if(i)return i;try{let a=()=>t.toolUseContext.setAppState((c)=>({...c,pendingWorkerRequest:null})),l=await new Promise((c)=>{let{resolve:u,claim:d}=y9n(c),p=H2n({toolName:t.tool.name,toolUseId:t.toolUseID,input:s,description:n,permissionSuggestions:o});IFn({requestId:p.id,toolUseId:t.toolUseID,onAllow(m,f,A,h){if(!d())return;a();let g=m&&Object.keys(m).length>0?m:s;u(t.handleUserAllow(g,f,A,void 0,h))},onReject(m,f){if(!d())return;a(),t.logDecision({decision:"reject",source:{type:"user_reject",hasFeedback:!!m}}),u(t.cancelAndAbort(m,void 0,f))}}),I2n(p),t.toolUseContext.setAppState((m)=>({...m,pendingWorkerRequest:{toolName:t.tool.name,toolUseId:t.toolUseID,description:n}})),t.toolUseContext.abortController.signal.addEventListener("abort",()=>{if(!d())return;a(),t.logCancelled(),u(t.cancelAndAbort(void 0,!0))},{once:!0})});return Ie("permission_swarm_forward"),l}catch(a){return Oe("permission_swarm_forward","permission_swarm_forward_failed"),De(_o(a)),null}}
var oWl=b(()=>{ln();cb();bt();Rn();qct();Blt();T9n()});
export {rWl,oWl};
