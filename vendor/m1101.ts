// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Sxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var iPs,DeregisterMarketplaceModelEndpointCommand;
var wwr=b(()=>{$s();ai();ci();iPs=x(yo(),1);DeregisterMarketplaceModelEndpointCommand=class DeregisterMarketplaceModelEndpointCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[iPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeregisterMarketplaceModelEndpoint",{}).n("BedrockClient","DeregisterMarketplaceModelEndpointCommand").sc(Sxs).build(){}});
export {iPs,DeregisterMarketplaceModelEndpointCommand,wwr};
