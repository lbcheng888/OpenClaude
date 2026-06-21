// @ts-nocheck
import {X} from "../runtime.ts";
import {gOn} from "./m3507.ts";
import {_Mn} from "./m3619.ts";
import {gle} from "./m3479.ts";
var LSa=X((yMn)=>{Object.defineProperty(yMn,"__esModule",{value:!0});yMn.OTLPMetricExporter=void 0;var qsp=gOn(),PSa=_Mn(),jsp=gle();class OSa extends qsp.OTLPMetricExporterBase{constructor(e){super((0,PSa.createOtlpGrpcExportDelegate)((0,PSa.convertLegacyOtlpGrpcOptions)(e??{},"METRICS"),jsp.ProtobufMetricsSerializer,"MetricsExportService","/opentelemetry.proto.collector.metrics.v1.MetricsService/Export"),e)}}yMn.OTLPMetricExporter=OSa});
export {LSa};
