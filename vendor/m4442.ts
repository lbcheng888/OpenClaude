// @ts-nocheck
import {uGn,iEo} from "./m4441.ts";
import {b} from "../runtime.ts";
function IDe(e){return uGn(e.viewingAgentTaskId,e.tasks).teammate}
function v5t(e){let{teammate:t,localAgent:n}=uGn(e.viewingAgentTaskId,e.tasks);if(t)return{type:"viewed",task:t};if(n)return{type:"named_agent",task:n};return{type:"leader"}}
var w5t=b(()=>{iEo()});
export {IDe,v5t,w5t};
