// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Iws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var hxs,GetAutomatedReasoningPolicyBuildWorkflowResultAssetsCommand;
var nEr=b(()=>{ri();wi();xi();hxs=M(yo(),1);GetAutomatedReasoningPolicyBuildWorkflowResultAssetsCommand=class GetAutomatedReasoningPolicyBuildWorkflowResultAssetsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[hxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicyBuildWorkflowResultAssets",{}).n("BedrockClient","GetAutomatedReasoningPolicyBuildWorkflowResultAssetsCommand").sc(Iws).build(){}});
export {hxs,GetAutomatedReasoningPolicyBuildWorkflowResultAssetsCommand,nEr};
