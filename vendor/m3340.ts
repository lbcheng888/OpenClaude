// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {xe,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {toCompatSessionId} from "../src/core/2809_toInfraSessionId.ts";
import {ho} from "./m572.ts";
import {Ce,Ct} from "./m197.ts";
import {Mj,rle} from "../src/telemetry/3340_reason.ts";
import {getClientPlatform,Fg} from "./m5.ts";
import {b} from "../runtime.ts";
import {ap} from "./m573.ts";
async function LBt(e,t,n,r,o,s,i){let a=e==="subscribe"?"bridge_pr_subscribe":"bridge_pr_unsubscribe",l=s();if(!l)return logForDebugging(`[bridge] No access token for ${e}-pr`),xe(a,"no_token"),!1;let c=`${o}/v1/code/github/${e}-pr`,u={session_id:toCompatSessionId(t),repo:n,pr_number:r},d;try{d=await ho.post(c,u,{headers:Nep(l,{trustedDeviceToken:await i?.()}),timeout:1e4,validateStatus:(m)=>m<500})}catch(m){return logForDebugging(`[bridge] ${e}-pr request failed: ${Ce(m)}`),xe(a,"request_failed"),!1}if(!(d.status>=200&&d.status<300||d.status===409)){let m=Mj(d.data);return logForDebugging(`[bridge] ${e}-pr failed ${d.status}${m?`: ${m}`:""}`),xe(a,"http_error"),!1}return logForDebugging(`[bridge] ${e}-pr ${n}#${r} ok`),He(a),!0}
function Nep(e,{orgUUID:t,trustedDeviceToken:n}={}){let r={Authorization:`Bearer ${e}`,"Content-Type":"application/json","anthropic-version":Lep,"anthropic-beta":Mep,"anthropic-client-platform":getClientPlatform(),"User-Agent":Fg()};if(t!==void 0)r["x-organization-uuid"]=t;if(n!==void 0)r["X-Trusted-Device-Token"]=n;return r}
var Lep="2023-06-01",Mep="ccr-byoc-2025-07-29";
var wto=b(()=>{ap();mn();qe();Ct();rle()});
export {LBt,Nep,Lep,Mep,wto};
