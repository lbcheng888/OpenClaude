// @ts-nocheck
import {Lpn,Opn,qHr} from "./m1666.ts";
import {lse} from "./m1640.ts";
import {Zwt} from "./m1687.ts";
import {Pme,xpn} from "./m1648.ts";
import {iJe} from "./m1673.ts";
import {Npn,fCe} from "./m1674.ts";
import {eRt,$pn} from "./m1689.ts";
import {b} from "../runtime.ts";
import {zHr} from "./m1688.ts";
import {Mpn} from "./m1668.ts";
function AGs(e={}){let t=Lpn(e.userAgentPrefix),n=new lse({additionalAllowedQueryParameters:e.additionalAllowedQueryParameters}),r=wNu();return{name:vNu,async sendRequest(o,s){var i;if(!r)return s(o);let a=await t,l={"http.url":n.sanitizeUrl(o.url),"http.method":o.method,"http.user_agent":a,requestId:o.requestId};if(a)l["http.user_agent"]=a;let{span:c,tracingContext:u}=(i=RNu(r,o,l))!==null&&i!==void 0?i:{};if(!c||!u)return s(o);try{let d=await r.withContext(u,s,o);return kNu(c,d),d}catch(d){throw xNu(c,d),d}}}}
function wNu(){try{return Zwt({namespace:"",packageName:"@azure/core-rest-pipeline",packageVersion:Opn})}catch(e){Pme.warning(`Error when creating the TracingClient: ${iJe(e)}`);return}}
function RNu(e,t,n){try{let{span:r,updatedOptions:o}=e.startSpan(`HTTP ${t.method}`,{tracingOptions:t.tracingOptions},{spanKind:"client",spanAttributes:n});if(!r.isRecording()){r.end();return}let s=e.createRequestHeaders(o.tracingOptions.tracingContext);for(let[i,a]of Object.entries(s))t.headers.set(i,a);return{span:r,tracingContext:o.tracingOptions.tracingContext}}catch(r){Pme.warning(`Skipping creating a tracing span due to an error: ${iJe(r)}`);return}}
function xNu(e,t){try{if(e.setStatus({status:"error",error:Npn(t)?t:void 0}),eRt(t)&&t.statusCode)e.setAttribute("http.status_code",t.statusCode);e.end()}catch(n){Pme.warning(`Skipping tracing span processing due to an error: ${iJe(n)}`)}}
function kNu(e,t){try{e.setAttribute("http.status_code",t.status);let n=t.headers.get("x-ms-request-id");if(n)e.setAttribute("serviceRequestId",n);if(t.status>=400)e.setStatus({status:"error"});e.end()}catch(n){Pme.warning(`Skipping tracing span processing due to an error: ${iJe(n)}`)}}
var vNu="tracingPolicy";
var hGs=b(()=>{zHr();qHr();xpn();fCe();$pn();Mpn()});
export {AGs,wNu,RNu,xNu,kNu,vNu,hGs};
