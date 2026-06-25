// @ts-nocheck
import {ise,fHt} from "./m1640.ts";
import {hHt,NPr} from "./m1641.ts";
import {b} from "../runtime.ts";
class Ajs{constructor(e){var t,n,r,o,s,i,a;this.url=e.url,this.body=e.body,this.headers=(t=e.headers)!==null&&t!==void 0?t:ise(),this.method=(n=e.method)!==null&&n!==void 0?n:"GET",this.timeout=(r=e.timeout)!==null&&r!==void 0?r:0,this.multipartBody=e.multipartBody,this.formData=e.formData,this.disableKeepAlive=(o=e.disableKeepAlive)!==null&&o!==void 0?o:!1,this.proxySettings=e.proxySettings,this.streamResponseStatusCodes=e.streamResponseStatusCodes,this.withCredentials=(s=e.withCredentials)!==null&&s!==void 0?s:!1,this.abortSignal=e.abortSignal,this.onUploadProgress=e.onUploadProgress,this.onDownloadProgress=e.onDownloadProgress,this.requestId=e.requestId||hHt(),this.allowInsecureConnection=(i=e.allowInsecureConnection)!==null&&i!==void 0?i:!1,this.enableBrowserStreams=(a=e.enableBrowserStreams)!==null&&a!==void 0?a:!1,this.requestOverrides=e.requestOverrides,this.authSchemes=e.authSchemes}}
function FPr(e){return new Ajs(e)}
var Rjs=b(()=>{fHt();NPr()});
export {Ajs,FPr,Rjs};
