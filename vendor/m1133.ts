// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,cRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Yxs,ListInferenceProfilesCommand;
var qan=b(()=>{ri();wi();xi();Yxs=M(yo(),1);ListInferenceProfilesCommand=class ListInferenceProfilesCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Yxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListInferenceProfiles",{}).n("BedrockClient","ListInferenceProfilesCommand").sc(cRs).build(){}});
export {Yxs,ListInferenceProfilesCommand,qan};
