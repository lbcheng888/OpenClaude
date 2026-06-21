// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Jws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Mxs,GetProvisionedModelThroughputCommand;
var bEr=b(()=>{ri();wi();xi();Mxs=M(yo(),1);GetProvisionedModelThroughputCommand=class GetProvisionedModelThroughputCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Mxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetProvisionedModelThroughput",{}).n("BedrockClient","GetProvisionedModelThroughputCommand").sc(Jws).build(){}});
export {Mxs,GetProvisionedModelThroughputCommand,bEr};
