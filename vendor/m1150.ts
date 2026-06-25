// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,hDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var tOs,StartAutomatedReasoningPolicyBuildWorkflowCommand;
var skr=b(()=>{$s();ai();ci();tOs=x(yo(),1);StartAutomatedReasoningPolicyBuildWorkflowCommand=class StartAutomatedReasoningPolicyBuildWorkflowCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[tOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","StartAutomatedReasoningPolicyBuildWorkflow",{}).n("BedrockClient","StartAutomatedReasoningPolicyBuildWorkflowCommand").sc(hDs).build(){}});
export {tOs,StartAutomatedReasoningPolicyBuildWorkflowCommand,skr};
