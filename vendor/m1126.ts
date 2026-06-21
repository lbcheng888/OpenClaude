// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,nRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var qxs,ListCustomModelDeploymentsCommand;
var Lan=b(()=>{ri();wi();xi();qxs=M(yo(),1);ListCustomModelDeploymentsCommand=class ListCustomModelDeploymentsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[qxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListCustomModelDeployments",{}).n("BedrockClient","ListCustomModelDeploymentsCommand").sc(nRs).build(){}});
export {qxs,ListCustomModelDeploymentsCommand,Lan};
