// @ts-nocheck
import {QYe,kw,XD} from "./m1634.ts";
import {XB,nfe} from "./m1918.ts";
import {bNe,ise} from "./m1624.ts";
import {isKeybindingCustomizationEnabled,S1} from "./m1712.ts";
import {Av} from "./m1633.ts";
import {K8,bse} from "./m1923.ts";
import {b} from "../runtime.ts";
import {GS,hm} from "./m1631.ts";
class InteractiveBrowserCredential{constructor(e){var t,n,r,o,s;this.tenantId=QYe(IPr,e.tenantId,e.clientId),this.additionallyAllowedTenantIds=kw(e===null||e===void 0?void 0:e.additionallyAllowedTenants);let i=Object.assign(Object.assign({},e),{tokenCredentialOptions:e,logger:IPr}),a=e;if(this.browserCustomizationOptions=a.browserCustomizationOptions,this.loginHint=a.loginHint,(t=a===null||a===void 0?void 0:a.brokerOptions)===null||t===void 0?void 0:t.enabled)if(!((n=a===null||a===void 0?void 0:a.brokerOptions)===null||n===void 0?void 0:n.parentWindowHandle))throw Error("In order to do WAM authentication, `parentWindowHandle` under `brokerOptions` is a required parameter");else i.brokerOptions={enabled:!0,parentWindowHandle:a.brokerOptions.parentWindowHandle,legacyEnableMsaPassthrough:(r=a.brokerOptions)===null||r===void 0?void 0:r.legacyEnableMsaPassthrough,useDefaultBrokerAccount:(o=a.brokerOptions)===null||o===void 0?void 0:o.useDefaultBrokerAccount};this.msalClient=XB((s=e.clientId)!==null&&s!==void 0?s:bNe,this.tenantId,i),this.disableAutomaticAuthentication=e===null||e===void 0?void 0:e.disableAutomaticAuthentication}async getToken(e,t={}){return isKeybindingCustomizationEnabled.withSpan(`${this.constructor.name}.getToken`,t,async(n)=>{n.tenantId=Av(this.tenantId,n,this.additionallyAllowedTenantIds,IPr);let r=K8(e);return this.msalClient.getTokenByInteractiveRequest(r,Object.assign(Object.assign({},n),{disableAutomaticAuthentication:this.disableAutomaticAuthentication,browserCustomizationOptions:this.browserCustomizationOptions,loginHint:this.loginHint}))})}async authenticate(e,t={}){return isKeybindingCustomizationEnabled.withSpan(`${this.constructor.name}.authenticate`,t,async(n)=>{let r=K8(e);return await this.msalClient.getTokenByInteractiveRequest(r,Object.assign(Object.assign({},n),{disableAutomaticAuthentication:!1,browserCustomizationOptions:this.browserCustomizationOptions,loginHint:this.loginHint})),this.msalClient.getActiveAccount()})}}
var IPr;
var pQs=b(()=>{XD();GS();bse();S1();nfe();ise();IPr=hm("InteractiveBrowserCredential")});
export {InteractiveBrowserCredential,IPr,pQs};
