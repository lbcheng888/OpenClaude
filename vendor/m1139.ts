// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,oDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var GPs,ListMarketplaceModelEndpointsCommand;
var vun=b(()=>{$s();ai();ci();GPs=x(yo(),1);ListMarketplaceModelEndpointsCommand=class ListMarketplaceModelEndpointsCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[GPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListMarketplaceModelEndpoints",{}).n("BedrockClient","ListMarketplaceModelEndpointsCommand").sc(oDs).build(){}});
export {GPs,ListMarketplaceModelEndpointsCommand,vun};
