// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
var Hxt=Q((WRe)=>{Object.defineProperty(WRe,"__esModule",{value:!0});WRe.isTracingSuppressed=WRe.unsuppressTracing=WRe.suppressTracing=void 0;var vrd=xi(),WUr=(0,vrd.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");function wrd(e){return e.setValue(WUr,!0)}WRe.suppressTracing=wrd;function krd(e){return e.deleteValue(WUr)}WRe.unsuppressTracing=krd;function Hrd(e){return e.getValue(WUr)===!0}WRe.isTracingSuppressed=Hrd});
export {Hxt};
