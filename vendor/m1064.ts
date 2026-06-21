// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,zvs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var ORs,BatchDeleteEvaluationJobCommand;
var Tbr=b(()=>{ri();wi();xi();ORs=M(yo(),1);BatchDeleteEvaluationJobCommand=class BatchDeleteEvaluationJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[ORs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","BatchDeleteEvaluationJob",{}).n("BedrockClient","BatchDeleteEvaluationJobCommand").sc(zvs).build(){}});
export {ORs,BatchDeleteEvaluationJobCommand,Tbr};
