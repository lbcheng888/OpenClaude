// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,uxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var JDs,DeleteCustomModelCommand;
var _wr=b(()=>{$s();ai();ci();JDs=x(yo(),1);DeleteCustomModelCommand=class DeleteCustomModelCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[JDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteCustomModel",{}).n("BedrockClient","DeleteCustomModelCommand").sc(uxs).build(){}});
export {JDs,DeleteCustomModelCommand,_wr};
