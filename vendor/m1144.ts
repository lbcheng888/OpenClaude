// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,TRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var iks,RegisterMarketplaceModelEndpointCommand;
var kEr=b(()=>{ri();wi();xi();iks=M(yo(),1);RegisterMarketplaceModelEndpointCommand=class RegisterMarketplaceModelEndpointCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[iks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","RegisterMarketplaceModelEndpoint",{}).n("BedrockClient","RegisterMarketplaceModelEndpointCommand").sc(TRs).build(){}});
export {iks,RegisterMarketplaceModelEndpointCommand,kEr};
