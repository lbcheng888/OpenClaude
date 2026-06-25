// @ts-nocheck
import {b,x} from "../runtime.ts";
import {QP} from "./m1241.ts";
import {l7,R0} from "./m1243.ts";
import {fQ,MFs} from "../src/tools/1268_error.ts";
import {yo} from "./m892.ts";
import {HR} from "./m1233.ts";
var KFs,GetAsyncInvokeCommand;
var bHr=b(()=>{QP();l7();fQ();KFs=x(yo(),1);GetAsyncInvokeCommand=class GetAsyncInvokeCommand extends HR.classBuilder().ep(R0).m(function(e,t,n,r){return[KFs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","GetAsyncInvoke",{}).n("BedrockRuntimeClient","GetAsyncInvokeCommand").sc(MFs).build(){}});
export {KFs,GetAsyncInvokeCommand,bHr};
