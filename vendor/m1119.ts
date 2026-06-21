// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Yws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Lxs,GetPromptRouterCommand;
var SEr=b(()=>{ri();wi();xi();Lxs=M(yo(),1);GetPromptRouterCommand=class GetPromptRouterCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Lxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetPromptRouter",{}).n("BedrockClient","GetPromptRouterCommand").sc(Yws).build(){}});
export {Lxs,GetPromptRouterCommand,SEr};
