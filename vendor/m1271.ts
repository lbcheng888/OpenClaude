// @ts-nocheck
import {b,M} from "../runtime.ts";
import {PO} from "./m1236.ts";
import {initToolFactoryModule,a0} from "./m1238.ts";
import {gQ,VPs} from "../src/tools/1263_error.ts";
import {yo} from "./m887.ts";
import {Ew} from "./m1228.ts";
var nOs,ListAsyncInvokesCommand;
var zln=b(()=>{PO();initToolFactoryModule();gQ();nOs=M(yo(),1);ListAsyncInvokesCommand=class ListAsyncInvokesCommand extends Ew.classBuilder().ep(a0).m(function(e,t,n,r){return[nOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","ListAsyncInvokes",{}).n("BedrockRuntimeClient","ListAsyncInvokesCommand").sc(VPs).build(){}});
export {nOs,ListAsyncInvokesCommand,zln};
