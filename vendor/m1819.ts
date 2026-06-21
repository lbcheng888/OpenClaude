// @ts-nocheck
import {X} from "../runtime.ts";
var gDr=X((SNA,tzs)=>{var ZKs=/^[0-9]+$/,ezs=(e,t)=>{let n=ZKs.test(e),r=ZKs.test(t);if(n&&r)e=+e,t=+t;return e===t?0:n&&!r?-1:r&&!n?1:e<t?-1:1},k2u=(e,t)=>ezs(t,e);tzs.exports={compareIdentifiers:ezs,rcompareIdentifiers:k2u}});
export {gDr};
