// @ts-nocheck
import {b,x} from "../runtime.ts";
import {QP} from "./m1241.ts";
import {l7,R0} from "./m1243.ts";
import {fQ,PFs} from "../src/tools/1268_error.ts";
import {yo} from "./m892.ts";
import {HR} from "./m1233.ts";
var WFs,ConverseCommand;
var yHr=b(()=>{QP();l7();fQ();WFs=x(yo(),1);ConverseCommand=class ConverseCommand extends HR.classBuilder().ep(R0).m(function(e,t,n,r){return[WFs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","Converse",{}).n("BedrockRuntimeClient","ConverseCommand").sc(PFs).build(){}});
export {WFs,ConverseCommand,yHr};
