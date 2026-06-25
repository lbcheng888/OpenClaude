// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,hxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var tPs,DeleteInferenceProfileCommand;
var Ewr=b(()=>{$s();ai();ci();tPs=x(yo(),1);DeleteInferenceProfileCommand=class DeleteInferenceProfileCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[tPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteInferenceProfile",{}).n("BedrockClient","DeleteInferenceProfileCommand").sc(hxs).build(){}});
export {tPs,DeleteInferenceProfileCommand,Ewr};
