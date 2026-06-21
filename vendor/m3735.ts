// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ple} from "./m3439.ts";
import {gle} from "./m3479.ts";
import {age} from "./m3493.ts";
var Lva,Mva,iNn,HFt;
var Nva=b(()=>{Lva=M(ple(),1),Mva=M(gle(),1),iNn=M(age(),1);HFt=class HFt extends Lva.OTLPExporterBase{constructor(e={}){super(iNn.createOtlpHttpExportDelegate(iNn.convertLegacyHttpOptions(e,"LOGS","v1/logs",{"Content-Type":"application/x-protobuf"}),Mva.ProtobufLogsSerializer))}}});
export {Lva,Mva,iNn,HFt,Nva};
