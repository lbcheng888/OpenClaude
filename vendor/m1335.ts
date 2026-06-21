// @ts-nocheck
import {b,M} from "../runtime.ts";
import {GD} from "./m1317.ts";
import {H8,uk} from "./m1319.ts";
import {U7,W1s} from "./m1334.ts";
import {yo} from "./m887.ts";
import {oC} from "./m1309.ts";
var tNs,AssumeRoleCommand;
var Dcn=b(()=>{GD();H8();U7();tNs=M(yo(),1);AssumeRoleCommand=class AssumeRoleCommand extends oC.classBuilder().ep(uk).m(function(e,t,n,r){return[tNs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","AssumeRole",{}).n("STSClient","AssumeRoleCommand").sc(W1s).build(){}});
export {tNs,AssumeRoleCommand,Dcn};
