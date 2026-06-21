// @ts-nocheck
import {kw,QYe,XD} from "./m1634.ts";
import {bNe,ise} from "./m1624.ts";
import {XB,nfe} from "./m1918.ts";
import {isKeybindingCustomizationEnabled,S1} from "./m1712.ts";
import {Av} from "./m1633.ts";
import {K8,bse} from "./m1923.ts";
import {b} from "../runtime.ts";
import {GS,hm} from "./m1631.ts";
function R6u(e){console.log(e.message)}
class DeviceCodeCredential{constructor(e){var t,n;this.tenantId=e===null||e===void 0?void 0:e.tenantId,this.additionallyAllowedTenantIds=kw(e===null||e===void 0?void 0:e.additionallyAllowedTenants);let r=(t=e===null||e===void 0?void 0:e.clientId)!==null&&t!==void 0?t:bNe,o=QYe(PPr,e===null||e===void 0?void 0:e.tenantId,r);this.userPromptCallback=(n=e===null||e===void 0?void 0:e.userPromptCallback)!==null&&n!==void 0?n:R6u,this.msalClient=XB(r,o,Object.assign(Object.assign({},e),{logger:PPr,tokenCredentialOptions:e||{}})),this.disableAutomaticAuthentication=e===null||e===void 0?void 0:e.disableAutomaticAuthentication}async getToken(e,t={}){return isKeybindingCustomizationEnabled.withSpan(`${this.constructor.name}.getToken`,t,async(n)=>{n.tenantId=Av(this.tenantId,n,this.additionallyAllowedTenantIds,PPr);let r=K8(e);return this.msalClient.getTokenByDeviceCode(r,this.userPromptCallback,Object.assign(Object.assign({},n),{disableAutomaticAuthentication:this.disableAutomaticAuthentication}))})}async authenticate(e,t={}){return isKeybindingCustomizationEnabled.withSpan(`${this.constructor.name}.authenticate`,t,async(n)=>{let r=Array.isArray(e)?e:[e];return await this.msalClient.getTokenByDeviceCode(r,this.userPromptCallback,Object.assign(Object.assign({},n),{disableAutomaticAuthentication:!1})),this.msalClient.getActiveAccount()})}}
var PPr;
var mQs=b(()=>{XD();GS();bse();S1();nfe();ise();PPr=hm("DeviceCodeCredential")});
export {R6u,DeviceCodeCredential,PPr,mQs};
