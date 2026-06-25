// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,TDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var sOs,StopModelInvocationJobCommand;
var ckr=b(()=>{$s();ai();ci();sOs=x(yo(),1);StopModelInvocationJobCommand=class StopModelInvocationJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[sOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","StopModelInvocationJob",{}).n("BedrockClient","StopModelInvocationJobCommand").sc(TDs).build(){}});
export {sOs,StopModelInvocationJobCommand,ckr};
