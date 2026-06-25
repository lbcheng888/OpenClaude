// @ts-nocheck
import {bo,_t,uo} from "./m2468.ts";
import {mS} from "./m3842.ts";
import {rc,hS} from "../src/agent/4362_toolUseCount.ts";
import {isFastModeReady,logMCPDebug,Hue} from "../src/agent/4889_evictAfter.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function NXl(){let e=bo(),t=_t((c)=>c.viewingAgentTaskId),n=_t((c)=>c.viewingAgentTaskId?c.tasks[c.viewingAgentTaskId]:void 0),r=n&&mS(n)?n:void 0,o=r?.status,s=r?.error,i=n!==void 0,a=utr.useRef(void 0);if(rc(n))a.current=n.parentAgentId;else if(n!==void 0)a.current=void 0;let l=_t((c)=>a.current?c.tasks[a.current]!==void 0:!1);utr.useEffect(()=>{if(!t)return;if(!i){let c=a.current;if(a.current=void 0,c&&l)isFastModeReady(c,e);else logMCPDebug(e);return}if(!r)return;if(o==="killed"||o==="failed"||s||o!=="running"&&o!=="completed"&&o!=="pending"){logMCPDebug(e);return}},[t,i,l,r,o,s,e])}
var utr;
var FXl=b(()=>{uo();Hue();hS();utr=x(et(),1)});
export {NXl,utr,FXl};
