// @ts-nocheck
import {jVs,dmn} from "./m1745.ts";
import {Logger,Zpn} from "./m1723.ts";
import {emn,fJe,tmn} from "./m1724.ts";
import {iC,Ho,aC} from "./m1717.ts";
import {hse,_Je} from "./m1730.ts";
import {t$,qRt} from "./m1746.ts";
import {Jme,e7s} from "./m1760.ts";
import {Ih,Yme} from "./m1752.ts";
import {Zr,OQ} from "./m1743.ts";
import {wmn,t7s} from "./m1761.ts";
import {AuthError,eK} from "./m1719.ts";
import {ls,m0} from "./m1721.ts";
import {networkError,LH} from "./m1720.ts";
import {createDiscoveredInstance,w0r} from "./m1757.ts";
import {addBrokerParameters,addExtraQueryParameters,addCorrelationId,instrumentBrokerParams,CJe} from "./m1748.ts";
import {mapToQueryString,nBe} from "./m1737.ts";
import {b} from "../runtime.ts";
class YB{constructor(e,t){this.config=jVs(e),this.logger=new Logger(this.config.loggerOptions,emn,fJe),this.cryptoUtils=this.config.cryptoInterface,this.cacheManager=this.config.storageInterface,this.networkClient=this.config.networkInterface,this.serverTelemetryManager=this.config.serverTelemetryManager,this.authority=this.config.authOptions.authority,this.performanceClient=t}createTokenRequestHeaders(e){let t={};if(t[iC.CONTENT_TYPE]=Ho.URL_FORM_CONTENT_TYPE,!this.config.systemOptions.preventCorsPreflight&&e)switch(e.type){case t$.HOME_ACCOUNT_ID:try{let n=hse(e.credential);t[iC.CCS_HEADER]=`Oid:${n.uid}@${n.utid}`}catch(n){this.logger.verbose("Could not parse home account ID for CCS Header: "+n)}break;case t$.UPN:t[iC.CCS_HEADER]=`UPN: ${e.credential}`;break}return t}async executePostToTokenEndpoint(e,t,n,r,o,s){if(s)this.performanceClient?.addQueueMeasurement(s,o);let i=await this.sendPostRequest(r,e,{body:t,headers:n},o);if(this.config.serverTelemetryManager&&i.status<500&&i.status!==429)this.config.serverTelemetryManager.clearTelemetryCache();return i}async sendPostRequest(e,t,n,r){Jme.preProcess(this.cacheManager,e,r);let o;try{o=await Ih(this.networkClient.sendPostRequestAsync.bind(this.networkClient),Zr.NetworkClientSendPostRequestAsync,this.logger,this.performanceClient,r)(t,n);let s=o.headers||{};this.performanceClient?.addFields({refreshTokenSize:o.body.refresh_token?.length||0,httpVerToken:s[iC.X_MS_HTTP_VERSION]||"",requestId:s[iC.X_MS_REQUEST_ID]||""},r)}catch(s){if(s instanceof wmn){let i=s.responseHeaders;if(i)this.performanceClient?.addFields({httpVerToken:i[iC.X_MS_HTTP_VERSION]||"",requestId:i[iC.X_MS_REQUEST_ID]||"",contentTypeHeader:i[iC.CONTENT_TYPE]||void 0,contentLengthHeader:i[iC.CONTENT_LENGTH]||void 0,httpStatus:s.httpStatus},r);throw s.error}if(s instanceof AuthError)throw s;else throw ls(networkError)}return Jme.postProcess(this.cacheManager,e,o,r),o}async updateAuthority(e,t){this.performanceClient?.addQueueMeasurement(Zr.UpdateTokenEndpointAuthority,t);let n=`https://${e}/${this.authority.tenant}/`,r=await createDiscoveredInstance(n,this.networkClient,this.cacheManager,this.authority.options,this.logger,t,this.performanceClient);this.authority=r}createTokenQueryParameters(e){let t=new Map;if(e.embeddedClientId)addBrokerParameters(t,this.config.authOptions.clientId,this.config.authOptions.redirectUri);if(e.tokenQueryParameters)addExtraQueryParameters(t,e.tokenQueryParameters);return addCorrelationId(t,e.correlationId),instrumentBrokerParams(t,e.correlationId,this.performanceClient),mapToQueryString(t)}}
var sxt=b(()=>{dmn();Zpn();aC();tmn();qRt();_Je();CJe();nBe();w0r();OQ();e7s();eK();m0();t7s();Yme();LH();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {YB,sxt};
