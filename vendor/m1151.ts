// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,gDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var nOs,StartAutomatedReasoningPolicyTestWorkflowCommand;
var ikr=b(()=>{$s();ai();ci();nOs=x(yo(),1);StartAutomatedReasoningPolicyTestWorkflowCommand=class StartAutomatedReasoningPolicyTestWorkflowCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[nOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","StartAutomatedReasoningPolicyTestWorkflow",{}).n("BedrockClient","StartAutomatedReasoningPolicyTestWorkflowCommand").sc(gDs).build(){}});
export {nOs,StartAutomatedReasoningPolicyTestWorkflowCommand,ikr};
