// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,mws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var exs,DeleteAutomatedReasoningPolicyCommand;
var Ubr=b(()=>{ri();wi();xi();exs=M(yo(),1);DeleteAutomatedReasoningPolicyCommand=class DeleteAutomatedReasoningPolicyCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[exs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteAutomatedReasoningPolicy",{}).n("BedrockClient","DeleteAutomatedReasoningPolicyCommand").sc(mws).build(){}});
export {exs,DeleteAutomatedReasoningPolicyCommand,Ubr};
