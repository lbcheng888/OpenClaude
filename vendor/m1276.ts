// @ts-nocheck
import {b,x} from "../runtime.ts";
import {QP} from "./m1241.ts";
import {l7,R0} from "./m1243.ts";
import {fQ,UFs} from "../src/tools/1268_error.ts";
import {yo} from "./m892.ts";
import {HR} from "./m1233.ts";
var JFs,ListAsyncInvokesCommand;
var Ddn=b(()=>{QP();l7();fQ();JFs=x(yo(),1);ListAsyncInvokesCommand=class ListAsyncInvokesCommand extends HR.classBuilder().ep(R0).m(function(e,t,n,r){return[JFs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","ListAsyncInvokes",{}).n("BedrockRuntimeClient","ListAsyncInvokesCommand").sc(UFs).build(){}});
export {JFs,ListAsyncInvokesCommand,Ddn};
