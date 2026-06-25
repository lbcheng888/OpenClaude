// @ts-nocheck
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {Pme,GS} from "../src/api/2028_used.ts";
import {isClaudeAISubscriber,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {b} from "../runtime.ts";
function pqi(){let e=getGlobalConfig().cachedExtraUsageDisabledReason;if(e===void 0)return!1;if(e===null)return!0;switch(e){case"out_of_credits":return!0;case"overage_not_provisioned":case"org_level_disabled":case"org_level_disabled_until":case"seat_tier_level_disabled":case"member_level_disabled":case"seat_tier_zero_credit_limit":case"group_zero_credit_limit":case"member_zero_credit_limit":case"org_service_level_disabled":case"no_limits_configured":case"fetch_error":case"unknown":return!1;default:return!1}}
function cee(){if(Pme())return!1;if(isClaudeAISubscriber())return pqi();return!0}
function mge(){if(Pme())return!1;if(isClaudeAISubscriber())return pqi();return!0}
var hHn=b(()=>{lo();tr();GS()});
export {pqi,cee,mge,hHn};
