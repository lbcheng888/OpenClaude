// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,mxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var ZDs,DeleteGuardrailCommand;
var Swr=b(()=>{$s();ai();ci();ZDs=x(yo(),1);DeleteGuardrailCommand=class DeleteGuardrailCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[ZDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteGuardrail",{}).n("BedrockClient","DeleteGuardrailCommand").sc(mxs).build(){}});
export {ZDs,DeleteGuardrailCommand,Swr};
