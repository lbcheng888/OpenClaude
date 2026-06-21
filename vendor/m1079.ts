// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,cws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var YRs,CreateModelImportJobCommand;
var Lbr=b(()=>{ri();wi();xi();YRs=M(yo(),1);CreateModelImportJobCommand=class CreateModelImportJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[YRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateModelImportJob",{}).n("BedrockClient","CreateModelImportJobCommand").sc(cws).build(){}});
export {YRs,CreateModelImportJobCommand,Lbr};
