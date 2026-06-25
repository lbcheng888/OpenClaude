// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,tDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var $Ps,ListGuardrailsCommand;
var Cun=b(()=>{$s();ai();ci();$Ps=x(yo(),1);ListGuardrailsCommand=class ListGuardrailsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[$Ps.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListGuardrails",{}).n("BedrockClient","ListGuardrailsCommand").sc(tDs).build(){}});
export {$Ps,ListGuardrailsCommand,Cun};
