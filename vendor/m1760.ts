// @ts-nocheck
import {fse,Ho,iC,aC} from "./m1717.ts";
import {ServerError,RJe} from "./m1758.ts";
import {xJe,vmn} from "./m1759.ts";
import {b} from "../runtime.ts";
class Jme{static generateThrottlingStorageKey(e){return`${fse.THROTTLING_PREFIX}.${JSON.stringify(e)}`}static preProcess(e,t,n){let r=Jme.generateThrottlingStorageKey(t),o=e.getThrottlingCache(r);if(o){if(o.throttleTime<Date.now()){e.removeItem(r,n);return}throw new ServerError(o.errorCodes?.join(" ")||Ho.EMPTY_STRING,o.errorMessage,o.subError)}}static postProcess(e,t,n,r){if(Jme.checkResponseStatus(n)||Jme.checkResponseForRetryAfter(n)){let o={throttleTime:Jme.calculateThrottleTime(parseInt(n.headers[iC.RETRY_AFTER])),error:n.body.error,errorCodes:n.body.error_codes,errorMessage:n.body.error_description,subError:n.body.suberror};e.setThrottlingCache(Jme.generateThrottlingStorageKey(t),o,r)}}static checkResponseStatus(e){return e.status===429||e.status>=500&&e.status<600}static checkResponseForRetryAfter(e){if(e.headers)return e.headers.hasOwnProperty(iC.RETRY_AFTER)&&(e.status<200||e.status>=300);return!1}static calculateThrottleTime(e){let t=e<=0?0:e,n=Date.now()/1000;return Math.floor(Math.min(n+(t||fse.DEFAULT_THROTTLE_TIME_SECONDS),n+fse.DEFAULT_MAX_THROTTLE_TIME_SECONDS)*1000)}static removeThrottle(e,t,n,r){let o=xJe(t,n,r),s=this.generateThrottlingStorageKey(o);e.removeItem(s,n.correlationId)}}
var e7s=b(()=>{aC();RJe();vmn();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {Jme,e7s};
