// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,xws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var gxs,GetAutomatedReasoningPolicyCommand;
var rEr=b(()=>{ri();wi();xi();gxs=M(yo(),1);GetAutomatedReasoningPolicyCommand=class GetAutomatedReasoningPolicyCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[gxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicy",{}).n("BedrockClient","GetAutomatedReasoningPolicyCommand").sc(xws).build(){}});
export {gxs,GetAutomatedReasoningPolicyCommand,rEr};
