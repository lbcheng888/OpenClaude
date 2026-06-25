// @ts-nocheck
import {jo} from "./m1726.ts";
import {ClientAuthErrorCodes} from "./m1725.ts";
import {CA} from "./m1759.ts";
import {k7,RA} from "./m1783.ts";
import {M3,WIt} from "./m1797.ts";
import {MM,Co} from "./m1722.ts";
import {b,x} from "../runtime.ts";
import {iT} from "./m1780.ts";
import {vni} from "./m1878.ts";
class ClientAssertion{static fromAssertion(e){let t=new ClientAssertion;return t.jwt=e,t}static fromCertificate(e,t,n){let r=new ClientAssertion;if(r.privateKey=t,r.thumbprint=e,r.useSha256=!1,n)r.publicCertificate=this.parseCertificate(n);return r}static fromCertificateWithSha256Thumbprint(e,t,n){let r=new ClientAssertion;if(r.privateKey=t,r.thumbprint=e,r.useSha256=!0,n)r.publicCertificate=this.parseCertificate(n);return r}getJwt(e,t,n){if(this.privateKey&&this.thumbprint){if(this.jwt&&!this.isExpired()&&t===this.issuer&&n===this.jwtAudience)return this.jwt;return this.createJwt(e,t,n)}if(this.jwt)return this.jwt;throw jo(ClientAuthErrorCodes.invalidAssertion)}createJwt(e,t,n){this.issuer=t,this.jwtAudience=n;let r=CA.nowSeconds();this.expirationTime=r+600;let s={alg:this.useSha256?k7.PSS_256:k7.RSA_256},i=this.useSha256?k7.X5T_256:k7.X5T;if(Object.assign(s,{[i]:M3.base64EncodeUrl(this.thumbprint,MM.HEX)}),this.publicCertificate)Object.assign(s,{[k7.X5C]:this.publicCertificate});let a={[k7.AUDIENCE]:this.jwtAudience,[k7.EXPIRATION_TIME]:this.expirationTime,[k7.ISSUER]:this.issuer,[k7.SUBJECT]:this.issuer,[k7.NOT_BEFORE]:r,[k7.JWT_ID]:e.createNewGuid()};return this.jwt=wni.default.sign(a,this.privateKey,{header:s}),this.jwt}isExpired(){return this.expirationTime<CA.nowSeconds()}static parseCertificate(e){let t=/-----BEGIN CERTIFICATE-----\r*\n(.+?)\r*\n-----END CERTIFICATE-----/gs,n=[],r;while((r=t.exec(e))!==null)n.push(r[1].replace(/\r*\n/g,Co.EMPTY_STRING));return n}}
var wni;
var m_n=b(()=>{iT();WIt();RA();wni=x(vni(),1);/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {ClientAssertion,wni,m_n};
