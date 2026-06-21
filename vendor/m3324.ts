// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Oe,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {toCompatSessionId} from "../src/core/2797_toInfraSessionId.ts";
import {fo} from "./m566.ts";
import {Se,bt} from "./m195.ts";
import {iY,ole} from "../src/telemetry/3324_reason.ts";
import {getClientPlatform,tg} from "../src/config/0048_ISSUES_EXPLAINER.ts";
import {b} from "../runtime.ts";
import {Gp} from "./m567.ts";
async function sNt(e,t,n,r,o,s,i){let a=e==="subscribe"?"bridge_pr_subscribe":"bridge_pr_unsubscribe",l=s();if(!l)return logForDebugging(`[bridge] No access token for ${e}-pr`),Oe(a,"no_token"),!1;let c=`${o}/v1/code/github/${e}-pr`,u={session_id:toCompatSessionId(t),repo:n,pr_number:r},d;try{d=await fo.post(c,u,{headers:JWd(l,{trustedDeviceToken:await i?.()}),timeout:1e4,validateStatus:(m)=>m<500})}catch(m){return logForDebugging(`[bridge] ${e}-pr request failed: ${Se(m)}`),Oe(a,"request_failed"),!1}if(!(d.status>=200&&d.status<300||d.status===409)){let m=iY(d.data);return logForDebugging(`[bridge] ${e}-pr failed ${d.status}${m?`: ${m}`:""}`),Oe(a,"http_error"),!1}return logForDebugging(`[bridge] ${e}-pr ${n}#${r} ok`),Ie(a),!0}
function JWd(e,{orgUUID:t,trustedDeviceToken:n}={}){let r={Authorization:`Bearer ${e}`,"Content-Type":"application/json","anthropic-version":zWd,"anthropic-beta":YWd,"anthropic-client-platform":getClientPlatform(),"User-Agent":tg()};if(t!==void 0)r["x-organization-uuid"]=t;if(n!==void 0)r["X-Trusted-Device-Token"]=n;return r}
var zWd="2023-06-01",YWd="ccr-byoc-2025-07-29";
var GJr=b(()=>{Gp();ln();qe();bt();ole()});
export {sNt,JWd,zWd,YWd,GJr};
