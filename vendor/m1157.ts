// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,CDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var lOs,UpdateAutomatedReasoningPolicyAnnotationsCommand;
var pkr=b(()=>{$s();ai();ci();lOs=x(yo(),1);UpdateAutomatedReasoningPolicyAnnotationsCommand=class UpdateAutomatedReasoningPolicyAnnotationsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[lOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UpdateAutomatedReasoningPolicyAnnotations",{}).n("BedrockClient","UpdateAutomatedReasoningPolicyAnnotationsCommand").sc(CDs).build(){}});
export {lOs,UpdateAutomatedReasoningPolicyAnnotationsCommand,pkr};
