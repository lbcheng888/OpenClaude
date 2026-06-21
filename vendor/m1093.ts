// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Ews} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var cxs,DeleteModelInvocationLoggingConfigurationCommand;
var Ybr=b(()=>{ri();wi();xi();cxs=M(yo(),1);DeleteModelInvocationLoggingConfigurationCommand=class DeleteModelInvocationLoggingConfigurationCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[cxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteModelInvocationLoggingConfiguration",{}).n("BedrockClient","DeleteModelInvocationLoggingConfigurationCommand").sc(Ews).build(){}});
export {cxs,DeleteModelInvocationLoggingConfigurationCommand,Ybr};
