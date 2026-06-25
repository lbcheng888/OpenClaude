// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,exs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var UDs,CreateMarketplaceModelEndpointCommand;
var awr=b(()=>{$s();ai();ci();UDs=x(yo(),1);CreateMarketplaceModelEndpointCommand=class CreateMarketplaceModelEndpointCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[UDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateMarketplaceModelEndpoint",{}).n("BedrockClient","CreateMarketplaceModelEndpointCommand").sc(exs).build(){}});
export {UDs,CreateMarketplaceModelEndpointCommand,awr};
