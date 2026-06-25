// @ts-nocheck
import {Q} from "../runtime.ts";
import {IMn} from "./m3475.ts";
import {Nro} from "./m3486.ts";
var oEa=Q((BMn)=>{Object.defineProperty(BMn,"__esModule",{value:!0});BMn.ProtobufTraceSerializer=void 0;var rEa=IMn(),zop=Nro(),jop=rEa.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse,Yop=rEa.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest;BMn.ProtobufTraceSerializer={serializeRequest:(e)=>{let t=(0,zop.createExportTraceServiceRequest)(e);return Yop.encode(t).finish()},deserializeResponse:(e)=>jop.decode(e)}});
export {oEa};
