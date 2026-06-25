// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,axs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var jDs,DeleteAutomatedReasoningPolicyCommand;
var hwr=b(()=>{$s();ai();ci();jDs=x(yo(),1);DeleteAutomatedReasoningPolicyCommand=class DeleteAutomatedReasoningPolicyCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[jDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteAutomatedReasoningPolicy",{}).n("BedrockClient","DeleteAutomatedReasoningPolicyCommand").sc(axs).build(){}});
export {jDs,DeleteAutomatedReasoningPolicyCommand,hwr};
