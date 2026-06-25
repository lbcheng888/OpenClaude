// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,cDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var YPs,ListPromptRoutersCommand;
var xun=b(()=>{$s();ai();ci();YPs=x(yo(),1);ListPromptRoutersCommand=class ListPromptRoutersCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[YPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListPromptRouters",{}).n("BedrockClient","ListPromptRoutersCommand").sc(cDs).build(){}});
export {YPs,ListPromptRoutersCommand,xun};
