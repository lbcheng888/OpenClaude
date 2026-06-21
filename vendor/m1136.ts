// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,pRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Qxs,ListModelCustomizationJobsCommand;
var Gan=b(()=>{ri();wi();xi();Qxs=M(yo(),1);ListModelCustomizationJobsCommand=class ListModelCustomizationJobsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Qxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListModelCustomizationJobs",{}).n("BedrockClient","ListModelCustomizationJobsCommand").sc(pRs).build(){}});
export {Qxs,ListModelCustomizationJobsCommand,Gan};
