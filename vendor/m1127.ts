// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Kxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var DPs,ListAutomatedReasoningPoliciesCommand;
var fun=b(()=>{$s();ai();ci();DPs=x(yo(),1);ListAutomatedReasoningPoliciesCommand=class ListAutomatedReasoningPoliciesCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[DPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListAutomatedReasoningPolicies",{}).n("BedrockClient","ListAutomatedReasoningPoliciesCommand").sc(Kxs).build(){}});
export {DPs,ListAutomatedReasoningPoliciesCommand,fun};
