// @ts-nocheck
import {X} from "../runtime.ts";
import {NPn} from "./m3459.ts";
import {ZQr} from "./m3463.ts";
var wfa=X((qPn)=>{Object.defineProperty(qPn,"__esModule",{value:!0});qPn.ProtobufLogsSerializer=void 0;var vfa=NPn(),FKd=ZQr(),UKd=vfa.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse,$Kd=vfa.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest;qPn.ProtobufLogsSerializer={serializeRequest:(e)=>{let t=(0,FKd.createExportLogsServiceRequest)(e);return $Kd.encode(t).finish()},deserializeResponse:(e)=>UKd.decode(e)}});
export {wfa};
