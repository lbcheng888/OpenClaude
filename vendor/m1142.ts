// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,aDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var zPs,ListModelImportJobsCommand;
var Hun=b(()=>{$s();ai();ci();zPs=x(yo(),1);ListModelImportJobsCommand=class ListModelImportJobsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[zPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListModelImportJobs",{}).n("BedrockClient","ListModelImportJobsCommand").sc(aDs).build(){}});
export {zPs,ListModelImportJobsCommand,Hun};
