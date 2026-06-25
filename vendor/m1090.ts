// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,cxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var YDs,DeleteAutomatedReasoningPolicyTestCaseCommand;
var gwr=b(()=>{$s();ai();ci();YDs=x(yo(),1);DeleteAutomatedReasoningPolicyTestCaseCommand=class DeleteAutomatedReasoningPolicyTestCaseCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[YDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteAutomatedReasoningPolicyTestCase",{}).n("BedrockClient","DeleteAutomatedReasoningPolicyTestCaseCommand").sc(cxs).build(){}});
export {YDs,DeleteAutomatedReasoningPolicyTestCaseCommand,gwr};
