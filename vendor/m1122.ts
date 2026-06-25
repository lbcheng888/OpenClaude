// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,$xs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var wPs,GetModelInvocationJobCommand;
var jwr=b(()=>{$s();ai();ci();wPs=x(yo(),1);GetModelInvocationJobCommand=class GetModelInvocationJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[wPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetModelInvocationJob",{}).n("BedrockClient","GetModelInvocationJobCommand").sc($xs).build(){}});
export {wPs,GetModelInvocationJobCommand,jwr};
