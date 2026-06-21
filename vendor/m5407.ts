// @ts-nocheck
import {bo,mt,configProtoStore} from "./m2458.ts";
import {yS} from "./m3824.ts";
import {od,RE} from "../src/agent/4342_toolUseCount.ts";
import {NG,oj,kue} from "../src/agent/4859_evictAfter.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function Z5l(){let e=bo(),t=mt((c)=>c.viewingAgentTaskId),n=mt((c)=>c.viewingAgentTaskId?c.tasks[c.viewingAgentTaskId]:void 0),r=n&&yS(n)?n:void 0,o=r?.status,s=r?.error,i=n!==void 0,a=cXn.useRef(void 0);if(od(n))a.current=n.parentAgentId;else if(n!==void 0)a.current=void 0;let l=mt((c)=>a.current?c.tasks[a.current]!==void 0:!1);cXn.useEffect(()=>{if(!t)return;if(!i){let c=a.current;if(a.current=void 0,c&&l)NG(c,e);else oj(e);return}if(!r)return;if(o==="killed"||o==="failed"||s||o!=="running"&&o!=="completed"&&o!=="pending"){oj(e);return}},[t,i,l,r,o,s,e])}
var cXn;
var eWl=b(()=>{configProtoStore();kue();RE();cXn=M(Te(),1)});
export {Z5l,cXn,eWl};
