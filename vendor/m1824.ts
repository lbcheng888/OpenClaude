// @ts-nocheck
import {Q} from "../runtime.ts";
var zMr=Q((W8h,JZs)=>{var jZs=/^[0-9]+$/,YZs=(e,t)=>{let n=jZs.test(e),r=jZs.test(t);if(n&&r)e=+e,t=+t;return e===t?0:n&&!r?-1:r&&!n?1:e<t?-1:1},jGu=(e,t)=>YZs(t,e);JZs.exports={compareIdentifiers:YZs,rcompareIdentifiers:jGu}});
export {zMr};
