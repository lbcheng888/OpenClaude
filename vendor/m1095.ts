// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,vws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var dxs,DeleteProvisionedModelThroughputCommand;
var Xbr=b(()=>{ri();wi();xi();dxs=M(yo(),1);DeleteProvisionedModelThroughputCommand=class DeleteProvisionedModelThroughputCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[dxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteProvisionedModelThroughput",{}).n("BedrockClient","DeleteProvisionedModelThroughputCommand").sc(vws).build(){}});
export {dxs,DeleteProvisionedModelThroughputCommand,Xbr};
