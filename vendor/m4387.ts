// @ts-nocheck
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {getMaterializedSessionFile,$6,saveAiGeneratedTitle,saveAgentName,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {qf,ry} from "../src/agent/2772_withFileTypes.ts";
import {ES,EU} from "./m4256.ts";
import {getBridgeTokenOverride,getBridgeBaseUrlOverride,tJ} from "./m4224.ts";
import {x0e,U6e} from "./m4386.ts";
import {dd,Dd} from "./m687.ts";
import {Dw,vfe} from "../src/api/2190_updateSessionTitle.ts";
import {Y7,hp} from "../src/session/1460_promise.ts";
import {b} from "../runtime.ts";
async function B_e(e,t){let n=getSessionId(),r=getMaterializedSessionFile()??qf();if(t==="user"||t==="hook")await $6(n,e,r,t);else saveAiGeneratedTitle(n,e);let o=ES()?.bridgeSessionId;if(o){let i=getBridgeTokenOverride();Promise.resolve().then(() => (x0e(),U6e)).then(({updateBridgeSessionTitle:a})=>a(o,e,{baseUrl:getBridgeBaseUrlOverride(),getAccessToken:i?()=>i:void 0}).catch(()=>{}))}await saveAgentName(n,e,r,t);let s=dd();if(s?.kind==="ccr"&&s.sessionId){let i=s.sessionId;Promise.resolve().then(() => (Dw(),vfe)).then(({updateSessionTitle:a})=>a(i,e))}await Y7(e)}
var P4t=b(()=>{lt();tJ();EU();Dd();hp();ry();ja()});
export {B_e,P4t};
