// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Bxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var RPs,GetModelCustomizationJobCommand;
var Kwr=b(()=>{$s();ai();ci();RPs=x(yo(),1);GetModelCustomizationJobCommand=class GetModelCustomizationJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[RPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetModelCustomizationJob",{}).n("BedrockClient","GetModelCustomizationJobCommand").sc(Bxs).build(){}});
export {RPs,GetModelCustomizationJobCommand,Kwr};
