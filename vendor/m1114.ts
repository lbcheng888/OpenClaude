// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Dxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var TPs,GetFoundationModelCommand;
var Uwr=b(()=>{$s();ai();ci();TPs=x(yo(),1);GetFoundationModelCommand=class GetFoundationModelCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[TPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetFoundationModel",{}).n("BedrockClient","GetFoundationModelCommand").sc(Dxs).build(){}});
export {TPs,GetFoundationModelCommand,Uwr};
