// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Zvs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var FRs,CreateCustomModelCommand;
var vbr=b(()=>{ri();wi();xi();FRs=M(yo(),1);CreateCustomModelCommand=class CreateCustomModelCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[FRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateCustomModel",{}).n("BedrockClient","CreateCustomModelCommand").sc(Zvs).build(){}});
export {FRs,CreateCustomModelCommand,vbr};
