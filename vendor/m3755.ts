// @ts-nocheck
import {Q} from "../runtime.ts";
import {dFn} from "./m3635.ts";
import {gle} from "./m3495.ts";
import {dle} from "./m3455.ts";
var sDa=Q((eUn)=>{Object.defineProperty(eUn,"__esModule",{value:!0});eUn.OTLPTraceExporter=void 0;var rDa=dFn(),Ebp=gle(),Cbp=dle();class oDa extends Cbp.OTLPExporterBase{constructor(e={}){super((0,rDa.createOtlpGrpcExportDelegate)((0,rDa.convertLegacyOtlpGrpcOptions)(e,"TRACES"),Ebp.ProtobufTraceSerializer,"TraceExportService","/opentelemetry.proto.collector.trace.v1.TraceService/Export"))}}eUn.OTLPTraceExporter=oDa});
export {sDa};
