// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,Nxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var CPs,GetMarketplaceModelEndpointCommand;
var Gwr=b(()=>{$s();ai();ci();CPs=x(yo(),1);GetMarketplaceModelEndpointCommand=class GetMarketplaceModelEndpointCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[CPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetMarketplaceModelEndpoint",{}).n("BedrockClient","GetMarketplaceModelEndpointCommand").sc(Nxs).build(){}});
export {CPs,GetMarketplaceModelEndpointCommand,Gwr};
