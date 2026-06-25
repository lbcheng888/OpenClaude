// @ts-nocheck
import {Q} from "../runtime.ts";
import {IMn} from "./m3475.ts";
import {Mro} from "./m3483.ts";
var Xba=Q((NMn)=>{Object.defineProperty(NMn,"__esModule",{value:!0});NMn.ProtobufMetricsSerializer=void 0;var Jba=IMn(),Nop=Mro(),Fop=Jba.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse,Bop=Jba.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest;NMn.ProtobufMetricsSerializer={serializeRequest:(e)=>{let t=(0,Nop.createExportMetricsServiceRequest)([e]);return Bop.encode(t).finish()},deserializeResponse:(e)=>Fop.decode(e)}});
export {Xba};
