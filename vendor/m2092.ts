// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
var nHt=X((ave)=>{Object.defineProperty(ave,"__esModule",{value:!0});ave.isTracingSuppressed=ave.unsuppressTracing=ave.suppressTracing=void 0;var aKu=Xi(),h1r=(0,aKu.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");function lKu(e){return e.setValue(h1r,!0)}ave.suppressTracing=lKu;function cKu(e){return e.deleteValue(h1r)}ave.unsuppressTracing=cKu;function uKu(e){return e.getValue(h1r)===!0}ave.isTracingSuppressed=uKu});
export {nHt};
