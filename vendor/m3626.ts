// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
var aFt=X((mHe)=>{Object.defineProperty(mHe,"__esModule",{value:!0});mHe.isTracingSuppressed=mHe.unsuppressTracing=mHe.suppressTracing=void 0;var Gsp=Xi(),zto=(0,Gsp.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");function Vsp(e){return e.setValue(zto,!0)}mHe.suppressTracing=Vsp;function Ksp(e){return e.deleteValue(zto)}mHe.unsuppressTracing=Ksp;function zsp(e){return e.getValue(zto)===!0}mHe.isTracingSuppressed=zsp});
export {aFt};
