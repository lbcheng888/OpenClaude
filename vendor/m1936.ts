// @ts-nocheck
import {CredentialUnavailableError,cD} from "./m1637.ts";
import {PR,uD} from "./m1639.ts";
import {SF,dfe} from "./m1923.ts";
import {jg,LM} from "./m1717.ts";
import {EA} from "./m1638.ts";
import {initA8,bse} from "./m1928.ts";
import {b} from "../runtime.ts";
import {VS,Lp} from "./m1636.ts";
class ClientSecretCredential{constructor(e,t,n,r={}){if(!e)throw new CredentialUnavailableError("ClientSecretCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");if(!t)throw new CredentialUnavailableError("ClientSecretCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");if(!n)throw new CredentialUnavailableError("ClientSecretCredential: clientSecret is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");this.clientSecret=n,this.tenantId=e,this.additionallyAllowedTenantIds=PR(r===null||r===void 0?void 0:r.additionallyAllowedTenants),this.msalClient=SF(t,e,Object.assign(Object.assign({},r),{logger:soi,tokenCredentialOptions:r}))}async getToken(e,t={}){return jg.withSpan(`${this.constructor.name}.getToken`,t,async(n)=>{n.tenantId=EA(this.tenantId,n,this.additionallyAllowedTenantIds,soi);let r=initA8(e);return this.msalClient.getTokenByClientSecret(r,this.clientSecret,n)})}}
var soi;
var nNr=b(()=>{dfe();uD();cD();VS();bse();LM();soi=Lp("ClientSecretCredential")});
export {ClientSecretCredential,soi,nNr};
