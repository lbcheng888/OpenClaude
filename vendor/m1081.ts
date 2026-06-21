// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,dws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var XRs,CreatePromptRouterCommand;
var Nbr=b(()=>{ri();wi();xi();XRs=M(yo(),1);CreatePromptRouterCommand=class CreatePromptRouterCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[XRs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","CreatePromptRouter",{}).n("BedrockClient","CreatePromptRouterCommand").sc(dws).build(){}});
export {XRs,CreatePromptRouterCommand,Nbr};
