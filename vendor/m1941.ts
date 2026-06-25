// @ts-nocheck
import {PR,JXe,uD} from "./m1639.ts";
import {yFe,sse} from "./m1629.ts";
import {SF,dfe} from "./m1923.ts";
import {jg,LM} from "./m1717.ts";
import {EA} from "./m1638.ts";
import {initA8,bse} from "./m1928.ts";
import {b} from "../runtime.ts";
import {VS,Lp} from "./m1636.ts";
function KYu(e){console.log(e.message)}
class DeviceCodeCredential{constructor(e){var t,n;this.tenantId=e===null||e===void 0?void 0:e.tenantId,this.additionallyAllowedTenantIds=PR(e===null||e===void 0?void 0:e.additionallyAllowedTenants);let r=(t=e===null||e===void 0?void 0:e.clientId)!==null&&t!==void 0?t:yFe,o=JXe(cNr,e===null||e===void 0?void 0:e.tenantId,r);this.userPromptCallback=(n=e===null||e===void 0?void 0:e.userPromptCallback)!==null&&n!==void 0?n:KYu,this.msalClient=SF(r,o,Object.assign(Object.assign({},e),{logger:cNr,tokenCredentialOptions:e||{}})),this.disableAutomaticAuthentication=e===null||e===void 0?void 0:e.disableAutomaticAuthentication}async getToken(e,t={}){return jg.withSpan(`${this.constructor.name}.getToken`,t,async(n)=>{n.tenantId=EA(this.tenantId,n,this.additionallyAllowedTenantIds,cNr);let r=initA8(e);return this.msalClient.getTokenByDeviceCode(r,this.userPromptCallback,Object.assign(Object.assign({},n),{disableAutomaticAuthentication:this.disableAutomaticAuthentication}))})}async authenticate(e,t={}){return jg.withSpan(`${this.constructor.name}.authenticate`,t,async(n)=>{let r=Array.isArray(e)?e:[e];return await this.msalClient.getTokenByDeviceCode(r,this.userPromptCallback,Object.assign(Object.assign({},n),{disableAutomaticAuthentication:!1})),this.msalClient.getActiveAccount()})}}
var cNr;
var loi=b(()=>{uD();VS();bse();LM();dfe();sse();cNr=Lp("DeviceCodeCredential")});
export {KYu,DeviceCodeCredential,cNr,loi};
