// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,IRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var gks,UpdateGuardrailCommand;
var UEr=b(()=>{ri();wi();xi();gks=M(yo(),1);UpdateGuardrailCommand=class UpdateGuardrailCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[gks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UpdateGuardrail",{}).n("BedrockClient","UpdateGuardrailCommand").sc(IRs).build(){}});
export {gks,UpdateGuardrailCommand,UEr};
