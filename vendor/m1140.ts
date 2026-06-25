// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,sDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var VPs,ListModelCopyJobsCommand;
var wun=b(()=>{$s();ai();ci();VPs=x(yo(),1);ListModelCopyJobsCommand=class ListModelCopyJobsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[VPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListModelCopyJobs",{}).n("BedrockClient","ListModelCopyJobsCommand").sc(sDs).build(){}});
export {VPs,ListModelCopyJobsCommand,wun};
