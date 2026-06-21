// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,tRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var $xs,ListAutomatedReasoningPolicyTestResultsCommand;
var Oan=b(()=>{ri();wi();xi();$xs=M(yo(),1);ListAutomatedReasoningPolicyTestResultsCommand=class ListAutomatedReasoningPolicyTestResultsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[$xs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListAutomatedReasoningPolicyTestResults",{}).n("BedrockClient","ListAutomatedReasoningPolicyTestResultsCommand").sc(tRs).build(){}});
export {$xs,ListAutomatedReasoningPolicyTestResultsCommand,Oan};
