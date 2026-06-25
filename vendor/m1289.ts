// @ts-nocheck
import {Ne} from "./m583.ts";
import {isClaudeAISubscriber,getAuthTokenSource,hasAnthropicApiKey,getSubscriptionType,getOauthAccountInfo,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
import {Ir} from "./m584.ts";
function Udn(){if(Ne.DISABLE_COST_WARNINGS)return!1;let e=isClaudeAISubscriber();if(e&&oF())return!0;if(e)return!1;let t=getAuthTokenSource(),n=hasAnthropicApiKey();if(!t.hasToken&&!n)return!1;let r=getGlobalConfig(),o=r.oauthAccount?.organizationRole,s=r.oauthAccount?.workspaceRole;if(!o||!s)return!1;return["admin","billing"].includes(o)||["workspace_admin","workspace_billing"].includes(s)}
function oE(){if(yBs!==null)return yBs;if(!isClaudeAISubscriber())return!1;let e=getSubscriptionType();if(e==="max"||e==="pro")return!0;let n=getGlobalConfig().oauthAccount?.organizationRole;return!!n&&["admin","billing","owner","primary_owner"].includes(n)}
function oF(){return getOauthAccountInfo()?.billingType==="usage_based"}
var yBs=null;
var RM=b(()=>{lo();tr();Ir()});
export {Udn,oE,oF,yBs,RM};
