// @ts-nocheck
import {WDr,XJs} from "./m1894.ts";
import {em} from "./m1717.ts";
import {b} from "../runtime.ts";
import {tfn} from "./m1796.ts";
class wBe{constructor(){this.exponentialRetryStrategy=new WDr(wBe.MIN_EXPONENTIAL_BACKOFF_MS,wBe.MAX_EXPONENTIAL_BACKOFF_MS,wBe.EXPONENTIAL_DELTA_BACKOFF_MS)}static get MIN_EXPONENTIAL_BACKOFF_MS(){return Pqu}static get MAX_EXPONENTIAL_BACKOFF_MS(){return Oqu}static get EXPONENTIAL_DELTA_BACKOFF_MS(){return Lqu}static get HTTP_STATUS_GONE_RETRY_AFTER_MS(){return Mqu}set isNewRequest(e){this._isNewRequest=e}async pauseForRetry(e,t,n){if(this._isNewRequest)this._isNewRequest=!1,this.maxRetries=e===em.GONE?Dqu:Iqu;if((Hqu.includes(e)||e>=em.SERVER_ERROR_RANGE_START&&e<=em.SERVER_ERROR_RANGE_END&&t<this.maxRetries)&&t<this.maxRetries){let r=e===em.GONE?wBe.HTTP_STATUS_GONE_RETRY_AFTER_MS:this.exponentialRetryStrategy.calculateDelay(t);return n.verbose(`Retrying request in ${r}ms (retry attempt: ${t+1})`),await new Promise((o)=>setTimeout(o,r)),!0}return!1}}
var Hqu,Iqu=3,Dqu=7,Pqu=1000,Oqu=4000,Lqu=2000,Mqu=1e4;
var QJs=b(()=>{tfn();XJs();/*! @azure/msal-node v3.8.1 2025-10-29 */Hqu=[em.NOT_FOUND,em.REQUEST_TIMEOUT,em.GONE,em.TOO_MANY_REQUESTS]});
export {wBe,Hqu,Iqu,Dqu,Pqu,Oqu,Lqu,Mqu,QJs};
