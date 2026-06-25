// @ts-nocheck
import {Hi,S5} from "./m467.ts";
import {b} from "../runtime.ts";
function ooe(e,t,n){let r=n.config.validateStatus;if(!n.status||!r||r(n.status))e(n);else t(new Hi("Request failed with status code "+n.status,[Hi.ERR_BAD_REQUEST,Hi.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}
var $nn=b(()=>{S5()});
export {ooe,$nn};
