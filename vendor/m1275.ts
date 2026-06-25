// @ts-nocheck
import {b,x} from "../runtime.ts";
import {QP} from "./m1241.ts";
import {l7,R0} from "./m1243.ts";
import {fQ,BFs} from "../src/tools/1268_error.ts";
import {yo} from "./m892.ts";
import {HR} from "./m1233.ts";
var YFs,InvokeModelWithResponseStreamCommand;
var AHr=b(()=>{QP();l7();fQ();YFs=x(yo(),1);InvokeModelWithResponseStreamCommand=class InvokeModelWithResponseStreamCommand extends HR.classBuilder().ep(R0).m(function(e,t,n,r){return[YFs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","InvokeModelWithResponseStream",{eventStream:{output:!0}}).n("BedrockRuntimeClient","InvokeModelWithResponseStreamCommand").sc(BFs).build(){}});
export {YFs,InvokeModelWithResponseStreamCommand,AHr};
