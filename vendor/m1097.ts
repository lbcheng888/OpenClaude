// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,gxs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var nPs,DeleteMarketplaceModelEndpointCommand;
var Cwr=b(()=>{$s();ai();ci();nPs=x(yo(),1);DeleteMarketplaceModelEndpointCommand=class DeleteMarketplaceModelEndpointCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[nPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteMarketplaceModelEndpoint",{}).n("BedrockClient","DeleteMarketplaceModelEndpointCommand").sc(gxs).build(){}});
export {nPs,DeleteMarketplaceModelEndpointCommand,Cwr};
