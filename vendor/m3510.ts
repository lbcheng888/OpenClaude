// @ts-nocheck
import {b,x} from "../runtime.ts";
import {dle} from "./m3455.ts";
import {gle} from "./m3495.ts";
import {b_e} from "./m3509.ts";
var NEa,FEa,o1n,OTLPTraceExporter;
var BEa=b(()=>{NEa=x(dle(),1),FEa=x(gle(),1),o1n=x(b_e(),1);OTLPTraceExporter=class OTLPTraceExporter extends NEa.OTLPExporterBase{constructor(e={}){super(o1n.createOtlpHttpExportDelegate(o1n.convertLegacyHttpOptions(e,"TRACES","v1/traces",{"Content-Type":"application/json"}),FEa.JsonTraceSerializer))}}});
export {NEa,FEa,o1n,OTLPTraceExporter,BEa};
