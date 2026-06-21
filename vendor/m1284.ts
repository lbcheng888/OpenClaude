// @ts-nocheck
import {je} from "./m577.ts";
import {isClaudeAISubscriber,getAuthTokenSource,hasAnthropicApiKey,getSubscriptionType,getOauthAccountInfo,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
import {Lr} from "./m578.ts";
function ncn(){if(je.DISABLE_COST_WARNINGS)return!1;if(isClaudeAISubscriber())return!1;let t=getAuthTokenSource(),n=hasAnthropicApiKey();if(!t.hasToken&&!n)return!1;let r=getGlobalConfig(),o=r.oauthAccount?.organizationRole,s=r.oauthAccount?.workspaceRole;if(!o||!s)return!1;return["admin","billing"].includes(o)||["workspace_admin","workspace_billing"].includes(s)}
function Cw(){if(COs!==null)return COs;if(!isClaudeAISubscriber())return!1;let e=getSubscriptionType();if(e==="max"||e==="pro")return!0;let n=getGlobalConfig().oauthAccount?.organizationRole;return!!n&&["admin","billing","owner","primary_owner"].includes(n)}
function w8(){return getOauthAccountInfo()?.billingType==="usage_based"}
var COs=null;
var LB=b(()=>{Ao();Qn();Lr()});
export {ncn,Cw,w8,COs,LB};
