// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Qxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var FPs,ListEvaluationJobsCommand;
var Sun=b(()=>{$s();ai();ci();FPs=x(yo(),1);ListEvaluationJobsCommand=class ListEvaluationJobsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[FPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListEvaluationJobs",{}).n("BedrockClient","ListEvaluationJobsCommand").sc(Qxs).build(){}});
export {FPs,ListEvaluationJobsCommand,Sun};
