// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,PRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var yks,UpdateProvisionedModelThroughputCommand;
var qEr=b(()=>{ri();wi();xi();yks=M(yo(),1);UpdateProvisionedModelThroughputCommand=class UpdateProvisionedModelThroughputCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[yks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UpdateProvisionedModelThroughput",{}).n("BedrockClient","UpdateProvisionedModelThroughputCommand").sc(PRs).build(){}});
export {yks,UpdateProvisionedModelThroughputCommand,qEr};
