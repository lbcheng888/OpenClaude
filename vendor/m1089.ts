// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,yws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var sxs,DeleteGuardrailCommand;
var Gbr=b(()=>{ri();wi();xi();sxs=M(yo(),1);DeleteGuardrailCommand=class DeleteGuardrailCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[sxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteGuardrail",{}).n("BedrockClient","DeleteGuardrailCommand").sc(yws).build(){}});
export {sxs,DeleteGuardrailCommand,Gbr};
