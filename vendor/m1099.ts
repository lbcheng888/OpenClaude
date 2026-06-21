// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Hws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Axs,GetAutomatedReasoningPolicyBuildWorkflowCommand;
var tEr=b(()=>{ri();wi();xi();Axs=M(yo(),1);GetAutomatedReasoningPolicyBuildWorkflowCommand=class GetAutomatedReasoningPolicyBuildWorkflowCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Axs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicyBuildWorkflow",{}).n("BedrockClient","GetAutomatedReasoningPolicyBuildWorkflowCommand").sc(Hws).build(){}});
export {Axs,GetAutomatedReasoningPolicyBuildWorkflowCommand,tEr};
