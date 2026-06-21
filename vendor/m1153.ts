// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,xRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Aks,UpdateAutomatedReasoningPolicyCommand;
var BEr=b(()=>{ri();wi();xi();Aks=M(yo(),1);UpdateAutomatedReasoningPolicyCommand=class UpdateAutomatedReasoningPolicyCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Aks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UpdateAutomatedReasoningPolicy",{}).n("BedrockClient","UpdateAutomatedReasoningPolicyCommand").sc(xRs).build(){}});
export {Aks,UpdateAutomatedReasoningPolicyCommand,BEr};
