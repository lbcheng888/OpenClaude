// @ts-nocheck
import {b,M} from "../runtime.ts";
import {PO} from "./m1236.ts";
import {initToolFactoryModule,a0} from "./m1238.ts";
import {gQ,qPs} from "../src/tools/1263_error.ts";
import {yo} from "./m887.ts";
import {Ew} from "./m1228.ts";
var QPs,GetAsyncInvokeCommand;
var VCr=b(()=>{PO();initToolFactoryModule();gQ();QPs=M(yo(),1);GetAsyncInvokeCommand=class GetAsyncInvokeCommand extends Ew.classBuilder().ep(a0).m(function(e,t,n,r){return[QPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","GetAsyncInvoke",{}).n("BedrockRuntimeClient","GetAsyncInvokeCommand").sc(qPs).build(){}});
export {QPs,GetAsyncInvokeCommand,VCr};
