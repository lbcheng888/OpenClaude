// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Gxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var IPs,GetProvisionedModelThroughputCommand;
var Xwr=b(()=>{$s();ai();ci();IPs=x(yo(),1);GetProvisionedModelThroughputCommand=class GetProvisionedModelThroughputCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[IPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetProvisionedModelThroughput",{}).n("BedrockClient","GetProvisionedModelThroughputCommand").sc(Gxs).build(){}});
export {IPs,GetProvisionedModelThroughputCommand,Xwr};
