// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,tws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var $Rs,CreateEvaluationJobCommand;
var Rbr=b(()=>{ri();wi();xi();$Rs=M(yo(),1);CreateEvaluationJobCommand=class CreateEvaluationJobCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[$Rs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreateEvaluationJob",{}).n("BedrockClient","CreateEvaluationJobCommand").sc(tws).build(){}});
export {$Rs,CreateEvaluationJobCommand,Rbr};
