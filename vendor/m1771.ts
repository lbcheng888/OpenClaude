// @ts-nocheck
import {no,IQ} from "./m1748.ts";
import {Lh,ofe} from "./m1757.ts";
import {zp,dRe} from "./m1743.ts";
import {nowSeconds,mRe} from "./m1759.ts";
import {b} from "../runtime.ts";
class lBe{constructor(e,t){this.cryptoUtils=e,this.performanceClient=t}async generateCnf(e,t){this.performanceClient?.addQueueMeasurement(no.PopTokenGenerateCnf,e.correlationId);let n=await Lh(this.generateKid.bind(this),no.PopTokenGenerateCnf,t,this.performanceClient,e.correlationId)(e),r=this.cryptoUtils.base64UrlEncode(JSON.stringify(n));return{kid:n.kid,reqCnfString:r}}async generateKid(e){return this.performanceClient?.addQueueMeasurement(no.PopTokenGenerateKid,e.correlationId),{kid:await this.cryptoUtils.getPublicKeyThumbprint(e),xms_ksl:k8u.SW}}async signPopToken(e,t,n){return this.signPayload(e,t,n)}async signPayload(e,t,n,r){let{resourceRequestMethod:o,resourceRequestUri:s,shrClaims:i,shrNonce:a,shrOptions:l}=n,u=(s?new zp(s):void 0)?.getUrlComponents();return this.cryptoUtils.signJwt({at:e,ts:nowSeconds(),m:o?.toUpperCase(),u:u?.HostNameAndPort,nonce:a||this.cryptoUtils.createNewGuid(),p:u?.AbsolutePath,q:u?.QueryString?[[],u.QueryString]:void 0,client_claims:i||void 0,...r},t,l,n.correlationId)}}
var k8u;
var ggn=b(()=>{mRe();dRe();IQ();ofe();/*! @azure/msal-common v15.13.1 2025-10-29 */k8u={SW:"sw"}});
export {lBe,k8u,ggn};
