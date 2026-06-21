// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Dws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var _xs,GetAutomatedReasoningPolicyNextScenarioCommand;
var oEr=b(()=>{ri();wi();xi();_xs=M(yo(),1);GetAutomatedReasoningPolicyNextScenarioCommand=class GetAutomatedReasoningPolicyNextScenarioCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[_xs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicyNextScenario",{}).n("BedrockClient","GetAutomatedReasoningPolicyNextScenarioCommand").sc(Dws).build(){}});
export {_xs,GetAutomatedReasoningPolicyNextScenarioCommand,oEr};
