// @ts-nocheck
import {ase,$wt} from "./m1635.ts";
import {qwt,aHr} from "./m1636.ts";
import {b} from "../runtime.ts";
class k5s{constructor(e){var t,n,r,o,s,i,a;this.url=e.url,this.body=e.body,this.headers=(t=e.headers)!==null&&t!==void 0?t:ase(),this.method=(n=e.method)!==null&&n!==void 0?n:"GET",this.timeout=(r=e.timeout)!==null&&r!==void 0?r:0,this.multipartBody=e.multipartBody,this.formData=e.formData,this.disableKeepAlive=(o=e.disableKeepAlive)!==null&&o!==void 0?o:!1,this.proxySettings=e.proxySettings,this.streamResponseStatusCodes=e.streamResponseStatusCodes,this.withCredentials=(s=e.withCredentials)!==null&&s!==void 0?s:!1,this.abortSignal=e.abortSignal,this.onUploadProgress=e.onUploadProgress,this.onDownloadProgress=e.onDownloadProgress,this.requestId=e.requestId||qwt(),this.allowInsecureConnection=(i=e.allowInsecureConnection)!==null&&i!==void 0?i:!1,this.enableBrowserStreams=(a=e.enableBrowserStreams)!==null&&a!==void 0?a:!1,this.requestOverrides=e.requestOverrides,this.authSchemes=e.authSchemes}}
function lHr(e){return new k5s(e)}
var H5s=b(()=>{$wt();aHr()});
export {k5s,lHr,H5s};
