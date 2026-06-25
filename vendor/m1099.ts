// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,yxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var oPs,DeletePromptRouterCommand;
var Rwr=b(()=>{$s();ai();ci();oPs=x(yo(),1);DeletePromptRouterCommand=class DeletePromptRouterCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[oPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeletePromptRouter",{}).n("BedrockClient","DeletePromptRouterCommand").sc(yxs).build(){}});
export {oPs,DeletePromptRouterCommand,Rwr};
