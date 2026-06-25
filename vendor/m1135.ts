// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,eDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var UPs,ListFoundationModelsCommand;
var ekr=b(()=>{$s();ai();ci();UPs=x(yo(),1);ListFoundationModelsCommand=class ListFoundationModelsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[UPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListFoundationModels",{}).n("BedrockClient","ListFoundationModelsCommand").sc(eDs).build(){}});
export {UPs,ListFoundationModelsCommand,ekr};
