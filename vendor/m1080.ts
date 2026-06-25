// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Z0s} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var BDs,CreateInferenceProfileCommand;
var iwr=b(()=>{$s();ai();ci();BDs=x(yo(),1);CreateInferenceProfileCommand=class CreateInferenceProfileCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[BDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateInferenceProfile",{}).n("BedrockClient","CreateInferenceProfileCommand").sc(Z0s).build(){}});
export {BDs,CreateInferenceProfileCommand,iwr};
