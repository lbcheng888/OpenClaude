// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,uRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Jxs,ListMarketplaceModelEndpointsCommand;
var jan=b(()=>{ri();wi();xi();Jxs=M(yo(),1);ListMarketplaceModelEndpointsCommand=class ListMarketplaceModelEndpointsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Jxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListMarketplaceModelEndpoints",{}).n("BedrockClient","ListMarketplaceModelEndpointsCommand").sc(uRs).build(){}});
export {Jxs,ListMarketplaceModelEndpointsCommand,jan};
