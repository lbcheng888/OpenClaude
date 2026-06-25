// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,oxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var GDs,CreateModelInvocationJobCommand;
var dwr=b(()=>{$s();ai();ci();GDs=x(yo(),1);CreateModelInvocationJobCommand=class CreateModelInvocationJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[GDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateModelInvocationJob",{}).n("BedrockClient","CreateModelInvocationJobCommand").sc(oxs).build(){}});
export {GDs,CreateModelInvocationJobCommand,dwr};
