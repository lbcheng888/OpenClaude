// @ts-nocheck
import {CredentialUnavailableError,cD} from "./m1637.ts";
import {PR,uD} from "./m1639.ts";
import {SF,dfe} from "./m1923.ts";
import {jg,LM} from "./m1717.ts";
import {EA} from "./m1638.ts";
import {initA8,bse} from "./m1928.ts";
import {b} from "../runtime.ts";
import {VS,Lp} from "./m1636.ts";
class UsernamePasswordCredential{constructor(e,t,n,r,o={}){if(!e)throw new CredentialUnavailableError("UsernamePasswordCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");if(!t)throw new CredentialUnavailableError("UsernamePasswordCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");if(!n)throw new CredentialUnavailableError("UsernamePasswordCredential: username is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");if(!r)throw new CredentialUnavailableError("UsernamePasswordCredential: password is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");this.tenantId=e,this.additionallyAllowedTenantIds=PR(o===null||o===void 0?void 0:o.additionallyAllowedTenants),this.username=n,this.password=r,this.msalClient=SF(t,this.tenantId,Object.assign(Object.assign({},o),{tokenCredentialOptions:o!==null&&o!==void 0?o:{}}))}async getToken(e,t={}){return jg.withSpan(`${this.constructor.name}.getToken`,t,async(n)=>{n.tenantId=EA(this.tenantId,n,this.additionallyAllowedTenantIds,MYu);let r=initA8(e);return this.msalClient.getTokenByUsernamePassword(r,this.username,this.password,n)})}}
var MYu;
var rNr=b(()=>{dfe();uD();cD();VS();bse();LM();MYu=Lp("UsernamePasswordCredential")});
export {UsernamePasswordCredential,MYu,rNr};
