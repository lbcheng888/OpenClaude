// @ts-nocheck
import {b} from "../runtime.ts";
import {oC,rr} from "./m466.ts";
import {$nn,ooe} from "./m536.ts";
import {wAt,MEe} from "./m524.ts";
import {S5,Hi} from "./m467.ts";
import {c1e,b5} from "./m535.ts";
import {GX,X_} from "./m528.ts";
import {roe,Iv} from "./m533.ts";
import {Jnn,Ope} from "./m556.ts";
import {x_r,Znn} from "./m561.ts";
import {MAt} from "./m547.ts";
var pVc,Ees;
var Ces=b(()=>{oC();$nn();wAt();S5();c1e();GX();roe();Jnn();x_r();pVc=typeof XMLHttpRequest<"u",Ees=pVc&&function(e){return new Promise(function(n,r){let o=Znn(e),s=o.data,i=Iv.from(o.headers).normalize(),{responseType:a,onUploadProgress:l,onDownloadProgress:c}=o,u,d,p,m,f;function h(){m&&m(),f&&f(),o.cancelToken&&o.cancelToken.unsubscribe(u),o.signal&&o.signal.removeEventListener("abort",u)}let g=new XMLHttpRequest;g.open(o.method.toUpperCase(),o.url,!0),g.timeout=o.timeout;function _(){if(!g)return;let y=Iv.from("getAllResponseHeaders"in g&&g.getAllResponseHeaders()),E={data:!a||a==="text"||a==="json"?g.responseText:g.response,status:g.status,statusText:g.statusText,headers:y,config:e,request:g};ooe(function(w){n(w),h()},function(w){r(w),h()},E),g=null}if("onloadend"in g)g.onloadend=_;else g.onreadystatechange=function(){if(!g||g.readyState!==4)return;if(g.status===0&&!(g.responseURL&&g.responseURL.indexOf("file:")===0))return;setTimeout(_)};if(g.onabort=function(){if(!g)return;r(new Hi("Request aborted",Hi.ECONNABORTED,e,g)),g=null},g.onerror=function(S){let E=S&&S.message?S.message:"Network Error",R=new Hi(E,Hi.ERR_NETWORK,e,g);R.event=S||null,r(R),g=null},g.ontimeout=function(){let S=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded",E=o.transitional||MEe;if(o.timeoutErrorMessage)S=o.timeoutErrorMessage;r(new Hi(S,E.clarifyTimeoutError?Hi.ETIMEDOUT:Hi.ECONNABORTED,e,g)),g=null},s===void 0&&i.setContentType(null),"setRequestHeader"in g)rr.forEach(i.toJSON(),function(S,E){g.setRequestHeader(E,S)});if(!rr.isUndefined(o.withCredentials))g.withCredentials=!!o.withCredentials;if(a&&a!=="json")g.responseType=o.responseType;if(c)[p,f]=Ope(c,!0),g.addEventListener("progress",p);if(l&&g.upload)[d,m]=Ope(l),g.upload.addEventListener("progress",d),g.upload.addEventListener("loadend",m);if(o.cancelToken||o.signal){if(u=(y)=>{if(!g)return;r(!y||y.type?new b5(null,e,g):y),g.abort(),g=null},o.cancelToken&&o.cancelToken.subscribe(u),o.signal)o.signal.aborted?u():o.signal.addEventListener("abort",u)}let T=MAt(o.url);if(T&&X_.protocols.indexOf(T)===-1){r(new Hi("Unsupported protocol "+T+":",Hi.ERR_BAD_REQUEST,e));return}g.send(s||null)})}});
export {pVc,Ees,Ces};
