// @ts-nocheck
import {Zr,OQ} from "./m1743.ts";
import {Ih,Yme} from "./m1752.ts";
import {Dm,xCe} from "./m1738.ts";
import {nowSeconds,HCe} from "./m1754.ts";
import {b} from "../runtime.ts";
class pBe{constructor(e,t){this.cryptoUtils=e,this.performanceClient=t}async generateCnf(e,t){this.performanceClient?.addQueueMeasurement(Zr.PopTokenGenerateCnf,e.correlationId);let n=await Ih(this.generateKid.bind(this),Zr.PopTokenGenerateCnf,t,this.performanceClient,e.correlationId)(e),r=this.cryptoUtils.base64UrlEncode(JSON.stringify(n));return{kid:n.kid,reqCnfString:r}}async generateKid(e){return this.performanceClient?.addQueueMeasurement(Zr.PopTokenGenerateKid,e.correlationId),{kid:await this.cryptoUtils.getPublicKeyThumbprint(e),xms_ksl:cFu.SW}}async signPopToken(e,t,n){return this.signPayload(e,t,n)}async signPayload(e,t,n,r){let{resourceRequestMethod:o,resourceRequestUri:s,shrClaims:i,shrNonce:a,shrOptions:l}=n,u=(s?new Dm(s):void 0)?.getUrlComponents();return this.cryptoUtils.signJwt({at:e,ts:nowSeconds(),m:o?.toUpperCase(),u:u?.HostNameAndPort,nonce:a||this.cryptoUtils.createNewGuid(),p:u?.AbsolutePath,q:u?.QueryString?[[],u.QueryString]:void 0,client_claims:i||void 0,...r},t,l,n.correlationId)}}
var cFu;
var Omn=b(()=>{HCe();xCe();OQ();Yme();/*! @azure/msal-common v15.13.1 2025-10-29 */cFu={SW:"sw"}});
export {pBe,cFu,Omn};
