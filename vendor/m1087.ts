// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,ixs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var KDs,CreateProvisionedModelThroughputCommand;
var mwr=b(()=>{$s();ai();ci();KDs=x(yo(),1);CreateProvisionedModelThroughputCommand=class CreateProvisionedModelThroughputCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[KDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateProvisionedModelThroughput",{}).n("BedrockClient","CreateProvisionedModelThroughputCommand").sc(ixs).build(){}});
export {KDs,CreateProvisionedModelThroughputCommand,mwr};
