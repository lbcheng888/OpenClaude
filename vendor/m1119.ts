// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Fxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var APs,GetModelCopyJobCommand;
var Vwr=b(()=>{$s();ai();ci();APs=x(yo(),1);GetModelCopyJobCommand=class GetModelCopyJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[APs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetModelCopyJob",{}).n("BedrockClient","GetModelCopyJobCommand").sc(Fxs).build(){}});
export {APs,GetModelCopyJobCommand,Vwr};
