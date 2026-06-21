// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Mws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var bxs,GetCustomModelDeploymentCommand;
var lEr=b(()=>{ri();wi();xi();bxs=M(yo(),1);GetCustomModelDeploymentCommand=class GetCustomModelDeploymentCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[bxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetCustomModelDeployment",{}).n("BedrockClient","GetCustomModelDeploymentCommand").sc(Mws).build(){}});
export {bxs,GetCustomModelDeploymentCommand,lEr};
