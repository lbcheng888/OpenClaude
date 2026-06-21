// @ts-nocheck
import {X} from "../runtime.ts";
import {NPn} from "./m3459.ts";
import {tZr} from "./m3470.ts";
var jfa=X((VPn)=>{Object.defineProperty(VPn,"__esModule",{value:!0});VPn.ProtobufTraceSerializer=void 0;var qfa=NPn(),izd=tZr(),azd=qfa.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse,lzd=qfa.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest;VPn.ProtobufTraceSerializer={serializeRequest:(e)=>{let t=(0,izd.createExportTraceServiceRequest)(e);return lzd.encode(t).finish()},deserializeResponse:(e)=>azd.decode(e)}});
export {jfa};
