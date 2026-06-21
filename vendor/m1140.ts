// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,hRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var nks,ListProvisionedModelThroughputsCommand;
var Yan=b(()=>{ri();wi();xi();nks=M(yo(),1);ListProvisionedModelThroughputsCommand=class ListProvisionedModelThroughputsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[nks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListProvisionedModelThroughputs",{}).n("BedrockClient","ListProvisionedModelThroughputsCommand").sc(hRs).build(){}});
export {nks,ListProvisionedModelThroughputsCommand,Yan};
