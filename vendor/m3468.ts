// @ts-nocheck
import {X} from "../runtime.ts";
import {NPn} from "./m3459.ts";
import {eZr} from "./m3467.ts";
var Mfa=X((WPn)=>{Object.defineProperty(WPn,"__esModule",{value:!0});WPn.ProtobufMetricsSerializer=void 0;var Lfa=NPn(),JKd=eZr(),XKd=Lfa.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse,QKd=Lfa.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest;WPn.ProtobufMetricsSerializer={serializeRequest:(e)=>{let t=(0,JKd.createExportMetricsServiceRequest)([e]);return QKd.encode(t).finish()},deserializeResponse:(e)=>XKd.decode(e)}});
export {Mfa};
