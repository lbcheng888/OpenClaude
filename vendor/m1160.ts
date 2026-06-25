// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,RDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var dOs,UpdateGuardrailCommand;
var hkr=b(()=>{$s();ai();ci();dOs=x(yo(),1);UpdateGuardrailCommand=class UpdateGuardrailCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[dOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UpdateGuardrail",{}).n("BedrockClient","UpdateGuardrailCommand").sc(RDs).build(){}});
export {dOs,UpdateGuardrailCommand,hkr};
