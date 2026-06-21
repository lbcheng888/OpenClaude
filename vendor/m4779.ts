// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {getOauthAccountInfo,getSubscriptionType,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {yvr,xOs,_me} from "./m1285.ts";
import {Ul,ln} from "../src/telemetry/0594_feature_name.ts";
import {si,gT} from "./m2190.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {De,Rn} from "../src/session/0615_length.ts";
var W_l={};
isFullscreenWithTTY(W_l,{startProTrial:()=>startProTrial,shouldAutoOpenProTrialExpired:()=>shouldAutoOpenProTrialExpired,getProTrialState:()=>getProTrialState,getProTrialDurationDays:()=>getProTrialDurationDays,formatTrialBadge:()=>formatTrialBadge,PRO_TRIAL_FALLBACK_DAYS:()=>PRO_TRIAL_FALLBACK_DAYS});
function getProTrialDurationDays(){return getOauthAccountInfo()?.claudeCodeTrialDurationDays??null}
function getProTrialState(){let e=yvr();if(e)return nGn(!0,e.endsAt);let t=getOauthAccountInfo();if(!t||getSubscriptionType()!=="pro")return qEo;let n=t.ccOnboardingFlags?.e10===!0;return nGn(n,t.claudeCodeTrialEndsAt??null)}
async function startProTrial(){return Ul("api_pro_trial_start",async()=>{if(yvr()){let n=new Date(Date.now()+PRO_TRIAL_FALLBACK_DAYS*24*60*60*1000).toISOString();return xOs({endsAt:n}),nGn(!0,n)}let t=await si.post("/api/oauth/organizations/:orgUUID/claude_code/pro_trial",{},{auth:"teleport-org"});if(!t.ok)throw Error(t.reason==="no-auth"?t.detail:`Pro trial start unavailable: ${t.reason}`);return logForDebugging("Pro trial started",{level:"debug"}),Oem(t.data.ends_at),nGn(!0,t.data.ends_at)})}
function shouldAutoOpenProTrialExpired(){if(getProTrialState().status!=="expired")return!1;return getGlobalConfig().cachedExtraUsageDisabledReason!==null}
function formatTrialBadge(e){switch(e.status){case"active":{let t=e.daysRemaining??0;return`Trial: ${t} ${t===1?"day":"days"} left`}case"expired":return"Usage credits";case"ineligible":case"not_started":return null}}
function nGn(e,t){if(!e)return qEo;if(!t)return{status:"not_started",daysRemaining:null};let n=new Date(t);if(Number.isNaN(n.getTime()))return De(Error(`Invalid claude_code_trial_ends_at: ${t}`)),qEo;let r=n.getTime()-Date.now();if(r<=0)return{status:"expired",daysRemaining:0};return{status:"active",daysRemaining:Math.ceil(r/86400000)}}
function Oem(e){saveGlobalConfig((t)=>{if(!t.oauthAccount||t.oauthAccount.claudeCodeTrialEndsAt===e)return t;return{...t,oauthAccount:{...t.oauthAccount,claudeCodeTrialEndsAt:e}}})}
var PRO_TRIAL_FALLBACK_DAYS=14,qEo;
var $mt=b(()=>{Ao();Qn();qe();Rn();ln();gT();_me();qEo={status:"ineligible",daysRemaining:null}});
export {W_l,getProTrialDurationDays,getProTrialState,startProTrial,shouldAutoOpenProTrialExpired,formatTrialBadge,nGn,Oem,PRO_TRIAL_FALLBACK_DAYS,qEo,$mt};
