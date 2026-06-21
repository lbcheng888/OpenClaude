// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,fws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var ZRs,DeleteAutomatedReasoningPolicyBuildWorkflowCommand;
var Fbr=b(()=>{ri();wi();xi();ZRs=M(yo(),1);DeleteAutomatedReasoningPolicyBuildWorkflowCommand=class DeleteAutomatedReasoningPolicyBuildWorkflowCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[ZRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteAutomatedReasoningPolicyBuildWorkflow",{}).n("BedrockClient","DeleteAutomatedReasoningPolicyBuildWorkflowCommand").sc(fws).build(){}});
export {ZRs,DeleteAutomatedReasoningPolicyBuildWorkflowCommand,Fbr};
