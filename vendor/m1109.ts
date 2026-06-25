// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,kxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var fPs,GetAutomatedReasoningPolicyTestResultCommand;
var Lwr=b(()=>{$s();ai();ci();fPs=x(yo(),1);GetAutomatedReasoningPolicyTestResultCommand=class GetAutomatedReasoningPolicyTestResultCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[fPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicyTestResult",{}).n("BedrockClient","GetAutomatedReasoningPolicyTestResultCommand").sc(kxs).build(){}});
export {fPs,GetAutomatedReasoningPolicyTestResultCommand,Lwr};
