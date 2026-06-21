// @ts-nocheck
import {b,M} from "../runtime.ts";
import {PO} from "./m1236.ts";
import {initToolFactoryModule,a0} from "./m1238.ts";
import {gQ,UPs} from "../src/tools/1263_error.ts";
import {yo} from "./m887.ts";
import {Ew} from "./m1228.ts";
var JPs,ConverseStreamCommand;
var WCr=b(()=>{PO();initToolFactoryModule();gQ();JPs=M(yo(),1);ConverseStreamCommand=class ConverseStreamCommand extends Ew.classBuilder().ep(a0).m(function(e,t,n,r){return[JPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","ConverseStream",{eventStream:{output:!0}}).n("BedrockRuntimeClient","ConverseStreamCommand").sc(UPs).build(){}});
export {JPs,ConverseStreamCommand,WCr};
