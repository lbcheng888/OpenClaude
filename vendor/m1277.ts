// @ts-nocheck
import {b,x} from "../runtime.ts";
import {QP} from "./m1241.ts";
import {l7,R0} from "./m1243.ts";
import {fQ,$Fs} from "../src/tools/1268_error.ts";
import {yo} from "./m892.ts";
import {HR} from "./m1233.ts";
var XFs,StartAsyncInvokeCommand;
var RHr=b(()=>{QP();l7();fQ();XFs=x(yo(),1);StartAsyncInvokeCommand=class StartAsyncInvokeCommand extends HR.classBuilder().ep(R0).m(function(e,t,n,r){return[XFs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","StartAsyncInvoke",{}).n("BedrockRuntimeClient","StartAsyncInvokeCommand").sc($Fs).build(){}});
export {XFs,StartAsyncInvokeCommand,RHr};
