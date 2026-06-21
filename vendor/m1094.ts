// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,Cws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var uxs,DeletePromptRouterCommand;
var Jbr=b(()=>{ri();wi();xi();uxs=M(yo(),1);DeletePromptRouterCommand=class DeletePromptRouterCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[uxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeletePromptRouter",{}).n("BedrockClient","DeletePromptRouterCommand").sc(Cws).build(){}});
export {uxs,DeletePromptRouterCommand,Jbr};
