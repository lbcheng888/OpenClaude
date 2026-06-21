// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,pws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var QRs,CreateProvisionedModelThroughputCommand;
var Bbr=b(()=>{ri();wi();xi();QRs=M(yo(),1);CreateProvisionedModelThroughputCommand=class CreateProvisionedModelThroughputCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[QRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateProvisionedModelThroughput",{}).n("BedrockClient","CreateProvisionedModelThroughputCommand").sc(pws).build(){}});
export {QRs,CreateProvisionedModelThroughputCommand,Bbr};
