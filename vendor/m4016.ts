// @ts-nocheck
import {tG,RE} from "../src/agent/4342_toolUseCount.ts";
import {nR,Ax} from "./m5146.ts";
import {P0,wnt} from "./m2781.ts";
import {b} from "../runtime.ts";
function m$t({tasks:e,queuedCommands:t=[]}){let n=new Set,r=new Set,o=(s)=>{if(tG(s)&&s.isBackgrounded)n.add(s.id);else if(s.type==="local_workflow")r.add(s.id)};for(let s of Object.values(e))if(s.status==="running"||nR(s.status)&&!s.notified)o(s);for(let s of t){if(s.mode!=="task-notification"||!P0(s)||s.taskId===void 0)continue;let i=e[s.taskId];if(i)o(i)}return{pendingAgents:n.size,pendingWorkflows:r.size}}
function kBa({tasks:e,queuedCommands:t=[],turnDurationMs:n,turnStartTime:r,now:o,backgroundWaitStartTime:s}){let{pendingAgents:i,pendingWorkflows:a}=m$t({tasks:e,queuedCommands:t});if(i>0||a>0)return{durationMs:n,pendingBackgroundAgentCount:i>0?i:void 0,pendingWorkflowCount:a>0?a:void 0,backgroundWaitStartTime:s??r};return{durationMs:s!==null?o-s:n,pendingBackgroundAgentCount:void 0,pendingWorkflowCount:void 0,backgroundWaitStartTime:null}}
var s2n=b(()=>{Ax();RE();wnt()});
export {m$t,kBa,s2n};
