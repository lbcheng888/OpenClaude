// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Txs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var sPs,DeleteProvisionedModelThroughputCommand;
var vwr=b(()=>{$s();ai();ci();sPs=x(yo(),1);DeleteProvisionedModelThroughputCommand=class DeleteProvisionedModelThroughputCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[sPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteProvisionedModelThroughput",{}).n("BedrockClient","DeleteProvisionedModelThroughputCommand").sc(Txs).build(){}});
export {sPs,DeleteProvisionedModelThroughputCommand,vwr};
