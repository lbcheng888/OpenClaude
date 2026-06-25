// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,wDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var mOs,UpdateProvisionedModelThroughputCommand;
var _kr=b(()=>{$s();ai();ci();mOs=x(yo(),1);UpdateProvisionedModelThroughputCommand=class UpdateProvisionedModelThroughputCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[mOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UpdateProvisionedModelThroughput",{}).n("BedrockClient","UpdateProvisionedModelThroughputCommand").sc(wDs).build(){}});
export {mOs,UpdateProvisionedModelThroughputCommand,_kr};
