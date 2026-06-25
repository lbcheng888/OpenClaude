// @ts-nocheck
import {b,x} from "../runtime.ts";
import {dle} from "./m3455.ts";
import {gle} from "./m3495.ts";
import {b_e} from "./m3509.ts";
var Jxa,Xxa,ZBn,i$t;
var Qxa=b(()=>{Jxa=x(dle(),1),Xxa=x(gle(),1),ZBn=x(b_e(),1);i$t=class i$t extends Jxa.OTLPExporterBase{constructor(e={}){super(ZBn.createOtlpHttpExportDelegate(ZBn.convertLegacyHttpOptions(e,"LOGS","v1/logs",{"Content-Type":"application/x-protobuf"}),Xxa.ProtobufLogsSerializer))}}});
export {Jxa,Xxa,ZBn,i$t,Qxa};
