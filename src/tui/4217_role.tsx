// @ts-nocheck
import {je} from "../../vendor/m577.ts";
import {b,M} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {sc,Gn} from "../../vendor/m2455.ts";
import {ze} from "../../vendor/m2452.ts";
import {Ri,pi} from "../tools/2227_userFacingName.ts";
import {Lr} from "../../vendor/m578.ts";
import {Xt,Le} from "../config/0228_encoding.ts";
import {Te} from "../../vendor/m2253.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
import {Text} from "../../vendor/m2423.ts";
var T3n="ShowOnboardingRolePicker",H8a="Render a clickable role-picker chip row during Cowork onboarding so the user can pick their role and get a matching plugin installed.",I8a=`Render a clickable role-picker chip row during Cowork onboarding. Call this when asking the user what kind of work they do so they can pick their role and get a matching plugin installed. The role list is hardcoded in the frontend \u2014 call with no args.

The call blocks until the user responds. Three resolution paths all land in the tool result: chip click or free-form typed answer \u2192 {"role": "Legal"} or {"role": "paralegal"}; X button \u2192 {"dismissed": true}. An empty object {} means the user approved without picking a role \u2014 treat it like a dismissal. Free-form roles may not match the chip list \u2014 search the marketplace with whatever string you get.

Do NOT call this in normal conversation. Only call this when explicitly helping the user set up Cowork for their role/job function.`;
function WDp(){return je.CLAUDE_CODE_REMOTE}
var opo,qDp,jDp,D8a;
var P8a=b(()=>{Xr();sc();ze();Ri();Lr();Xt();opo=M(Te(),1),qDp=we(()=>E.strictObject({})),jDp=we(()=>E.object({role:E.string().optional(),dismissed:E.boolean().optional()}));D8a=pi({name:T3n,searchHint:"show the Cowork onboarding role picker",maxResultSizeChars:1e4,get inputSchema(){return qDp()},get outputSchema(){return jDp()},isEnabled:WDp,isConcurrencySafe(){return!0},isReadOnly(){return!0},requiresUserInteraction(){return!0},async description(){return H8a},async prompt(){return I8a},toAutoClassifierInput(){return"show onboarding role picker"},async checkPermissions(e,t){return{behavior:"ask",message:"Pick your role?",updatedInput:{}}},async call(e,t){let{role:n,dismissed:r}=e;return{data:{...typeof n==="string"&&n.trim()!==""&&{role:n},...typeof r==="boolean"&&{dismissed:r}}}},mapToolResultToToolResultBlockParam(e,t){return{tool_use_id:t,type:"tool_result",content:Le(e)}},renderToolUseMessage(){return null},renderToolResultMessage(e){return opo.default.createElement(Gn,null,opo.default.createElement(Text,null,e.role!==void 0?`Role: ${e.role}`:"Role picker dismissed"))}})});
export {T3n,H8a,I8a,WDp,opo,qDp,jDp,D8a,P8a};
