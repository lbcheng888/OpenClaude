// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,sxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var VDs,CreatePromptRouterCommand;
var pwr=b(()=>{$s();ai();ci();VDs=x(yo(),1);CreatePromptRouterCommand=class CreatePromptRouterCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[VDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreatePromptRouter",{}).n("BedrockClient","CreatePromptRouterCommand").sc(sxs).build(){}});
export {VDs,CreatePromptRouterCommand,pwr};
