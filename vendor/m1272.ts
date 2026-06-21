// @ts-nocheck
import {b,M} from "../runtime.ts";
import {PO} from "./m1236.ts";
import {initToolFactoryModule,a0} from "./m1238.ts";
import {gQ,KPs} from "../src/tools/1263_error.ts";
import {yo} from "./m887.ts";
import {Ew} from "./m1228.ts";
var rOs,StartAsyncInvokeCommand;
var JCr=b(()=>{PO();initToolFactoryModule();gQ();rOs=M(yo(),1);StartAsyncInvokeCommand=class StartAsyncInvokeCommand extends Ew.classBuilder().ep(a0).m(function(e,t,n,r){return[rOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","StartAsyncInvoke",{}).n("BedrockRuntimeClient","StartAsyncInvokeCommand").sc(KPs).build(){}});
export {rOs,StartAsyncInvokeCommand,JCr};
