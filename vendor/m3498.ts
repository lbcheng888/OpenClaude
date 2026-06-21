// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ple} from "./m3439.ts";
import {gle} from "./m3479.ts";
import {age} from "./m3493.ts";
var RAa,xAa,pOn,OTLPLogExporter;
var kAa=b(()=>{RAa=M(ple(),1),xAa=M(gle(),1),pOn=M(age(),1);OTLPLogExporter=class OTLPLogExporter extends RAa.OTLPExporterBase{constructor(e={}){super(pOn.createOtlpHttpExportDelegate(pOn.convertLegacyHttpOptions(e,"LOGS","v1/logs",{"Content-Type":"application/json"}),xAa.JsonLogsSerializer))}}});
export {RAa,xAa,pOn,OTLPLogExporter,kAa};
