// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Zxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var BPs,ListFoundationModelAgreementOffersCommand;
var Zwr=b(()=>{$s();ai();ci();BPs=x(yo(),1);ListFoundationModelAgreementOffersCommand=class ListFoundationModelAgreementOffersCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[BPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListFoundationModelAgreementOffers",{}).n("BedrockClient","ListFoundationModelAgreementOffersCommand").sc(Zxs).build(){}});
export {BPs,ListFoundationModelAgreementOffersCommand,Zwr};
