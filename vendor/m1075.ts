// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,sws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var GRs,CreateInferenceProfileCommand;
var Ibr=b(()=>{ri();wi();xi();GRs=M(yo(),1);CreateInferenceProfileCommand=class CreateInferenceProfileCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[GRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateInferenceProfile",{}).n("BedrockClient","CreateInferenceProfileCommand").sc(sws).build(){}});
export {GRs,CreateInferenceProfileCommand,Ibr};
