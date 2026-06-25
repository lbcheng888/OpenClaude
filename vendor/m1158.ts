// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,EDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var cOs,UpdateAutomatedReasoningPolicyCommand;
var mkr=b(()=>{$s();ai();ci();cOs=x(yo(),1);UpdateAutomatedReasoningPolicyCommand=class UpdateAutomatedReasoningPolicyCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[cOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UpdateAutomatedReasoningPolicy",{}).n("BedrockClient","UpdateAutomatedReasoningPolicyCommand").sc(EDs).build(){}});
export {cOs,UpdateAutomatedReasoningPolicyCommand,mkr};
