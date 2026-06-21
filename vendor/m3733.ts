// @ts-nocheck
import {X} from "../runtime.ts";
import {_Mn} from "./m3619.ts";
import {gle} from "./m3479.ts";
import {ple} from "./m3439.ts";
var Pva=X((oNn)=>{Object.defineProperty(oNn,"__esModule",{value:!0});oNn.OTLPLogExporter=void 0;var Iva=_Mn(),Dup=gle(),Pup=ple();class Dva extends Pup.OTLPExporterBase{constructor(e={}){super((0,Iva.createOtlpGrpcExportDelegate)((0,Iva.convertLegacyOtlpGrpcOptions)(e,"LOGS"),Dup.ProtobufLogsSerializer,"LogsExportService","/opentelemetry.proto.collector.logs.v1.LogsService/Export"))}}oNn.OTLPLogExporter=Dva});
export {Pva};
