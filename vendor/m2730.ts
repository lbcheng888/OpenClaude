// @ts-nocheck
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {vme,jS} from "../src/api/2023_used.ts";
import {isClaudeAISubscriber,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {b} from "../runtime.ts";
function kFi(){let e=getGlobalConfig().cachedExtraUsageDisabledReason;if(e===void 0)return!1;if(e===null)return!0;switch(e){case"out_of_credits":return!0;case"overage_not_provisioned":case"org_level_disabled":case"org_level_disabled_until":case"seat_tier_level_disabled":case"member_level_disabled":case"seat_tier_zero_credit_limit":case"group_zero_credit_limit":case"member_zero_credit_limit":case"org_service_level_disabled":case"no_limits_configured":case"fetch_error":case"unknown":return!1;default:return!1}}
function dee(){if(vme())return!1;if(isClaudeAISubscriber())return kFi();return!0}
function nhe(){if(vme())return!1;if(isClaudeAISubscriber())return kFi();return!0}
var Iwn=b(()=>{Ao();Qn();jS()});
export {kFi,dee,nhe,Iwn};
