// @ts-nocheck
import {JXe,PR,uD} from "./m1639.ts";
import {SF,dfe} from "./m1923.ts";
import {yFe,sse} from "./m1629.ts";
import {jg,LM} from "./m1717.ts";
import {EA} from "./m1638.ts";
import {initA8,bse} from "./m1928.ts";
import {b} from "../runtime.ts";
import {VS,Lp} from "./m1636.ts";
class InteractiveBrowserCredential{constructor(e){var t,n,r,o,s;this.tenantId=JXe(aNr,e.tenantId,e.clientId),this.additionallyAllowedTenantIds=PR(e===null||e===void 0?void 0:e.additionallyAllowedTenants);let i=Object.assign(Object.assign({},e),{tokenCredentialOptions:e,logger:aNr}),a=e;if(this.browserCustomizationOptions=a.browserCustomizationOptions,this.loginHint=a.loginHint,(t=a===null||a===void 0?void 0:a.brokerOptions)===null||t===void 0?void 0:t.enabled)if(!((n=a===null||a===void 0?void 0:a.brokerOptions)===null||n===void 0?void 0:n.parentWindowHandle))throw Error("In order to do WAM authentication, `parentWindowHandle` under `brokerOptions` is a required parameter");else i.brokerOptions={enabled:!0,parentWindowHandle:a.brokerOptions.parentWindowHandle,legacyEnableMsaPassthrough:(r=a.brokerOptions)===null||r===void 0?void 0:r.legacyEnableMsaPassthrough,useDefaultBrokerAccount:(o=a.brokerOptions)===null||o===void 0?void 0:o.useDefaultBrokerAccount};this.msalClient=SF((s=e.clientId)!==null&&s!==void 0?s:yFe,this.tenantId,i),this.disableAutomaticAuthentication=e===null||e===void 0?void 0:e.disableAutomaticAuthentication}async getToken(e,t={}){return jg.withSpan(`${this.constructor.name}.getToken`,t,async(n)=>{n.tenantId=EA(this.tenantId,n,this.additionallyAllowedTenantIds,aNr);let r=initA8(e);return this.msalClient.getTokenByInteractiveRequest(r,Object.assign(Object.assign({},n),{disableAutomaticAuthentication:this.disableAutomaticAuthentication,browserCustomizationOptions:this.browserCustomizationOptions,loginHint:this.loginHint}))})}async authenticate(e,t={}){return jg.withSpan(`${this.constructor.name}.authenticate`,t,async(n)=>{let r=initA8(e);return await this.msalClient.getTokenByInteractiveRequest(r,Object.assign(Object.assign({},n),{disableAutomaticAuthentication:!1,browserCustomizationOptions:this.browserCustomizationOptions,loginHint:this.loginHint})),this.msalClient.getActiveAccount()})}}
var aNr;
var aoi=b(()=>{uD();VS();bse();LM();dfe();sse();aNr=Lp("InteractiveBrowserCredential")});
export {InteractiveBrowserCredential,aNr,aoi};
