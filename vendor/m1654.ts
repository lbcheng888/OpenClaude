// @ts-nocheck
import {JAe,ihn} from "./m1647.ts";
import {b} from "../runtime.ts";
function zPr(e){return{name:"agentPolicy",sendRequest:async(t,n)=>{if(!t.agent)t.agent=e;return n(t)}}}
function jPr(){return{name:"decompressResponsePolicy",async sendRequest(e,t){if(e.method!=="HEAD")e.headers.set("Accept-Encoding","gzip,deflate");return t(e)}}}
function YPr(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}
function SHt(e,t){let n=t.retryDelayInMs*Math.pow(2,e),r=Math.min(t.maxRetryDelayInMs,n);return{retryAfterInMs:r/2+YPr(0,r/2)}}
var JPr=()=>{};
function Bjs(e,t,n){return new Promise((r,o)=>{let s=void 0,i=void 0,a=()=>o(new JAe((n===null||n===void 0?void 0:n.abortErrorMsg)?n===null||n===void 0?void 0:n.abortErrorMsg:Kqu)),l=()=>{if((n===null||n===void 0?void 0:n.abortSignal)&&i)n.abortSignal.removeEventListener("abort",i)};if(i=()=>{if(s)clearTimeout(s);return l(),a()},(n===null||n===void 0?void 0:n.abortSignal)&&n.abortSignal.aborted)return a();if(s=setTimeout(()=>{l(),r(t)},e),n===null||n===void 0?void 0:n.abortSignal)n.abortSignal.addEventListener("abort",i)})}
function Ujs(e,t){let n=e.headers.get(t);if(!n)return;let r=Number(n);if(Number.isNaN(r))return;return r}
var Kqu="The operation was aborted.";
var XPr=b(()=>{ihn()});
export {zPr,jPr,YPr,SHt,JPr,Bjs,Ujs,Kqu,XPr};
