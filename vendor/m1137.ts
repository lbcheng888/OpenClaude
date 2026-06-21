// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,mRs} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var Zxs,ListModelImportJobsCommand;
var Van=b(()=>{ri();wi();xi();Zxs=M(yo(),1);ListModelImportJobsCommand=class ListModelImportJobsCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[Zxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListModelImportJobs",{}).n("BedrockClient","ListModelImportJobsCommand").sc(mRs).build(){}});
export {Zxs,ListModelImportJobsCommand,Van};
