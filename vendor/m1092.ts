// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,dxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var XDs,DeleteCustomModelDeploymentCommand;
var ywr=b(()=>{$s();ai();ci();XDs=x(yo(),1);DeleteCustomModelDeploymentCommand=class DeleteCustomModelDeploymentCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[XDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteCustomModelDeployment",{}).n("BedrockClient","DeleteCustomModelDeploymentCommand").sc(dxs).build(){}});
export {XDs,DeleteCustomModelDeploymentCommand,ywr};
