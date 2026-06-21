// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ple} from "./m3439.ts";
import {gle} from "./m3479.ts";
import {age} from "./m3493.ts";
var bAa,EAa,dOn,OTLPTraceExporter;
var CAa=b(()=>{bAa=M(ple(),1),EAa=M(gle(),1),dOn=M(age(),1);OTLPTraceExporter=class OTLPTraceExporter extends bAa.OTLPExporterBase{constructor(e={}){super(dOn.createOtlpHttpExportDelegate(dOn.convertLegacyHttpOptions(e,"TRACES","v1/traces",{"Content-Type":"application/json"}),EAa.JsonTraceSerializer))}}});
export {bAa,EAa,dOn,OTLPTraceExporter,CAa};
