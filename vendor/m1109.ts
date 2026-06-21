// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Bws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var vxs,GetFoundationModelCommand;
var dEr=b(()=>{ri();wi();xi();vxs=M(yo(),1);GetFoundationModelCommand=class GetFoundationModelCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[vxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetFoundationModel",{}).n("BedrockClient","GetFoundationModelCommand").sc(Bws).build(){}});
export {vxs,GetFoundationModelCommand,dEr};
