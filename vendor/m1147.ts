// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,pDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var QPs,PutModelInvocationLoggingConfigurationCommand;
var nkr=b(()=>{$s();ai();ci();QPs=x(yo(),1);PutModelInvocationLoggingConfigurationCommand=class PutModelInvocationLoggingConfigurationCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[QPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","PutModelInvocationLoggingConfiguration",{}).n("BedrockClient","PutModelInvocationLoggingConfigurationCommand").sc(pDs).build(){}});
export {QPs,PutModelInvocationLoggingConfigurationCommand,nkr};
