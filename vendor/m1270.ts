// @ts-nocheck
import {b,x} from "../runtime.ts";
import {QP} from "./m1241.ts";
import {l7,R0} from "./m1243.ts";
import {fQ,OFs} from "../src/tools/1268_error.ts";
import {yo} from "./m892.ts";
import {HR} from "./m1233.ts";
var GFs,ConverseStreamCommand;
var THr=b(()=>{QP();l7();fQ();GFs=x(yo(),1);ConverseStreamCommand=class ConverseStreamCommand extends HR.classBuilder().ep(R0).m(function(e,t,n,r){return[GFs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","ConverseStream",{eventStream:{output:!0}}).n("BedrockRuntimeClient","ConverseStreamCommand").sc(OFs).build(){}});
export {GFs,ConverseStreamCommand,THr};
