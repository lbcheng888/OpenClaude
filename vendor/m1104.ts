// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Axs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var cPs,GetAutomatedReasoningPolicyBuildWorkflowCommand;
var Iwr=b(()=>{$s();ai();ci();cPs=x(yo(),1);GetAutomatedReasoningPolicyBuildWorkflowCommand=class GetAutomatedReasoningPolicyBuildWorkflowCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[cPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicyBuildWorkflow",{}).n("BedrockClient","GetAutomatedReasoningPolicyBuildWorkflowCommand").sc(Axs).build(){}});
export {cPs,GetAutomatedReasoningPolicyBuildWorkflowCommand,Iwr};
