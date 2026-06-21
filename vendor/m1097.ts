// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Rws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var mxs,ExportAutomatedReasoningPolicyVersionCommand;
var Zbr=b(()=>{ri();wi();xi();mxs=M(yo(),1);ExportAutomatedReasoningPolicyVersionCommand=class ExportAutomatedReasoningPolicyVersionCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[mxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ExportAutomatedReasoningPolicyVersion",{}).n("BedrockClient","ExportAutomatedReasoningPolicyVersionCommand").sc(Rws).build(){}});
export {mxs,ExportAutomatedReasoningPolicyVersionCommand,Zbr};
