// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Ixs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var gPs,GetCustomModelDeploymentCommand;
var Nwr=b(()=>{$s();ai();ci();gPs=x(yo(),1);GetCustomModelDeploymentCommand=class GetCustomModelDeploymentCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[gPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetCustomModelDeployment",{}).n("BedrockClient","GetCustomModelDeploymentCommand").sc(Ixs).build(){}});
export {gPs,GetCustomModelDeploymentCommand,Nwr};
