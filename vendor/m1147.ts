// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,ERs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var cks,StopEvaluationJobCommand;
var DEr=b(()=>{ri();wi();xi();cks=M(yo(),1);StopEvaluationJobCommand=class StopEvaluationJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[cks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","StopEvaluationJob",{}).n("BedrockClient","StopEvaluationJobCommand").sc(ERs).build(){}});
export {cks,StopEvaluationJobCommand,DEr};
