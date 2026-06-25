// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Cxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var lPs,GetAutomatedReasoningPolicyAnnotationsCommand;
var Hwr=b(()=>{$s();ai();ci();lPs=x(yo(),1);GetAutomatedReasoningPolicyAnnotationsCommand=class GetAutomatedReasoningPolicyAnnotationsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[lPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicyAnnotations",{}).n("BedrockClient","GetAutomatedReasoningPolicyAnnotationsCommand").sc(Cxs).build(){}});
export {lPs,GetAutomatedReasoningPolicyAnnotationsCommand,Hwr};
