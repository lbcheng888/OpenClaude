// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,lRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var zxs,ListImportedModelsCommand;
var $an=b(()=>{ri();wi();xi();zxs=M(yo(),1);ListImportedModelsCommand=class ListImportedModelsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[zxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListImportedModels",{}).n("BedrockClient","ListImportedModelsCommand").sc(lRs).build(){}});
export {zxs,ListImportedModelsCommand,$an};
