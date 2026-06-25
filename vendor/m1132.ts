// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Xxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var NPs,ListCustomModelsCommand;
var Tun=b(()=>{$s();ai();ci();NPs=x(yo(),1);ListCustomModelsCommand=class ListCustomModelsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[NPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListCustomModels",{}).n("BedrockClient","ListCustomModelsCommand").sc(Xxs).build(){}});
export {NPs,ListCustomModelsCommand,Tun};
