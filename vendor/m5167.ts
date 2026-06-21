// @ts-nocheck
import {isTeammate,Am} from "../src/agent/1459_waitForTeammatesToBecomeIdle.ts";
import {normalizeSessionTitle,getCurrentSessionTitle,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {B_e,P4t} from "./m4387.ts";
import {Fwe,AC,mg} from "../src/agent/2580_level.ts";
import {hasHookForEvent,createBaseHookInput,executeHooks,yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
import {hFa} from "./m4028.ts";
import {b} from "../runtime.ts";
async function applyHookSessionTitle(e){if(isTeammate())return;let t=normalizeSessionTitle(e);if(!t)return;let n=getSessionId(),r=getCurrentSessionTitle(n);if(t===(r&&normalizeSessionTitle(r)))return;logForDebugging(`Hook sessionTitle applied (${[...t].length} chars)`),await B_e(t,"hook"),await Fwe(AC(),t,"user")}
async function*executeUserPromptSubmitHooks(e,t,n){let r=n.getAppState(),o=n.agentId??getSessionId();if(!hasHookForEvent("UserPromptSubmit",r,o))return;let s={...createBaseHookInput(t),hook_event_name:"UserPromptSubmit",prompt:e,session_title:getCurrentSessionTitle(getSessionId())};yield*executeHooks({hookInput:s,toolUseID:k1l.randomUUID(),signal:n.abortController.signal,timeoutMs:hFa,toolUseContext:n})}
var k1l;
var H1l=b(()=>{lt();P4t();mg();qe();yp();ja();Am();k1l=require("crypto")});
export {applyHookSessionTitle,executeUserPromptSubmitHooks,k1l,H1l};
