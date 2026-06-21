// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,rws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var jRs,CreateGuardrailCommand;
var kbr=b(()=>{ri();wi();xi();jRs=M(yo(),1);CreateGuardrailCommand=class CreateGuardrailCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[jRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateGuardrail",{}).n("BedrockClient","CreateGuardrailCommand").sc(rws).build(){}});
export {jRs,CreateGuardrailCommand,kbr};
