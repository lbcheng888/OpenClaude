// @ts-nocheck
import {b,x} from "../runtime.ts";
import {QP} from "./m1241.ts";
import {l7,R0} from "./m1243.ts";
import {fQ,DFs} from "../src/tools/1268_error.ts";
import {yo} from "./m892.ts";
import {HR} from "./m1233.ts";
var qFs,ApplyGuardrailCommand;
var _Hr=b(()=>{QP();l7();fQ();qFs=x(yo(),1);ApplyGuardrailCommand=class ApplyGuardrailCommand extends HR.classBuilder().ep(R0).m(function(e,t,n,r){return[qFs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","ApplyGuardrail",{}).n("BedrockRuntimeClient","ApplyGuardrailCommand").sc(DFs).build(){}});
export {qFs,ApplyGuardrailCommand,_Hr};
