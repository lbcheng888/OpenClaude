// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,J0s} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var MDs,CreateFoundationModelAgreementCommand;
var rwr=b(()=>{$s();ai();ci();MDs=x(yo(),1);CreateFoundationModelAgreementCommand=class CreateFoundationModelAgreementCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[MDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateFoundationModelAgreement",{}).n("BedrockClient","CreateFoundationModelAgreementCommand").sc(J0s).build(){}});
export {MDs,CreateFoundationModelAgreementCommand,rwr};
