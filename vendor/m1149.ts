// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,fDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var eOs,RegisterMarketplaceModelEndpointCommand;
var okr=b(()=>{$s();ai();ci();eOs=x(yo(),1);RegisterMarketplaceModelEndpointCommand=class RegisterMarketplaceModelEndpointCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[eOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","RegisterMarketplaceModelEndpoint",{}).n("BedrockClient","RegisterMarketplaceModelEndpointCommand").sc(fDs).build(){}});
export {eOs,RegisterMarketplaceModelEndpointCommand,okr};
