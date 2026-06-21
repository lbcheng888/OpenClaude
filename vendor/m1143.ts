// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,yRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var sks,PutUseCaseForModelAccessCommand;
var xEr=b(()=>{ri();wi();xi();sks=M(yo(),1);PutUseCaseForModelAccessCommand=class PutUseCaseForModelAccessCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[sks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","PutUseCaseForModelAccess",{}).n("BedrockClient","PutUseCaseForModelAccessCommand").sc(yRs).build(){}});
export {sks,PutUseCaseForModelAccessCommand,xEr};
