// @ts-nocheck
import {CredentialUnavailableError,JD} from "./m1632.ts";
import {kw,XD} from "./m1634.ts";
import {XB,nfe} from "./m1918.ts";
import {isKeybindingCustomizationEnabled,S1} from "./m1712.ts";
import {Av} from "./m1633.ts";
import {b} from "../runtime.ts";
import {GS,hm} from "./m1631.ts";
class ClientAssertionCredential{constructor(e,t,n,r={}){if(!e)throw new CredentialUnavailableError("ClientAssertionCredential: tenantId is a required parameter.");if(!t)throw new CredentialUnavailableError("ClientAssertionCredential: clientId is a required parameter.");if(!n)throw new CredentialUnavailableError("ClientAssertionCredential: clientAssertion is a required parameter.");this.tenantId=e,this.additionallyAllowedTenantIds=kw(r===null||r===void 0?void 0:r.additionallyAllowedTenants),this.options=r,this.getAssertion=n,this.msalClient=XB(t,e,Object.assign(Object.assign({},r),{logger:VXs,tokenCredentialOptions:this.options}))}async getToken(e,t={}){return isKeybindingCustomizationEnabled.withSpan(`${this.constructor.name}.getToken`,t,async(n)=>{n.tenantId=Av(this.tenantId,n,this.additionallyAllowedTenantIds,VXs);let r=Array.isArray(e)?e:[e];return this.msalClient.getTokenByClientAssertion(r,this.getAssertion,n)})}}
var VXs;
var Gfn=b(()=>{nfe();XD();JD();GS();S1();VXs=hm("ClientAssertionCredential")});
export {ClientAssertionCredential,VXs,Gfn};
