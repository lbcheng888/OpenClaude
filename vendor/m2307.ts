// @ts-nocheck
import {Q} from "../runtime.ts";
var B3r=Q((vfg,hvi)=>{var mvi=/^[0-9]+$/,fvi=(e,t)=>{let n=mvi.test(e),r=mvi.test(t);if(n&&r)e=+e,t=+t;return e===t?0:n&&!r?-1:r&&!n?1:e<t?-1:1},Ipd=(e,t)=>fvi(t,e);hvi.exports={compareIdentifiers:fvi,rcompareIdentifiers:Ipd}});
export {B3r};
