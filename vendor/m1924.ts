// @ts-nocheck
import {CredentialUnavailableError,cD} from "./m1637.ts";
import {PR,uD} from "./m1639.ts";
import {SF,dfe} from "./m1923.ts";
import {jg,LM} from "./m1717.ts";
import {EA} from "./m1638.ts";
import {b} from "../runtime.ts";
import {VS,Lp} from "./m1636.ts";
class ClientAssertionCredential{constructor(e,t,n,r={}){if(!e)throw new CredentialUnavailableError("ClientAssertionCredential: tenantId is a required parameter.");if(!t)throw new CredentialUnavailableError("ClientAssertionCredential: clientId is a required parameter.");if(!n)throw new CredentialUnavailableError("ClientAssertionCredential: clientAssertion is a required parameter.");this.tenantId=e,this.additionallyAllowedTenantIds=PR(r===null||r===void 0?void 0:r.additionallyAllowedTenants),this.options=r,this.getAssertion=n,this.msalClient=SF(t,e,Object.assign(Object.assign({},r),{logger:$ri,tokenCredentialOptions:this.options}))}async getToken(e,t={}){return jg.withSpan(`${this.constructor.name}.getToken`,t,async(n)=>{n.tenantId=EA(this.tenantId,n,this.additionallyAllowedTenantIds,$ri);let r=Array.isArray(e)?e:[e];return this.msalClient.getTokenByClientAssertion(r,this.getAssertion,n)})}}
var $ri;
var w_n=b(()=>{dfe();uD();cD();VS();LM();$ri=Lp("ClientAssertionCredential")});
export {ClientAssertionCredential,$ri,w_n};
