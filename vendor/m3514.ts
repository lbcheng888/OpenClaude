// @ts-nocheck
import {b,x} from "../runtime.ts";
import {dle} from "./m3455.ts";
import {gle} from "./m3495.ts";
import {b_e} from "./m3509.ts";
var qEa,WEa,s1n,OTLPLogExporter;
var GEa=b(()=>{qEa=x(dle(),1),WEa=x(gle(),1),s1n=x(b_e(),1);OTLPLogExporter=class OTLPLogExporter extends qEa.OTLPExporterBase{constructor(e={}){super(s1n.createOtlpHttpExportDelegate(s1n.convertLegacyHttpOptions(e,"LOGS","v1/logs",{"Content-Type":"application/json"}),WEa.JsonLogsSerializer))}}});
export {qEa,WEa,s1n,OTLPLogExporter,GEa};
