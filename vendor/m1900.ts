// @ts-nocheck
import {S1r,Kni} from "./m1899.ts";
import {Sp} from "./m1722.ts";
import {b} from "../runtime.ts";
import {Ngn} from "./m1801.ts";
class EBe{constructor(){this.exponentialRetryStrategy=new S1r(EBe.MIN_EXPONENTIAL_BACKOFF_MS,EBe.MAX_EXPONENTIAL_BACKOFF_MS,EBe.EXPONENTIAL_DELTA_BACKOFF_MS)}static get MIN_EXPONENTIAL_BACKOFF_MS(){return Qju}static get MAX_EXPONENTIAL_BACKOFF_MS(){return Zju}static get EXPONENTIAL_DELTA_BACKOFF_MS(){return eYu}static get HTTP_STATUS_GONE_RETRY_AFTER_MS(){return tYu}set isNewRequest(e){this._isNewRequest=e}async pauseForRetry(e,t,n){if(this._isNewRequest)this._isNewRequest=!1,this.maxRetries=e===Sp.GONE?Xju:Jju;if((Yju.includes(e)||e>=Sp.SERVER_ERROR_RANGE_START&&e<=Sp.SERVER_ERROR_RANGE_END&&t<this.maxRetries)&&t<this.maxRetries){let r=e===Sp.GONE?EBe.HTTP_STATUS_GONE_RETRY_AFTER_MS:this.exponentialRetryStrategy.calculateDelay(t);return n.verbose(`Retrying request in ${r}ms (retry attempt: ${t+1})`),await new Promise((o)=>setTimeout(o,r)),!0}return!1}}
var Yju,Jju=3,Xju=7,Qju=1000,Zju=4000,eYu=2000,tYu=1e4;
var zni=b(()=>{Ngn();Kni();/*! @azure/msal-node v3.8.1 2025-10-29 */Yju=[Sp.NOT_FOUND,Sp.REQUEST_TIMEOUT,Sp.GONE,Sp.TOO_MANY_REQUESTS]});
export {EBe,Yju,Jju,Xju,Qju,Zju,eYu,tYu,zni};
