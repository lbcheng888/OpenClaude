// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
var wpi=X(($gn)=>{Object.defineProperty($gn,"__esModule",{value:!0});$gn.diagLogLevelFromString=void 0;var _fe=Xi(),vpi={ALL:_fe.DiagLogLevel.ALL,VERBOSE:_fe.DiagLogLevel.VERBOSE,DEBUG:_fe.DiagLogLevel.DEBUG,INFO:_fe.DiagLogLevel.INFO,WARN:_fe.DiagLogLevel.WARN,ERROR:_fe.DiagLogLevel.ERROR,NONE:_fe.DiagLogLevel.NONE};function Nzu(e){if(e==null)return;let t=vpi[e.toUpperCase()];if(t==null)return _fe.diag.warn(`Unknown log level "${e}", expected one of ${Object.keys(vpi)}, using default`),_fe.DiagLogLevel.INFO;return t}$gn.diagLogLevelFromString=Nzu});
export {wpi};
