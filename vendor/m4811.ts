// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {getOauthAccountInfo,getSubscriptionType,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {jHr,EBs,qoe} from "./m1290.ts";
import {Tl,mn} from "../src/telemetry/0600_feature_name.ts";
import {Vs,lT} from "./m2195.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
var qvl={};
ft(qvl,{startProTrial:()=>startProTrial,shouldAutoOpenProTrialExpired:()=>shouldAutoOpenProTrialExpired,getProTrialState:()=>getProTrialState,getProTrialDurationDays:()=>getProTrialDurationDays,formatTrialBadge:()=>formatTrialBadge,PRO_TRIAL_FALLBACK_DAYS:()=>PRO_TRIAL_FALLBACK_DAYS});
function getProTrialDurationDays(){return getOauthAccountInfo()?.claudeCodeTrialDurationDays??null}
function getProTrialState(){let e=jHr();if(e)return qzn(!0,e.endsAt);let t=getOauthAccountInfo();if(!t||getSubscriptionType()!=="pro")return iHo;let n=t.ccOnboardingFlags?.e10===!0;return qzn(n,t.claudeCodeTrialEndsAt??null)}
async function startProTrial(){return Tl("api_pro_trial_start",async()=>{if(jHr()){let n=new Date(Date.now()+PRO_TRIAL_FALLBACK_DAYS*24*60*60*1000).toISOString();return EBs({endsAt:n}),qzn(!0,n)}let t=await Vs.post("/api/oauth/organizations/:orgUUID/claude_code/pro_trial",{},{auth:"teleport-org"});if(!t.ok)throw Error(t.reason==="no-auth"?t.detail:`Pro trial start unavailable: ${t.reason}`);return logForDebugging("Pro trial started",{level:"debug"}),zcm(t.data.ends_at),qzn(!0,t.data.ends_at)})}
function shouldAutoOpenProTrialExpired(){if(getProTrialState().status!=="expired")return!1;return getGlobalConfig().cachedExtraUsageDisabledReason!==null}
function formatTrialBadge(e){switch(e.status){case"active":{let t=e.daysRemaining??0;return`Trial: ${t} ${t===1?"day":"days"} left`}case"expired":return"Usage credits";case"ineligible":case"not_started":return null}}
function qzn(e,t){if(!e)return iHo;if(!t)return{status:"not_started",daysRemaining:null};let n=new Date(t);if(Number.isNaN(n.getTime()))return Ie(Error(`Invalid claude_code_trial_ends_at: ${t}`)),iHo;let r=n.getTime()-Date.now();if(r<=0)return{status:"expired",daysRemaining:0};return{status:"active",daysRemaining:Math.ceil(r/86400000)}}
function zcm(e){saveGlobalConfig((t)=>{if(!t.oauthAccount||t.oauthAccount.claudeCodeTrialEndsAt===e)return t;return{...t,oauthAccount:{...t.oauthAccount,claudeCodeTrialEndsAt:e}}})}
var PRO_TRIAL_FALLBACK_DAYS=14,iHo;
var Zht=b(()=>{lo();tr();qe();vn();mn();lT();qoe();iHo={status:"ineligible",daysRemaining:null}});
export {qvl,getProTrialDurationDays,getProTrialState,startProTrial,shouldAutoOpenProTrialExpired,formatTrialBadge,qzn,zcm,PRO_TRIAL_FALLBACK_DAYS,iHo,Zht};
