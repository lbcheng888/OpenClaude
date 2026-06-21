// @ts-nocheck
import {b,M} from "../runtime.ts";
import {PO} from "./m1236.ts";
import {initToolFactoryModule,a0} from "./m1238.ts";
import {gQ,GPs} from "../src/tools/1263_error.ts";
import {yo} from "./m887.ts";
import {Ew} from "./m1228.ts";
var tOs,InvokeModelWithResponseStreamCommand;
var YCr=b(()=>{PO();initToolFactoryModule();gQ();tOs=M(yo(),1);InvokeModelWithResponseStreamCommand=class InvokeModelWithResponseStreamCommand extends Ew.classBuilder().ep(a0).m(function(e,t,n,r){return[tOs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","InvokeModelWithResponseStream",{eventStream:{output:!0}}).n("BedrockRuntimeClient","InvokeModelWithResponseStreamCommand").sc(GPs).build(){}});
export {tOs,InvokeModelWithResponseStreamCommand,YCr};
