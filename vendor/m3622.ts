// @ts-nocheck
import {b,M} from "../runtime.ts";
import {gOn} from "./m3507.ts";
import {gle} from "./m3479.ts";
import {age} from "./m3493.ts";
var NSa,BSa,SMn,OTLPMetricExporter;
var FSa=b(()=>{NSa=M(gOn(),1),BSa=M(gle(),1),SMn=M(age(),1);OTLPMetricExporter=class OTLPMetricExporter extends NSa.OTLPMetricExporterBase{constructor(e){super(SMn.createOtlpHttpExportDelegate(SMn.convertLegacyHttpOptions(e??{},"METRICS","v1/metrics",{"Content-Type":"application/x-protobuf"}),BSa.ProtobufMetricsSerializer),e)}}});
export {NSa,BSa,SMn,OTLPMetricExporter,FSa};
