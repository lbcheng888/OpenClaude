// @ts-nocheck
import {rc,fx,hS} from "../src/agent/4362_toolUseCount.ts";
import {b} from "../runtime.ts";
function yQl(e,t){if(!t||e.length===0)return[];let n=new Map,r=new Map;for(let o of e){if(!o.agentId||o.mode!=="task-notification")continue;let s=n.get(o.agentId);if(!s){let a=t[o.agentId];if(!rc(a)||!fx(a))continue;s=a,n.set(o.agentId,s)}let i=r.get(o.agentId)??[];i.push(o),r.set(o.agentId,i)}return Array.from(r,([o,s])=>({agentId:o,prompt:s.map((i)=>typeof i.value==="string"?i.value:"").filter(Boolean).join(`

`),consumedCommands:s}))}
var TQl=b(()=>{hS()});
export {yQl,TQl};
