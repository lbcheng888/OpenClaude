// @ts-nocheck
import {Llt,HFn} from "./m3887.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function cyp(e){if(!Array.isArray(e))return[];let t=Llt(),n=[];for(let r of e){let o=t.safeParse(r);if(o.success)n.push(o.data);else logForDebugging(`[SwarmPermissionPoller] Dropping malformed permissionUpdate entry: ${o.error.message}`,{level:"warn"})}return n}
function IFn(e){Mlt.set(e.requestId,e),logForDebugging(`[SwarmPermissionPoller] Registered callback for request ${e.requestId}`)}
function JDa(e){Mlt.delete(e),logForDebugging(`[SwarmPermissionPoller] Unregistered callback for request ${e}`)}
function XDa(e){return Mlt.has(e)}
function QDa(){Mlt.clear(),T2t.clear()}
function Nlt(e){let t=Mlt.get(e.requestId);if(!t)return logForDebugging(`[SwarmPermissionPoller] No callback registered for mailbox response ${e.requestId}`),!1;if(logForDebugging(`[SwarmPermissionPoller] Processing mailbox response for request ${e.requestId}: ${e.decision}`),Mlt.delete(e.requestId),e.decision==="approved"){let n=cyp(e.permissionUpdates),r=e.updatedInput;t.onAllow(r,n)}else t.onReject(e.feedback);return!0}
function ZDa(e){T2t.set(e.requestId,e),logForDebugging(`[SwarmPermissionPoller] Registered sandbox callback for request ${e.requestId}`)}
function ePa(e){return T2t.has(e)}
function tPa(e){let t=T2t.get(e.requestId);if(!t)return logForDebugging(`[SwarmPermissionPoller] No sandbox callback registered for request ${e.requestId}`),!1;return logForDebugging(`[SwarmPermissionPoller] Processing sandbox response for request ${e.requestId}: allow=${e.allow}`),T2t.delete(e.requestId),t.resolve(e.allow),!0}
var Mlt,T2t;
var Blt=b(()=>{qe();HFn();Mlt=new Map;T2t=new Map});
export {cyp,IFn,JDa,XDa,QDa,Nlt,ZDa,ePa,tPa,Mlt,T2t,Blt};
