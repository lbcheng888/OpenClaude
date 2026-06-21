// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,DRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var _ks,UpdateMarketplaceModelEndpointCommand;
var $Er=b(()=>{ri();wi();xi();_ks=M(yo(),1);UpdateMarketplaceModelEndpointCommand=class UpdateMarketplaceModelEndpointCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[_ks.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","UpdateMarketplaceModelEndpoint",{}).n("BedrockClient","UpdateMarketplaceModelEndpointCommand").sc(DRs).build(){}});
export {_ks,UpdateMarketplaceModelEndpointCommand,$Er};
