// @ts-nocheck
import {getOauthConfig,Sc} from "../src/api/0465_getOauthConfig.ts";
import {Vi,$d} from "../src/config/0620_$d.ts";
import {getAPIProvider,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {checkAndRefreshOAuthTokenIfNeeded,getClaudeAIOAuthTokens,isOAuthRefreshKnownDead,handleOAuth401Error,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {prepareApiRequest,getOAuthHeaders,NR} from "../src/api/2195_updateSessionTitle.ts";
import {ZT,sO} from "../src/config/2194_level.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {getAuthHeadersAsync,getAuthHeaders,getUserAgent,kk} from "../src/api/2037_withOAuth401Retry.ts";
import {ho} from "./m572.ts";
import {b} from "../runtime.ts";
import {ap} from "./m573.ts";
import {AR} from "./m583.ts";
function $id(e){let t=getOauthConfig();switch(e){case"api":return t.BASE_API_URL;case"claude-ai":return t.CLAUDE_AI_ORIGIN;case"mcp-proxy":return t.MCP_PROXY_URL;case"frame":return t.BASE_API_URL;case"ccr-session":{let n=process.argv.indexOf("--sdk-url"),r=n>=0?process.argv[n+1]:void 0;if(!r)throw Error("ccr-session host requires --sdk-url");return r.replace(/\/$/,"")}}}
async function pUe(e,t,n,r={},o=!1){if(!r.bypassEssentialTrafficOnly&&!0&&Vi())return{ok:!1,reason:"essential-traffic-only"};if(getAPIProvider()!=="firstParty")return{ok:!1,reason:"data-residency"};let i={},a=t,l=null;if(r.auth==="teleport-org"){if(await checkAndRefreshOAuthTokenIfNeeded(),!getClaudeAIOAuthTokens()?.accessToken)return{ok:!1,reason:"no-auth",detail:"No OAuth token in keychain"};if(isOAuthRefreshKnownDead())return{ok:!1,reason:"no-auth",detail:"OAuth refresh token is no longer valid; run /login to re-authenticate"};let{accessToken:u,orgUUID:d}=await prepareApiRequest();l=u,i={...getOAuthHeaders(u),"x-organization-uuid":d},a=t.replace(":orgUUID",d)}else if(r.auth==="session-jwt"){let u=ZT();if(!u)return{ok:!1,reason:"no-auth",detail:"No session access token"};i={Authorization:`Bearer ${u}`}}else if(r.auth!=="none"){if(r.refreshOAuth)try{await checkAndRefreshOAuthTokenIfNeeded()}catch(d){logForDebugging(`firstPartyApi: refreshOAuth failed (${d instanceof Error?d.message:d}); proceeding with cached token`)}let u=r.auth==="async"?await getAuthHeadersAsync():getAuthHeaders();if(u.error&&r.auth!=="optional")return{ok:!1,reason:"no-auth",detail:u.error};i=u.headers}let c;try{c=await ho.request({method:e,baseURL:$id(r.host??"api"),url:a,data:n,timeout:r.timeout??15000,signal:r.signal,responseType:r.responseType,validateStatus:r.validateStatus,maxContentLength:r.maxContentLength,maxBodyLength:r.maxBodyLength,headers:{"User-Agent":getUserAgent(),...i,...r.headers}})}catch(u){if(l!==null&&!o&&ho.isAxiosError(u)&&u.response?.status===401){let d=await eSi(l);if(d==="retry")return pUe(e,t,n,r,!0);if(d!==null)return d}throw u}if(l!==null&&c.status===401&&!o){let u=await eSi(l);if(u==="retry")return pUe(e,t,n,r,!0);if(u!==null)return u}return{ok:!0,data:c.data,status:c.status,response:c}}
async function eSi(e){if(await handleOAuth401Error(e))return"retry";if(isOAuthRefreshKnownDead())return{ok:!1,reason:"no-auth",detail:"OAuth refresh token is no longer valid; run /login to re-authenticate"};return null}
var Vs;
var lT=b(()=>{ap();Sc();lo();qe();AR();kk();Ps();$d();sO();NR();Vs={get(e,t){return pUe("GET",e,void 0,t)},post(e,t,n){return pUe("POST",e,t,n)},put(e,t,n){return pUe("PUT",e,t,n)},patch(e,t,n){return pUe("PATCH",e,t,n)},delete(e,t){return pUe("DELETE",e,void 0,t)}}});
export {$id,pUe,eSi,Vs,lT};
