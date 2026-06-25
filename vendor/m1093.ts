// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,pxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var QDs,DeleteFoundationModelAgreementCommand;
var Twr=b(()=>{$s();ai();ci();QDs=x(yo(),1);DeleteFoundationModelAgreementCommand=class DeleteFoundationModelAgreementCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[QDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteFoundationModelAgreement",{}).n("BedrockClient","DeleteFoundationModelAgreementCommand").sc(pxs).build(){}});
export {QDs,DeleteFoundationModelAgreementCommand,Twr};
