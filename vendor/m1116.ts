// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Lxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var bPs,GetImportedModelCommand;
var qwr=b(()=>{$s();ai();ci();bPs=x(yo(),1);GetImportedModelCommand=class GetImportedModelCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[bPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetImportedModel",{}).n("BedrockClient","GetImportedModelCommand").sc(Lxs).build(){}});
export {bPs,GetImportedModelCommand,qwr};
