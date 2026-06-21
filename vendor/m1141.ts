// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,gRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var rks,ListTagsForResourceCommand;
var wEr=b(()=>{ri();wi();xi();rks=M(yo(),1);ListTagsForResourceCommand=class ListTagsForResourceCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[rks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListTagsForResource",{}).n("BedrockClient","ListTagsForResourceCommand").sc(gRs).build(){}});
export {rks,ListTagsForResourceCommand,wEr};
