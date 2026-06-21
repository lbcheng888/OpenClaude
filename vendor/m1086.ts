// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {wi,Rr} from "./m1048.ts";
import {xi,hws} from "./m1063.ts";
import {yo} from "./m887.ts";
import {$Command} from "./m1038.ts";
var nxs,DeleteCustomModelCommand;
var qbr=b(()=>{ri();wi();xi();nxs=M(yo(),1);DeleteCustomModelCommand=class DeleteCustomModelCommand extends $Command.classBuilder().ep(Rr).m(function(e,t,n,r){return[nxs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","DeleteCustomModel",{}).n("BedrockClient","DeleteCustomModelCommand").sc(hws).build(){}});
export {nxs,DeleteCustomModelCommand,qbr};
