// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Ows} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Txs,GetAutomatedReasoningPolicyTestResultCommand;
var iEr=b(()=>{ri();wi();xi();Txs=M(yo(),1);GetAutomatedReasoningPolicyTestResultCommand=class GetAutomatedReasoningPolicyTestResultCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Txs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicyTestResult",{}).n("BedrockClient","GetAutomatedReasoningPolicyTestResultCommand").sc(Ows).build(){}});
export {Txs,GetAutomatedReasoningPolicyTestResultCommand,iEr};
