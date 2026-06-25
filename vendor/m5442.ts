// @ts-nocheck
import {isAgentSwarmsEnabled,lb} from "../src/config/3314_isAgentSwarmsEnabled.ts";
import {Mpt,Qqn,Zqn,Npt} from "../src/core/4210_id.ts";
import {yqn,Y4t} from "../src/tools/4177_resolve.ts";
import {g6n,Vpt} from "./m4218.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {mo,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
async function BXl(e){if(!isAgentSwarmsEnabled()||!Mpt())return null;let{ctx:t,description:n,updatedInput:r,suggestions:o}=e,s=r??t.input,i=null;if(i)return i;try{let a=()=>t.toolUseContext.setAppState((c)=>({...c,pendingWorkerRequest:null})),l=await new Promise((c)=>{let{resolve:u,claim:d}=yqn(c),p=Qqn({toolName:t.tool.name,toolUseId:t.toolUseID,input:s,description:n,permissionSuggestions:o});g6n({requestId:p.id,toolUseId:t.toolUseID,onAllow(m,f,h,g){if(!d())return;a();let _=m&&Object.keys(m).length>0?m:s;u(t.handleUserAllow(_,f,h,void 0,g))},onReject(m,f){if(!d())return;a(),t.logDecision({decision:"reject",source:{type:"user_reject",hasFeedback:!!m}}),u(t.cancelAndAbort(m,void 0,f))}}),Zqn(p),t.toolUseContext.setAppState((m)=>({...m,pendingWorkerRequest:{toolName:t.tool.name,toolUseId:t.toolUseID,description:n}})),t.toolUseContext.abortController.signal.addEventListener("abort",()=>{if(!d())return;a(),t.logCancelled(),u(t.cancelAndAbort(void 0,!0))},{once:!0})});return He("permission_swarm_forward"),l}catch(a){return xe("permission_swarm_forward","permission_swarm_forward_failed"),Ie(mo(a)),null}}
var UXl=b(()=>{mn();lb();Ct();vn();Npt();Vpt();Y4t()});
export {BXl,UXl};
