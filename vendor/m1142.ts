// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,_Rs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var oks,PutModelInvocationLoggingConfigurationCommand;
var REr=b(()=>{ri();wi();xi();oks=M(yo(),1);PutModelInvocationLoggingConfigurationCommand=class PutModelInvocationLoggingConfigurationCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[oks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","PutModelInvocationLoggingConfiguration",{}).n("BedrockClient","PutModelInvocationLoggingConfigurationCommand").sc(_Rs).build(){}});
export {oks,PutModelInvocationLoggingConfigurationCommand,REr};
