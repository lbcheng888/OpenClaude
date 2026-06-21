// @ts-nocheck
import {jDr,qJs} from "./m1888.ts";
import {b} from "../runtime.ts";
import {tfn} from "./m1796.ts";
import {em} from "./m1717.ts";
class Lfn{constructor(){this.linearRetryStrategy=new jDr}static get DEFAULT_MANAGED_IDENTITY_RETRY_DELAY_MS(){return vqu}async pauseForRetry(e,t,n,r){if(wqu.includes(e)&&t<Cqu){let o=this.linearRetryStrategy.calculateDelay(r,Lfn.DEFAULT_MANAGED_IDENTITY_RETRY_DELAY_MS);return n.verbose(`Retrying request in ${o}ms (retry attempt: ${t+1})`),await new Promise((s)=>setTimeout(s,o)),!0}return!1}}
var Cqu=3,vqu=1000,wqu;
var jJs=b(()=>{tfn();qJs();/*! @azure/msal-node v3.8.1 2025-10-29 */wqu=[em.NOT_FOUND,em.REQUEST_TIMEOUT,em.TOO_MANY_REQUESTS,em.SERVER_ERROR,em.SERVICE_UNAVAILABLE,em.GATEWAY_TIMEOUT]});
export {Lfn,Cqu,vqu,wqu,jJs};
