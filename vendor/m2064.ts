// @ts-nocheck
import {Q} from "../runtime.ts";
var Zli=Q((wTn)=>{Object.defineProperty(wTn,"__esModule",{value:!0});wTn.DiagConsoleLogger=void 0;var sUr=[{n:"error",c:"error"},{n:"warn",c:"warn"},{n:"info",c:"info"},{n:"debug",c:"debug"},{n:"verbose",c:"trace"}];class Qli{constructor(){function e(t){return function(...n){if(console){let r=console[t];if(typeof r!=="function")r=console.log;if(typeof r==="function")return r.apply(console,n)}}}for(let t=0;t<sUr.length;t++)this[sUr[t].n]=e(sUr[t].c)}}wTn.DiagConsoleLogger=Qli});
export {Zli};
