// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Fws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Cxs,GetFoundationModelAvailabilityCommand;
var uEr=b(()=>{ri();wi();xi();Cxs=M(yo(),1);GetFoundationModelAvailabilityCommand=class GetFoundationModelAvailabilityCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Cxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetFoundationModelAvailability",{}).n("BedrockClient","GetFoundationModelAvailabilityCommand").sc(Fws).build(){}});
export {Cxs,GetFoundationModelAvailabilityCommand,uEr};
