// @ts-nocheck
import {isAnthropicAuthEnabled,isClaudeAISubscriber,getAnthropicApiKeyWithSource,getApiKeyFromApiKeyHelper,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {He,xe,Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0132_sent.ts";
import {vql,rb} from "../src/permissions/5211_level.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function TXl(){let[e,t]=ctr.useState(()=>{if(!isAnthropicAuthEnabled()||isClaudeAISubscriber())return"valid";let{key:r,source:o}=getAnthropicApiKeyWithSource({skipRetrievingKeyFromApiKeyHelper:!0});if(r||o==="apiKeyHelper")return"loading";return"missing"}),n=ctr.useCallback(async()=>{if(!isAnthropicAuthEnabled()||isClaudeAISubscriber()){t("valid"),He("auth_api_key_verify");return}await getApiKeyFromApiKeyHelper(getIsNonInteractiveSession());let{key:r,source:o}=getAnthropicApiKeyWithSource();if(!r){if(o==="apiKeyHelper"){t("error"),xe("auth_api_key_verify","apikeyhelper_failed");return}t("missing"),Pt("auth_api_key_verify","missing");return}try{let s=await vql(r,!1);if(t(s?"valid":"invalid"),s)He("auth_api_key_verify");else xe("auth_api_key_verify","invalid");return}catch{t("error"),xe("auth_api_key_verify","network_error");return}},[]);return{status:e,reverify:n}}
var ctr;
var SXl=b(()=>{lt();mn();rb();lo();ctr=x(et(),1)});
export {TXl,ctr,SXl};
