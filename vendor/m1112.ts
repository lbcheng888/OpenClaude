// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,xxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var _Ps,GetEvaluationJobCommand;
var Fwr=b(()=>{$s();ai();ci();_Ps=x(yo(),1);GetEvaluationJobCommand=class GetEvaluationJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[_Ps.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetEvaluationJob",{}).n("BedrockClient","GetEvaluationJobCommand").sc(xxs).build(){}});
export {_Ps,GetEvaluationJobCommand,Fwr};
