// @ts-nocheck
import {qpt,h6n} from "./m4217.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function kBp(e){if(!Array.isArray(e))return[];let t=qpt(),n=[];for(let r of e){let o=t.safeParse(r);if(o.success)n.push(o.data);else logForDebugging(`[SwarmPermissionPoller] Dropping malformed permissionUpdate entry: ${o.error.message}`,{level:"warn"})}return n}
function g6n(e){Wpt.set(e.requestId,e),logForDebugging(`[SwarmPermissionPoller] Registered callback for request ${e.requestId}`)}
function K7a(e){Wpt.delete(e),logForDebugging(`[SwarmPermissionPoller] Unregistered callback for request ${e}`)}
function z7a(e){return Wpt.has(e)}
function j7a(){Wpt.clear(),pqt.clear()}
function Gpt(e){let t=Wpt.get(e.requestId);if(!t)return logForDebugging(`[SwarmPermissionPoller] No callback registered for mailbox response ${e.requestId}`),!1;if(logForDebugging(`[SwarmPermissionPoller] Processing mailbox response for request ${e.requestId}: ${e.decision}`),Wpt.delete(e.requestId),e.decision==="approved"){let n=kBp(e.permissionUpdates),r=e.updatedInput;t.onAllow(r,n)}else t.onReject(e.feedback);return!0}
function Y7a(e){pqt.set(e.requestId,e),logForDebugging(`[SwarmPermissionPoller] Registered sandbox callback for request ${e.requestId}`)}
function J7a(e){return pqt.has(e)}
function X7a(e){let t=pqt.get(e.requestId);if(!t)return logForDebugging(`[SwarmPermissionPoller] No sandbox callback registered for request ${e.requestId}`),!1;return logForDebugging(`[SwarmPermissionPoller] Processing sandbox response for request ${e.requestId}: allow=${e.allow}`),pqt.delete(e.requestId),t.resolve(e.allow),!0}
var Wpt,pqt;
var Vpt=b(()=>{qe();h6n();Wpt=new Map;pqt=new Map});
export {kBp,g6n,K7a,z7a,j7a,Gpt,Y7a,J7a,X7a,Wpt,pqt,Vpt};
