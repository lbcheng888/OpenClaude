// @ts-nocheck
import {isTeammate,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {normalizeSessionTitle,getCurrentSessionTitle,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {oTe,s5t} from "./m4409.ts";
import {Mie,eb,Pf} from "../src/agent/2591_level.ts";
import {hasHookForEvent,createBaseHookInput,executeHooks,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {W6a} from "./m4092.ts";
import {b} from "../runtime.ts";
async function applyHookSessionTitle(e){if(isTeammate())return;let t=normalizeSessionTitle(e);if(!t)return;let n=getSessionId(),r=getCurrentSessionTitle(n);if(t===(r&&normalizeSessionTitle(r)))return;logForDebugging(`Hook sessionTitle applied (${[...t].length} chars)`),await oTe(t,"hook"),await Mie(eb(),t,"user")}
async function*executeUserPromptSubmitHooks(e,t,n){let r=n.getAppState(),o=n.agentId??getSessionId();if(!hasHookForEvent("UserPromptSubmit",r,o))return;let s={...createBaseHookInput(t),hook_event_name:"UserPromptSubmit",prompt:e,session_title:getCurrentSessionTitle(getSessionId())};yield*executeHooks({hookInput:s,toolUseID:m4l.randomUUID(),signal:n.abortController.signal,timeoutMs:W6a,toolUseContext:n})}
var m4l;
var f4l=b(()=>{lt();s5t();Pf();qe();Wd();_a();Op();m4l=require("crypto")});
export {applyHookSessionTitle,executeUserPromptSubmitHooks,m4l,f4l};
