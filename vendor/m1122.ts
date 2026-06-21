// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Qws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Bxs,ListAutomatedReasoningPoliciesCommand;
var Ian=b(()=>{ri();wi();xi();Bxs=M(yo(),1);ListAutomatedReasoningPoliciesCommand=class ListAutomatedReasoningPoliciesCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Bxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListAutomatedReasoningPolicies",{}).n("BedrockClient","ListAutomatedReasoningPoliciesCommand").sc(Qws).build(){}});
export {Bxs,ListAutomatedReasoningPoliciesCommand,Ian};
