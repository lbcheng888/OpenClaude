// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,iws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var VRs,CreateMarketplaceModelEndpointCommand;
var Dbr=b(()=>{ri();wi();xi();VRs=M(yo(),1);CreateMarketplaceModelEndpointCommand=class CreateMarketplaceModelEndpointCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[VRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateMarketplaceModelEndpoint",{}).n("BedrockClient","CreateMarketplaceModelEndpointCommand").sc(iws).build(){}});
export {VRs,CreateMarketplaceModelEndpointCommand,Dbr};
