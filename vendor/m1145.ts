// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,uDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var JPs,ListProvisionedModelThroughputsCommand;
var Dun=b(()=>{$s();ai();ci();JPs=x(yo(),1);ListProvisionedModelThroughputsCommand=class ListProvisionedModelThroughputsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[JPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListProvisionedModelThroughputs",{}).n("BedrockClient","ListProvisionedModelThroughputsCommand").sc(uDs).build(){}});
export {JPs,ListProvisionedModelThroughputsCommand,Dun};
