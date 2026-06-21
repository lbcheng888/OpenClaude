// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,ows} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var WRs,CreateGuardrailVersionCommand;
var Hbr=b(()=>{ri();wi();xi();WRs=M(yo(),1);CreateGuardrailVersionCommand=class CreateGuardrailVersionCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[WRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateGuardrailVersion",{}).n("BedrockClient","CreateGuardrailVersionCommand").sc(ows).build(){}});
export {WRs,CreateGuardrailVersionCommand,Hbr};
