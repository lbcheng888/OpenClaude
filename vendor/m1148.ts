// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,mDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var ZPs,PutUseCaseForModelAccessCommand;
var rkr=b(()=>{$s();ai();ci();ZPs=x(yo(),1);PutUseCaseForModelAccessCommand=class PutUseCaseForModelAccessCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[ZPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","PutUseCaseForModelAccess",{}).n("BedrockClient","PutUseCaseForModelAccessCommand").sc(mDs).build(){}});
export {ZPs,PutUseCaseForModelAccessCommand,rkr};
