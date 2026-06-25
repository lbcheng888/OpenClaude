// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
var byi=Q((SSn)=>{Object.defineProperty(SSn,"__esModule",{value:!0});SSn.diagLogLevelFromString=void 0;var kfe=xi(),Syi={ALL:kfe.DiagLogLevel.ALL,VERBOSE:kfe.DiagLogLevel.VERBOSE,DEBUG:kfe.DiagLogLevel.DEBUG,INFO:kfe.DiagLogLevel.INFO,WARN:kfe.DiagLogLevel.WARN,ERROR:kfe.DiagLogLevel.ERROR,NONE:kfe.DiagLogLevel.NONE};function rsd(e){if(e==null)return;let t=Syi[e.toUpperCase()];if(t==null)return kfe.diag.warn(`Unknown log level "${e}", expected one of ${Object.keys(Syi)}, using default`),kfe.DiagLogLevel.INFO;return t}SSn.diagLogLevelFromString=rsd});
export {byi};
