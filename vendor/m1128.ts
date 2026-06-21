// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,oRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Wxs,ListEvaluationJobsCommand;
var Nan=b(()=>{ri();wi();xi();Wxs=M(yo(),1);ListEvaluationJobsCommand=class ListEvaluationJobsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Wxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListEvaluationJobs",{}).n("BedrockClient","ListEvaluationJobsCommand").sc(oRs).build(){}});
export {Wxs,ListEvaluationJobsCommand,Nan};
