// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,K0s} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var DDs,CreateAutomatedReasoningPolicyVersionCommand;
var Zvr=b(()=>{$s();ai();ci();DDs=x(yo(),1);CreateAutomatedReasoningPolicyVersionCommand=class CreateAutomatedReasoningPolicyVersionCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[DDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateAutomatedReasoningPolicyVersion",{}).n("BedrockClient","CreateAutomatedReasoningPolicyVersionCommand").sc(K0s).build(){}});
export {DDs,CreateAutomatedReasoningPolicyVersionCommand,Zvr};
