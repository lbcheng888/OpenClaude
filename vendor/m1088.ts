// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,lxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var zDs,DeleteAutomatedReasoningPolicyBuildWorkflowCommand;
var fwr=b(()=>{$s();ai();ci();zDs=x(yo(),1);DeleteAutomatedReasoningPolicyBuildWorkflowCommand=class DeleteAutomatedReasoningPolicyBuildWorkflowCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[zDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteAutomatedReasoningPolicyBuildWorkflow",{}).n("BedrockClient","DeleteAutomatedReasoningPolicyBuildWorkflowCommand").sc(lxs).build(){}});
export {zDs,DeleteAutomatedReasoningPolicyBuildWorkflowCommand,fwr};
