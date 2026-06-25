// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,SDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var iOs,TagResourceCommand;
var ukr=b(()=>{$s();ai();ci();iOs=x(yo(),1);TagResourceCommand=class TagResourceCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[iOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","TagResource",{}).n("BedrockClient","TagResourceCommand").sc(SDs).build(){}});
export {iOs,TagResourceCommand,ukr};
