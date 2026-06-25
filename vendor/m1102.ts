// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,bxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var aPs,ExportAutomatedReasoningPolicyVersionCommand;
var kwr=b(()=>{$s();ai();ci();aPs=x(yo(),1);ExportAutomatedReasoningPolicyVersionCommand=class ExportAutomatedReasoningPolicyVersionCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[aPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ExportAutomatedReasoningPolicyVersion",{}).n("BedrockClient","ExportAutomatedReasoningPolicyVersionCommand").sc(bxs).build(){}});
export {aPs,ExportAutomatedReasoningPolicyVersionCommand,kwr};
