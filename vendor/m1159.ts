// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,ADs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var uOs,UpdateAutomatedReasoningPolicyTestCaseCommand;
var fkr=b(()=>{$s();ai();ci();uOs=x(yo(),1);UpdateAutomatedReasoningPolicyTestCaseCommand=class UpdateAutomatedReasoningPolicyTestCaseCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[uOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UpdateAutomatedReasoningPolicyTestCase",{}).n("BedrockClient","UpdateAutomatedReasoningPolicyTestCaseCommand").sc(ADs).build(){}});
export {uOs,UpdateAutomatedReasoningPolicyTestCaseCommand,fkr};
