// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,X0s} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var NDs,CreateGuardrailCommand;
var owr=b(()=>{$s();ai();ci();NDs=x(yo(),1);CreateGuardrailCommand=class CreateGuardrailCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[NDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateGuardrail",{}).n("BedrockClient","CreateGuardrailCommand").sc(X0s).build(){}});
export {NDs,CreateGuardrailCommand,owr};
