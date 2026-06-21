// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,kRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var fks,UpdateAutomatedReasoningPolicyAnnotationsCommand;
var NEr=b(()=>{ri();wi();xi();fks=M(yo(),1);UpdateAutomatedReasoningPolicyAnnotationsCommand=class UpdateAutomatedReasoningPolicyAnnotationsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[fks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UpdateAutomatedReasoningPolicyAnnotations",{}).n("BedrockClient","UpdateAutomatedReasoningPolicyAnnotationsCommand").sc(kRs).build(){}});
export {fks,UpdateAutomatedReasoningPolicyAnnotationsCommand,NEr};
