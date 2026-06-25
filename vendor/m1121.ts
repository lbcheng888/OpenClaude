// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Uxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var vPs,GetModelImportJobCommand;
var zwr=b(()=>{$s();ai();ci();vPs=x(yo(),1);GetModelImportJobCommand=class GetModelImportJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[vPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetModelImportJob",{}).n("BedrockClient","GetModelImportJobCommand").sc(Uxs).build(){}});
export {vPs,GetModelImportJobCommand,zwr};
