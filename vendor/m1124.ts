// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Wxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var HPs,GetPromptRouterCommand;
var Jwr=b(()=>{$s();ai();ci();HPs=x(yo(),1);GetPromptRouterCommand=class GetPromptRouterCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[HPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetPromptRouter",{}).n("BedrockClient","GetPromptRouterCommand").sc(Wxs).build(){}});
export {HPs,GetPromptRouterCommand,Jwr};
