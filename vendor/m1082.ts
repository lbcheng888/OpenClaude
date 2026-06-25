// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,txs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var $Ds,CreateModelCopyJobCommand;
var lwr=b(()=>{$s();ai();ci();$Ds=x(yo(),1);CreateModelCopyJobCommand=class CreateModelCopyJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[$Ds.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateModelCopyJob",{}).n("BedrockClient","CreateModelCopyJobCommand").sc(txs).build(){}});
export {$Ds,CreateModelCopyJobCommand,lwr};
