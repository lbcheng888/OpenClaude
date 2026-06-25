// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,q0s} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var kDs,BatchDeleteEvaluationJobCommand;
var Yvr=b(()=>{$s();ai();ci();kDs=x(yo(),1);BatchDeleteEvaluationJobCommand=class BatchDeleteEvaluationJobCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[kDs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","BatchDeleteEvaluationJob",{}).n("BedrockClient","BatchDeleteEvaluationJobCommand").sc(q0s).build(){}});
export {kDs,BatchDeleteEvaluationJobCommand,Yvr};
