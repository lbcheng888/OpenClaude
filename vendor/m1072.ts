// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,V0s} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var xDs,CreateAutomatedReasoningPolicyTestCaseCommand;
var Qvr=b(()=>{$s();ai();ci();xDs=x(yo(),1);CreateAutomatedReasoningPolicyTestCaseCommand=class CreateAutomatedReasoningPolicyTestCaseCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[xDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateAutomatedReasoningPolicyTestCase",{}).n("BedrockClient","CreateAutomatedReasoningPolicyTestCaseCommand").sc(V0s).build(){}});
export {xDs,CreateAutomatedReasoningPolicyTestCaseCommand,Qvr};
