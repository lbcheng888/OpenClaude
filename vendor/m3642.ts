// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
var N2t=Q((e0e)=>{Object.defineProperty(e0e,"__esModule",{value:!0});e0e.isTracingSuppressed=e0e.unsuppressTracing=e0e.suppressTracing=void 0;var Pgp=xi(),Iio=(0,Pgp.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");function Ogp(e){return e.setValue(Iio,!0)}e0e.suppressTracing=Ogp;function Lgp(e){return e.deleteValue(Iio)}e0e.unsuppressTracing=Lgp;function Mgp(e){return e.getValue(Iio)===!0}e0e.isTracingSuppressed=Mgp});
export {N2t};
