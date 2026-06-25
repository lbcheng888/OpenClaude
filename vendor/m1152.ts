// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,_Ds} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var rOs,StopEvaluationJobCommand;
var akr=b(()=>{$s();ai();ci();rOs=x(yo(),1);StopEvaluationJobCommand=class StopEvaluationJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[rOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","StopEvaluationJob",{}).n("BedrockClient","StopEvaluationJobCommand").sc(_Ds).build(){}});
export {rOs,StopEvaluationJobCommand,akr};
