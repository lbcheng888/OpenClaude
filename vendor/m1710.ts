// @ts-nocheck
import {dVs,pVs} from "./m1709.ts";
import {iVs,aVs} from "./m1707.ts";
import {cVs,uVs} from "./m1708.ts";
import {$8} from "./m1694.ts";
import {Mme,nRt} from "./m1702.ts";
import {tVs,Kpn} from "./m1704.ts";
import {eIr,KGs} from "./m1699.ts";
import {oVs,sVs} from "./m1706.ts";
import {b} from "../runtime.ts";
import {use} from "./m1698.ts";
class zpn{constructor(e={}){var t,n;if(this._requestContentType=e.requestContentType,this._endpoint=(t=e.endpoint)!==null&&t!==void 0?t:e.baseUri,e.baseUri)dVs.warning("The baseUri option for SDK Clients has been deprecated, please use endpoint instead.");if(this._allowInsecureConnection=e.allowInsecureConnection,this._httpClient=e.httpClient||iVs(),this.pipeline=e.pipeline||aBu(e),(n=e.additionalPolicies)===null||n===void 0?void 0:n.length)for(let{policy:r,position:o}of e.additionalPolicies){let s=o==="perRetry"?"Sign":void 0;this.pipeline.addPolicy(r,{afterPhase:s})}}async sendRequest(e){return this.pipeline.sendRequest(this._httpClient,e)}async sendOperationRequest(e,t){let n=t.baseUrl||this._endpoint;if(!n)throw Error("If operationSpec.baseUrl is not specified, then the ServiceClient must have a endpoint string property that contains the base URL to use.");let r=cVs(n,t,e,this),o=$8({url:r});o.method=t.httpMethod;let s=Mme(o);s.operationSpec=t,s.operationArguments=e;let i=t.contentType||this._requestContentType;if(i&&t.requestBody)o.headers.set("Content-Type",i);let a=e.options;if(a){let l=a.requestOptions;if(l){if(l.timeout)o.timeout=l.timeout;if(l.onUploadProgress)o.onUploadProgress=l.onUploadProgress;if(l.onDownloadProgress)o.onDownloadProgress=l.onDownloadProgress;if(l.shouldDeserialize!==void 0)s.shouldDeserialize=l.shouldDeserialize;if(l.allowInsecureConnection)o.allowInsecureConnection=!0}if(a.abortSignal)o.abortSignal=a.abortSignal;if(a.tracingOptions)o.tracingOptions=a.tracingOptions}if(this._allowInsecureConnection)o.allowInsecureConnection=!0;if(o.streamResponseStatusCodes===void 0)o.streamResponseStatusCodes=tVs(t);try{let l=await this.sendRequest(o),c=eIr(l,t.responses[l.status]);if(a===null||a===void 0?void 0:a.onResponse)a.onResponse(l,c);return c}catch(l){if(typeof l==="object"&&(l===null||l===void 0?void 0:l.response)){let c=l.response,u=eIr(c,t.responses[l.statusCode]||t.responses.default);if(l.details=u,a===null||a===void 0?void 0:a.onResponse)a.onResponse(c,u,l)}throw l}}}
function aBu(e){let t=lBu(e),n=e.credential&&t?{credentialScopes:t,credential:e.credential}:void 0;return oVs(Object.assign(Object.assign({},e),{credentialOptions:n}))}
function lBu(e){if(e.credentialScopes)return e.credentialScopes;if(e.endpoint)return`${e.endpoint}/.default`;if(e.baseUri)return`${e.baseUri}/.default`;if(e.credential&&!e.credentialScopes)throw Error("When using credentials, the ServiceClientOptions must contain either a endpoint or a credentialScopes. Unable to create a bearerTokenAuthenticationPolicy");return}
var mVs=b(()=>{use();sVs();KGs();aVs();nRt();uVs();Kpn();pVs()});
export {zpn,aBu,lBu,mVs};
