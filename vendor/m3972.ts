// @ts-nocheck
import {YA} from "./m3366.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {hf,RE} from "../src/session/2796_uuid.ts";
import {p_,wE} from "./m5177.ts";
import {Qke,ef} from "./m2794.ts";
import {b} from "../runtime.ts";
function mye(e,t){let n,r=!1;if(t.update(e,(o)=>{if(o.status!=="running"||!YA(o))return o;try{logForDebugging(`LocalShellTask ${e} kill requested`),o.shellCommand?.kill(),o.shellCommand?.cleanup()}catch(s){Ie(s)}if(o.cleanupTimeoutId)clearTimeout(o.cleanupTimeoutId);return r=o.notified,n={toolUseId:o.toolUseId,description:o.description},{...o,status:"killed",notified:!0,shellCommand:null,cleanupTimeoutId:void 0,endTime:Date.now()}}),n&&!r)hf(e,"stopped",{toolUseId:n.toolUseId,summary:n.description});p_(e)}
function S$a(e,t){for(let n of Object.values(t.all())){if(n.status!=="running")continue;if(n.type==="local_bash"){if(n.isBackgrounded&&n.agentId===e)return!0}else if(n.type==="monitor_mcp"){if(n.agentId===e)return!0}}return!1}
function b$a(e,t){for(let[n,r]of Object.entries(t.all()))if(YA(r)&&r.agentId===e&&r.status==="running")logForDebugging(`killShellTasksForAgent: killing orphaned shell task ${n} (agent ${e} exiting)`),mye(n,t);Qke((n)=>n.agentId===e)}
var C3t=b(()=>{qe();vn();ef();RE();wE()});
export {mye,S$a,b$a,C3t};
