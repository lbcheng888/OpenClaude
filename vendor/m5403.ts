// @ts-nocheck
import {mt,bo,configProtoStore} from "./m2458.ts";
import {yS} from "./m3824.ts";
import {oj,kue} from "../src/agent/4859_evictAfter.ts";
import {b} from "../runtime.ts";
function G5l(){let e=mt((s)=>s.tasks),t=mt((s)=>s.viewSelectionMode),n=mt((s)=>s.viewingAgentTaskId),r=bo();return{handleKeyDown:(s)=>{if(s.name==="escape"&&t==="viewing-agent"){s.preventDefault();let i=n;if(i){let a=e[i];if(yS(a)&&a.status==="running"){a.currentWorkAbortController?.abort();return}}oj(r)}},handleKeyDownCapture:()=>{}}}
var V5l=b(()=>{configProtoStore();kue()});
export {G5l,V5l};
