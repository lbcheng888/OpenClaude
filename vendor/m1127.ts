// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,rRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var jxs,ListCustomModelsCommand;
var Man=b(()=>{ri();wi();xi();jxs=M(yo(),1);ListCustomModelsCommand=class ListCustomModelsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[jxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListCustomModels",{}).n("BedrockClient","ListCustomModelsCommand").sc(rRs).build(){}});
export {jxs,ListCustomModelsCommand,Man};
