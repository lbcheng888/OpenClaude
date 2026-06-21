// @ts-nocheck
import {oI} from "./m3350.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {Bh,bC} from "../src/session/2784_uuid.ts";
import {iy,vC} from "./m5145.ts";
import {pxe,sA} from "./m2782.ts";
import {b} from "../runtime.ts";
function zge(e,t){let n,r=!1;if(t.update(e,(o)=>{if(o.status!=="running"||!oI(o))return o;try{logForDebugging(`LocalShellTask ${e} kill requested`),o.shellCommand?.kill(),o.shellCommand?.cleanup()}catch(s){De(s)}if(o.cleanupTimeoutId)clearTimeout(o.cleanupTimeoutId);return r=o.notified,n={toolUseId:o.toolUseId,description:o.description},{...o,status:"killed",notified:!0,shellCommand:null,cleanupTimeoutId:void 0,endTime:Date.now()}}),n&&!r)Bh(e,"stopped",{toolUseId:n.toolUseId,summary:n.description});iy(e)}
function fOa(e,t){for(let n of Object.values(t.all())){if(n.status!=="running")continue;if(n.type==="local_bash"){if(n.isBackgrounded&&n.agentId===e)return!0}else if(n.type==="monitor_mcp"){if(n.agentId===e)return!0}}return!1}
function AOa(e,t){for(let[n,r]of Object.entries(t.all()))if(oI(r)&&r.agentId===e&&r.status==="running")logForDebugging(`killShellTasksForAgent: killing orphaned shell task ${n} (agent ${e} exiting)`),zge(n,t);pxe((n)=>n.agentId===e)}
var x2t=b(()=>{qe();Rn();sA();bC();vC()});
export {zge,fOa,AOa,x2t};
