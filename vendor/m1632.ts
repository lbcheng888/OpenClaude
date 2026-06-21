// @ts-nocheck
import {b} from "../runtime.ts";
function d1u(e){return e&&typeof e.error==="string"&&typeof e.error_description==="string"}
function E5s(e){return{error:e.error,errorDescription:e.error_description,correlationId:e.correlation_id,errorCodes:e.error_codes,timestamp:e.timestamp,traceId:e.trace_id}}
var CredentialUnavailableErrorName="CredentialUnavailableError",CredentialUnavailableError,AuthenticationErrorName="AuthenticationError",AuthenticationError,AggregateAuthenticationErrorName="AggregateAuthenticationError",AggregateAuthenticationError,AuthenticationRequiredError;
var JD=b(()=>{CredentialUnavailableError=class CredentialUnavailableError extends Error{constructor(e,t){super(e,t);this.name=CredentialUnavailableErrorName}};AuthenticationError=class AuthenticationError extends Error{constructor(e,t,n){let r={error:"unknown",errorDescription:"An unknown error occurred and no additional details are available."};if(d1u(t))r=E5s(t);else if(typeof t==="string")try{let o=JSON.parse(t);r=E5s(o)}catch(o){if(e===400)r={error:"invalid_request",errorDescription:`The service indicated that the request was invalid.

${t}`};else r={error:"unknown_error",errorDescription:`An unknown error has occurred. Response body:

${t}`}}else r={error:"unknown_error",errorDescription:"An unknown error occurred and no additional details are available."};super(`${r.error} Status code: ${e}
More details:
${r.errorDescription},`,n);this.statusCode=e,this.errorResponse=r,this.name=AuthenticationErrorName}};AggregateAuthenticationError=class AggregateAuthenticationError extends Error{constructor(e,t){let n=e.join(`
`);super(`${t}
${n}`);this.errors=e,this.name=AggregateAuthenticationErrorName}};AuthenticationRequiredError=class AuthenticationRequiredError extends Error{constructor(e){super(e.message,e.cause?{cause:e.cause}:void 0);this.scopes=e.scopes,this.getTokenOptions=e.getTokenOptions,this.name="AuthenticationRequiredError"}}});
export {d1u,E5s,CredentialUnavailableErrorName,CredentialUnavailableError,AuthenticationErrorName,AuthenticationError,AggregateAuthenticationErrorName,AggregateAuthenticationError,AuthenticationRequiredError,JD};
