// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,ews} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var URs,CreateCustomModelDeploymentCommand;
var wbr=b(()=>{ri();wi();xi();URs=M(yo(),1);CreateCustomModelDeploymentCommand=class CreateCustomModelDeploymentCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[URs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateCustomModelDeployment",{}).n("BedrockClient","CreateCustomModelDeploymentCommand").sc(ews).build(){}});
export {URs,CreateCustomModelDeploymentCommand,wbr};
