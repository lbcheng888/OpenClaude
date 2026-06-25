// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Vxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var xPs,GetUseCaseForModelAccessCommand;
var Qwr=b(()=>{$s();ai();ci();xPs=x(yo(),1);GetUseCaseForModelAccessCommand=class GetUseCaseForModelAccessCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[xPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetUseCaseForModelAccess",{}).n("BedrockClient","GetUseCaseForModelAccessCommand").sc(Vxs).build(){}});
export {xPs,GetUseCaseForModelAccessCommand,Qwr};
