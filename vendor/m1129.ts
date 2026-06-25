// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,jxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var OPs,ListAutomatedReasoningPolicyTestCasesCommand;
var gun=b(()=>{$s();ai();ci();OPs=x(yo(),1);ListAutomatedReasoningPolicyTestCasesCommand=class ListAutomatedReasoningPolicyTestCasesCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[OPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListAutomatedReasoningPolicyTestCases",{}).n("BedrockClient","ListAutomatedReasoningPolicyTestCasesCommand").sc(jxs).build(){}});
export {OPs,ListAutomatedReasoningPolicyTestCasesCommand,gun};
