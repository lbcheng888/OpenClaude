// @ts-nocheck
import {M0e,N0e} from "./m3898.ts";
import {vut,HB} from "../src/agent/4331_register.ts";
import {fx,_ye,rc,ddt,hS} from "../src/agent/4362_toolUseCount.ts";
import {WIl,Hue} from "../src/agent/4889_evictAfter.ts";
import {killWorkflowTask,Hce} from "../src/agent/4186_parse.ts";
import {b} from "../runtime.ts";
function Rer(e,t,n){if(e.type==="in_process_teammate"){if(e.status==="running")return M0e(e.id,t,n),t.update(e.id,(o)=>o.status==="killed"&&o.evictAfter===void 0?{...o,evictAfter:Date.now()+vut}:o),"killed";return t.remove(e.id),"dismissed"}if(e.status!=="running"&&!fx(e))return WIl(e.id,n),"dismissed";_ye(e.id,t,"user");let r=t.all();for(let o of Object.values(r))if(rc(o)&&o.id!==e.id&&(o.status==="running"||fx(o))&&qNm(o,e.agentId,r))ddt(o.id,t),_ye(o.id,t,"user");return"killed"}
function qNm(e,t,n){let r=new Set,o=e.parentAgentId;while(o&&!r.has(o)){if(o===t)return!0;r.add(o);let s=n[o];o=rc(s)?s.parentAgentId:void 0}return!1}
function Xzl(e,t,n,r){if(t==="running")return killWorkflowTask(e,n),"killed";return r((o)=>{if(o.tasks[e]?.type!=="local_workflow")return o;let s={...o.tasks};return delete s[e],{...o,tasks:s}}),"dismissed"}
var TFo=b(()=>{hS();Hce();N0e();HB();Hue()});
export {Rer,qNm,Xzl,TFo};
