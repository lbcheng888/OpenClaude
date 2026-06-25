// @ts-nocheck
import {mainAgentId,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function xzr(e,t){let n=Object.create(null),r=0;for(let o of e){let s=t(o,r++);if(n[s]===void 0)n[s]=[];n[s].push(o)}return n}
function wI(e){return e.agentId===mainAgentId()}
var xot=b(()=>{lt()});
export {xzr,wI,xot};
