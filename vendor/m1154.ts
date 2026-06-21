// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,HRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var hks,UpdateAutomatedReasoningPolicyTestCaseCommand;
var FEr=b(()=>{ri();wi();xi();hks=M(yo(),1);UpdateAutomatedReasoningPolicyTestCaseCommand=class UpdateAutomatedReasoningPolicyTestCaseCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[hks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UpdateAutomatedReasoningPolicyTestCase",{}).n("BedrockClient","UpdateAutomatedReasoningPolicyTestCaseCommand").sc(HRs).build(){}});
export {hks,UpdateAutomatedReasoningPolicyTestCaseCommand,FEr};
