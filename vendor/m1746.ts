// @ts-nocheck
import {Ghn,XOr,OXs} from "./m1745.ts";
import {b} from "../runtime.ts";
import {R7,AuthError} from "./m1724.ts";
function LXs(e){if(!(e instanceof Error))return new fIt(Ghn);if(e.name==="QuotaExceededError"||e.name==="NS_ERROR_DOM_QUOTA_REACHED"||e.message.includes("exceeded the quota"))return new fIt(XOr);else return new fIt(e.name,e.message)}
var QOr,fIt;
var MXs=b(()=>{R7();OXs();/*! @azure/msal-common v15.13.1 2025-10-29 */QOr={[XOr]:"Exceeded cache storage capacity.",[Ghn]:"Unexpected error occurred when using cache storage."};fIt=class fIt extends AuthError{constructor(e,t){let n=t||(QOr[e]?QOr[e]:QOr[Ghn]);super(`${e}: ${n}`);Object.setPrototypeOf(this,fIt.prototype),this.name="CacheError",this.errorCode=e,this.errorMessage=n}}});
export {LXs,QOr,fIt,MXs};
