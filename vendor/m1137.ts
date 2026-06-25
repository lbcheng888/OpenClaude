// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,nDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var qPs,ListImportedModelsCommand;
var Aun=b(()=>{$s();ai();ci();qPs=x(yo(),1);ListImportedModelsCommand=class ListImportedModelsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[qPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListImportedModels",{}).n("BedrockClient","ListImportedModelsCommand").sc(nDs).build(){}});
export {qPs,ListImportedModelsCommand,Aun};
