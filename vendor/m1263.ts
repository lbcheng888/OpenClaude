// @ts-nocheck
import {b,M} from "../runtime.ts";
import {PO} from "./m1236.ts";
import {initToolFactoryModule,a0} from "./m1238.ts";
import {gQ,BPs} from "../src/tools/1263_error.ts";
import {yo} from "./m887.ts";
import {Ew} from "./m1228.ts";
var zPs,ApplyGuardrailCommand;
var qCr=b(()=>{PO();initToolFactoryModule();gQ();zPs=M(yo(),1);ApplyGuardrailCommand=class ApplyGuardrailCommand extends Ew.classBuilder().ep(a0).m(function(e,t,n,r){return[zPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockFrontendService","ApplyGuardrail",{}).n("BedrockRuntimeClient","ApplyGuardrailCommand").sc(BPs).build(){}});
export {zPs,ApplyGuardrailCommand,qCr};
