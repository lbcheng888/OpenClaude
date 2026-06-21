// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Sws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var axs,DeleteInferenceProfileCommand;
var Kbr=b(()=>{ri();wi();xi();axs=M(yo(),1);DeleteInferenceProfileCommand=class DeleteInferenceProfileCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[axs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteInferenceProfile",{}).n("BedrockClient","DeleteInferenceProfileCommand").sc(Sws).build(){}});
export {axs,DeleteInferenceProfileCommand,Kbr};
