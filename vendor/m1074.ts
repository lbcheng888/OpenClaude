// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,z0s} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var PDs,CreateCustomModelCommand;
var ewr=b(()=>{$s();ai();ci();PDs=x(yo(),1);CreateCustomModelCommand=class CreateCustomModelCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[PDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateCustomModel",{}).n("BedrockClient","CreateCustomModelCommand").sc(z0s).build(){}});
export {PDs,CreateCustomModelCommand,ewr};
