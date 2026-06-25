// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,vxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var pPs,GetAutomatedReasoningPolicyNextScenarioCommand;
var Pwr=b(()=>{$s();ai();ci();pPs=x(yo(),1);GetAutomatedReasoningPolicyNextScenarioCommand=class GetAutomatedReasoningPolicyNextScenarioCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[pPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicyNextScenario",{}).n("BedrockClient","GetAutomatedReasoningPolicyNextScenarioCommand").sc(vxs).build(){}});
export {pPs,GetAutomatedReasoningPolicyNextScenarioCommand,Pwr};
