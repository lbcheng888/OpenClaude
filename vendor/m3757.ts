// @ts-nocheck
import {b,x} from "../runtime.ts";
import {dle} from "./m3455.ts";
import {gle} from "./m3495.ts";
import {b_e} from "./m3509.ts";
var aDa,lDa,nUn,a$t;
var cDa=b(()=>{aDa=x(dle(),1),lDa=x(gle(),1),nUn=x(b_e(),1);a$t=class a$t extends aDa.OTLPExporterBase{constructor(e={}){super(nUn.createOtlpHttpExportDelegate(nUn.convertLegacyHttpOptions(e,"TRACES","v1/traces",{"Content-Type":"application/x-protobuf"}),lDa.ProtobufTraceSerializer))}}});
export {aDa,lDa,nUn,a$t,cDa};
