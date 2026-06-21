// @ts-nocheck
import {b,M} from "../runtime.ts";
import {GD} from "./m1317.ts";
import {H8,uk} from "./m1319.ts";
import {U7,G1s} from "./m1334.ts";
import {yo} from "./m887.ts";
import {oC} from "./m1309.ts";
var nNs,AssumeRoleWithSAMLCommand;
var Gvr=b(()=>{GD();H8();U7();nNs=M(yo(),1);AssumeRoleWithSAMLCommand=class AssumeRoleWithSAMLCommand extends oC.classBuilder().ep(uk).m(function(e,t,n,r){return[nNs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","AssumeRoleWithSAML",{}).n("STSClient","AssumeRoleWithSAMLCommand").sc(G1s).build(){}});
export {nNs,AssumeRoleWithSAMLCommand,Gvr};
