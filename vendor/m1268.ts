// @ts-nocheck
import {b,M} from "../runtime.ts";
import {PO} from "./m1236.ts";
import {initToolFactoryModule,a0} from "./m1238.ts";
import {gQ,jPs} from "../src/tools/1263_error.ts";
import {yo} from "./m887.ts";
import {Ew} from "./m1228.ts";
var ZPs,InvokeModelCommand;
var KCr=b(()=>{PO();initToolFactoryModule();gQ();ZPs=M(yo(),1);InvokeModelCommand=class InvokeModelCommand extends Ew.classBuilder().ep(a0).m(function(e,t,n,r){return[ZPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","InvokeModel",{}).n("BedrockRuntimeClient","InvokeModelCommand").sc(jPs).build(){}});
export {ZPs,InvokeModelCommand,KCr};
