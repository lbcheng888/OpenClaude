// @ts-nocheck
import {p0,kw,XD} from "./m1634.ts";
import {XB,nfe} from "./m1918.ts";
import {isKeybindingCustomizationEnabled,S1} from "./m1712.ts";
import {Av} from "./m1633.ts";
import {K8,bse} from "./m1923.ts";
import {b} from "../runtime.ts";
import {GS,hm} from "./m1631.ts";
class AuthorizationCodeCredential{constructor(e,t,n,r,o,s){if(p0(AQs,e),this.clientSecret=n,typeof o==="string")this.authorizationCode=r,this.redirectUri=o;else this.authorizationCode=n,this.redirectUri=r,this.clientSecret=void 0,s=o;this.tenantId=e,this.additionallyAllowedTenantIds=kw(s===null||s===void 0?void 0:s.additionallyAllowedTenants),this.msalClient=XB(t,e,Object.assign(Object.assign({},s),{logger:AQs,tokenCredentialOptions:s!==null&&s!==void 0?s:{}}))}async getToken(e,t={}){return isKeybindingCustomizationEnabled.withSpan(`${this.constructor.name}.getToken`,t,async(n)=>{let r=Av(this.tenantId,n,this.additionallyAllowedTenantIds);n.tenantId=r;let o=K8(e);return this.msalClient.getTokenByAuthorizationCode(o,this.redirectUri,this.authorizationCode,this.clientSecret,Object.assign(Object.assign({},n),{disableAutomaticAuthentication:this.disableAutomaticAuthentication}))})}}
var AQs;
var hQs=b(()=>{XD();XD();GS();bse();S1();nfe();AQs=hm("AuthorizationCodeCredential")});
export {AuthorizationCodeCredential,AQs,hQs};
