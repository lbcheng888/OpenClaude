// @ts-nocheck
import {bG,hS} from "../src/agent/4362_toolUseCount.ts";
import {lv,vw} from "./m5178.ts";
import {wI,xot} from "./m2793.ts";
import {b} from "../runtime.ts";
function e4t({tasks:e,queuedCommands:t=[]}){let n=new Set,r=new Set,o=(s)=>{if(bG(s)&&s.isBackgrounded)n.add(s.id);else if(s.type==="local_workflow")r.add(s.id)};for(let s of Object.values(e))if(s.status==="running"||lv(s.status)&&!s.notified)o(s);for(let s of t){if(s.mode!=="task-notification"||!wI(s)||s.taskId===void 0)continue;let i=e[s.taskId];if(i)o(i)}return{pendingAgents:n.size,pendingWorkflows:r.size}}
function t6a({tasks:e,queuedCommands:t=[],turnDurationMs:n,turnStartTime:r,now:o,backgroundWaitStartTime:s}){let{pendingAgents:i,pendingWorkflows:a}=e4t({tasks:e,queuedCommands:t});if(i>0||a>0)return{durationMs:n,pendingBackgroundAgentCount:i>0?i:void 0,pendingWorkflowCount:a>0?a:void 0,backgroundWaitStartTime:s??r};return{durationMs:s!==null?o-s:n,pendingBackgroundAgentCount:void 0,pendingWorkflowCount:void 0,backgroundWaitStartTime:null}}
var G3n=b(()=>{vw();hS();xot()});
export {e4t,t6a,G3n};
