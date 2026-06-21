// @ts-nocheck
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {getAnthropicApiKey,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {getOauthConfig,OAUTH_BETA_HEADER,Dc} from "../src/api/0459_getOauthConfig.ts";
import {fo} from "./m566.ts";
import {Ie,isTmuxControlMode,ln} from "../src/telemetry/0594_feature_name.ts";
import {K_,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b} from "../runtime.ts";
import {Gp} from "./m567.ts";
async function kOs(){let t=getGlobalConfig().oauthAccount?.accountUuid,n=getAnthropicApiKey();if(!t||!n)return;let r=`${getOauthConfig().BASE_API_URL}/api/claude_cli_profile`;try{let o=await fo.get(r,{headers:{"x-api-key":n,"anthropic-beta":OAUTH_BETA_HEADER},params:{account_uuid:t},timeout:1e4});return Ie("oauth_profile_fetch"),o.data}catch(o){if(isTmuxControlMode("oauth_profile_fetch","oauth_profile_api_key_failed"),K_(o))logForDebugging(`Failed to fetch oauth profile from API key: ${o}`,{level:"error"});else De(o)}}
async function BEe(e){let t=`${getOauthConfig().BASE_API_URL}/api/oauth/profile`;try{let n=await fo.get(t,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},timeout:1e4});return Ie("oauth_profile_fetch"),n.data}catch(n){if(isTmuxControlMode("oauth_profile_fetch","oauth_profile_token_failed"),K_(n))logForDebugging(`Failed to fetch oauth profile from OAuth token: ${n}`,{level:"error"});else De(n)}}
async function ocn(e){let t=`${getOauthConfig().BASE_API_URL}/api/oauth/validate`;try{let n=await fo.post(t,null,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},timeout:1e4});return Ie("oauth_token_validate"),n.data}catch(n){if(isTmuxControlMode("oauth_token_validate","oauth_validate_failed"),K_(n))logForDebugging(`Failed to validate OAuth token: ${n}`,{level:"error"});else De(n)}}
var G1e=b(()=>{Gp();Dc();ln();Ao();Qn();qe();bt();Rn()});
export {kOs,BEe,ocn,G1e};
