// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,SRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var aks,StartAutomatedReasoningPolicyBuildWorkflowCommand;
var HEr=b(()=>{ri();wi();xi();aks=M(yo(),1);StartAutomatedReasoningPolicyBuildWorkflowCommand=class StartAutomatedReasoningPolicyBuildWorkflowCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[aks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","StartAutomatedReasoningPolicyBuildWorkflow",{}).n("BedrockClient","StartAutomatedReasoningPolicyBuildWorkflowCommand").sc(SRs).build(){}});
export {aks,StartAutomatedReasoningPolicyBuildWorkflowCommand,HEr};
