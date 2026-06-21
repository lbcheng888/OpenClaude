// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,CRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var uks,StopModelCustomizationJobCommand;
var PEr=b(()=>{ri();wi();xi();uks=M(yo(),1);StopModelCustomizationJobCommand=class StopModelCustomizationJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[uks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","StopModelCustomizationJob",{}).n("BedrockClient","StopModelCustomizationJobCommand").sc(CRs).build(){}});
export {uks,StopModelCustomizationJobCommand,PEr};
