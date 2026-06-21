// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,wws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var pxs,DeregisterMarketplaceModelEndpointCommand;
var Qbr=b(()=>{ri();wi();xi();pxs=M(yo(),1);DeregisterMarketplaceModelEndpointCommand=class DeregisterMarketplaceModelEndpointCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[pxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeregisterMarketplaceModelEndpoint",{}).n("BedrockClient","DeregisterMarketplaceModelEndpointCommand").sc(wws).build(){}});
export {pxs,DeregisterMarketplaceModelEndpointCommand,Qbr};
