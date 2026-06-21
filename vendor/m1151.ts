// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,RRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var mks,UntagResourceCommand;
var MEr=b(()=>{ri();wi();xi();mks=M(yo(),1);UntagResourceCommand=class UntagResourceCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[mks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UntagResource",{}).n("BedrockClient","UntagResourceCommand").sc(RRs).build(){}});
export {mks,UntagResourceCommand,MEr};
