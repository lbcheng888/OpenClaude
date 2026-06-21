// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,wRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var pks,TagResourceCommand;
var LEr=b(()=>{ri();wi();xi();pks=M(yo(),1);TagResourceCommand=class TagResourceCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[pks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","TagResource",{}).n("BedrockClient","TagResourceCommand").sc(wRs).build(){}});
export {pks,TagResourceCommand,LEr};
