// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,aRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Kxs,ListGuardrailsCommand;
var Uan=b(()=>{ri();wi();xi();Kxs=M(yo(),1);ListGuardrailsCommand=class ListGuardrailsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Kxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListGuardrails",{}).n("BedrockClient","ListGuardrailsCommand").sc(aRs).build(){}});
export {Kxs,ListGuardrailsCommand,Uan};
