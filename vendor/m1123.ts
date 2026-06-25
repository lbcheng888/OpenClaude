// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,qxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var kPs,GetModelInvocationLoggingConfigurationCommand;
var Ywr=b(()=>{$s();ai();ci();kPs=x(yo(),1);GetModelInvocationLoggingConfigurationCommand=class GetModelInvocationLoggingConfigurationCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[kPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetModelInvocationLoggingConfiguration",{}).n("BedrockClient","GetModelInvocationLoggingConfigurationCommand").sc(qxs).build(){}});
export {kPs,GetModelInvocationLoggingConfigurationCommand,Ywr};
