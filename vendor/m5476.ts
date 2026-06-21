// @ts-nocheck
import {Fm,Z1} from "./m2693.ts";
import {_9n,P9t,Rut} from "./m4162.ts";
import {Tk} from "../src/config/2251_zBr.ts";
import {b} from "../runtime.ts";
import {zn} from "../src/api/2198_stopPeriodicGrowthBookRefresh.ts";
import {rd} from "./m2205.ts";
import {bt} from "./m195.ts";
import {li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {Ap} from "../src/config/0614_Ap.ts";
function i7l(){return!1}
async function a7l(){return[]}
function l7l(e){let{state:t,tempo:n}=RMm(e.worker_status),r=e.config?.sources?.find((a)=>a.type==="git_repository")?.url,o=e.title??"",s=e.worker_status==="requires_action"?e.external_metadata?.pending_action:void 0,i=e.worker_status==="requires_action"?s?.tool_name===Fm?_9n(s.input).text:s?.tool_name===Tk?"approve plan":typeof s?.tool_name==="string"&&typeof s.action_description==="string"&&s.action_description!==""?P9t(`approve ${typeof s.display_tool_name==="string"&&s.display_tool_name!==""?s.display_tool_name:s.tool_name}: ${s.action_description}`):"awaiting input":void 0;return{state:t,detail:o,tempo:n,needs:i,output:null,children:null,linkScanOffset:0,template:"remote",respawnFlags:[],name:o||void 0,intent:o||e.id,sessionId:e.id,cwd:r??"remote",originCwd:r??"remote",createdAt:e.created_at,updatedAt:e.last_event_at??e.created_at,firstTerminalAt:null,backend:"remote"}}
function c7l(e,t){let n=(i)=>i.replace(/^(?:session|cse)_/,""),r=new Set(t.map((i)=>n(i.state.sessionId))),o=e.filter((i)=>i.id.startsWith("remote-pending-")&&!r.has(n(i.state.sessionId))),s=[...t,...o];return e.length===s.length&&e.every((i,a)=>i.id===s[a].id&&i.activity===s[a].activity&&wMm(i.state,s[a].state))?e:s}
function wMm(e,t){let n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;return n.every((r)=>{let o=e[r],s=t[r];if(o===s)return!0;return typeof o==="object"&&typeof s==="object"&&o!==null&&s!==null&&Bun.deepEquals(o,s)})}
function RMm(e){switch(e){case"requires_action":return{state:"blocked",tempo:"blocked"};case"idle":return{state:"done",tempo:"idle"};default:return{state:"working",tempo:"active"}}}
var BLo;
var u7l=b(()=>{Rut();zn();rd();Z1();bt();li();Ap();BLo=/^(?:session|cse)_[A-Za-z0-9_-]+$/});
export {i7l,a7l,l7l,c7l,wMm,RMm,BLo,u7l};
