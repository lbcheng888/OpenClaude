// @ts-nocheck
import {CredentialUnavailableError,JD} from "./m1632.ts";
import {kw,XD} from "./m1634.ts";
import {XB,nfe} from "./m1918.ts";
import {isKeybindingCustomizationEnabled,S1} from "./m1712.ts";
import {Av} from "./m1633.ts";
import {K8,bse} from "./m1923.ts";
import {b} from "../runtime.ts";
import {GS,hm} from "./m1631.ts";
class ClientSecretCredential{constructor(e,t,n,r={}){if(!e)throw new CredentialUnavailableError("ClientSecretCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");if(!t)throw new CredentialUnavailableError("ClientSecretCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");if(!n)throw new CredentialUnavailableError("ClientSecretCredential: clientSecret is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");this.clientSecret=n,this.tenantId=e,this.additionallyAllowedTenantIds=kw(r===null||r===void 0?void 0:r.additionallyAllowedTenants),this.msalClient=XB(t,e,Object.assign(Object.assign({},r),{logger:uQs,tokenCredentialOptions:r}))}async getToken(e,t={}){return isKeybindingCustomizationEnabled.withSpan(`${this.constructor.name}.getToken`,t,async(n)=>{n.tenantId=Av(this.tenantId,n,this.additionallyAllowedTenantIds,uQs);let r=K8(e);return this.msalClient.getTokenByClientSecret(r,this.clientSecret,n)})}}
var uQs;
var wPr=b(()=>{nfe();XD();JD();GS();bse();S1();uQs=hm("ClientSecretCredential")});
export {ClientSecretCredential,uQs,wPr};
