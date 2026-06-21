// @ts-nocheck
import {b,M} from "../runtime.ts";
import {PO} from "./m1236.ts";
import {initToolFactoryModule,a0} from "./m1238.ts";
import {gQ,FPs} from "../src/tools/1263_error.ts";
import {yo} from "./m887.ts";
import {Ew} from "./m1228.ts";
var YPs,ConverseCommand;
var jCr=b(()=>{PO();initToolFactoryModule();gQ();YPs=M(yo(),1);ConverseCommand=class ConverseCommand extends Ew.classBuilder().ep(a0).m(function(e,t,n,r){return[YPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","Converse",{}).n("BedrockRuntimeClient","ConverseCommand").sc(FPs).build(){}});
export {YPs,ConverseCommand,jCr};
