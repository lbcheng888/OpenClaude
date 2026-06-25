// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Y0s} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var LDs,CreateEvaluationJobCommand;
var nwr=b(()=>{$s();ai();ci();LDs=x(yo(),1);CreateEvaluationJobCommand=class CreateEvaluationJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[LDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateEvaluationJob",{}).n("BedrockClient","CreateEvaluationJobCommand").sc(Y0s).build(){}});
export {LDs,CreateEvaluationJobCommand,nwr};
