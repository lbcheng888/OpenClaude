// @ts-nocheck
import {b,x} from "../runtime.ts";
import {QP} from "./m1241.ts";
import {l7,R0} from "./m1243.ts";
import {fQ,LFs} from "../src/tools/1268_error.ts";
import {yo} from "./m892.ts";
import {HR} from "./m1233.ts";
var VFs,CountTokensCommand;
var SHr=b(()=>{QP();l7();fQ();VFs=x(yo(),1);CountTokensCommand=class CountTokensCommand extends HR.classBuilder().ep(R0).m(function(e,t,n,r){return[VFs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","CountTokens",{}).n("BedrockRuntimeClient","CountTokensCommand").sc(LFs).build(){}});
export {VFs,CountTokensCommand,SHr};
