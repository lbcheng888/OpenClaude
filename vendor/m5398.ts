// @ts-nocheck
import {isAnthropicAuthEnabled,isClaudeAISubscriber,getAnthropicApiKeyWithSource,getApiKeyFromApiKeyHelper,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {Ie,Oe,isTmuxControlMode,ln} from "../src/telemetry/0594_feature_name.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0131_sent.ts";
import {NNl,rb} from "../src/permissions/5178_level.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function L5l(){let[e,t]=lXn.useState(()=>{if(!isAnthropicAuthEnabled()||isClaudeAISubscriber())return"valid";let{key:r,source:o}=getAnthropicApiKeyWithSource({skipRetrievingKeyFromApiKeyHelper:!0});if(r||o==="apiKeyHelper")return"loading";return"missing"}),n=lXn.useCallback(async()=>{if(!isAnthropicAuthEnabled()||isClaudeAISubscriber()){t("valid"),Ie("auth_api_key_verify");return}await getApiKeyFromApiKeyHelper(getIsNonInteractiveSession());let{key:r,source:o}=getAnthropicApiKeyWithSource();if(!r){if(o==="apiKeyHelper"){t("error"),Oe("auth_api_key_verify","apikeyhelper_failed");return}t("missing"),isTmuxControlMode("auth_api_key_verify","missing");return}try{let s=await NNl(r,!1);if(t(s?"valid":"invalid"),s)Ie("auth_api_key_verify");else Oe("auth_api_key_verify","invalid");return}catch{t("error"),Oe("auth_api_key_verify","network_error");return}},[]);return{status:e,reverify:n}}
var lXn;
var M5l=b(()=>{lt();ln();rb();Ao();lXn=M(Te(),1)});
export {L5l,lXn,M5l};
