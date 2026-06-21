// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Yvs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var LRs,CancelAutomatedReasoningPolicyBuildWorkflowCommand;
var Sbr=b(()=>{ri();wi();xi();LRs=M(yo(),1);CancelAutomatedReasoningPolicyBuildWorkflowCommand=class CancelAutomatedReasoningPolicyBuildWorkflowCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[LRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CancelAutomatedReasoningPolicyBuildWorkflow",{}).n("BedrockClient","CancelAutomatedReasoningPolicyBuildWorkflowCommand").sc(Yvs).build(){}});
export {LRs,CancelAutomatedReasoningPolicyBuildWorkflowCommand,Sbr};
