// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Nws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Exs,GetEvaluationJobCommand;
var cEr=b(()=>{ri();wi();xi();Exs=M(yo(),1);GetEvaluationJobCommand=class GetEvaluationJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Exs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetEvaluationJob",{}).n("BedrockClient","GetEvaluationJobCommand").sc(Nws).build(){}});
export {Exs,GetEvaluationJobCommand,cEr};
