// @ts-nocheck
import {b,x} from "../runtime.ts";
import {QP} from "./m1241.ts";
import {l7,R0} from "./m1243.ts";
import {fQ,NFs} from "../src/tools/1268_error.ts";
import {yo} from "./m892.ts";
import {HR} from "./m1233.ts";
var zFs,InvokeModelCommand;
var EHr=b(()=>{QP();l7();fQ();zFs=x(yo(),1);InvokeModelCommand=class InvokeModelCommand extends HR.classBuilder().ep(R0).m(function(e,t,n,r){return[zFs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","InvokeModel",{}).n("BedrockRuntimeClient","InvokeModelCommand").sc(NFs).build(){}});
export {zFs,InvokeModelCommand,EHr};
