// @ts-nocheck
import {AuthenticationRequiredError,CredentialUnavailableError,JD} from "./m1632.ts";
import {Jwt,Bpn,fCe} from "./m1674.ts";
import {Bwt,Z8s,Q8s,ise} from "./m1624.ts";
import {G8} from "./m1902.ts";
import {Hh,GS,hm} from "./m1631.ts";
import {sJe} from "./m1669.ts";
import {b} from "../runtime.ts";
import {jHr} from "./m1670.ts";
import {iXs} from "./m1903.ts";
function FJe(e,t,n){let r=(o)=>(Bxt.getToken.info(o),new AuthenticationRequiredError({scopes:Array.isArray(e)?e:[e],getTokenOptions:n,message:o}));if(!t)throw r("No response");if(!t.expiresOn)throw r('Response had no "expiresOn" property.');if(!t.accessToken)throw r('Response had no "accessToken" property.')}
function VDr(e){let t=e===null||e===void 0?void 0:e.authorityHost;if(!t&&Jwt)t=process.env.AZURE_AUTHORITY_HOST;return t!==null&&t!==void 0?t:Bwt}
function KDr(e,t){if(!t)t=Bwt;if(new RegExp(`${e}/?$`).test(t))return t;if(t.endsWith("/"))return t+e;else return`${t}/${e}`}
function lXs(e,t,n){if(e==="adfs"&&t||n)return[t];return[]}
function Bfn(e){switch(e){case"error":return G8.LogLevel.Error;case"info":return G8.LogLevel.Info;case"verbose":return G8.LogLevel.Verbose;case"warning":return G8.LogLevel.Warning;default:return G8.LogLevel.Info}}
function kBe(e,t,n){if(t.name==="AuthError"||t.name==="ClientAuthError"||t.name==="BrowserAuthError"){let r=t;switch(r.errorCode){case"endpoints_resolution_error":return Bxt.info(Hh(e,t.message)),new CredentialUnavailableError(t.message);case"device_code_polling_cancelled":return new sJe("The authentication has been aborted by the caller.");case"consent_required":case"interaction_required":case"login_required":Bxt.info(Hh(e,`Authentication returned errorCode ${r.errorCode}`));break;default:Bxt.info(Hh(e,`Failed to acquire token: ${t.message}`));break}}if(t.name==="ClientConfigurationError"||t.name==="BrowserConfigurationAuthError"||t.name==="AbortError"||t.name==="AuthenticationError")return t;if(t.name==="NativeAuthError")return Bxt.info(Hh(e,`Error from the native broker: ${t.message} with status code: ${t.statusCode}`)),t;return new AuthenticationRequiredError({scopes:e,getTokenOptions:n,message:t.message})}
function cXs(e){return{localAccountId:e.homeAccountId,environment:e.authority,username:e.username,homeAccountId:e.homeAccountId,tenantId:e.tenantId}}
function uXs(e,t){var n;return{authority:(n=t.environment)!==null&&n!==void 0?n:Z8s,homeAccountId:t.homeAccountId,tenantId:t.tenantId||Q8s,username:t.username,clientId:e,version:aXs}}
function serializeAuthenticationRecord(e){return JSON.stringify(e)}
function deserializeAuthenticationRecord(e){let t=JSON.parse(e);if(t.version&&t.version!==aXs)throw Error("Unsupported AuthenticationRecord version");return t}
var Bxt,aXs="1.0",Nfn=(e,t=Bpn?"Node":"Browser")=>(n,r,o)=>{if(o)return;switch(n){case G8.LogLevel.Error:e.info(`MSAL ${t} V2 error: ${r}`);return;case G8.LogLevel.Info:e.info(`MSAL ${t} V2 info message: ${r}`);return;case G8.LogLevel.Verbose:e.info(`MSAL ${t} V2 verbose message: ${r}`);return;case G8.LogLevel.Warning:e.info(`MSAL ${t} V2 warning: ${r}`);return}};
var Ffn=b(()=>{JD();GS();ise();fCe();jHr();iXs();Bxt=hm("IdentityUtils")});
export {FJe,VDr,KDr,lXs,Bfn,kBe,cXs,uXs,serializeAuthenticationRecord,deserializeAuthenticationRecord,Bxt,aXs,Nfn,Ffn};
