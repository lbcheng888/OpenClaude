// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,qws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var xxs,GetInferenceProfileCommand;
var fEr=b(()=>{ri();wi();xi();xxs=M(yo(),1);GetInferenceProfileCommand=class GetInferenceProfileCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[xxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetInferenceProfile",{}).n("BedrockClient","GetInferenceProfileCommand").sc(qws).build(){}});
export {xxs,GetInferenceProfileCommand,fEr};
