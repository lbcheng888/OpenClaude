// @ts-nocheck
import {mse,Co,uC,dC} from "./m1722.ts";
import {ServerError,RQe} from "./m1763.ts";
import {vQe,agn} from "./m1764.ts";
import {b} from "../runtime.ts";
class sfe{static generateThrottlingStorageKey(e){return`${mse.THROTTLING_PREFIX}.${JSON.stringify(e)}`}static preProcess(e,t,n){let r=sfe.generateThrottlingStorageKey(t),o=e.getThrottlingCache(r);if(o){if(o.throttleTime<Date.now()){e.removeItem(r,n);return}throw new ServerError(o.errorCodes?.join(" ")||Co.EMPTY_STRING,o.errorMessage,o.subError)}}static postProcess(e,t,n,r){if(sfe.checkResponseStatus(n)||sfe.checkResponseForRetryAfter(n)){let o={throttleTime:sfe.calculateThrottleTime(parseInt(n.headers[uC.RETRY_AFTER])),error:n.body.error,errorCodes:n.body.error_codes,errorMessage:n.body.error_description,subError:n.body.suberror};e.setThrottlingCache(sfe.generateThrottlingStorageKey(t),o,r)}}static checkResponseStatus(e){return e.status===429||e.status>=500&&e.status<600}static checkResponseForRetryAfter(e){if(e.headers)return e.headers.hasOwnProperty(uC.RETRY_AFTER)&&(e.status<200||e.status>=300);return!1}static calculateThrottleTime(e){let t=e<=0?0:e,n=Date.now()/1000;return Math.floor(Math.min(n+(t||mse.DEFAULT_THROTTLE_TIME_SECONDS),n+mse.DEFAULT_MAX_THROTTLE_TIME_SECONDS)*1000)}static removeThrottle(e,t,n,r){let o=vQe(t,n,r),s=this.generateThrottlingStorageKey(o);e.removeItem(s,n.correlationId)}}
var YXs=b(()=>{dC();RQe();agn();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {sfe,YXs};
