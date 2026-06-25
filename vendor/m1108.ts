// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,wxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var mPs,GetAutomatedReasoningPolicyTestCaseCommand;
var Owr=b(()=>{$s();ai();ci();mPs=x(yo(),1);GetAutomatedReasoningPolicyTestCaseCommand=class GetAutomatedReasoningPolicyTestCaseCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[mPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicyTestCase",{}).n("BedrockClient","GetAutomatedReasoningPolicyTestCaseCommand").sc(wxs).build(){}});
export {mPs,GetAutomatedReasoningPolicyTestCaseCommand,Owr};
