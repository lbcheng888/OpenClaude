// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Wws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Hxs,GetModelCopyJobCommand;
var hEr=b(()=>{ri();wi();xi();Hxs=M(yo(),1);GetModelCopyJobCommand=class GetModelCopyJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Hxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetModelCopyJob",{}).n("BedrockClient","GetModelCopyJobCommand").sc(Wws).build(){}});
export {Hxs,GetModelCopyJobCommand,hEr};
