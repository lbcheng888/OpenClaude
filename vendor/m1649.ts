// @ts-nocheck
import {mCe,Cpn} from "./m1642.ts";
import {b} from "../runtime.ts";
function gHr(e){return{name:"agentPolicy",sendRequest:async(t,n)=>{if(!t.agent)t.agent=e;return n(t)}}}
function _Hr(){return{name:"decompressResponsePolicy",async sendRequest(e,t){if(e.method!=="HEAD")e.headers.set("Accept-Encoding","gzip,deflate");return t(e)}}}
function yHr(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}
function Kwt(e,t){let n=t.retryDelayInMs*Math.pow(2,e),r=Math.min(t.maxRetryDelayInMs,n);return{retryAfterInMs:r/2+yHr(0,r/2)}}
var THr=()=>{};
function W5s(e,t,n){return new Promise((r,o)=>{let s=void 0,i=void 0,a=()=>o(new mCe((n===null||n===void 0?void 0:n.abortErrorMsg)?n===null||n===void 0?void 0:n.abortErrorMsg:R1u)),l=()=>{if((n===null||n===void 0?void 0:n.abortSignal)&&i)n.abortSignal.removeEventListener("abort",i)};if(i=()=>{if(s)clearTimeout(s);return l(),a()},(n===null||n===void 0?void 0:n.abortSignal)&&n.abortSignal.aborted)return a();if(s=setTimeout(()=>{l(),r(t)},e),n===null||n===void 0?void 0:n.abortSignal)n.abortSignal.addEventListener("abort",i)})}
function G5s(e,t){let n=e.headers.get(t);if(!n)return;let r=Number(n);if(Number.isNaN(r))return;return r}
var R1u="The operation was aborted.";
var SHr=b(()=>{Cpn()});
export {gHr,_Hr,yHr,Kwt,THr,W5s,G5s,R1u,SHr};
