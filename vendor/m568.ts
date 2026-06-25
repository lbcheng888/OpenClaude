// @ts-nocheck
import {jgr,ZQo} from "./m523.ts";
import {VX,Qnn} from "./m560.ts";
import {FAt,Oes} from "./m567.ts";
import {rr,oC} from "./m466.ts";
import {Iv,roe} from "./m533.ts";
import {MEe,wAt} from "./m524.ts";
import {nrn,Des} from "./m566.ts";
import {u1e,qnn} from "./m537.ts";
import {l1e,Nnn} from "./m522.ts";
import {b} from "../runtime.ts";
class BAt{constructor(e){this.defaults=e||{},this.interceptors={request:new jgr,response:new jgr}}async request(e,t){try{return await this._request(e,t)}catch(n){if(n instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=Error();let o=(()=>{if(!r.stack)return"";let s=r.stack.indexOf(`
`);return s===-1?"":r.stack.slice(s+1)})();try{if(!n.stack)n.stack=o;else if(o){let s=o.indexOf(`
`),i=s===-1?-1:o.indexOf(`
`,s+1),a=i===-1?"":o.slice(i+1);if(!String(n.stack).endsWith(a))n.stack+=`
`+o}}catch(s){}}throw n}}_request(e,t){if(typeof e==="string")t=t||{},t.url=e;else t=e||{};t=VX(this.defaults,t);let{transitional:n,paramsSerializer:r,headers:o}=t;if(n!==void 0)FAt.assertOptions(n,{silentJSONParsing:HK.transitional(HK.boolean),forcedJSONParsing:HK.transitional(HK.boolean),clarifyTimeoutError:HK.transitional(HK.boolean),legacyInterceptorReqResOrdering:HK.transitional(HK.boolean)},!1);if(r!=null)if(rr.isFunction(r))t.paramsSerializer={serialize:r};else FAt.assertOptions(r,{encode:HK.function,serialize:HK.function},!0);if(t.allowAbsoluteUrls!==void 0);else if(this.defaults.allowAbsoluteUrls!==void 0)t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls;else t.allowAbsoluteUrls=!0;FAt.assertOptions(t,{baseUrl:HK.spelling("baseURL"),withXsrfToken:HK.spelling("withXSRFToken")},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase();let s=o&&rr.merge(o.common,o[t.method]);o&&rr.forEach(["delete","get","head","post","put","patch","common"],(m)=>{delete o[m]}),t.headers=Iv.concat(s,o);let i=[],a=!0;this.interceptors.request.forEach(function(f){if(typeof f.runWhen==="function"&&f.runWhen(t)===!1)return;a=a&&f.synchronous;let h=t.transitional||MEe;if(h&&h.legacyInterceptorReqResOrdering)i.unshift(f.fulfilled,f.rejected);else i.push(f.fulfilled,f.rejected)});let l=[];this.interceptors.response.forEach(function(f){l.push(f.fulfilled,f.rejected)});let c,u=0,d;if(!a){let m=[nrn.bind(this),void 0];m.unshift(...i),m.push(...l),d=m.length,c=Promise.resolve(t);while(u<d)c=c.then(m[u++],m[u++]);return c}d=i.length;let p=t;while(u<d){let m=i[u++],f=i[u++];try{p=m(p)}catch(h){f.call(this,h);break}}try{c=nrn.call(this,p)}catch(m){return Promise.reject(m)}u=0,d=l.length;while(u<d)c=c.then(l[u++],l[u++]);return c}getUri(e){e=VX(this.defaults,e);let t=u1e(e.baseURL,e.url,e.allowAbsoluteUrls);return l1e(t,e.params,e.paramsSerializer)}}
var HK,UAt;
var Les=b(()=>{oC();Nnn();ZQo();Des();Qnn();qnn();Oes();roe();wAt();HK=FAt.validators;rr.forEach(["delete","get","head","options"],function(t){BAt.prototype[t]=function(n,r){return this.request(VX(r||{},{method:t,url:n,data:(r||{}).data}))}});rr.forEach(["post","put","patch"],function(t){function n(r){return function(s,i,a){return this.request(VX(a||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:s,data:i}))}}BAt.prototype[t]=n(),BAt.prototype[t+"Form"]=n(!0)});UAt=BAt});
export {BAt,HK,UAt,Les};
