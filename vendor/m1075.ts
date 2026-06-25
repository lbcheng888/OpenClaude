// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,j0s} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var ODs,CreateCustomModelDeploymentCommand;
var twr=b(()=>{$s();ai();ci();ODs=x(yo(),1);CreateCustomModelDeploymentCommand=class CreateCustomModelDeploymentCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[ODs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateCustomModelDeployment",{}).n("BedrockClient","CreateCustomModelDeploymentCommand").sc(j0s).build(){}});
export {ODs,CreateCustomModelDeploymentCommand,twr};
