// @ts-nocheck
import {X} from "../runtime.ts";
import {cZr} from "./m3503.ts";
import {gle} from "./m3479.ts";
import {age} from "./m3493.ts";
var MAa=X((mOn)=>{Object.defineProperty(mOn,"__esModule",{value:!0});mOn.OTLPMetricExporter=void 0;var FYd=cZr(),UYd=gle(),OAa=age();class LAa extends FYd.OTLPMetricExporterBase{constructor(e){super((0,OAa.createOtlpHttpExportDelegate)((0,OAa.convertLegacyHttpOptions)(e??{},"METRICS","v1/metrics",{"Content-Type":"application/json"}),UYd.JsonMetricsSerializer),e)}}mOn.OTLPMetricExporter=LAa});
export {MAa};
