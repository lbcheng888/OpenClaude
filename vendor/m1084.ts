// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,rxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var WDs,CreateModelImportJobCommand;
var uwr=b(()=>{$s();ai();ci();WDs=x(yo(),1);CreateModelImportJobCommand=class CreateModelImportJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[WDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateModelImportJob",{}).n("BedrockClient","CreateModelImportJobCommand").sc(rxs).build(){}});
export {WDs,CreateModelImportJobCommand,uwr};
