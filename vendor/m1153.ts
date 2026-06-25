// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,yDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var oOs,StopModelCustomizationJobCommand;
var lkr=b(()=>{$s();ai();ci();oOs=x(yo(),1);StopModelCustomizationJobCommand=class StopModelCustomizationJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[oOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","StopModelCustomizationJob",{}).n("BedrockClient","StopModelCustomizationJobCommand").sc(yDs).build(){}});
export {oOs,StopModelCustomizationJobCommand,lkr};
