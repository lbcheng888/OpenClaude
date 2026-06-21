// @ts-nocheck
import {b,M} from "../runtime.ts";
import {PO} from "./m1236.ts";
import {initToolFactoryModule,a0} from "./m1238.ts";
import {gQ,$Ps} from "../src/tools/1263_error.ts";
import {yo} from "./m887.ts";
import {Ew} from "./m1228.ts";
var XPs,CountTokensCommand;
var GCr=b(()=>{PO();initToolFactoryModule();gQ();XPs=M(yo(),1);CountTokensCommand=class CountTokensCommand extends Ew.classBuilder().ep(a0).m(function(e,t,n,r){return[XPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","CountTokens",{}).n("BedrockRuntimeClient","CountTokensCommand").sc($Ps).build(){}});
export {XPs,CountTokensCommand,GCr};
