// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,_xs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var rPs,DeleteModelInvocationLoggingConfigurationCommand;
var Awr=b(()=>{$s();ai();ci();rPs=x(yo(),1);DeleteModelInvocationLoggingConfigurationCommand=class DeleteModelInvocationLoggingConfigurationCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[rPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteModelInvocationLoggingConfiguration",{}).n("BedrockClient","DeleteModelInvocationLoggingConfigurationCommand").sc(_xs).build(){}});
export {rPs,DeleteModelInvocationLoggingConfigurationCommand,Awr};
