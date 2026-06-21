// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Xvs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var NRs,CreateAutomatedReasoningPolicyTestCaseCommand;
var Ebr=b(()=>{ri();wi();xi();NRs=M(yo(),1);CreateAutomatedReasoningPolicyTestCaseCommand=class CreateAutomatedReasoningPolicyTestCaseCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[NRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateAutomatedReasoningPolicyTestCase",{}).n("BedrockClient","CreateAutomatedReasoningPolicyTestCaseCommand").sc(Xvs).build(){}});
export {NRs,CreateAutomatedReasoningPolicyTestCaseCommand,Ebr};
