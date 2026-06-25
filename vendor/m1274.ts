// @ts-nocheck
import {b,x} from "../runtime.ts";
import {Ekr} from "./m1189.ts";
import {Wkr} from "./m1216.ts";
import {QP} from "./m1241.ts";
import {l7,R0} from "./m1243.ts";
import {fQ,FFs} from "../src/tools/1268_error.ts";
import {yo} from "./m892.ts";
import {HR} from "./m1233.ts";
import {lLs} from "./m1188.ts";
import {KLs} from "./m1213.ts";
var jFs,InvokeModelWithBidirectionalStreamCommand;
var CHr=b(()=>{Ekr();Wkr();QP();l7();fQ();jFs=x(yo(),1);InvokeModelWithBidirectionalStreamCommand=class InvokeModelWithBidirectionalStreamCommand extends HR.classBuilder().ep(R0).m(function(e,t,n,r){return[jFs.getEndpointPlugin(n,e.getEndpointParameterInstructions()),lLs(n),KLs(n,{headerPrefix:"x-amz-bedrock-"})]}).s("AmazonBedrockFrontendService","InvokeModelWithBidirectionalStream",{eventStream:{input:!0,output:!0}}).n("BedrockRuntimeClient","InvokeModelWithBidirectionalStreamCommand").sc(FFs).build(){}});
export {jFs,InvokeModelWithBidirectionalStreamCommand,CHr};
