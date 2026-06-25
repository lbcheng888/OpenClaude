// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,lDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var jPs,ListModelInvocationJobsCommand;
var Iun=b(()=>{$s();ai();ci();jPs=x(yo(),1);ListModelInvocationJobsCommand=class ListModelInvocationJobsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[jPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListModelInvocationJobs",{}).n("BedrockClient","ListModelInvocationJobsCommand").sc(lDs).build(){}});
export {jPs,ListModelInvocationJobsCommand,Iun};
