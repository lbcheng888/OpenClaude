// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,$ws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Rxs,GetImportedModelCommand;
var mEr=b(()=>{ri();wi();xi();Rxs=M(yo(),1);GetImportedModelCommand=class GetImportedModelCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Rxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetImportedModel",{}).n("BedrockClient","GetImportedModelCommand").sc($ws).build(){}});
export {Rxs,GetImportedModelCommand,mEr};
