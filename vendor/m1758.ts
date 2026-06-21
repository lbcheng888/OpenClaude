// @ts-nocheck
import {b} from "../runtime.ts";
import {eK,AuthError} from "./m1719.ts";
var ServerError;
var RJe=b(()=>{eK();/*! @azure/msal-common v15.13.1 2025-10-29 */ServerError=class ServerError extends AuthError{constructor(e,t,n,r,o){super(e,t,n);this.name="ServerError",this.errorNo=r,this.status=o,Object.setPrototypeOf(this,ServerError.prototype)}}});
export {ServerError,RJe};
