// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,lws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var zRs,CreateModelCustomizationJobCommand;
var Obr=b(()=>{ri();wi();xi();zRs=M(yo(),1);CreateModelCustomizationJobCommand=class CreateModelCustomizationJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[zRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateModelCustomizationJob",{}).n("BedrockClient","CreateModelCustomizationJobCommand").sc(lws).build(){}});
export {zRs,CreateModelCustomizationJobCommand,Obr};
