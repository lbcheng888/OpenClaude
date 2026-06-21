// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,sRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Gxs,ListFoundationModelAgreementOffersCommand;
var CEr=b(()=>{ri();wi();xi();Gxs=M(yo(),1);ListFoundationModelAgreementOffersCommand=class ListFoundationModelAgreementOffersCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Gxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListFoundationModelAgreementOffers",{}).n("BedrockClient","ListFoundationModelAgreementOffersCommand").sc(sRs).build(){}});
export {Gxs,ListFoundationModelAgreementOffersCommand,CEr};
