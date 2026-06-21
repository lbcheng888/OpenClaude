// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,dRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Xxs,ListModelCopyJobsCommand;
var Wan=b(()=>{ri();wi();xi();Xxs=M(yo(),1);ListModelCopyJobsCommand=class ListModelCopyJobsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Xxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListModelCopyJobs",{}).n("BedrockClient","ListModelCopyJobsCommand").sc(dRs).build(){}});
export {Xxs,ListModelCopyJobsCommand,Wan};
