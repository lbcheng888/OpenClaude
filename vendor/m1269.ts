// @ts-nocheck
import {b,M} from "../runtime.ts";
import {KEr} from "./m1184.ts";
import {fCr} from "./m1211.ts";
import {PO} from "./m1236.ts";
import {initToolFactoryModule,a0} from "./m1238.ts";
import {gQ,WPs} from "../src/tools/1263_error.ts";
import {yo} from "./m887.ts";
import {Ew} from "./m1228.ts";
import {fHs} from "./m1183.ts";
import {QHs} from "./m1208.ts";
var eOs,InvokeModelWithBidirectionalStreamCommand;
var zCr=b(()=>{KEr();fCr();PO();initToolFactoryModule();gQ();eOs=M(yo(),1);InvokeModelWithBidirectionalStreamCommand=class InvokeModelWithBidirectionalStreamCommand extends Ew.classBuilder().ep(a0).m(function(e,t,n,r){return[eOs.getEndpointPlugin(n,e.getEndpointParameterInstructions()),fHs(n),QHs(n,{headerPrefix:"x-amz-bedrock-"})]}).s("AmazonBedrockFrontendService","InvokeModelWithBidirectionalStream",{eventStream:{input:!0,output:!0}}).n("BedrockRuntimeClient","InvokeModelWithBidirectionalStreamCommand").sc(WPs).build(){}});
export {eOs,InvokeModelWithBidirectionalStreamCommand,zCr};
