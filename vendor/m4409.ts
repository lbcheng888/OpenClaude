// @ts-nocheck
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {getMaterializedSessionFile,saveCustomTitle,saveAiGeneratedTitle,saveAgentName,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {Nm,D_} from "../src/agent/2784_withFileTypes.ts";
import {yS,WB} from "./m4274.ts";
import {getBridgeTokenOverride,getBridgeBaseUrlOverride,BY} from "./m4242.ts";
import {ADe,m8e} from "./m4408.ts";
import {Nu,Wu} from "./m438.ts";
import {NR,Lfe} from "../src/api/2195_updateSessionTitle.ts";
import {S7,vd} from "../src/session/1465_promise.ts";
import {b} from "../runtime.ts";
async function oTe(e,t){let n=getSessionId(),r=getMaterializedSessionFile()??Nm();if(t==="user"||t==="hook")await saveCustomTitle(n,e,r,t);else saveAiGeneratedTitle(n,e);let o=yS()?.bridgeSessionId;if(o){let i=getBridgeTokenOverride();Promise.resolve().then(() => (ADe(),m8e)).then(({updateBridgeSessionTitle:a})=>a(o,e,{baseUrl:getBridgeBaseUrlOverride(),getAccessToken:i?()=>i:void 0}).catch(()=>{}))}await saveAgentName(n,e,r,t);let s=Nu();if(s?.kind==="ccr"&&s.sessionId){let i=s.sessionId;Promise.resolve().then(() => (NR(),Lfe)).then(({updateSessionTitle:a})=>a(i,e))}await S7(e)}
var s5t=b(()=>{lt();BY();WB();Wu();vd();D_();_a()});
export {oTe,s5t};
