// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Uws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var wxs,GetGuardrailCommand;
var pEr=b(()=>{ri();wi();xi();wxs=M(yo(),1);GetGuardrailCommand=class GetGuardrailCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[wxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetGuardrail",{}).n("BedrockClient","GetGuardrailCommand").sc(Uws).build(){}});
export {wxs,GetGuardrailCommand,pEr};
