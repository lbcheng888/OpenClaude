// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,zxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var PPs,ListAutomatedReasoningPolicyBuildWorkflowsCommand;
var hun=b(()=>{$s();ai();ci();PPs=x(yo(),1);ListAutomatedReasoningPolicyBuildWorkflowsCommand=class ListAutomatedReasoningPolicyBuildWorkflowsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[PPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListAutomatedReasoningPolicyBuildWorkflows",{}).n("BedrockClient","ListAutomatedReasoningPolicyBuildWorkflowsCommand").sc(zxs).build(){}});
export {PPs,ListAutomatedReasoningPolicyBuildWorkflowsCommand,hun};
