// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
var Vba=X((GMn)=>{Object.defineProperty(GMn,"__esModule",{value:!0});GMn.diagLogLevelFromString=void 0;var Sge=Xi(),Gba={ALL:Sge.DiagLogLevel.ALL,VERBOSE:Sge.DiagLogLevel.VERBOSE,DEBUG:Sge.DiagLogLevel.DEBUG,INFO:Sge.DiagLogLevel.INFO,WARN:Sge.DiagLogLevel.WARN,ERROR:Sge.DiagLogLevel.ERROR,NONE:Sge.DiagLogLevel.NONE};function pap(e){if(e==null)return;let t=Gba[e.toUpperCase()];if(t==null)return Sge.diag.warn(`Unknown log level "${e}", expected one of ${Object.keys(Gba)}, using default`),Sge.DiagLogLevel.INFO;return t}GMn.diagLogLevelFromString=pap});
export {Vba};
