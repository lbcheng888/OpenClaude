// @ts-nocheck
import {KHe,zHe} from "./m3880.ts";
import {QL,tIe,od,eqn,RE} from "../src/agent/4342_toolUseCount.ts";
import {Bbl,kue} from "../src/agent/4859_evictAfter.ts";
import {killWorkflowTask,zIe} from "../src/agent/4169_updateWorkflowProgressBatch.ts";
import {b} from "../runtime.ts";
function pJn(e,t,n){if(e.type==="in_process_teammate"){if(e.status==="running")return KHe(e.id,t,n),"killed";return t.evictTerminal(e.id),"dismissed"}if(e.status!=="running"&&!QL(e))return Bbl(e.id,n),"dismissed";tIe(e.id,t);let r=t.all();for(let o of Object.values(r))if(od(o)&&o.id!==e.id&&(o.status==="running"||QL(o))&&mHm(o,e.agentId,r))eqn(o.id,t),tIe(o.id,t);return"killed"}
function mHm(e,t,n){let r=new Set,o=e.parentAgentId;while(o&&!r.has(o)){if(o===t)return!0;r.add(o);let s=n[o];o=od(s)?s.parentAgentId:void 0}return!1}
function qql(e,t,n,r){if(t==="running")return killWorkflowTask(e,n),"killed";return r((o)=>{if(o.tasks[e]?.type!=="local_workflow")return o;let s={...o.tasks};return delete s[e],{...o,tasks:s}}),"dismissed"}
var jPo=b(()=>{RE();zIe();zHe();kue()});
export {pJn,mHm,qql,jPo};
