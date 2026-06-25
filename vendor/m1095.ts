// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,fxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var ePs,DeleteImportedModelCommand;
var bwr=b(()=>{$s();ai();ci();ePs=x(yo(),1);DeleteImportedModelCommand=class DeleteImportedModelCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[ePs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteImportedModel",{}).n("BedrockClient","DeleteImportedModelCommand").sc(fxs).build(){}});
export {ePs,DeleteImportedModelCommand,bwr};
