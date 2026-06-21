// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,nws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var qRs,CreateFoundationModelAgreementCommand;
var xbr=b(()=>{ri();wi();xi();qRs=M(yo(),1);CreateFoundationModelAgreementCommand=class CreateFoundationModelAgreementCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[qRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateFoundationModelAgreement",{}).n("BedrockClient","CreateFoundationModelAgreementCommand").sc(nws).build(){}});
export {qRs,CreateFoundationModelAgreementCommand,xbr};
