// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Kws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Pxs,GetModelInvocationJobCommand;
var yEr=b(()=>{ri();wi();xi();Pxs=M(yo(),1);GetModelInvocationJobCommand=class GetModelInvocationJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Pxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetModelInvocationJob",{}).n("BedrockClient","GetModelInvocationJobCommand").sc(Kws).build(){}});
export {Pxs,GetModelInvocationJobCommand,yEr};
