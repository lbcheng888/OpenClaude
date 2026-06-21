// @ts-nocheck
import {od,QL,RE} from "../src/agent/4342_toolUseCount.ts";
import {b} from "../runtime.ts";
function LWl(e,t){if(!t||e.length===0)return[];let n=new Map,r=new Map;for(let o of e){if(!o.agentId||o.mode!=="task-notification")continue;let s=n.get(o.agentId);if(!s){let a=t[o.agentId];if(!od(a)||!QL(a))continue;s=a,n.set(o.agentId,s)}let i=r.get(o.agentId)??[];i.push(o),r.set(o.agentId,i)}return Array.from(r,([o,s])=>({agentId:o,prompt:s.map((i)=>typeof i.value==="string"?i.value:"").filter(Boolean).join(`

`),consumedCommands:s}))}
var MWl=b(()=>{RE()});
export {LWl,MWl};
