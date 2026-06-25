// @ts-nocheck
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {getAnthropicApiKey,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {getOauthConfig,OAUTH_BETA_HEADER,Sc} from "../src/api/0465_getOauthConfig.ts";
import {ho} from "./m572.ts";
import {He,Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {__export,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
import {ap} from "./m573.ts";
async function CBs(){let t=getGlobalConfig().oauthAccount?.accountUuid,n=getAnthropicApiKey();if(!t||!n)return;let r=`${getOauthConfig().BASE_API_URL}/api/claude_cli_profile`;try{let o=await ho.get(r,{headers:{"x-api-key":n,"anthropic-beta":OAUTH_BETA_HEADER},params:{account_uuid:t},timeout:1e4});return He("oauth_profile_fetch"),o.data}catch(o){if(Pt("oauth_profile_fetch","oauth_profile_api_key_failed"),__export(o))logForDebugging(`Failed to fetch oauth profile from API key: ${o}`,{level:"error"});else Ie(o)}}
async function bAe(e){let t=`${getOauthConfig().BASE_API_URL}/api/oauth/profile`;try{let n=await ho.get(t,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},timeout:1e4});return He("oauth_profile_fetch"),n.data}catch(n){if(Pt("oauth_profile_fetch","oauth_profile_token_failed"),__export(n))logForDebugging(`Failed to fetch oauth profile from OAuth token: ${n}`,{level:"error"});else Ie(n)}}
async function qdn(e){let t=`${getOauthConfig().BASE_API_URL}/api/oauth/validate`;try{let n=await ho.post(t,null,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},timeout:1e4});return He("oauth_token_validate"),n.data}catch(n){if(Pt("oauth_token_validate","oauth_validate_failed"),__export(n))logForDebugging(`Failed to validate OAuth token: ${n}`,{level:"error"});else Ie(n)}}
var BNe=b(()=>{ap();Sc();mn();lo();tr();qe();Ct();vn()});
export {CBs,bAe,qdn,BNe};
