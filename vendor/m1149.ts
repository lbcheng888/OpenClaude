// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,vRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var dks,StopModelInvocationJobCommand;
var OEr=b(()=>{ri();wi();xi();dks=M(yo(),1);StopModelInvocationJobCommand=class StopModelInvocationJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[dks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","StopModelInvocationJob",{}).n("BedrockClient","StopModelInvocationJobCommand").sc(vRs).build(){}});
export {dks,StopModelInvocationJobCommand,OEr};
