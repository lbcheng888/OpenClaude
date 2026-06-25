// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Pxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var yPs,GetFoundationModelAvailabilityCommand;
var Bwr=b(()=>{$s();ai();ci();yPs=x(yo(),1);GetFoundationModelAvailabilityCommand=class GetFoundationModelAvailabilityCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[yPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetFoundationModelAvailability",{}).n("BedrockClient","GetFoundationModelAvailabilityCommand").sc(Pxs).build(){}});
export {yPs,GetFoundationModelAvailabilityCommand,Bwr};
