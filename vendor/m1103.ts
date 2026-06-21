// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Pws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var yxs,GetAutomatedReasoningPolicyTestCaseCommand;
var sEr=b(()=>{ri();wi();xi();yxs=M(yo(),1);GetAutomatedReasoningPolicyTestCaseCommand=class GetAutomatedReasoningPolicyTestCaseCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[yxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicyTestCase",{}).n("BedrockClient","GetAutomatedReasoningPolicyTestCaseCommand").sc(Pws).build(){}});
export {yxs,GetAutomatedReasoningPolicyTestCaseCommand,sEr};
