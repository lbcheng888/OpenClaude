// @ts-nocheck
import {b} from "../runtime.ts";
import {ZE,er} from "./m460.ts";
import {ien,ioe} from "./m530.ts";
import {tbt,ebe} from "./m518.ts";
import {o8,Ji} from "./m461.ts";
import {hMe,s8} from "./m529.ts";
import {KX,Y_} from "./m522.ts";
import {soe,SR} from "./m527.ts";
import {Aen,wpe} from "./m550.ts";
import {nmr,_en} from "./m555.ts";
import {ubt} from "./m541.ts";
var s$c,vzo;
var wzo=b(()=>{ZE();ien();tbt();o8();hMe();KX();soe();Aen();nmr();s$c=typeof XMLHttpRequest<"u",vzo=s$c&&function(e){return new Promise(function(n,r){let o=_en(e),s=o.data,i=SR.from(o.headers).normalize(),{responseType:a,onUploadProgress:l,onDownloadProgress:c}=o,u,d,p,m,f;function A(){m&&m(),f&&f(),o.cancelToken&&o.cancelToken.unsubscribe(u),o.signal&&o.signal.removeEventListener("abort",u)}let h=new XMLHttpRequest;h.open(o.method.toUpperCase(),o.url,!0),h.timeout=o.timeout;function g(){if(!h)return;let y=SR.from("getAllResponseHeaders"in h&&h.getAllResponseHeaders()),S={data:!a||a==="text"||a==="json"?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:y,config:e,request:h};ioe(function(R){n(R),A()},function(R){r(R),A()},S),h=null}if("onloadend"in h)h.onloadend=g;else h.onreadystatechange=function(){if(!h||h.readyState!==4)return;if(h.status===0&&!(h.responseURL&&h.responseURL.indexOf("file:")===0))return;setTimeout(g)};if(h.onabort=function(){if(!h)return;r(new Ji("Request aborted",Ji.ECONNABORTED,e,h)),h=null},h.onerror=function(T){let S=T&&T.message?T.message:"Network Error",v=new Ji(S,Ji.ERR_NETWORK,e,h);v.event=T||null,r(v),h=null},h.ontimeout=function(){let T=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded",S=o.transitional||ebe;if(o.timeoutErrorMessage)T=o.timeoutErrorMessage;r(new Ji(T,S.clarifyTimeoutError?Ji.ETIMEDOUT:Ji.ECONNABORTED,e,h)),h=null},s===void 0&&i.setContentType(null),"setRequestHeader"in h)er.forEach(i.toJSON(),function(T,S){h.setRequestHeader(S,T)});if(!er.isUndefined(o.withCredentials))h.withCredentials=!!o.withCredentials;if(a&&a!=="json")h.responseType=o.responseType;if(c)[p,f]=wpe(c,!0),h.addEventListener("progress",p);if(l&&h.upload)[d,m]=wpe(l),h.upload.addEventListener("progress",d),h.upload.addEventListener("loadend",m);if(o.cancelToken||o.signal){if(u=(y)=>{if(!h)return;r(!y||y.type?new s8(null,e,h):y),h.abort(),h=null},o.cancelToken&&o.cancelToken.subscribe(u),o.signal)o.signal.aborted?u():o.signal.addEventListener("abort",u)}let _=ubt(o.url);if(_&&Y_.protocols.indexOf(_)===-1){r(new Ji("Unsupported protocol "+_+":",Ji.ERR_BAD_REQUEST,e));return}h.send(s||null)})}});
export {s$c,vzo,wzo};
