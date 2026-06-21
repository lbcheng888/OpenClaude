// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Tws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var ixs,DeleteImportedModelCommand;
var Vbr=b(()=>{ri();wi();xi();ixs=M(yo(),1);DeleteImportedModelCommand=class DeleteImportedModelCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[ixs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteImportedModel",{}).n("BedrockClient","DeleteImportedModelCommand").sc(Tws).build(){}});
export {ixs,DeleteImportedModelCommand,Vbr};
