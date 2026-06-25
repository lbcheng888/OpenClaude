// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
var aIa=Q((FFn)=>{Object.defineProperty(FFn,"__esModule",{value:!0});FFn.diagLogLevelFromString=void 0;var L_e=xi(),iIa={ALL:L_e.DiagLogLevel.ALL,VERBOSE:L_e.DiagLogLevel.VERBOSE,DEBUG:L_e.DiagLogLevel.DEBUG,INFO:L_e.DiagLogLevel.INFO,WARN:L_e.DiagLogLevel.WARN,ERROR:L_e.DiagLogLevel.ERROR,NONE:L_e.DiagLogLevel.NONE};function eyp(e){if(e==null)return;let t=iIa[e.toUpperCase()];if(t==null)return L_e.diag.warn(`Unknown log level "${e}", expected one of ${Object.keys(iIa)}, using default`),L_e.DiagLogLevel.INFO;return t}FFn.diagLogLevelFromString=eyp});
export {aIa};
