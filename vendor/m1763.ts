// @ts-nocheck
import {b} from "../runtime.ts";
import {R7,AuthError} from "./m1724.ts";
var ServerError;
var RQe=b(()=>{R7();/*! @azure/msal-common v15.13.1 2025-10-29 */ServerError=class ServerError extends AuthError{constructor(e,t,n,r,o){super(e,t,n);this.name="ServerError",this.errorNo=r,this.status=o,Object.setPrototypeOf(this,ServerError.prototype)}}});
export {ServerError,RQe};
