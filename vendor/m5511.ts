// @ts-nocheck
import {Zp,d1} from "./m2705.ts";
import {_qn,j4t,Rpt} from "./m4175.ts";
import {Lk} from "../src/config/2259_R9r.ts";
import {b} from "../runtime.ts";
import {jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Bu} from "./m2213.ts";
import {Ct} from "./m197.ts";
import {Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {$d} from "../src/config/0620_$d.ts";
function zec(){return!1}
async function jec(){return[]}
function Yec(e){let{state:t,tempo:n}=M3m(e.worker_status),r=e.config?.sources?.find((a)=>a.type==="git_repository")?.url,o=e.title??"",s=e.worker_status==="requires_action"?e.external_metadata?.pending_action:void 0,i=e.worker_status==="requires_action"?s?.tool_name===Zp?_qn(s.input).text:s?.tool_name===Lk?"approve plan":typeof s?.tool_name==="string"&&typeof s.action_description==="string"&&s.action_description!==""?j4t(`approve ${typeof s.display_tool_name==="string"&&s.display_tool_name!==""?s.display_tool_name:s.tool_name}: ${s.action_description}`):"awaiting input":void 0;return{state:t,detail:o,tempo:n,needs:i,output:null,children:null,linkScanOffset:0,template:"remote",respawnFlags:[],name:o||void 0,intent:o||e.id,sessionId:e.id,cwd:r??"remote",originCwd:r??"remote",createdAt:e.created_at,updatedAt:e.last_event_at??e.created_at,firstTerminalAt:null,backend:"remote"}}
function Jec(e,t){let n=(i)=>i.replace(/^(?:session|cse)_/,""),r=new Set(t.map((i)=>n(i.state.sessionId))),o=e.filter((i)=>i.id.startsWith("remote-pending-")&&!r.has(n(i.state.sessionId))),s=[...t,...o];return e.length===s.length&&e.every((i,a)=>i.id===s[a].id&&i.activity===s[a].activity&&L3m(i.state,s[a].state))?e:s}
function L3m(e,t){let n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;return n.every((r)=>{let o=e[r],s=t[r];if(o===s)return!0;return typeof o==="object"&&typeof s==="object"&&o!==null&&s!==null&&Bun.deepEquals(o,s)})}
function M3m(e){switch(e){case"requires_action":return{state:"blocked",tempo:"blocked"};case"idle":return{state:"done",tempo:"idle"};default:return{state:"working",tempo:"active"}}}
var aUo;
var Xec=b(()=>{Rpt();jn();Bu();d1();Ct();Ps();$d();aUo=/^(?:session|cse)_[A-Za-z0-9_-]+$/});
export {zec,jec,Yec,Jec,L3m,M3m,aUo,Xec};
