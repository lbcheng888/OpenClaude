// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Qvs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var BRs,CreateAutomatedReasoningPolicyVersionCommand;
var Cbr=b(()=>{ri();wi();xi();BRs=M(yo(),1);CreateAutomatedReasoningPolicyVersionCommand=class CreateAutomatedReasoningPolicyVersionCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[BRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateAutomatedReasoningPolicyVersion",{}).n("BedrockClient","CreateAutomatedReasoningPolicyVersionCommand").sc(Qvs).build(){}});
export {BRs,CreateAutomatedReasoningPolicyVersionCommand,Cbr};
