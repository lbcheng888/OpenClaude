// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Xws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Nxs,GetUseCaseForModelAccessCommand;
var EEr=b(()=>{ri();wi();xi();Nxs=M(yo(),1);GetUseCaseForModelAccessCommand=class GetUseCaseForModelAccessCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Nxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetUseCaseForModelAccess",{}).n("BedrockClient","GetUseCaseForModelAccessCommand").sc(Xws).build(){}});
export {Nxs,GetUseCaseForModelAccessCommand,EEr};
