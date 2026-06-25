// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,bDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var aOs,UntagResourceCommand;
var dkr=b(()=>{$s();ai();ci();aOs=x(yo(),1);UntagResourceCommand=class UntagResourceCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[aOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UntagResource",{}).n("BedrockClient","UntagResourceCommand").sc(bDs).build(){}});
export {aOs,UntagResourceCommand,dkr};
