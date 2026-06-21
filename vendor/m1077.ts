// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,aws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var KRs,CreateModelCopyJobCommand;
var Pbr=b(()=>{ri();wi();xi();KRs=M(yo(),1);CreateModelCopyJobCommand=class CreateModelCopyJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[KRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateModelCopyJob",{}).n("BedrockClient","CreateModelCopyJobCommand").sc(aws).build(){}});
export {KRs,CreateModelCopyJobCommand,Pbr};
