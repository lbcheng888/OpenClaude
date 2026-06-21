// @ts-nocheck
import {X} from "../runtime.ts";
var lUr=X((Vth,aTi)=>{var sTi=/^[0-9]+$/,iTi=(e,t)=>{let n=sTi.test(e),r=sTi.test(t);if(n&&r)e=+e,t=+t;return e===t?0:n&&!r?-1:r&&!n?1:e<t?-1:1},rnd=(e,t)=>iTi(t,e);aTi.exports={compareIdentifiers:iTi,rcompareIdentifiers:rnd}});
export {lUr};
