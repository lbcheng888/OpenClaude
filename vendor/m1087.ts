// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,gws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var rxs,DeleteCustomModelDeploymentCommand;
var jbr=b(()=>{ri();wi();xi();rxs=M(yo(),1);DeleteCustomModelDeploymentCommand=class DeleteCustomModelDeploymentCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[rxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteCustomModelDeployment",{}).n("BedrockClient","DeleteCustomModelDeploymentCommand").sc(gws).build(){}});
export {rxs,DeleteCustomModelDeploymentCommand,jbr};
