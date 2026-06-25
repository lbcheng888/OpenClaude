// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,dDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var XPs,ListTagsForResourceCommand;
var tkr=b(()=>{$s();ai();ci();XPs=x(yo(),1);ListTagsForResourceCommand=class ListTagsForResourceCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[XPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListTagsForResource",{}).n("BedrockClient","ListTagsForResourceCommand").sc(dDs).build(){}});
export {XPs,ListTagsForResourceCommand,tkr};
