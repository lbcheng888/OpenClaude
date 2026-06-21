// @ts-nocheck
import {b} from "../runtime.ts";
import {aC,Ho} from "./m1717.ts";
import {aIr,unexpectedError,postRequestFailed} from "./m1718.ts";
function cIr(e,t){return new AuthError(e,t?`${Qpn[e]} ${t}`:Qpn[e])}
var Qpn,AuthErrorMessage,AuthError;
var eK=b(()=>{aC();aIr();/*! @azure/msal-common v15.13.1 2025-10-29 */Qpn={[unexpectedError]:"Unexpected error in authentication.",[postRequestFailed]:"Post request failed from the network, could be a 4xx/5xx or a network unavailability. Please check the exact error code for details."},AuthErrorMessage={unexpectedError:{code:unexpectedError,desc:Qpn[unexpectedError]},postRequestFailed:{code:postRequestFailed,desc:Qpn[postRequestFailed]}};AuthError=class AuthError extends Error{constructor(e,t,n){let r=t?`${e}: ${t}`:e;super(r);Object.setPrototypeOf(this,AuthError.prototype),this.errorCode=e||Ho.EMPTY_STRING,this.errorMessage=t||Ho.EMPTY_STRING,this.subError=n||Ho.EMPTY_STRING,this.name="AuthError"}setCorrelationId(e){this.correlationId=e}}});
export {cIr,Qpn,AuthErrorMessage,AuthError,eK};
