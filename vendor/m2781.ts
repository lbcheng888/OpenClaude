// @ts-nocheck
import {mainAgentId,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function X5r(e,t){let n=Object.create(null),r=0;for(let o of e){let s=t(o,r++);if(n[s]===void 0)n[s]=[];n[s].push(o)}return n}
function P0(e){return e.agentId===mainAgentId()}
var wnt=b(()=>{lt()});
export {X5r,P0,wnt};
