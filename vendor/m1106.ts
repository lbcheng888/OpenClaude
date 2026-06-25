// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Exs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var dPs,GetAutomatedReasoningPolicyCommand;
var Dwr=b(()=>{$s();ai();ci();dPs=x(yo(),1);GetAutomatedReasoningPolicyCommand=class GetAutomatedReasoningPolicyCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[dPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicy",{}).n("BedrockClient","GetAutomatedReasoningPolicyCommand").sc(Exs).build(){}});
export {dPs,GetAutomatedReasoningPolicyCommand,Dwr};
