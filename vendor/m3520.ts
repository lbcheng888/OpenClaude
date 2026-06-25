// @ts-nocheck
import {Q} from "../runtime.ts";
import {Vro} from "./m3519.ts";
import {gle} from "./m3495.ts";
import {b_e} from "./m3509.ts";
var XEa=Q((i1n)=>{Object.defineProperty(i1n,"__esModule",{value:!0});i1n.OTLPMetricExporter=void 0;var vip=Vro(),wip=gle(),YEa=b_e();class JEa extends vip.OTLPMetricExporterBase{constructor(e){super((0,YEa.createOtlpHttpExportDelegate)((0,YEa.convertLegacyHttpOptions)(e??{},"METRICS","v1/metrics",{"Content-Type":"application/json"}),wip.JsonMetricsSerializer),e)}}i1n.OTLPMetricExporter=JEa});
export {XEa};
