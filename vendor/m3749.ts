// @ts-nocheck
import {Q} from "../runtime.ts";
import {dFn} from "./m3635.ts";
import {gle} from "./m3495.ts";
import {dle} from "./m3455.ts";
var jxa=Q((XBn)=>{Object.defineProperty(XBn,"__esModule",{value:!0});XBn.OTLPLogExporter=void 0;var Kxa=dFn(),Tbp=gle(),Sbp=dle();class zxa extends Sbp.OTLPExporterBase{constructor(e={}){super((0,Kxa.createOtlpGrpcExportDelegate)((0,Kxa.convertLegacyOtlpGrpcOptions)(e,"LOGS"),Tbp.ProtobufLogsSerializer,"LogsExportService","/opentelemetry.proto.collector.logs.v1.LogsService/Export"))}}XBn.OTLPLogExporter=zxa});
export {jxa};
