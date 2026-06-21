// @ts-nocheck
import {si,gT} from "./m2190.ts";
import {Ul,Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {getSubscriptionType,getOauthAccountInfo,isClaudeAISubscriber,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {H_,Zge} from "./m3951.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {ra,Ap} from "../src/config/0614_Ap.ts";
import {b} from "../runtime.ts";
async function atm(e="claude_code_guest_pass"){let t=await si.get(`/api/oauth/organizations/:orgUUID/referral/eligibility?campaign=${encodeURIComponent(e)}`,{auth:"teleport-org",timeout:5000});if(!t.ok)throw Error(t.reason==="no-auth"?t.detail:`Referral eligibility unavailable: ${t.reason}`);return t.data}
async function Lyl(e="claude_code_guest_pass"){return Ul("api_referral_redemptions_fetch",async()=>{let t=await si.get(`/api/oauth/organizations/:orgUUID/referral/redemptions?campaign=${encodeURIComponent(e)}`,{auth:"teleport-org",timeout:1e4});if(!t.ok)throw Error(t.reason==="no-auth"?t.detail:`Referral redemptions unavailable: ${t.reason}`);return t.data})}
function Myl(){let e=getSubscriptionType();return!!(getOauthAccountInfo()?.organizationUuid&&isClaudeAISubscriber()&&(e==="max"||e==="pro"))}
function jmt(){if(!Myl())return{eligible:!1,needsRefresh:!1,hasCache:!1};let e=getOauthAccountInfo()?.organizationUuid;if(!e)return{eligible:!1,needsRefresh:!1,hasCache:!1};let n=getGlobalConfig().passesEligibilityCache?.[e];if(!n)return{eligible:!1,needsRefresh:!0,hasCache:!1};let{eligible:r,timestamp:o}=n,i=Date.now()-o>Oyl;return{eligible:r,needsRefresh:i,hasCache:!0}}
function Wmt(e){return H_(e.amount_minor_units,e.currency,"fit")}
function Gmt(){let e=getOauthAccountInfo()?.organizationUuid;if(!e)return null;return getGlobalConfig().passesEligibilityCache?.[e]?.referrer_reward??null}
function mGn(){let e=getOauthAccountInfo()?.organizationUuid;if(!e)return null;return getGlobalConfig().passesEligibilityCache?.[e]?.remaining_passes??null}
async function Pyl(){if(Gjt)return logForDebugging("Passes: Reusing in-flight eligibility fetch"),Gjt;let e=getOauthAccountInfo()?.organizationUuid;if(!e)return null;return Gjt=(async()=>{try{let t=await atm(),n={...t,timestamp:Date.now()};return saveGlobalConfig((r)=>({...r,passesEligibilityCache:{...r.passesEligibilityCache,[e]:n}})),logForDebugging(`Passes eligibility cached for org ${e}: ${t.eligible}`),Ie("api_referral_eligibility_fetch"),t}catch(t){return logForDebugging(`Failed to fetch and cache passes eligibility: ${t instanceof Error?t.message:String(t)}`,{level:"error"}),Oe("api_referral_eligibility_fetch","request_failed"),null}finally{Gjt=null}})(),Gjt}
async function tCo(){if(!Myl())return null;let e=getOauthAccountInfo()?.organizationUuid;if(!e)return null;let n=getGlobalConfig().passesEligibilityCache?.[e],r=Date.now();if(!n)return logForDebugging("Passes: No cache, fetching eligibility in background (command unavailable this session)"),Pyl(),null;if(r-n.timestamp>Oyl){logForDebugging("Passes: Cache stale, returning cached data and refreshing in background"),Pyl();let{timestamp:i,...a}=n;return a}logForDebugging("Passes: Using fresh cached eligibility data");let{timestamp:o,...s}=n;return s}
async function Nyl(){if(ra())return;tCo()}
var Oyl=86400000,Gjt=null;
var Jje=b(()=>{Ao();Qn();Zge();qe();Ap();ln();gT()});
export {atm,Lyl,Myl,jmt,Wmt,Gmt,mGn,Pyl,tCo,Nyl,Oyl,Gjt,Jje};
