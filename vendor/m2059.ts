// @ts-nocheck
import {X} from "../runtime.ts";
var ori=X((zhn)=>{Object.defineProperty(zhn,"__esModule",{value:!0});zhn.DiagConsoleLogger=void 0;var DMr=[{n:"error",c:"error"},{n:"warn",c:"warn"},{n:"info",c:"info"},{n:"debug",c:"debug"},{n:"verbose",c:"trace"}];class rri{constructor(){function e(t){return function(...n){if(console){let r=console[t];if(typeof r!=="function")r=console.log;if(typeof r==="function")return r.apply(console,n)}}}for(let t=0;t<DMr.length;t++)this[DMr[t].n]=e(DMr[t].c)}}zhn.DiagConsoleLogger=rri});
export {ori};
