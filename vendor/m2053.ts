// @ts-nocheck
import {X} from "../runtime.ts";
import {$hn} from "./m2052.ts";
var Zni=X((qhn)=>{Object.defineProperty(qhn,"__esModule",{value:!0});qhn.createLogLevelDiagLogger=void 0;var gfe=$hn();function LVu(e,t){if(e<gfe.DiagLogLevel.NONE)e=gfe.DiagLogLevel.NONE;else if(e>gfe.DiagLogLevel.ALL)e=gfe.DiagLogLevel.ALL;t=t||{};function n(r,o){let s=t[r];if(typeof s==="function"&&e>=o)return s.bind(t);return function(){}}return{error:n("error",gfe.DiagLogLevel.ERROR),warn:n("warn",gfe.DiagLogLevel.WARN),info:n("info",gfe.DiagLogLevel.INFO),debug:n("debug",gfe.DiagLogLevel.DEBUG),verbose:n("verbose",gfe.DiagLogLevel.VERBOSE)}}qhn.createLogLevelDiagLogger=LVu});
export {Zni};
