// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Mxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var EPs,GetInferenceProfileCommand;
var Wwr=b(()=>{$s();ai();ci();EPs=x(yo(),1);GetInferenceProfileCommand=class GetInferenceProfileCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[EPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetInferenceProfile",{}).n("BedrockClient","GetInferenceProfileCommand").sc(Mxs).build(){}});
export {EPs,GetInferenceProfileCommand,Wwr};
