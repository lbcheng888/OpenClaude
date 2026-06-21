// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {CLIENT_ID,BROKER_CLIENT_ID,REDIRECT_URI,RESPONSE_TYPE,RESPONSE_MODE,NATIVE_BROKER,SCOPE,POST_LOGOUT_URI,ID_TOKEN_HINT,DOMAIN_HINT,LOGIN_HINT,SID,CLAIMS,CLIENT_REQUEST_ID,X_CLIENT_SKU,X_CLIENT_VER,X_CLIENT_OS,X_CLIENT_CPU,X_APP_NAME,X_APP_VER,PROMPT,STATE,NONCE,CODE_CHALLENGE,CODE_CHALLENGE_METHOD,CODE,DEVICE_CODE,REFRESH_TOKEN,CODE_VERIFIER,CLIENT_SECRET,CLIENT_ASSERTION,CLIENT_ASSERTION_TYPE,OBO_ASSERTION,REQUESTED_TOKEN_USE,GRANT_TYPE,INSTANCE_AWARE,TOKEN_TYPE,REQ_CNF,X_CLIENT_CURR_TELEM,X_CLIENT_LAST_TELEM,X_MS_LIB_CAPABILITY,LOGOUT_HINT,BROKER_REDIRECT_URI,EAR_JWK,EAR_JWE_CRYPTO,bJe} from "./m1747.ts";
import {ResponseMode,KB,iC,HVs,RNe,lRt,eh,fse,aC} from "./m1717.ts";
import {Ak,MRt} from "./m1729.ts";
import {KS,wCe} from "./m1727.ts";
import {invalidClaims,pkceParamsMissing,Wme} from "./m1726.ts";
var Ja={};
isFullscreenWithTTY(Ja,{instrumentBrokerParams:()=>instrumentBrokerParams,addUsername:()=>addUsername,addThrottling:()=>addThrottling,addState:()=>addState,addSshJwk:()=>addSshJwk,addSid:()=>addSid,addServerTelemetry:()=>addServerTelemetry,addScopes:()=>addScopes,addResponseType:()=>addResponseType,addResponseMode:()=>addResponseMode,addRequestTokenUse:()=>addRequestTokenUse,addRefreshToken:()=>addRefreshToken,addRedirectUri:()=>addRedirectUri,addPrompt:()=>addPrompt,addPostLogoutRedirectUri:()=>addPostLogoutRedirectUri,addPostBodyParameters:()=>addPostBodyParameters,addPopToken:()=>addPopToken,addPassword:()=>addPassword,addOboAssertion:()=>addOboAssertion,addNonce:()=>addNonce,addNativeBroker:()=>addNativeBroker,addLogoutHint:()=>addLogoutHint,addLoginHint:()=>addLoginHint,addLibraryInfo:()=>addLibraryInfo,addInstanceAware:()=>addInstanceAware,addIdTokenHint:()=>addIdTokenHint,addGrantType:()=>addGrantType,addExtraQueryParameters:()=>addExtraQueryParameters,addEARParameters:()=>addEARParameters,addDomainHint:()=>addDomainHint,addDeviceCode:()=>addDeviceCode,addCorrelationId:()=>addCorrelationId,addCodeVerifier:()=>addCodeVerifier,addCodeChallengeParams:()=>addCodeChallengeParams,addClientSecret:()=>addClientSecret,addClientInfo:()=>addClientInfo,addClientId:()=>addClientId,addClientCapabilitiesToClaims:()=>addClientCapabilitiesToClaims,addClientAssertionType:()=>addClientAssertionType,addClientAssertion:()=>addClientAssertion,addClaims:()=>addClaims,addCcsUpn:()=>addCcsUpn,addCcsOid:()=>addCcsOid,addBrokerParameters:()=>addBrokerParameters,addAuthorizationCode:()=>addAuthorizationCode,addApplicationTelemetry:()=>addApplicationTelemetry});
function instrumentBrokerParams(e,t,n){if(!t)return;let r=e.get(CLIENT_ID);if(r&&e.has(BROKER_CLIENT_ID))n?.addFields({embeddedClientId:r,embeddedRedirectUri:e.get(REDIRECT_URI)},t)}
function addResponseType(e,t){e.set(RESPONSE_TYPE,t)}
function addResponseMode(e,t){e.set(RESPONSE_MODE,t?t:ResponseMode.QUERY)}
function addNativeBroker(e){e.set(NATIVE_BROKER,"1")}
function addScopes(e,t,n=!0,r=KB){if(n&&!r.includes("openid")&&!t.includes("openid"))r.push("openid");let o=n?[...t||[],...r]:t||[],s=new Ak(o);e.set(SCOPE,s.printScopes())}
function addClientId(e,t){e.set(CLIENT_ID,t)}
function addRedirectUri(e,t){e.set(REDIRECT_URI,t)}
function addPostLogoutRedirectUri(e,t){e.set(POST_LOGOUT_URI,t)}
function addIdTokenHint(e,t){e.set(ID_TOKEN_HINT,t)}
function addDomainHint(e,t){e.set(DOMAIN_HINT,t)}
function addLoginHint(e,t){e.set(LOGIN_HINT,t)}
function addCcsUpn(e,t){e.set(iC.CCS_HEADER,`UPN:${t}`)}
function addCcsOid(e,t){e.set(iC.CCS_HEADER,`Oid:${t.uid}@${t.utid}`)}
function addSid(e,t){e.set(SID,t)}
function addClaims(e,t,n){let r=addClientCapabilitiesToClaims(t,n);try{JSON.parse(r)}catch(o){throw KS(invalidClaims)}e.set(CLAIMS,r)}
function addCorrelationId(e,t){e.set(CLIENT_REQUEST_ID,t)}
function addLibraryInfo(e,t){if(e.set(X_CLIENT_SKU,t.sku),e.set(X_CLIENT_VER,t.version),t.os)e.set(X_CLIENT_OS,t.os);if(t.cpu)e.set(X_CLIENT_CPU,t.cpu)}
function addApplicationTelemetry(e,t){if(t?.appName)e.set(X_APP_NAME,t.appName);if(t?.appVersion)e.set(X_APP_VER,t.appVersion)}
function addPrompt(e,t){e.set(PROMPT,t)}
function addState(e,t){if(t)e.set(STATE,t)}
function addNonce(e,t){e.set(NONCE,t)}
function addCodeChallengeParams(e,t,n){if(t&&n)e.set(CODE_CHALLENGE,t),e.set(CODE_CHALLENGE_METHOD,n);else throw KS(pkceParamsMissing)}
function addAuthorizationCode(e,t){e.set(CODE,t)}
function addDeviceCode(e,t){e.set(DEVICE_CODE,t)}
function addRefreshToken(e,t){e.set(REFRESH_TOKEN,t)}
function addCodeVerifier(e,t){e.set(CODE_VERIFIER,t)}
function addClientSecret(e,t){e.set(CLIENT_SECRET,t)}
function addClientAssertion(e,t){if(t)e.set(CLIENT_ASSERTION,t)}
function addClientAssertionType(e,t){if(t)e.set(CLIENT_ASSERTION_TYPE,t)}
function addOboAssertion(e,t){e.set(OBO_ASSERTION,t)}
function addRequestTokenUse(e,t){e.set(REQUESTED_TOKEN_USE,t)}
function addGrantType(e,t){e.set(GRANT_TYPE,t)}
function addClientInfo(e){e.set(HVs,"1")}
function addInstanceAware(e){if(!e.has(INSTANCE_AWARE))e.set(INSTANCE_AWARE,"true")}
function addExtraQueryParameters(e,t){Object.entries(t).forEach(([n,r])=>{if(!e.has(n)&&r)e.set(n,r)})}
function addClientCapabilitiesToClaims(e,t){let n;if(!e)n={};else try{n=JSON.parse(e)}catch(r){throw KS(invalidClaims)}if(t&&t.length>0){if(!n.hasOwnProperty(RNe.ACCESS_TOKEN))n[RNe.ACCESS_TOKEN]={};n[RNe.ACCESS_TOKEN][RNe.XMS_CC]={values:t}}return JSON.stringify(n)}
function addUsername(e,t){e.set(lRt.username,t)}
function addPassword(e,t){e.set(lRt.password,t)}
function addPopToken(e,t){if(t)e.set(TOKEN_TYPE,eh.POP),e.set(REQ_CNF,t)}
function addSshJwk(e,t){if(t)e.set(TOKEN_TYPE,eh.SSH),e.set(REQ_CNF,t)}
function addServerTelemetry(e,t){e.set(X_CLIENT_CURR_TELEM,t.generateCurrentRequestHeaderValue()),e.set(X_CLIENT_LAST_TELEM,t.generateLastRequestHeaderValue())}
function addThrottling(e){e.set(X_MS_LIB_CAPABILITY,fse.X_MS_LIB_CAPABILITY_VALUE)}
function addLogoutHint(e,t){e.set(LOGOUT_HINT,t)}
function addBrokerParameters(e,t,n){if(!e.has(BROKER_CLIENT_ID))e.set(BROKER_CLIENT_ID,t);if(!e.has(BROKER_REDIRECT_URI))e.set(BROKER_REDIRECT_URI,n)}
function addEARParameters(e,t){e.set(EAR_JWK,encodeURIComponent(t));let n="eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0";e.set(EAR_JWE_CRYPTO,n)}
function addPostBodyParameters(e,t){Object.entries(t).forEach(([n,r])=>{if(r)e.set(n,r)})}
var CJe=b(()=>{aC();bJe();MRt();wCe();Wme();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {Ja,instrumentBrokerParams,addResponseType,addResponseMode,addNativeBroker,addScopes,addClientId,addRedirectUri,addPostLogoutRedirectUri,addIdTokenHint,addDomainHint,addLoginHint,addCcsUpn,addCcsOid,addSid,addClaims,addCorrelationId,addLibraryInfo,addApplicationTelemetry,addPrompt,addState,addNonce,addCodeChallengeParams,addAuthorizationCode,addDeviceCode,addRefreshToken,addCodeVerifier,addClientSecret,addClientAssertion,addClientAssertionType,addOboAssertion,addRequestTokenUse,addGrantType,addClientInfo,addInstanceAware,addExtraQueryParameters,addClientCapabilitiesToClaims,addUsername,addPassword,addPopToken,addSshJwk,addServerTelemetry,addThrottling,addLogoutHint,addBrokerParameters,addEARParameters,addPostBodyParameters,CJe};
