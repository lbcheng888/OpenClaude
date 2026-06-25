// @ts-nocheck
import {Vs,lT} from "./m2195.ts";
import {Tl,He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {getSubscriptionType,getOauthAccountInfo,isClaudeAISubscriber,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {initY_,bye} from "./m4018.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Vi,$d} from "../src/config/0620_$d.ts";
import {b} from "../runtime.ts";
async function Sum(e="claude_code_guest_pass"){let t=await Vs.get(`/api/oauth/organizations/:orgUUID/referral/eligibility?campaign=${encodeURIComponent(e)}`,{auth:"teleport-org",timeout:5000});if(!t.ok)throw Error(t.reason==="no-auth"?t.detail:`Referral eligibility unavailable: ${t.reason}`);return t.data}
async function Lwl(e="claude_code_guest_pass"){return Tl("api_referral_redemptions_fetch",async()=>{let t=await Vs.get(`/api/oauth/organizations/:orgUUID/referral/redemptions?campaign=${encodeURIComponent(e)}`,{auth:"teleport-org",timeout:1e4});if(!t.ok)throw Error(t.reason==="no-auth"?t.detail:`Referral redemptions unavailable: ${t.reason}`);return t.data})}
function Mwl(){let e=getSubscriptionType();return!!(getOauthAccountInfo()?.organizationUuid&&isClaudeAISubscriber()&&(e==="max"||e==="pro"))}
function tgt(){if(!Mwl())return{eligible:!1,needsRefresh:!1,hasCache:!1};let e=getOauthAccountInfo()?.organizationUuid;if(!e)return{eligible:!1,needsRefresh:!1,hasCache:!1};let n=getGlobalConfig().passesEligibilityCache?.[e];if(!n)return{eligible:!1,needsRefresh:!0,hasCache:!1};let{eligible:r,timestamp:o}=n,i=Date.now()-o>Owl;return{eligible:r,needsRefresh:i,hasCache:!0}}
function ngt(e){return initY_(e.amount_minor_units,e.currency,"fit")}
function rgt(){let e=getOauthAccountInfo()?.organizationUuid;if(!e)return null;return getGlobalConfig().passesEligibilityCache?.[e]?.referrer_reward??null}
function ejn(){let e=getOauthAccountInfo()?.organizationUuid;if(!e)return null;return getGlobalConfig().passesEligibilityCache?.[e]?.remaining_passes??null}
async function Pwl(){if(lGt)return logForDebugging("Passes: Reusing in-flight eligibility fetch"),lGt;let e=getOauthAccountInfo()?.organizationUuid;if(!e)return null;return lGt=(async()=>{try{let t=await Sum(),n={...t,timestamp:Date.now()};return saveGlobalConfig((r)=>({...r,passesEligibilityCache:{...r.passesEligibilityCache,[e]:n}})),logForDebugging(`Passes eligibility cached for org ${e}: ${t.eligible}`),He("api_referral_eligibility_fetch"),t}catch(t){return logForDebugging(`Failed to fetch and cache passes eligibility: ${t instanceof Error?t.message:String(t)}`,{level:"error"}),xe("api_referral_eligibility_fetch","request_failed"),null}finally{lGt=null}})(),lGt}
async function THo(){if(!Mwl())return null;let e=getOauthAccountInfo()?.organizationUuid;if(!e)return null;let n=getGlobalConfig().passesEligibilityCache?.[e],r=Date.now();if(!n)return logForDebugging("Passes: No cache, fetching eligibility in background (command unavailable this session)"),Pwl(),null;if(r-n.timestamp>Owl){logForDebugging("Passes: Cache stale, returning cached data and refreshing in background"),Pwl();let{timestamp:i,...a}=n;return a}logForDebugging("Passes: Using fresh cached eligibility data");let{timestamp:o,...s}=n;return s}
async function Nwl(){if(Vi())return;THo()}
var Owl=86400000,lGt=null;
var kWe=b(()=>{lo();tr();bye();qe();$d();mn();lT()});
export {Sum,Lwl,Mwl,tgt,ngt,rgt,ejn,Pwl,THo,Nwl,Owl,lGt,kWe};
