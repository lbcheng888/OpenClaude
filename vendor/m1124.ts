// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,eRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Uxs,ListAutomatedReasoningPolicyTestCasesCommand;
var Pan=b(()=>{ri();wi();xi();Uxs=M(yo(),1);ListAutomatedReasoningPolicyTestCasesCommand=class ListAutomatedReasoningPolicyTestCasesCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Uxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListAutomatedReasoningPolicyTestCases",{}).n("BedrockClient","ListAutomatedReasoningPolicyTestCasesCommand").sc(eRs).build(){}});
export {Uxs,ListAutomatedReasoningPolicyTestCasesCommand,Pan};
