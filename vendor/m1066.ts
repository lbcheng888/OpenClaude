// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Jvs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var MRs,CreateAutomatedReasoningPolicyCommand;
var bbr=b(()=>{ri();wi();xi();MRs=M(yo(),1);CreateAutomatedReasoningPolicyCommand=class CreateAutomatedReasoningPolicyCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[MRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateAutomatedReasoningPolicy",{}).n("BedrockClient","CreateAutomatedReasoningPolicyCommand").sc(Jvs).build(){}});
export {MRs,CreateAutomatedReasoningPolicyCommand,bbr};
