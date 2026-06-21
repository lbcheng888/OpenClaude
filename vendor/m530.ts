// @ts-nocheck
import {Ji,o8} from "./m461.ts";
import {b} from "../runtime.ts";
function ioe(e,t,n){let r=n.config.validateStatus;if(!n.status||!r||r(n.status))e(n);else t(new Ji("Request failed with status code "+n.status,[Ji.ERR_BAD_REQUEST,Ji.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}
var ien=b(()=>{o8()});
export {ioe,ien};
