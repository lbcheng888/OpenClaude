// @ts-nocheck
import {iXs,aXs} from "./m1714.ts";
import {tXs,nXs} from "./m1712.ts";
import {oXs,sXs} from "./m1713.ts";
import {t8} from "./m1699.ts";
import {Vme,HHt} from "./m1707.ts";
import {JJs,Hhn} from "./m1709.ts";
import {IOr,qJs} from "./m1704.ts";
import {ZJs,eXs} from "./m1711.ts";
import {b} from "../runtime.ts";
import {cse} from "./m1703.ts";
class Ihn{constructor(e={}){var t,n;if(this._requestContentType=e.requestContentType,this._endpoint=(t=e.endpoint)!==null&&t!==void 0?t:e.baseUri,e.baseUri)iXs.warning("The baseUri option for SDK Clients has been deprecated, please use endpoint instead.");if(this._allowInsecureConnection=e.allowInsecureConnection,this._httpClient=e.httpClient||tXs(),this.pipeline=e.pipeline||v5u(e),(n=e.additionalPolicies)===null||n===void 0?void 0:n.length)for(let{policy:r,position:o}of e.additionalPolicies){let s=o==="perRetry"?"Sign":void 0;this.pipeline.addPolicy(r,{afterPhase:s})}}async sendRequest(e){return this.pipeline.sendRequest(this._httpClient,e)}async sendOperationRequest(e,t){let n=t.baseUrl||this._endpoint;if(!n)throw Error("If operationSpec.baseUrl is not specified, then the ServiceClient must have a endpoint string property that contains the base URL to use.");let r=oXs(n,t,e,this),o=t8({url:r});o.method=t.httpMethod;let s=Vme(o);s.operationSpec=t,s.operationArguments=e;let i=t.contentType||this._requestContentType;if(i&&t.requestBody)o.headers.set("Content-Type",i);let a=e.options;if(a){let l=a.requestOptions;if(l){if(l.timeout)o.timeout=l.timeout;if(l.onUploadProgress)o.onUploadProgress=l.onUploadProgress;if(l.onDownloadProgress)o.onDownloadProgress=l.onDownloadProgress;if(l.shouldDeserialize!==void 0)s.shouldDeserialize=l.shouldDeserialize;if(l.allowInsecureConnection)o.allowInsecureConnection=!0}if(a.abortSignal)o.abortSignal=a.abortSignal;if(a.tracingOptions)o.tracingOptions=a.tracingOptions}if(this._allowInsecureConnection)o.allowInsecureConnection=!0;if(o.streamResponseStatusCodes===void 0)o.streamResponseStatusCodes=JJs(t);try{let l=await this.sendRequest(o),c=IOr(l,t.responses[l.status]);if(a===null||a===void 0?void 0:a.onResponse)a.onResponse(l,c);return c}catch(l){if(typeof l==="object"&&(l===null||l===void 0?void 0:l.response)){let c=l.response,u=IOr(c,t.responses[l.statusCode]||t.responses.default);if(l.details=u,a===null||a===void 0?void 0:a.onResponse)a.onResponse(c,u,l)}throw l}}}
function v5u(e){let t=w5u(e),n=e.credential&&t?{credentialScopes:t,credential:e.credential}:void 0;return ZJs(Object.assign(Object.assign({},e),{credentialOptions:n}))}
function w5u(e){if(e.credentialScopes)return e.credentialScopes;if(e.endpoint)return`${e.endpoint}/.default`;if(e.baseUri)return`${e.baseUri}/.default`;if(e.credential&&!e.credentialScopes)throw Error("When using credentials, the ServiceClientOptions must contain either a endpoint or a credentialScopes. Unable to create a bearerTokenAuthenticationPolicy");return}
var lXs=b(()=>{cse();eXs();qJs();nXs();HHt();sXs();Hhn();aXs()});
export {Ihn,v5u,w5u,lXs};
