// @ts-nocheck
import {permissionRuleSourceDisplayString,getAllowRules,getAskRules,getDenyRules,ay} from "../src/tools/5184_toolAlwaysAllowedRule.ts";
import {ns} from "../src/mcp/2194_mcpServerName.ts";
import {b} from "../runtime.ts";
function G7p(e){return e==="projectSettings"||e==="policySettings"||e==="command"}
function _5n(e){return permissionRuleSourceDisplayString(e)}
function Ycl(e,t,n){let r=_5n(t.source),o=_5n(n.source),s=t.ruleValue.toolName;if(e==="deny")return`Remove the "${s}" deny rule from ${r}, or remove the specific allow rule from ${o}`;return`Remove the "${s}" ask rule from ${r}, or remove the specific allow rule from ${o}`}
function V7p(e,t,n){let{toolName:r,ruleContent:o}=e.ruleValue;if(o===void 0)return{shadowed:!1};let s=t.find((i)=>i.ruleValue.toolName===r&&i.ruleValue.ruleContent===void 0);if(!s)return{shadowed:!1};if(r===ns&&n.sandboxAutoAllowEnabled){if(!G7p(s.source))return{shadowed:!1}}return{shadowed:!0,shadowedBy:s,shadowType:"ask"}}
function K7p(e,t){let{toolName:n,ruleContent:r}=e.ruleValue;if(r===void 0)return{shadowed:!1};let o=t.find((s)=>s.ruleValue.toolName===n&&s.ruleValue.ruleContent===void 0);if(!o)return{shadowed:!1};return{shadowed:!0,shadowedBy:o,shadowType:"deny"}}
function y5n(e,t){let n=[],r=getAllowRules(e),o=getAskRules(e),s=getDenyRules(e);for(let i of r){let a=K7p(i,s);if(a.shadowed){let c=_5n(a.shadowedBy.source);n.push({rule:i,reason:`Blocked by "${a.shadowedBy.ruleValue.toolName}" deny rule (from ${c})`,shadowedBy:a.shadowedBy,shadowType:"deny",fix:Ycl("deny",a.shadowedBy,i)});continue}let l=V7p(i,o,t);if(l.shadowed){let c=_5n(l.shadowedBy.source);n.push({rule:i,reason:`Shadowed by "${l.shadowedBy.ruleValue.toolName}" ask rule (from ${c})`,shadowedBy:l.shadowedBy,shadowType:"ask",fix:Ycl("ask",l.shadowedBy,i)})}}return n}
var XTo=b(()=>{ay()});
export {G7p,_5n,Ycl,V7p,K7p,y5n,XTo};
