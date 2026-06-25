// @ts-nocheck
import {I0,PR,uD} from "./m1639.ts";
import {SF,dfe} from "./m1923.ts";
import {jg,LM} from "./m1717.ts";
import {EA} from "./m1638.ts";
import {initA8,bse} from "./m1928.ts";
import {b} from "../runtime.ts";
import {VS,Lp} from "./m1636.ts";
class AuthorizationCodeCredential{constructor(e,t,n,r,o,s){if(I0(uoi,e),this.clientSecret=n,typeof o==="string")this.authorizationCode=r,this.redirectUri=o;else this.authorizationCode=n,this.redirectUri=r,this.clientSecret=void 0,s=o;this.tenantId=e,this.additionallyAllowedTenantIds=PR(s===null||s===void 0?void 0:s.additionallyAllowedTenants),this.msalClient=SF(t,e,Object.assign(Object.assign({},s),{logger:uoi,tokenCredentialOptions:s!==null&&s!==void 0?s:{}}))}async getToken(e,t={}){return jg.withSpan(`${this.constructor.name}.getToken`,t,async(n)=>{let r=EA(this.tenantId,n,this.additionallyAllowedTenantIds);n.tenantId=r;let o=initA8(e);return this.msalClient.getTokenByAuthorizationCode(o,this.redirectUri,this.authorizationCode,this.clientSecret,Object.assign(Object.assign({},n),{disableAutomaticAuthentication:this.disableAutomaticAuthentication}))})}}
var uoi;
var doi=b(()=>{uD();uD();VS();bse();LM();dfe();uoi=Lp("AuthorizationCodeCredential")});
export {AuthorizationCodeCredential,uoi,doi};
