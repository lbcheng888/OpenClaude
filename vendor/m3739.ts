// @ts-nocheck
import {X} from "../runtime.ts";
import {_Mn} from "./m3619.ts";
import {gle} from "./m3479.ts";
import {ple} from "./m3439.ts";
var Wva=X((aNn)=>{Object.defineProperty(aNn,"__esModule",{value:!0});aNn.OTLPTraceExporter=void 0;var qva=_Mn(),Lup=gle(),Mup=ple();class jva extends Mup.OTLPExporterBase{constructor(e={}){super((0,qva.createOtlpGrpcExportDelegate)((0,qva.convertLegacyOtlpGrpcOptions)(e,"TRACES"),Lup.ProtobufTraceSerializer,"TraceExportService","/opentelemetry.proto.collector.trace.v1.TraceService/Export"))}}aNn.OTLPTraceExporter=jva});
export {Wva};
