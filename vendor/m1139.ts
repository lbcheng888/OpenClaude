// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,ARs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var tks,ListPromptRoutersCommand;
var zan=b(()=>{ri();wi();xi();tks=M(yo(),1);ListPromptRoutersCommand=class ListPromptRoutersCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[tks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListPromptRouters",{}).n("BedrockClient","ListPromptRoutersCommand").sc(ARs).build(){}});
export {tks,ListPromptRoutersCommand,zan};
