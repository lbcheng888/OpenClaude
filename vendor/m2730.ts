// @ts-nocheck
import {ZT,sO} from "../src/config/2194_level.ts";
import {Vs,lT} from "./m2195.ts";
import {OAUTH_BETA_HEADER,Sc} from "../src/api/0465_getOauthConfig.ts";
import {qt,TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
function OKr(){return ZT()!==null}
function F$e(){return OKr()}
async function B$e(e,t,n,r){let o=await Vs.post(QLd,{op:e,...t},{auth:"session-jwt",timeout:k4i,validateStatus:()=>!0,signal:r});if(o.ok&&o.status>=300)throw new Jrt(n,o.status,ZLd(o.data));return dge(o,n)}
function ZLd(e){return e!==null&&typeof e==="object"&&"error"in e&&typeof e.error==="string"?e.error:e}
function Rke(e){return{auth:"teleport-org",timeout:k4i,headers:{"anthropic-beta":OAUTH_BETA_HEADER},validateStatus:()=>!0,signal:e}}
function vke(e,t){return`/api/organizations/:orgUUID/projects/${encodeURIComponent(e)}${t}`}
async function wke(e,t){if(F$e())return B$e("detail",{},"get project detail",t);let n=await Vs.get(vke(e,"/detail"),Rke(t));return dge(n,"get project detail")}
async function H4i(e,t){if(F$e())return B$e("kb-stats",{},"get knowledge stats",t);let n=await Vs.get(vke(e,"/kb/stats"),Rke(t));return dge(n,"get knowledge stats")}
async function I4i(e,t,n){if(F$e())return B$e("read-doc",{doc_uuid:t},"read doc",n);let r=await Vs.get(vke(e,`/docs/${encodeURIComponent(t)}`),Rke(n));return dge(r,"read doc")}
async function x4i(e,t,n){if(F$e())return B$e("read-file",{file_uuid:t},"read file",n);let r=await Vs.get(vke(e,`/files/${encodeURIComponent(t)}/extracted`),Rke(n));return dge(r,"read file")}
async function LKr(e,t,n,r){if(F$e())return B$e("write-doc",{file_name:t,content:n},"create doc",r);let o=await Vs.post(vke(e,"/docs"),{file_name:t,content:n},Rke(r));return dge(o,"create doc")}
async function D4i(e,t,n,r){let o=await Vs.patch(vke(e,`/docs/${encodeURIComponent(t)}`),{content:n},Rke(r));return dge(o,"update doc")}
async function MKr(e,t,n){if(F$e()){await B$e("delete-doc",{doc_uuid:t},"delete doc",n);return}let r=await Vs.delete(vke(e,`/docs/${encodeURIComponent(t)}`),Rke(n));dge(r,"delete doc")}
async function P4i(e,t,n,r){if(F$e())return w4i(await B$e("kb-search",{query:t,n},"search knowledge base",r));let o=await Vs.get(vke(e,`/kb/search?query=${encodeURIComponent(t)}&n=${n}`),Rke(r));return w4i(dge(o,"search knowledge base"))}
function w4i(e){if(typeof e==="string")try{return qt(e)}catch{return e}return e}
function O4i(e,t){if(!t)return e;return e.split(t).join("[redacted-oauth-token]")}
function dge(e,t){if(!e.ok)throw new Jrt(t,0,e.reason==="no-auth"?e.detail:e.reason);if(e.status<200||e.status>=300)throw new Jrt(t,e.status,e.data);return e.data}
function eMd(e){if(e==null)return"";if(typeof e==="string")return e?`: ${e.slice(0,200)}`:"";try{return`: ${TeamDeleteToolName(e).slice(0,200)}`}catch{return`: ${String(e).slice(0,200)}`}}
var k4i=30000,QLd="/v2/ccr-sessions/-/chat-project",Jrt;
var NKr=b(()=>{Sc();lT();sO();tn();Jrt=class Jrt extends Error{action;status;body;constructor(e,t,n){super(`Projects API: ${e} failed (HTTP ${t})${eMd(n)}`);this.action=e;this.status=t;this.body=n;this.name="ProjectsApiError"}}});
export {OKr,F$e,B$e,ZLd,Rke,vke,wke,H4i,I4i,x4i,LKr,D4i,MKr,P4i,w4i,O4i,dge,eMd,k4i,QLd,Jrt,NKr};
