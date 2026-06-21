// @ts-nocheck
import {sS,UO} from "../src/config/2189_level.ts";
import {si,gT} from "./m2190.ts";
import {OAUTH_BETA_HEADER,Dc} from "../src/api/0459_getOauthConfig.ts";
import {qt,Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
function r8r(){return sS()!==null}
function I2e(){return r8r()}
async function D2e(e,t,n,r){let o=await si.post(Swd,{op:e,...t},{auth:"session-jwt",timeout:jBi,validateStatus:()=>!0,signal:r});if(o.ok&&o.status>=300)throw new ztt(n,o.status,bwd(o.data));return ZAe(o,n)}
function bwd(e){return e!==null&&typeof e==="object"&&"error"in e&&typeof e.error==="string"?e.error:e}
function $Re(e){return{auth:"teleport-org",timeout:jBi,headers:{"anthropic-beta":OAUTH_BETA_HEADER},validateStatus:()=>!0,signal:e}}
function qRe(e,t){return`/api/organizations/:orgUUID/projects/${encodeURIComponent(e)}${t}`}
async function jRe(e,t){if(I2e())return D2e("detail",{},"get project detail",t);let n=await si.get(qRe(e,"/detail"),$Re(t));return ZAe(n,"get project detail")}
async function WBi(e,t){if(I2e())return D2e("kb-stats",{},"get knowledge stats",t);let n=await si.get(qRe(e,"/kb/stats"),$Re(t));return ZAe(n,"get knowledge stats")}
async function GBi(e,t,n){if(I2e())return D2e("read-doc",{doc_uuid:t},"read doc",n);let r=await si.get(qRe(e,`/docs/${encodeURIComponent(t)}`),$Re(n));return ZAe(r,"read doc")}
async function VBi(e,t,n){if(I2e())return D2e("read-file",{file_uuid:t},"read file",n);let r=await si.get(qRe(e,`/files/${encodeURIComponent(t)}/extracted`),$Re(n));return ZAe(r,"read file")}
async function o8r(e,t,n,r){if(I2e())return D2e("write-doc",{file_name:t,content:n},"create doc",r);let o=await si.post(qRe(e,"/docs"),{file_name:t,content:n},$Re(r));return ZAe(o,"create doc")}
async function KBi(e,t,n,r){let o=await si.patch(qRe(e,`/docs/${encodeURIComponent(t)}`),{content:n},$Re(r));return ZAe(o,"update doc")}
async function s8r(e,t,n){if(I2e()){await D2e("delete-doc",{doc_uuid:t},"delete doc",n);return}let r=await si.delete(qRe(e,`/docs/${encodeURIComponent(t)}`),$Re(n));ZAe(r,"delete doc")}
async function zBi(e,t,n,r){if(I2e())return qBi(await D2e("kb-search",{query:t,n},"search knowledge base",r));let o=await si.get(qRe(e,`/kb/search?query=${encodeURIComponent(t)}&n=${n}`),$Re(r));return qBi(ZAe(o,"search knowledge base"))}
function qBi(e){if(typeof e==="string")try{return qt(e)}catch{return e}return e}
function YBi(e,t){if(!t)return e;return e.split(t).join("[redacted-oauth-token]")}
function ZAe(e,t){if(!e.ok)throw new ztt(t,0,e.reason==="no-auth"?e.detail:e.reason);if(e.status<200||e.status>=300)throw new ztt(t,e.status,e.data);return e.data}
function Ewd(e){if(e==null)return"";if(typeof e==="string")return e?`: ${e.slice(0,200)}`:"";try{return`: ${Le(e).slice(0,200)}`}catch{return`: ${String(e).slice(0,200)}`}}
var jBi=30000,Swd="/v2/ccr-sessions/-/chat-project",ztt;
var i8r=b(()=>{Dc();gT();UO();Xt();ztt=class ztt extends Error{action;status;body;constructor(e,t,n){super(`Projects API: ${e} failed (HTTP ${t})${Ewd(n)}`);this.action=e;this.status=t;this.body=n;this.name="ProjectsApiError"}}});
export {r8r,I2e,D2e,bwd,$Re,qRe,jRe,WBi,GBi,VBi,o8r,KBi,s8r,zBi,qBi,YBi,ZAe,Ewd,jBi,Swd,ztt,i8r};
