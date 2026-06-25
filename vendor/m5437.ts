// @ts-nocheck
import {_t,bo,uo} from "./m2468.ts";
import {mS} from "./m3842.ts";
import {logMCPDebug,Hue} from "../src/agent/4889_evictAfter.ts";
import {b} from "../runtime.ts";
function HXl(){let e=_t((s)=>s.tasks),t=_t((s)=>s.viewSelectionMode),n=_t((s)=>s.viewingAgentTaskId),r=bo();return{handleKeyDown:(s)=>{if(s.name==="escape"&&t==="viewing-agent"){s.preventDefault();let i=n;if(i){let a=e[i];if(mS(a)&&a.status==="running"){a.currentWorkAbortController?.abort();return}}logMCPDebug(r)}},handleKeyDownCapture:()=>{}}}
var IXl=b(()=>{uo();Hue()});
export {HXl,IXl};
