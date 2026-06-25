// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function J3l(e,t){if(!e||typeof e!=="object"||Array.isArray(e)||!t||typeof t!=="object")return;let n=[],r=new Set(Object.keys(t));for(let a of Object.keys(e))if(!r.has(a))n.push(a);let o=e.hookSpecificOutput,s="hookSpecificOutput"in t?t.hookSpecificOutput:void 0;if(o&&typeof o==="object"&&!Array.isArray(o)&&s&&typeof s==="object"){let a=new Set(Object.keys(s));for(let l of Object.keys(o))if(!a.has(l))n.push(`hookSpecificOutput.${l}`)}if(n.length===0)return;let i=n.includes("additionalContext")?" Did you mean hookSpecificOutput.additionalContext (with a hookEventName)?":"";logForDebugging(`Hook JSON output had unrecognized keys (ignored): ${n.join(", ")}.${i}`)}
var X3l=b(()=>{qe()});
export {J3l,X3l};
