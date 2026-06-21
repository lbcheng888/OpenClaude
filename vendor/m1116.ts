// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Vws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Dxs,GetModelImportJobCommand;
var _Er=b(()=>{ri();wi();xi();Dxs=M(yo(),1);GetModelImportJobCommand=class GetModelImportJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Dxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetModelImportJob",{}).n("BedrockClient","GetModelImportJobCommand").sc(Vws).build(){}});
export {Dxs,GetModelImportJobCommand,_Er};
