// @ts-nocheck
import {Q} from "../runtime.ts";
import {STn} from "./m2057.ts";
var jli=Q((bTn)=>{Object.defineProperty(bTn,"__esModule",{value:!0});bTn.createLogLevelDiagLogger=void 0;var wfe=STn();function end(e,t){if(e<wfe.DiagLogLevel.NONE)e=wfe.DiagLogLevel.NONE;else if(e>wfe.DiagLogLevel.ALL)e=wfe.DiagLogLevel.ALL;t=t||{};function n(r,o){let s=t[r];if(typeof s==="function"&&e>=o)return s.bind(t);return function(){}}return{error:n("error",wfe.DiagLogLevel.ERROR),warn:n("warn",wfe.DiagLogLevel.WARN),info:n("info",wfe.DiagLogLevel.INFO),debug:n("debug",wfe.DiagLogLevel.DEBUG),verbose:n("verbose",wfe.DiagLogLevel.VERBOSE)}}bTn.createLogLevelDiagLogger=end});
export {jli};
