// @ts-nocheck
import {Q} from "../runtime.ts";
import {IMn} from "./m3475.ts";
import {Lro} from "./m3479.ts";
var $ba=Q((LMn)=>{Object.defineProperty(LMn,"__esModule",{value:!0});LMn.ProtobufLogsSerializer=void 0;var Uba=IMn(),vop=Lro(),wop=Uba.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse,kop=Uba.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest;LMn.ProtobufLogsSerializer={serializeRequest:(e)=>{let t=(0,vop.createExportLogsServiceRequest)(e);return kop.encode(t).finish()},deserializeResponse:(e)=>wop.decode(e)}});
export {$ba};
