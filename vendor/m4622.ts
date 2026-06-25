// @ts-nocheck
import {permissionRuleSourceDisplayString,getAllowRules,getAskRules,getDenyRules,ly} from "../src/tools/5218_toolAlwaysAllowedRule.ts";
import {Mo} from "../src/mcp/2200_mcpServerName.ts";
import {b} from "../runtime.ts";
function Ytm(e){return e==="projectSettings"||e==="policySettings"||e==="command"}
function ZKn(e){return permissionRuleSourceDisplayString(e)}
function I_l(e,t,n){let r=ZKn(t.source),o=ZKn(n.source),s=t.ruleValue.toolName;if(e==="deny")return`Remove the "${s}" deny rule from ${r}, or remove the specific allow rule from ${o}`;return`Remove the "${s}" ask rule from ${r}, or remove the specific allow rule from ${o}`}
function Jtm(e,t,n){let{toolName:r,ruleContent:o}=e.ruleValue;if(o===void 0)return{shadowed:!1};let s=t.find((i)=>i.ruleValue.toolName===r&&i.ruleValue.ruleContent===void 0);if(!s)return{shadowed:!1};if(r===Mo&&n.sandboxAutoAllowEnabled){if(!Ytm(s.source))return{shadowed:!1}}return{shadowed:!0,shadowedBy:s,shadowType:"ask"}}
function Xtm(e,t){let{toolName:n,ruleContent:r}=e.ruleValue;if(r===void 0)return{shadowed:!1};let o=t.find((s)=>s.ruleValue.toolName===n&&s.ruleValue.ruleContent===void 0);if(!o)return{shadowed:!1};return{shadowed:!0,shadowedBy:o,shadowType:"deny"}}
function e7n(e,t){let n=[],r=getAllowRules(e),o=getAskRules(e),s=getDenyRules(e);for(let i of r){let a=Xtm(i,s);if(a.shadowed){let c=ZKn(a.shadowedBy.source);n.push({rule:i,reason:`Blocked by "${a.shadowedBy.ruleValue.toolName}" deny rule (from ${c})`,shadowedBy:a.shadowedBy,shadowType:"deny",fix:I_l("deny",a.shadowedBy,i)});continue}let l=Jtm(i,o,t);if(l.shadowed){let c=ZKn(l.shadowedBy.source);n.push({rule:i,reason:`Shadowed by "${l.shadowedBy.ruleValue.toolName}" ask rule (from ${c})`,shadowedBy:l.shadowedBy,shadowType:"ask",fix:I_l("ask",l.shadowedBy,i)})}}return n}
var dvo=b(()=>{ly()});
export {Ytm,ZKn,I_l,Jtm,Xtm,e7n,dvo};
