// @ts-nocheck
import {FXs,zhn} from "./m1750.ts";
import {Logger,Lhn} from "./m1728.ts";
import {Mhn,pQe,Nhn} from "./m1729.ts";
import {uC,Co,dC} from "./m1722.ts";
import {hse,gQe} from "./m1735.ts";
import {A2,hIt} from "./m1751.ts";
import {sfe,YXs} from "./m1765.ts";
import {Lh,ofe} from "./m1757.ts";
import {no,IQ} from "./m1748.ts";
import {lgn,JXs} from "./m1766.ts";
import {AuthError,R7} from "./m1724.ts";
import {jo,x0} from "./m1726.ts";
import {networkError,uI} from "./m1725.ts";
import {createDiscoveredInstance,nMr} from "./m1762.ts";
import {addBrokerParameters,addExtraQueryParameters,addCorrelationId,instrumentBrokerParams,EQe} from "./m1753.ts";
import {mapToQueryString,QFe} from "./m1742.ts";
import {b} from "../runtime.ts";
class yF{constructor(e,t){this.config=FXs(e),this.logger=new Logger(this.config.loggerOptions,Mhn,pQe),this.cryptoUtils=this.config.cryptoInterface,this.cacheManager=this.config.storageInterface,this.networkClient=this.config.networkInterface,this.serverTelemetryManager=this.config.serverTelemetryManager,this.authority=this.config.authOptions.authority,this.performanceClient=t}createTokenRequestHeaders(e){let t={};if(t[uC.CONTENT_TYPE]=Co.URL_FORM_CONTENT_TYPE,!this.config.systemOptions.preventCorsPreflight&&e)switch(e.type){case A2.HOME_ACCOUNT_ID:try{let n=hse(e.credential);t[uC.CCS_HEADER]=`Oid:${n.uid}@${n.utid}`}catch(n){this.logger.verbose("Could not parse home account ID for CCS Header: "+n)}break;case A2.UPN:t[uC.CCS_HEADER]=`UPN: ${e.credential}`;break}return t}async executePostToTokenEndpoint(e,t,n,r,o,s){if(s)this.performanceClient?.addQueueMeasurement(s,o);let i=await this.sendPostRequest(r,e,{body:t,headers:n},o);if(this.config.serverTelemetryManager&&i.status<500&&i.status!==429)this.config.serverTelemetryManager.clearTelemetryCache();return i}async sendPostRequest(e,t,n,r){sfe.preProcess(this.cacheManager,e,r);let o;try{o=await Lh(this.networkClient.sendPostRequestAsync.bind(this.networkClient),no.NetworkClientSendPostRequestAsync,this.logger,this.performanceClient,r)(t,n);let s=o.headers||{};this.performanceClient?.addFields({refreshTokenSize:o.body.refresh_token?.length||0,httpVerToken:s[uC.X_MS_HTTP_VERSION]||"",requestId:s[uC.X_MS_REQUEST_ID]||""},r)}catch(s){if(s instanceof lgn){let i=s.responseHeaders;if(i)this.performanceClient?.addFields({httpVerToken:i[uC.X_MS_HTTP_VERSION]||"",requestId:i[uC.X_MS_REQUEST_ID]||"",contentTypeHeader:i[uC.CONTENT_TYPE]||void 0,contentLengthHeader:i[uC.CONTENT_LENGTH]||void 0,httpStatus:s.httpStatus},r);throw s.error}if(s instanceof AuthError)throw s;else throw jo(networkError)}return sfe.postProcess(this.cacheManager,e,o,r),o}async updateAuthority(e,t){this.performanceClient?.addQueueMeasurement(no.UpdateTokenEndpointAuthority,t);let n=`https://${e}/${this.authority.tenant}/`,r=await createDiscoveredInstance(n,this.networkClient,this.cacheManager,this.authority.options,this.logger,t,this.performanceClient);this.authority=r}createTokenQueryParameters(e){let t=new Map;if(e.embeddedClientId)addBrokerParameters(t,this.config.authOptions.clientId,this.config.authOptions.redirectUri);if(e.tokenQueryParameters)addExtraQueryParameters(t,e.tokenQueryParameters);return addCorrelationId(t,e.correlationId),instrumentBrokerParams(t,e.correlationId,this.performanceClient),mapToQueryString(t)}}
var DIt=b(()=>{zhn();Lhn();dC();Nhn();hIt();gQe();EQe();QFe();nMr();IQ();YXs();R7();x0();JXs();ofe();uI();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {yF,DIt};
