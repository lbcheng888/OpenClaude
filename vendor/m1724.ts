// @ts-nocheck
import {b} from "../runtime.ts";
import {dC,Co} from "./m1722.ts";
import {NOr,unexpectedError,postRequestFailed} from "./m1723.ts";
function BOr(e,t){return new AuthError(e,t?`${Ohn[e]} ${t}`:Ohn[e])}
var Ohn,AuthErrorMessage,AuthError;
var R7=b(()=>{dC();NOr();/*! @azure/msal-common v15.13.1 2025-10-29 */Ohn={[unexpectedError]:"Unexpected error in authentication.",[postRequestFailed]:"Post request failed from the network, could be a 4xx/5xx or a network unavailability. Please check the exact error code for details."},AuthErrorMessage={unexpectedError:{code:unexpectedError,desc:Ohn[unexpectedError]},postRequestFailed:{code:postRequestFailed,desc:Ohn[postRequestFailed]}};AuthError=class AuthError extends Error{constructor(e,t,n){let r=t?`${e}: ${t}`:e;super(r);Object.setPrototypeOf(this,AuthError.prototype),this.errorCode=e||Co.EMPTY_STRING,this.errorMessage=t||Co.EMPTY_STRING,this.subError=n||Co.EMPTY_STRING,this.name="AuthError"}setCorrelationId(e){this.correlationId=e}}});
export {BOr,Ohn,AuthErrorMessage,AuthError,R7};
