// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Gws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Ixs,GetModelCustomizationJobCommand;
var gEr=b(()=>{ri();wi();xi();Ixs=M(yo(),1);GetModelCustomizationJobCommand=class GetModelCustomizationJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Ixs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetModelCustomizationJob",{}).n("BedrockClient","GetModelCustomizationJobCommand").sc(Gws).build(){}});
export {Ixs,GetModelCustomizationJobCommand,gEr};
