// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,kws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var fxs,GetAutomatedReasoningPolicyAnnotationsCommand;
var eEr=b(()=>{ri();wi();xi();fxs=M(yo(),1);GetAutomatedReasoningPolicyAnnotationsCommand=class GetAutomatedReasoningPolicyAnnotationsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[fxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetAutomatedReasoningPolicyAnnotations",{}).n("BedrockClient","GetAutomatedReasoningPolicyAnnotationsCommand").sc(kws).build(){}});
export {fxs,GetAutomatedReasoningPolicyAnnotationsCommand,eEr};
