// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ple} from "./m3439.ts";
import {gle} from "./m3479.ts";
import {age} from "./m3493.ts";
var Vva,Kva,cNn,IFt;
var zva=b(()=>{Vva=M(ple(),1),Kva=M(gle(),1),cNn=M(age(),1);IFt=class IFt extends Vva.OTLPExporterBase{constructor(e={}){super(cNn.createOtlpHttpExportDelegate(cNn.convertLegacyHttpOptions(e,"TRACES","v1/traces",{"Content-Type":"application/x-protobuf"}),Kva.ProtobufTraceSerializer))}}});
export {Vva,Kva,cNn,IFt,zva};
