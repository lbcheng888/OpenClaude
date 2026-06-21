// @ts-nocheck
import {qwt,aHr} from "./m1636.ts";
import {kpn,aWs,lWs} from "./m1657.ts";
import {cse} from "./m1654.ts";
import {b} from "../runtime.ts";
function U1u(){return`----AzSDKFormBoundary${qwt()}`}
function $1u(e){let t="";for(let[n,r]of e)t+=`${n}: ${r}\r
`;return t}
function q1u(e){if(e instanceof Uint8Array)return e.byteLength;else if(kpn(e))return e.size===-1?void 0:e.size;else return}
function j1u(e){let t=0;for(let n of e){let r=q1u(n);if(r===void 0)return;else t+=r}return t}
async function W1u(e,t,n){let r=[cse(`--${n}`,"utf-8"),...t.flatMap((s)=>[cse(`\r
`,"utf-8"),cse($1u(s.headers),"utf-8"),cse(`\r
`,"utf-8"),s.body,cse(`\r
--${n}`,"utf-8")]),cse(`--\r
\r
`,"utf-8")],o=j1u(r);if(o)e.headers.set("Content-Length",o);e.body=await aWs(r)}
function K1u(e){if(e.length>G1u)throw Error(`Multipart boundary "${e}" exceeds maximum length of 70 characters`);if(Array.from(e).some((t)=>!V1u.has(t)))throw Error(`Multipart boundary "${e}" contains invalid characters`)}
function MHr(){return{name:Ipn,async sendRequest(e,t){var n;if(!e.multipartBody)return t(e);if(e.body)throw Error("multipartBody and regular body cannot be set at the same time");let r=e.multipartBody.boundary,o=(n=e.headers.get("Content-Type"))!==null&&n!==void 0?n:"multipart/mixed",s=o.match(/^(multipart\/[^ ;]+)(?:; *boundary=(.+))?$/);if(!s)throw Error(`Got multipart request body, but content-type header was not multipart: ${o}`);let[,i,a]=s;if(a&&r&&a!==r)throw Error(`Multipart boundary was specified as ${a} in the header, but got ${r} in the request body`);if(r!==null&&r!==void 0||(r=a),r)K1u(r);else r=U1u();return e.headers.set("Content-Type",`${i}; boundary=${r}`),await W1u(e,e.multipartBody.parts,r),e.multipartBody=void 0,t(e)}}}
var Ipn="multipartPolicy",G1u=70,V1u;
var cWs=b(()=>{aHr();lWs();V1u=new Set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'()+,-./:=?")});
export {U1u,$1u,q1u,j1u,W1u,K1u,MHr,Ipn,G1u,V1u,cWs};
