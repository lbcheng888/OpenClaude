// @ts-nocheck
import {b} from "../runtime.ts";
function Iqu(e){return e&&typeof e.error==="string"&&typeof e.error_description==="string"}
function yjs(e){return{error:e.error,errorDescription:e.error_description,correlationId:e.correlation_id,errorCodes:e.error_codes,timestamp:e.timestamp,traceId:e.trace_id}}
var CredentialUnavailableErrorName="CredentialUnavailableError",CredentialUnavailableError,AuthenticationErrorName="AuthenticationError",AuthenticationError,AggregateAuthenticationErrorName="AggregateAuthenticationError",AggregateAuthenticationError,AuthenticationRequiredError;
var cD=b(()=>{CredentialUnavailableError=class CredentialUnavailableError extends Error{constructor(e,t){super(e,t);this.name=CredentialUnavailableErrorName}};AuthenticationError=class AuthenticationError extends Error{constructor(e,t,n){let r={error:"unknown",errorDescription:"An unknown error occurred and no additional details are available."};if(Iqu(t))r=yjs(t);else if(typeof t==="string")try{let o=JSON.parse(t);r=yjs(o)}catch(o){if(e===400)r={error:"invalid_request",errorDescription:`The service indicated that the request was invalid.

${t}`};else r={error:"unknown_error",errorDescription:`An unknown error has occurred. Response body:

${t}`}}else r={error:"unknown_error",errorDescription:"An unknown error occurred and no additional details are available."};super(`${r.error} Status code: ${e}
More details:
${r.errorDescription},`,n);this.statusCode=e,this.errorResponse=r,this.name=AuthenticationErrorName}};AggregateAuthenticationError=class AggregateAuthenticationError extends Error{constructor(e,t){let n=e.join(`
`);super(`${t}
${n}`);this.errors=e,this.name=AggregateAuthenticationErrorName}};AuthenticationRequiredError=class AuthenticationRequiredError extends Error{constructor(e){super(e.message,e.cause?{cause:e.cause}:void 0);this.scopes=e.scopes,this.getTokenOptions=e.getTokenOptions,this.name="AuthenticationRequiredError"}}});
export {Iqu,yjs,CredentialUnavailableErrorName,CredentialUnavailableError,AuthenticationErrorName,AuthenticationError,AggregateAuthenticationErrorName,AggregateAuthenticationError,AuthenticationRequiredError,cD};
