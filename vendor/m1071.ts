// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,G0s} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var IDs,CreateAutomatedReasoningPolicyCommand;
var Xvr=b(()=>{$s();ai();ci();IDs=x(yo(),1);CreateAutomatedReasoningPolicyCommand=class CreateAutomatedReasoningPolicyCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[IDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateAutomatedReasoningPolicy",{}).n("BedrockClient","CreateAutomatedReasoningPolicyCommand").sc(G0s).build(){}});
export {IDs,CreateAutomatedReasoningPolicyCommand,Xvr};
