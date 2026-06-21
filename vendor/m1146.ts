// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,bRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var lks,StartAutomatedReasoningPolicyTestWorkflowCommand;
var IEr=b(()=>{ri();wi();xi();lks=M(yo(),1);StartAutomatedReasoningPolicyTestWorkflowCommand=class StartAutomatedReasoningPolicyTestWorkflowCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[lks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","StartAutomatedReasoningPolicyTestWorkflow",{}).n("BedrockClient","StartAutomatedReasoningPolicyTestWorkflowCommand").sc(bRs).build(){}});
export {lks,StartAutomatedReasoningPolicyTestWorkflowCommand,IEr};
