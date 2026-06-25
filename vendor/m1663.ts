// @ts-nocheck
import {hHt,NPr} from "./m1641.ts";
import {dhn,nYs,rYs} from "./m1662.ts";
import {lse} from "./m1659.ts";
import {b} from "../runtime.ts";
function s6u(){return`----AzSDKFormBoundary${hHt()}`}
function i6u(e){let t="";for(let[n,r]of e)t+=`${n}: ${r}\r
`;return t}
function a6u(e){if(e instanceof Uint8Array)return e.byteLength;else if(dhn(e))return e.size===-1?void 0:e.size;else return}
function l6u(e){let t=0;for(let n of e){let r=a6u(n);if(r===void 0)return;else t+=r}return t}
async function c6u(e,t,n){let r=[lse(`--${n}`,"utf-8"),...t.flatMap((s)=>[lse(`\r
`,"utf-8"),lse(i6u(s.headers),"utf-8"),lse(`\r
`,"utf-8"),s.body,lse(`\r
--${n}`,"utf-8")]),lse(`--\r
\r
`,"utf-8")],o=l6u(r);if(o)e.headers.set("Content-Length",o);e.body=await nYs(r)}
function p6u(e){if(e.length>u6u)throw Error(`Multipart boundary "${e}" exceeds maximum length of 70 characters`);if(Array.from(e).some((t)=>!d6u.has(t)))throw Error(`Multipart boundary "${e}" contains invalid characters`)}
function pOr(){return{name:mhn,async sendRequest(e,t){var n;if(!e.multipartBody)return t(e);if(e.body)throw Error("multipartBody and regular body cannot be set at the same time");let r=e.multipartBody.boundary,o=(n=e.headers.get("Content-Type"))!==null&&n!==void 0?n:"multipart/mixed",s=o.match(/^(multipart\/[^ ;]+)(?:; *boundary=(.+))?$/);if(!s)throw Error(`Got multipart request body, but content-type header was not multipart: ${o}`);let[,i,a]=s;if(a&&r&&a!==r)throw Error(`Multipart boundary was specified as ${a} in the header, but got ${r} in the request body`);if(r!==null&&r!==void 0||(r=a),r)p6u(r);else r=s6u();return e.headers.set("Content-Type",`${i}; boundary=${r}`),await c6u(e,e.multipartBody.parts,r),e.multipartBody=void 0,t(e)}}}
var mhn="multipartPolicy",u6u=70,d6u;
var oYs=b(()=>{NPr();rYs();d6u=new Set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'()+,-./:=?")});
export {s6u,i6u,a6u,l6u,c6u,p6u,pOr,mhn,u6u,d6u,oYs};
