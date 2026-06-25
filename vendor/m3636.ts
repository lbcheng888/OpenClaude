// @ts-nocheck
import {Q} from "../runtime.ts";
import {u1n} from "./m3523.ts";
import {dFn} from "./m3635.ts";
import {gle} from "./m3495.ts";
var Jka=Q((pFn)=>{Object.defineProperty(pFn,"__esModule",{value:!0});pFn.OTLPMetricExporter=void 0;var Igp=u1n(),jka=dFn(),xgp=gle();class Yka extends Igp.OTLPMetricExporterBase{constructor(e){super((0,jka.createOtlpGrpcExportDelegate)((0,jka.convertLegacyOtlpGrpcOptions)(e??{},"METRICS"),xgp.ProtobufMetricsSerializer,"MetricsExportService","/opentelemetry.proto.collector.metrics.v1.MetricsService/Export"),e)}}pFn.OTLPMetricExporter=Yka});
export {Jka};
