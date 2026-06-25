// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Jxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var MPs,ListCustomModelDeploymentsCommand;
var yun=b(()=>{$s();ai();ci();MPs=x(yo(),1);ListCustomModelDeploymentsCommand=class ListCustomModelDeploymentsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[MPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListCustomModelDeployments",{}).n("BedrockClient","ListCustomModelDeploymentsCommand").sc(Jxs).build(){}});
export {MPs,ListCustomModelDeploymentsCommand,yun};
