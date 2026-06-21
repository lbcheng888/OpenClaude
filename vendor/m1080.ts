// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,uws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var JRs,CreateModelInvocationJobCommand;
var Mbr=b(()=>{ri();wi();xi();JRs=M(yo(),1);CreateModelInvocationJobCommand=class CreateModelInvocationJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[JRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateModelInvocationJob",{}).n("BedrockClient","CreateModelInvocationJobCommand").sc(uws).build(){}});
export {JRs,CreateModelInvocationJobCommand,Mbr};
