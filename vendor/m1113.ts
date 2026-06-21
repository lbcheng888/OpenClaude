// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,jws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var kxs,GetMarketplaceModelEndpointCommand;
var AEr=b(()=>{ri();wi();xi();kxs=M(yo(),1);GetMarketplaceModelEndpointCommand=class GetMarketplaceModelEndpointCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[kxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","GetMarketplaceModelEndpoint",{}).n("BedrockClient","GetMarketplaceModelEndpointCommand").sc(jws).build(){}});
export {kxs,GetMarketplaceModelEndpointCommand,AEr};
