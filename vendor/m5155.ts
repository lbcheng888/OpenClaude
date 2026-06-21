// @ts-nocheck
import {Ep} from "./m4028.ts";
import {createBaseHookInput,executeHooksOutsideREPL,yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
import {b} from "../runtime.ts";
async function executePreCompactHooks(e,t,n=Ep){let r={...createBaseHookInput(void 0),hook_event_name:"PreCompact",trigger:e.trigger,custom_instructions:e.customInstructions},o=await executeHooksOutsideREPL({hookInput:r,matchQuery:e.trigger,signal:t,timeoutMs:n});if(o.length===0)return{};let s=o.filter((l)=>l.succeeded&&!l.blocked&&l.output.trim().length>0).map((l)=>l.output.trim()),i=[];for(let l of o)if(l.succeeded&&!l.blocked)if(l.output.trim())i.push(`PreCompact [${l.command}] completed successfully: ${l.output.trim()}`);else i.push(`PreCompact [${l.command}] completed successfully`);else if(l.output.trim())i.push(`PreCompact [${l.command}] failed: ${l.output.trim()}`);else i.push(`PreCompact [${l.command}] failed`);let a=o.filter((l)=>l.blocked);return{newCustomInstructions:s.length>0?s.join(`

`):void 0,userDisplayMessage:i.length>0?i.join(`
`):void 0,...a.length>0&&{blockedBy:a.map((l)=>{let c=l.output.trim();return`[${l.command}]${c?`: ${c}`:""}`}).join(`
`)}}}
async function executePostCompactHooks(e,t,n=Ep){let r={...createBaseHookInput(void 0),hook_event_name:"PostCompact",trigger:e.trigger,compact_summary:e.compactSummary},o=await executeHooksOutsideREPL({hookInput:r,matchQuery:e.trigger,signal:t,timeoutMs:n});if(o.length===0)return{};let s=[];for(let i of o)if(i.succeeded)if(i.output.trim())s.push(`PostCompact [${i.command}] completed successfully: ${i.output.trim()}`);else s.push(`PostCompact [${i.command}] completed successfully`);else if(i.output.trim())s.push(`PostCompact [${i.command}] failed: ${i.output.trim()}`);else s.push(`PostCompact [${i.command}] failed`);return{userDisplayMessage:s.length>0?s.join(`
`):void 0}}
var f1l=b(()=>{yp()});
export {executePreCompactHooks,executePostCompactHooks,f1l};
