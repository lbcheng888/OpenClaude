// @ts-nocheck
import {X} from "../runtime.ts";
var IRi=X((omh,HRi)=>{var xRi=/^[0-9]+$/,kRi=(e,t)=>{if(typeof e==="number"&&typeof t==="number")return e===t?0:e<t?-1:1;let n=xRi.test(e),r=xRi.test(t);if(n&&r)e=+e,t=+t;return e===t?0:n&&!r?-1:r&&!n?1:e<t?-1:1},zcd=(e,t)=>kRi(t,e);HRi.exports={compareIdentifiers:kRi,rcompareIdentifiers:zcd}});
export {IRi};
