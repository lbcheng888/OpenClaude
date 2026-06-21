// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Zws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Fxs,ListAutomatedReasoningPolicyBuildWorkflowsCommand;
var Dan=b(()=>{ri();wi();xi();Fxs=M(yo(),1);ListAutomatedReasoningPolicyBuildWorkflowsCommand=class ListAutomatedReasoningPolicyBuildWorkflowsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Fxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListAutomatedReasoningPolicyBuildWorkflows",{}).n("BedrockClient","ListAutomatedReasoningPolicyBuildWorkflowsCommand").sc(Zws).build(){}});
export {Fxs,ListAutomatedReasoningPolicyBuildWorkflowsCommand,Dan};
