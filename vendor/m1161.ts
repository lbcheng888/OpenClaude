// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,vDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var pOs,UpdateMarketplaceModelEndpointCommand;
var gkr=b(()=>{$s();ai();ci();pOs=x(yo(),1);UpdateMarketplaceModelEndpointCommand=class UpdateMarketplaceModelEndpointCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[pOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UpdateMarketplaceModelEndpoint",{}).n("BedrockClient","UpdateMarketplaceModelEndpointCommand").sc(vDs).build(){}});
export {pOs,UpdateMarketplaceModelEndpointCommand,gkr};
