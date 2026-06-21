// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,zws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Oxs,GetModelInvocationLoggingConfigurationCommand;
var TEr=b(()=>{ri();wi();xi();Oxs=M(yo(),1);GetModelInvocationLoggingConfigurationCommand=class GetModelInvocationLoggingConfigurationCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Oxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetModelInvocationLoggingConfiguration",{}).n("BedrockClient","GetModelInvocationLoggingConfigurationCommand").sc(zws).build(){}});
export {Oxs,GetModelInvocationLoggingConfigurationCommand,TEr};
