// @ts-nocheck
import {ypr,nKo} from "./m517.ts";
import {zX,gen} from "./m554.ts";
import {pbt,Nzo} from "./m561.ts";
import {er,ZE} from "./m460.ts";
import {SR,soe} from "./m527.ts";
import {ebe,tbt} from "./m518.ts";
import {Sen,Lzo} from "./m560.ts";
import {gMe,aen} from "./m531.ts";
import {AMe,nen} from "./m516.ts";
import {b} from "../runtime.ts";
class mbt{constructor(e){this.defaults=e||{},this.interceptors={request:new ypr,response:new ypr}}async request(e,t){try{return await this._request(e,t)}catch(n){if(n instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=Error();let o=(()=>{if(!r.stack)return"";let s=r.stack.indexOf(`
`);return s===-1?"":r.stack.slice(s+1)})();try{if(!n.stack)n.stack=o;else if(o){let s=o.indexOf(`
`),i=s===-1?-1:o.indexOf(`
`,s+1),a=i===-1?"":o.slice(i+1);if(!String(n.stack).endsWith(a))n.stack+=`
`+o}}catch(s){}}throw n}}_request(e,t){if(typeof e==="string")t=t||{},t.url=e;else t=e||{};t=zX(this.defaults,t);let{transitional:n,paramsSerializer:r,headers:o}=t;if(n!==void 0)pbt.assertOptions(n,{silentJSONParsing:o7.transitional(o7.boolean),forcedJSONParsing:o7.transitional(o7.boolean),clarifyTimeoutError:o7.transitional(o7.boolean),legacyInterceptorReqResOrdering:o7.transitional(o7.boolean)},!1);if(r!=null)if(er.isFunction(r))t.paramsSerializer={serialize:r};else pbt.assertOptions(r,{encode:o7.function,serialize:o7.function},!0);if(t.allowAbsoluteUrls!==void 0);else if(this.defaults.allowAbsoluteUrls!==void 0)t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls;else t.allowAbsoluteUrls=!0;pbt.assertOptions(t,{baseUrl:o7.spelling("baseURL"),withXsrfToken:o7.spelling("withXSRFToken")},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase();let s=o&&er.merge(o.common,o[t.method]);o&&er.forEach(["delete","get","head","post","put","patch","common"],(m)=>{delete o[m]}),t.headers=SR.concat(s,o);let i=[],a=!0;this.interceptors.request.forEach(function(f){if(typeof f.runWhen==="function"&&f.runWhen(t)===!1)return;a=a&&f.synchronous;let A=t.transitional||ebe;if(A&&A.legacyInterceptorReqResOrdering)i.unshift(f.fulfilled,f.rejected);else i.push(f.fulfilled,f.rejected)});let l=[];this.interceptors.response.forEach(function(f){l.push(f.fulfilled,f.rejected)});let c,u=0,d;if(!a){let m=[Sen.bind(this),void 0];m.unshift(...i),m.push(...l),d=m.length,c=Promise.resolve(t);while(u<d)c=c.then(m[u++],m[u++]);return c}d=i.length;let p=t;while(u<d){let m=i[u++],f=i[u++];try{p=m(p)}catch(A){f.call(this,A);break}}try{c=Sen.call(this,p)}catch(m){return Promise.reject(m)}u=0,d=l.length;while(u<d)c=c.then(l[u++],l[u++]);return c}getUri(e){e=zX(this.defaults,e);let t=gMe(e.baseURL,e.url,e.allowAbsoluteUrls);return AMe(t,e.params,e.paramsSerializer)}}
var o7,fbt;
var Bzo=b(()=>{ZE();nen();nKo();Lzo();gen();aen();Nzo();soe();tbt();o7=pbt.validators;er.forEach(["delete","get","head","options"],function(t){mbt.prototype[t]=function(n,r){return this.request(zX(r||{},{method:t,url:n,data:(r||{}).data}))}});er.forEach(["post","put","patch"],function(t){function n(r){return function(s,i,a){return this.request(zX(a||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:s,data:i}))}}mbt.prototype[t]=n(),mbt.prototype[t+"Form"]=n(!0)});fbt=mbt});
export {mbt,o7,fbt,Bzo};
