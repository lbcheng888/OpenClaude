// @ts-nocheck
import {getOauthConfig,Dc} from "../src/api/0459_getOauthConfig.ts";
import {ra,Ap} from "../src/config/0614_Ap.ts";
import {getAPIProvider,li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {checkAndRefreshOAuthTokenIfNeeded,getClaudeAIOAuthTokens,isOAuthRefreshKnownDead,handleOAuth401Error,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {d$,getOAuthHeaders,Dw} from "../src/api/2190_updateSessionTitle.ts";
import {sS,UO} from "../src/config/2189_level.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {getAuthHeadersAsync,getAuthHeaders,getUserAgent,fk} from "../src/api/2032_withOAuth401Retry.ts";
import {fo} from "./m566.ts";
import {b} from "../runtime.ts";
import {Gp} from "./m567.ts";
import {tk} from "./m577.ts";
function SJu(e){let t=getOauthConfig();switch(e){case"api":return t.BASE_API_URL;case"claude-ai":return t.CLAUDE_AI_ORIGIN;case"mcp-proxy":return t.MCP_PROXY_URL;case"frame":return t.BASE_API_URL;case"ccr-session":{let n=process.argv.indexOf("--sdk-url"),r=n>=0?process.argv[n+1]:void 0;if(!r)throw Error("ccr-session host requires --sdk-url");return r.replace(/\/$/,"")}}}
async function AFe(e,t,n,r={},o=!1){if(!r.bypassEssentialTrafficOnly&&!0&&ra())return{ok:!1,reason:"essential-traffic-only"};if(getAPIProvider()!=="firstParty")return{ok:!1,reason:"data-residency"};let i={},a=t,l=null;if(r.auth==="teleport-org"){if(await checkAndRefreshOAuthTokenIfNeeded(),!getClaudeAIOAuthTokens()?.accessToken)return{ok:!1,reason:"no-auth",detail:"No OAuth token in keychain"};if(isOAuthRefreshKnownDead())return{ok:!1,reason:"no-auth",detail:"OAuth refresh token is no longer valid; run /login to re-authenticate"};let{accessToken:u,orgUUID:d}=await d$();l=u,i={...getOAuthHeaders(u),"x-organization-uuid":d},a=t.replace(":orgUUID",d)}else if(r.auth==="session-jwt"){let u=sS();if(!u)return{ok:!1,reason:"no-auth",detail:"No session access token"};i={Authorization:`Bearer ${u}`}}else if(r.auth!=="none"){if(r.refreshOAuth)try{await checkAndRefreshOAuthTokenIfNeeded()}catch(d){logForDebugging(`firstPartyApi: refreshOAuth failed (${d instanceof Error?d.message:d}); proceeding with cached token`)}let u=r.auth==="async"?await getAuthHeadersAsync():getAuthHeaders();if(u.error&&r.auth!=="optional")return{ok:!1,reason:"no-auth",detail:u.error};i=u.headers}let c;try{c=await fo.request({method:e,baseURL:SJu(r.host??"api"),url:a,data:n,timeout:r.timeout??15000,signal:r.signal,responseType:r.responseType,validateStatus:r.validateStatus,maxContentLength:r.maxContentLength,maxBodyLength:r.maxBodyLength,headers:{"User-Agent":getUserAgent(),...i,...r.headers}})}catch(u){if(l!==null&&!o&&fo.isAxiosError(u)&&u.response?.status===401){let d=await sfi(l);if(d==="retry")return AFe(e,t,n,r,!0);if(d!==null)return d}throw u}if(l!==null&&c.status===401&&!o){let u=await sfi(l);if(u==="retry")return AFe(e,t,n,r,!0);if(u!==null)return u}return{ok:!0,data:c.data,status:c.status,response:c}}
async function sfi(e){if(await handleOAuth401Error(e))return"retry";if(isOAuthRefreshKnownDead())return{ok:!1,reason:"no-auth",detail:"OAuth refresh token is no longer valid; run /login to re-authenticate"};return null}
var si;
var gT=b(()=>{Gp();Dc();Ao();qe();tk();fk();li();Ap();UO();Dw();si={get(e,t){return AFe("GET",e,void 0,t)},post(e,t,n){return AFe("POST",e,t,n)},put(e,t,n){return AFe("PUT",e,t,n)},patch(e,t,n){return AFe("PATCH",e,t,n)},delete(e,t){return AFe("DELETE",e,void 0,t)}}});
export {SJu,AFe,sfi,si,gT};
