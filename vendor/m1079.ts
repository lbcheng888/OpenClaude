// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Q0s} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var FDs,CreateGuardrailVersionCommand;
var swr=b(()=>{$s();ai();ci();FDs=x(yo(),1);CreateGuardrailVersionCommand=class CreateGuardrailVersionCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[FDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateGuardrailVersion",{}).n("BedrockClient","CreateGuardrailVersionCommand").sc(Q0s).build(){}});
export {FDs,CreateGuardrailVersionCommand,swr};
