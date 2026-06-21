// @ts-nocheck
import {tg} from "../src/config/0048_ISSUES_EXPLAINER.ts";
import {Pt,Go} from "./m632.ts";
import {QQa} from "./m4386.ts";
import {fo} from "./m566.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {iY,ole} from "../src/telemetry/3324_reason.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
import {Gp} from "./m567.ts";
function U3l(e){return{Authorization:`Bearer ${e}`,"Content-Type":"application/json","anthropic-version":exm,"User-Agent":tg()}}
async function iPo(e,t,n,r,o,s,i,a){let l=`${e}/v1/code/sessions`,c={cwd:i??Pt(),...a&&{model:a}};if(s){let{buildGitSessionContext:p}=await Promise.resolve().then(() => QQa),{sources:m,outcomes:f}=await p(s.gitRepoUrl,s.branch,s.defaultBranch);if(m.length>0||f.length>0)c.sources=m,c.outcomes=f,c.reuse_outcome_branches=!0}let u;try{u=await fo.post(l,{title:n,bridge:{},...o?.length&&{tags:o},config:c},{headers:U3l(t),timeout:r,validateStatus:(p)=>p<500})}catch(p){return logForDebugging(`[code-session] Session create request failed: ${Se(p)}`),null}if(u.status!==200&&u.status!==201){let p=iY(u.data);return logForDebugging(`[code-session] Session create failed ${u.status}${p?`: ${p}`:""}`),null}let d=u.data;if(!d||typeof d!=="object"||!("session"in d)||!d.session||typeof d.session!=="object"||!("id"in d.session)||typeof d.session.id!=="string"||!d.session.id.startsWith("cse_"))return logForDebugging(`[code-session] No session.id (cse_*) in response: ${Le(d).slice(0,200)}`),null;return d.session.id}
function PAt(e){return e!==null&&"terminal"in e}
function txm(e,t){if(e!==null&&typeof e==="object"&&"error"in e&&e.error!==null&&typeof e.error==="object"&&"resource"in e.error){let n=e.error.resource;if(n==="untrusted_device"||n==="session_stale_relogin")return n;return}if(t?.includes("trusted device"))return"untrusted_device";return}
async function aPo(e,t,n,r,o){let s=`${t}/v1/code/sessions/${e}/bridge`,i=U3l(n);if(o)i["X-Trusted-Device-Token"]=o;let a;try{a=await fo.post(s,{},{headers:i,timeout:r,validateStatus:(d)=>d<500})}catch(d){return logForDebugging(`[code-session] /bridge request failed: ${Se(d)}`),null}if(a.status!==200){let d=iY(a.data);if(logForDebugging(`[code-session] /bridge failed ${a.status}${d?`: ${d}`:""}`),a.status===403){let p=txm(a.data,d);if(p)return{terminal:!0,reason:p}}return null}let l=a.data;if(l===null||typeof l!=="object"||!("worker_jwt"in l)||typeof l.worker_jwt!=="string"||!("expires_in"in l)||typeof l.expires_in!=="number"||!("api_base_url"in l)||typeof l.api_base_url!=="string"||!("worker_epoch"in l))return logForDebugging(`[code-session] /bridge response malformed (need worker_jwt, expires_in, api_base_url, worker_epoch): ${Le(l).slice(0,200)}`),null;let c=l.worker_epoch,u=typeof c==="string"?Number(c):c;if(typeof u!=="number"||!Number.isFinite(u)||!Number.isSafeInteger(u))return logForDebugging(`[code-session] /bridge worker_epoch invalid: ${Le(c)}`),null;return{worker_jwt:l.worker_jwt,api_base_url:l.api_base_url,expires_in:l.expires_in,worker_epoch:u}}
var exm="2023-06-01";
var lPo=b(()=>{Gp();Go();qe();bt();Xt();ole()});
export {U3l,iPo,PAt,txm,aPo,exm,lPo};
