// @ts-nocheck
import {_hn,ghn,yOr} from "./m1671.ts";
import {ase} from "./m1645.ts";
import {vHt} from "./m1692.ts";
import {qme,uhn} from "./m1653.ts";
import {oQe} from "./m1678.ts";
import {Thn,XAe} from "./m1679.ts";
import {wHt,Chn} from "./m1694.ts";
import {b} from "../runtime.ts";
import {AOr} from "./m1693.ts";
import {yhn} from "./m1673.ts";
function uJs(e={}){let t=_hn(e.userAgentPrefix),n=new ase({additionalAllowedQueryParameters:e.additionalAllowedQueryParameters}),r=V6u();return{name:G6u,async sendRequest(o,s){var i;if(!r)return s(o);let a=await t,l={"http.url":n.sanitizeUrl(o.url),"http.method":o.method,"http.user_agent":a,requestId:o.requestId};if(a)l["http.user_agent"]=a;let{span:c,tracingContext:u}=(i=K6u(r,o,l))!==null&&i!==void 0?i:{};if(!c||!u)return s(o);try{let d=await r.withContext(u,s,o);return j6u(c,d),d}catch(d){throw z6u(c,d),d}}}}
function V6u(){try{return vHt({namespace:"",packageName:"@azure/core-rest-pipeline",packageVersion:ghn})}catch(e){qme.warning(`Error when creating the TracingClient: ${oQe(e)}`);return}}
function K6u(e,t,n){try{let{span:r,updatedOptions:o}=e.startSpan(`HTTP ${t.method}`,{tracingOptions:t.tracingOptions},{spanKind:"client",spanAttributes:n});if(!r.isRecording()){r.end();return}let s=e.createRequestHeaders(o.tracingOptions.tracingContext);for(let[i,a]of Object.entries(s))t.headers.set(i,a);return{span:r,tracingContext:o.tracingOptions.tracingContext}}catch(r){qme.warning(`Skipping creating a tracing span due to an error: ${oQe(r)}`);return}}
function z6u(e,t){try{if(e.setStatus({status:"error",error:Thn(t)?t:void 0}),wHt(t)&&t.statusCode)e.setAttribute("http.status_code",t.statusCode);e.end()}catch(n){qme.warning(`Skipping tracing span processing due to an error: ${oQe(n)}`)}}
function j6u(e,t){try{e.setAttribute("http.status_code",t.status);let n=t.headers.get("x-ms-request-id");if(n)e.setAttribute("serviceRequestId",n);if(t.status>=400)e.setStatus({status:"error"});e.end()}catch(n){qme.warning(`Skipping tracing span processing due to an error: ${oQe(n)}`)}}
var G6u="tracingPolicy";
var dJs=b(()=>{AOr();yOr();uhn();XAe();Chn();yhn()});
export {uJs,V6u,K6u,z6u,j6u,G6u,dJs};
