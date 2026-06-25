// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Rxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var uPs,GetAutomatedReasoningPolicyBuildWorkflowResultAssetsCommand;
var xwr=b(()=>{$s();ai();ci();uPs=x(yo(),1);GetAutomatedReasoningPolicyBuildWorkflowResultAssetsCommand=class GetAutomatedReasoningPolicyBuildWorkflowResultAssetsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[uPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicyBuildWorkflowResultAssets",{}).n("BedrockClient","GetAutomatedReasoningPolicyBuildWorkflowResultAssetsCommand").sc(Rxs).build(){}});
export {uPs,GetAutomatedReasoningPolicyBuildWorkflowResultAssetsCommand,xwr};
