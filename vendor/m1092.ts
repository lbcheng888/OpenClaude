// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,bws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var lxs,DeleteMarketplaceModelEndpointCommand;
var zbr=b(()=>{ri();wi();xi();lxs=M(yo(),1);DeleteMarketplaceModelEndpointCommand=class DeleteMarketplaceModelEndpointCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[lxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteMarketplaceModelEndpoint",{}).n("BedrockClient","DeleteMarketplaceModelEndpointCommand").sc(bws).build(){}});
export {lxs,DeleteMarketplaceModelEndpointCommand,zbr};
