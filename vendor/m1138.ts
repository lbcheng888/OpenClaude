// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,fRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var eks,ListModelInvocationJobsCommand;
var Kan=b(()=>{ri();wi();xi();eks=M(yo(),1);ListModelInvocationJobsCommand=class ListModelInvocationJobsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[eks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListModelInvocationJobs",{}).n("BedrockClient","ListModelInvocationJobsCommand").sc(fRs).build(){}});
export {eks,ListModelInvocationJobsCommand,Kan};
