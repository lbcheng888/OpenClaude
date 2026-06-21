// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {u$s,KEe} from "./m1446.ts";
import {pfe,jR} from "../src/config/2028_allowed.ts";
import {tr,sn} from "../src/config/0047_namespace.ts";
import {getAPIProvider,isFirstPartyAnthropicBaseUrl,li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {getAnthropicApiKeyWithSource,shouldUseWIFAuth,getClaudeAIOAuthTokens,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {CLAUDE_AI_INFERENCE_SCOPE,Dc} from "../src/api/0459_getOauthConfig.ts";
import {Fa,Pd} from "./m701.ts";
import {V_n,YNr} from "./m2204.ts";
import {ra,Ap} from "../src/config/0614_Ap.ts";
import {Sfe,s5} from "../src/config/2182_s5.ts";
var NHt={};
isFullscreenWithTTY(NHt,{setSessionCache:()=>setSessionCache,loadCachedResponse:()=>loadCachedResponse,isPolicyLimitsEligible:()=>isPolicyLimitsEligible,isPolicyEnforced:()=>isPolicyEnforced,isPolicyAllowed:()=>isPolicyAllowed,getSessionCache:()=>getSessionCache,getResponseFromCache:()=>wK,getPolicyDefault:()=>getPolicyDefault,getCachePath:()=>getCachePath});
function setSessionCache(e){let t=OHt?.compliance_taints??[],n=e?.compliance_taints??[];if(OHt=e,u$s(n),t.length!==n.length||n.some((r)=>!t.includes(r)))pfe()}
function getSessionCache(){return OHt}
function getCachePath(){return rAi.join(tr(),gXu)}
function isPolicyLimitsEligible(){if(getAPIProvider()!=="firstParty")return!1;if(!isFirstPartyAnthropicBaseUrl())return!1;try{let{key:t}=getAnthropicApiKeyWithSource({skipRetrievingKeyFromApiKeyHelper:!0});if(t)return!0}catch{}if(shouldUseWIFAuth())return!0;let e=getClaudeAIOAuthTokens();if(!e?.accessToken)return!1;if(!e.scopes?.includes(CLAUDE_AI_INFERENCE_SCOPE))return!1;if(e.subscriptionType===null)return!0;if(e.subscriptionType!=="enterprise"&&e.subscriptionType!=="team")return!1;return!0}
function loadCachedResponse(){try{let e=nAi.readFileSync(getCachePath(),"utf-8"),t=Fa(e,!1),n=V_n().safeParse(t);if(!n.success)return null;return n.data}catch{return null}}
function isPolicyAllowed(e){let t=oAi();if(!t){if(yXu.has(e)){if(isPolicyLimitsEligible())return!1;if(TXu.has(e)&&ra()&&!(e==="allow_product_feedback"&&Sfe()))return!1}return!0}let n=t[e];if(n)return n.allowed;let r=wK()?.compliance_taints??[];for(let[o,s]of _Xu)if(s===e&&r.includes(o))return!1;return!0}
function isPolicyEnforced(e){return oAi()?.[e]?.allowed===!0}
function getPolicyDefault(e){let t=wK()?.defaults[e];return typeof t==="boolean"?t:void 0}
function wK(){if(!isPolicyLimitsEligible())return null;if(OHt)return OHt;let e=loadCachedResponse();if(e)return setSessionCache(e),e;return null}
function oAi(){return wK()?.restrictions??null}
var nAi,rAi,gXu="policy-limits.json",OHt=null,_Xu,yXu,TXu;
var rd=b(()=>{Dc();Ao();jR();sn();Pd();li();Ap();s5();KEe();YNr();nAi=require("fs"),rAi=require("path");_Xu=[["hipaa","allow_web_fetch"],["hipaa","allow_memory_sync"],["zdr","allow_memory_sync"],["hipaa","allow_settings_sync"],["hipaa","allow_voice_mode"],["hipaa","allow_design_sync"],["hipaa","allow_projects_tool"],["hipaa","allow_remote_sessions"],["hipaa","allow_cobalt_plinth"],["zdr","allow_cobalt_plinth"],["hipaa","allow_team_onboarding"],["hipaa","allow_team_discovery"],["hipaa","allow_error_reporting"],["zdr","allow_error_reporting"]],yXu=new Set(["allow_product_feedback","allow_remote_sessions","allow_cobalt_plinth","allow_error_reporting"]),TXu=new Set(["allow_product_feedback"])});
export {NHt,setSessionCache,getSessionCache,getCachePath,isPolicyLimitsEligible,loadCachedResponse,isPolicyAllowed,isPolicyEnforced,getPolicyDefault,wK,oAi,nAi,rAi,gXu,OHt,_Xu,yXu,TXu,rd};
