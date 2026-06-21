// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,iRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Vxs,ListFoundationModelsCommand;
var vEr=b(()=>{ri();wi();xi();Vxs=M(yo(),1);ListFoundationModelsCommand=class ListFoundationModelsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Vxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListFoundationModels",{}).n("BedrockClient","ListFoundationModelsCommand").sc(iRs).build(){}});
export {Vxs,ListFoundationModelsCommand,vEr};
