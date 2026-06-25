// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {s5s,IAe} from "./m1451.ts";
import {isUltraReviewAvailable,MR} from "../src/config/2033_allowed.ts";
import {or,dn} from "../src/config/0137_namespace.ts";
import {getAPIProvider,isFirstPartyAnthropicBaseUrl,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {getAnthropicApiKeyWithSource,shouldUseWIFAuth,getClaudeAIOAuthTokens,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {CLAUDE_AI_INFERENCE_SCOPE,Sc} from "../src/api/0465_getOauthConfig.ts";
import {ba,pd} from "./m706.ts";
import {kbn,A$r} from "./m2212.ts";
import {Vi,$d} from "../src/config/0620_$d.ts";
import {xfe,S8} from "../src/config/2187_S8.ts";
var dDt={};
ft(dDt,{setSessionCache:()=>setSessionCache,loadCachedResponse:()=>loadCachedResponse,isPolicyLimitsEligible:()=>isPolicyLimitsEligible,isPolicyEnforced:()=>isPolicyEnforced,isPolicyAllowed:()=>isPolicyAllowed,getSessionCache:()=>getSessionCache,getResponseFromCache:()=>getResponseFromCache,getPolicyLimitsIneligibleReason:()=>getPolicyLimitsIneligibleReason,getPolicyDefault:()=>getPolicyDefault,getCachePath:()=>getCachePath});
function setSessionCache(e){let t=aDt?.compliance_taints??[],n=e?.compliance_taints??[];if(aDt=e,s5s(n),t.length!==n.length||n.some((r)=>!t.includes(r)))isUltraReviewAvailable()}
function getSessionCache(){return aDt}
function getCachePath(){return obi.join(or(),Uad)}
function isPolicyLimitsEligible(){return getPolicyLimitsIneligibleReason()===void 0}
function getPolicyLimitsIneligibleReason(e={}){if(getAPIProvider()!=="firstParty")return"third_party_provider";if(!e.skipBaseUrlCheck&&!isFirstPartyAnthropicBaseUrl())return"custom_base_url";try{let{key:n}=getAnthropicApiKeyWithSource({skipRetrievingKeyFromApiKeyHelper:!0});if(n)return}catch{}if(shouldUseWIFAuth())return;let t=getClaudeAIOAuthTokens();if(!t?.accessToken)return"no_auth";if(!t.scopes?.includes(CLAUDE_AI_INFERENCE_SCOPE))return"oauth_no_inference_scope";if(t.subscriptionType==null)return;if(t.subscriptionType!=="enterprise"&&t.subscriptionType!=="team")return"prosumer_oauth";return}
function loadCachedResponse(){try{let e=rbi.readFileSync(getCachePath(),"utf-8"),t=ba(e,!1),n=kbn().safeParse(t);if(!n.success)return null;return n.data}catch{return null}}
function isPolicyAllowed(e){let t=sbi();if(!t){if(qad.has(e)){if(isPolicyLimitsEligible())return!1;if(Wad.has(e)&&Vi()&&!(e==="allow_product_feedback"&&xfe()))return!1}return!0}let n=t[e];if(n)return n.allowed;let r=getResponseFromCache()?.compliance_taints??[];for(let[o,s]of $ad)if(s===e&&r.includes(o))return!1;return!0}
function isPolicyEnforced(e){return sbi()?.[e]?.allowed===!0}
function getPolicyDefault(e){let t=getResponseFromCache()?.defaults[e];return typeof t==="boolean"?t:void 0}
function getResponseFromCache(){if(!isPolicyLimitsEligible())return null;if(aDt)return aDt;let e=loadCachedResponse();if(e)return setSessionCache(e),e;return null}
function sbi(){return getResponseFromCache()?.restrictions??null}
var rbi,obi,Uad="policy-limits.json",aDt=null,$ad,qad,Wad;
var Bu=b(()=>{Sc();lo();MR();dn();pd();Ps();$d();S8();IAe();A$r();rbi=require("fs"),obi=require("path");$ad=[["hipaa","allow_web_fetch"],["hipaa","allow_memory_sync"],["zdr","allow_memory_sync"],["hipaa","allow_settings_sync"],["hipaa","allow_voice_mode"],["hipaa","allow_design_sync"],["hipaa","allow_projects_tool"],["hipaa","allow_remote_sessions"],["hipaa","allow_cobalt_plinth"],["zdr","allow_cobalt_plinth"],["hipaa","allow_team_onboarding"],["hipaa","allow_team_discovery"],["hipaa","allow_error_reporting"],["zdr","allow_error_reporting"],["hipaa","allow_context_tips"]],qad=new Set(["allow_product_feedback","allow_remote_sessions","allow_cobalt_plinth","allow_error_reporting"]),Wad=new Set(["allow_product_feedback"])});
export {dDt,setSessionCache,getSessionCache,getCachePath,isPolicyLimitsEligible,getPolicyLimitsIneligibleReason,loadCachedResponse,isPolicyAllowed,isPolicyEnforced,getPolicyDefault,getResponseFromCache,sbi,rbi,obi,Uad,aDt,$ad,qad,Wad,Bu};
