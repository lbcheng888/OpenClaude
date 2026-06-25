// @ts-nocheck
import {AuthenticationRequiredError,CredentialUnavailableError,cD} from "./m1637.ts";
import {CHt,Shn,XAe} from "./m1679.ts";
import {dHt,jzs,zzs,sse} from "./m1629.ts";
import {s8} from "./m1907.ts";
import {Oh,VS,Lp} from "./m1636.ts";
import {rQe} from "./m1674.ts";
import {b} from "../runtime.ts";
import {TOr} from "./m1675.ts";
import {tri} from "./m1908.ts";
function NQe(e,t,n){let r=(o)=>(d0t.getToken.info(o),new AuthenticationRequiredError({scopes:Array.isArray(e)?e:[e],getTokenOptions:n,message:o}));if(!t)throw r("No response");if(!t.expiresOn)throw r('Response had no "expiresOn" property.');if(!t.accessToken)throw r('Response had no "accessToken" property.')}
function E1r(e){let t=e===null||e===void 0?void 0:e.authorityHost;if(!t&&CHt)t=process.env.AZURE_AUTHORITY_HOST;return t!==null&&t!==void 0?t:dHt}
function C1r(e,t){if(!t)t=dHt;if(new RegExp(`${e}/?$`).test(t))return t;if(t.endsWith("/"))return t+e;else return`${t}/${e}`}
function rri(e,t,n){if(e==="adfs"&&t||n)return[t];return[]}
function S_n(e){switch(e){case"error":return s8.LogLevel.Error;case"info":return s8.LogLevel.Info;case"verbose":return s8.LogLevel.Verbose;case"warning":return s8.LogLevel.Warning;default:return s8.LogLevel.Info}}
function RBe(e,t,n){if(t.name==="AuthError"||t.name==="ClientAuthError"||t.name==="BrowserAuthError"){let r=t;switch(r.errorCode){case"endpoints_resolution_error":return d0t.info(Oh(e,t.message)),new CredentialUnavailableError(t.message);case"device_code_polling_cancelled":return new rQe("The authentication has been aborted by the caller.");case"consent_required":case"interaction_required":case"login_required":d0t.info(Oh(e,`Authentication returned errorCode ${r.errorCode}`));break;default:d0t.info(Oh(e,`Failed to acquire token: ${t.message}`));break}}if(t.name==="ClientConfigurationError"||t.name==="BrowserConfigurationAuthError"||t.name==="AbortError"||t.name==="AuthenticationError")return t;if(t.name==="NativeAuthError")return d0t.info(Oh(e,`Error from the native broker: ${t.message} with status code: ${t.statusCode}`)),t;return new AuthenticationRequiredError({scopes:e,getTokenOptions:n,message:t.message})}
function ori(e){return{localAccountId:e.homeAccountId,environment:e.authority,username:e.username,homeAccountId:e.homeAccountId,tenantId:e.tenantId}}
function sri(e,t){var n;return{authority:(n=t.environment)!==null&&n!==void 0?n:jzs,homeAccountId:t.homeAccountId,tenantId:t.tenantId||zzs,username:t.username,clientId:e,version:nri}}
function serializeAuthenticationRecord(e){return JSON.stringify(e)}
function deserializeAuthenticationRecord(e){let t=JSON.parse(e);if(t.version&&t.version!==nri)throw Error("Unsupported AuthenticationRecord version");return t}
var d0t,nri="1.0",T_n=(e,t=Shn?"Node":"Browser")=>(n,r,o)=>{if(o)return;switch(n){case s8.LogLevel.Error:e.info(`MSAL ${t} V2 error: ${r}`);return;case s8.LogLevel.Info:e.info(`MSAL ${t} V2 info message: ${r}`);return;case s8.LogLevel.Verbose:e.info(`MSAL ${t} V2 verbose message: ${r}`);return;case s8.LogLevel.Warning:e.info(`MSAL ${t} V2 warning: ${r}`);return}};
var b_n=b(()=>{cD();VS();sse();XAe();TOr();tri();d0t=Lp("IdentityUtils")});
export {NQe,E1r,C1r,rri,S_n,RBe,ori,sri,serializeAuthenticationRecord,deserializeAuthenticationRecord,d0t,nri,T_n,b_n};
