// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,nxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var qDs,CreateModelCustomizationJobCommand;
var cwr=b(()=>{$s();ai();ci();qDs=x(yo(),1);CreateModelCustomizationJobCommand=class CreateModelCustomizationJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[qDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateModelCustomizationJob",{}).n("BedrockClient","CreateModelCustomizationJobCommand").sc(nxs).build(){}});
export {qDs,CreateModelCustomizationJobCommand,cwr};
