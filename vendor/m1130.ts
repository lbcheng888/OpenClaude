// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Yxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var LPs,ListAutomatedReasoningPolicyTestResultsCommand;
var _un=b(()=>{$s();ai();ci();LPs=x(yo(),1);ListAutomatedReasoningPolicyTestResultsCommand=class ListAutomatedReasoningPolicyTestResultsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[LPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListAutomatedReasoningPolicyTestResults",{}).n("BedrockClient","ListAutomatedReasoningPolicyTestResultsCommand").sc(Yxs).build(){}});
export {LPs,ListAutomatedReasoningPolicyTestResultsCommand,_un};
