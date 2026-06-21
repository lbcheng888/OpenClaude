// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Aws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var txs,DeleteAutomatedReasoningPolicyTestCaseCommand;
var $br=b(()=>{ri();wi();xi();txs=M(yo(),1);DeleteAutomatedReasoningPolicyTestCaseCommand=class DeleteAutomatedReasoningPolicyTestCaseCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[txs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteAutomatedReasoningPolicyTestCase",{}).n("BedrockClient","DeleteAutomatedReasoningPolicyTestCaseCommand").sc(Aws).build(){}});
export {txs,DeleteAutomatedReasoningPolicyTestCaseCommand,$br};
