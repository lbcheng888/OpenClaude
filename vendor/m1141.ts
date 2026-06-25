// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,iDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var KPs,ListModelCustomizationJobsCommand;
var kun=b(()=>{$s();ai();ci();KPs=x(yo(),1);ListModelCustomizationJobsCommand=class ListModelCustomizationJobsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[KPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListModelCustomizationJobs",{}).n("BedrockClient","ListModelCustomizationJobsCommand").sc(iDs).build(){}});
export {KPs,ListModelCustomizationJobsCommand,kun};
