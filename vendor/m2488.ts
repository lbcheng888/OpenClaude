// @ts-nocheck
import {Q} from "../runtime.ts";
var QDi=Q((BRg,XDi)=>{var YDi=/^[0-9]+$/,JDi=(e,t)=>{if(typeof e==="number"&&typeof t==="number")return e===t?0:e<t?-1:1;let n=YDi.test(e),r=YDi.test(t);if(n&&r)e=+e,t=+t;return e===t?0:n&&!r?-1:r&&!n?1:e<t?-1:1},ySd=(e,t)=>JDi(t,e);XDi.exports={compareIdentifiers:JDi,rcompareIdentifiers:ySd}});
export {QDi};
