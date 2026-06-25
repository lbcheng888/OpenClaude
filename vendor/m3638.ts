// @ts-nocheck
import {b,x} from "../runtime.ts";
import {u1n} from "./m3523.ts";
import {gle} from "./m3495.ts";
import {b_e} from "./m3509.ts";
var Qka,Zka,fFn,OTLPMetricExporter;
var eHa=b(()=>{Qka=x(u1n(),1),Zka=x(gle(),1),fFn=x(b_e(),1);OTLPMetricExporter=class OTLPMetricExporter extends Qka.OTLPMetricExporterBase{constructor(e){super(fFn.createOtlpHttpExportDelegate(fFn.convertLegacyHttpOptions(e??{},"METRICS","v1/metrics",{"Content-Type":"application/x-protobuf"}),Zka.ProtobufMetricsSerializer),e)}}});
export {Qka,Zka,fFn,OTLPMetricExporter,eHa};
