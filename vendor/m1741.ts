// @ts-nocheck
import {lmn,SIr,FVs} from "./m1740.ts";
import {b} from "../runtime.ts";
import {eK,AuthError} from "./m1719.ts";
function UVs(e){if(!(e instanceof Error))return new $Rt(lmn);if(e.name==="QuotaExceededError"||e.name==="NS_ERROR_DOM_QUOTA_REACHED"||e.message.includes("exceeded the quota"))return new $Rt(SIr);else return new $Rt(e.name,e.message)}
var bIr,$Rt;
var $Vs=b(()=>{eK();FVs();/*! @azure/msal-common v15.13.1 2025-10-29 */bIr={[SIr]:"Exceeded cache storage capacity.",[lmn]:"Unexpected error occurred when using cache storage."};$Rt=class $Rt extends AuthError{constructor(e,t){let n=t||(bIr[e]?bIr[e]:bIr[lmn]);super(`${e}: ${n}`);Object.setPrototypeOf(this,$Rt.prototype),this.name="CacheError",this.errorCode=e,this.errorMessage=n}}});
export {UVs,bIr,$Rt,$Vs};
