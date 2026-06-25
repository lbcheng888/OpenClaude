// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,W0s} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var HDs,CancelAutomatedReasoningPolicyBuildWorkflowCommand;
var Jvr=b(()=>{$s();ai();ci();HDs=x(yo(),1);CancelAutomatedReasoningPolicyBuildWorkflowCommand=class CancelAutomatedReasoningPolicyBuildWorkflowCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[HDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CancelAutomatedReasoningPolicyBuildWorkflow",{}).n("BedrockClient","CancelAutomatedReasoningPolicyBuildWorkflowCommand").sc(W0s).build(){}});
export {HDs,CancelAutomatedReasoningPolicyBuildWorkflowCommand,Jvr};
