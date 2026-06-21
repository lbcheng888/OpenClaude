// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,_ws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var oxs,DeleteFoundationModelAgreementCommand;
var Wbr=b(()=>{ri();wi();xi();oxs=M(yo(),1);DeleteFoundationModelAgreementCommand=class DeleteFoundationModelAgreementCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[oxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteFoundationModelAgreement",{}).n("BedrockClient","DeleteFoundationModelAgreementCommand").sc(_ws).build(){}});
export {oxs,DeleteFoundationModelAgreementCommand,Wbr};
