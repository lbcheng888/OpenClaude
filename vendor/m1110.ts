// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Hxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var hPs,GetCustomModelCommand;
var Mwr=b(()=>{$s();ai();ci();hPs=x(yo(),1);GetCustomModelCommand=class GetCustomModelCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[hPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetCustomModel",{}).n("BedrockClient","GetCustomModelCommand").sc(Hxs).build(){}});
export {hPs,GetCustomModelCommand,Mwr};
