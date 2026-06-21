// @ts-nocheck
import {CredentialUnavailableError,JD} from "./m1632.ts";
import {kw,XD} from "./m1634.ts";
import {XB,nfe} from "./m1918.ts";
import {isKeybindingCustomizationEnabled,S1} from "./m1712.ts";
import {Av} from "./m1633.ts";
import {K8,bse} from "./m1923.ts";
import {b} from "../runtime.ts";
import {GS,hm} from "./m1631.ts";
class UsernamePasswordCredential{constructor(e,t,n,r,o={}){if(!e)throw new CredentialUnavailableError("UsernamePasswordCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");if(!t)throw new CredentialUnavailableError("UsernamePasswordCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");if(!n)throw new CredentialUnavailableError("UsernamePasswordCredential: username is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");if(!r)throw new CredentialUnavailableError("UsernamePasswordCredential: password is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");this.tenantId=e,this.additionallyAllowedTenantIds=kw(o===null||o===void 0?void 0:o.additionallyAllowedTenants),this.username=n,this.password=r,this.msalClient=XB(t,this.tenantId,Object.assign(Object.assign({},o),{tokenCredentialOptions:o!==null&&o!==void 0?o:{}}))}async getToken(e,t={}){return isKeybindingCustomizationEnabled.withSpan(`${this.constructor.name}.getToken`,t,async(n)=>{n.tenantId=Av(this.tenantId,n,this.additionallyAllowedTenantIds,g6u);let r=K8(e);return this.msalClient.getTokenByUsernamePassword(r,this.username,this.password,n)})}}
var g6u;
var RPr=b(()=>{nfe();XD();JD();GS();bse();S1();g6u=hm("UsernamePasswordCredential")});
export {UsernamePasswordCredential,g6u,RPr};
