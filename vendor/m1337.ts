// @ts-nocheck
import {b,M} from "../runtime.ts";
import {GD} from "./m1317.ts";
import {H8,uk} from "./m1319.ts";
import {U7,V1s} from "./m1334.ts";
import {yo} from "./m887.ts";
import {oC} from "./m1309.ts";
var rNs,AssumeRoleWithWebIdentityCommand;
var Ocn=b(()=>{GD();H8();U7();rNs=M(yo(),1);AssumeRoleWithWebIdentityCommand=class AssumeRoleWithWebIdentityCommand extends oC.classBuilder().ep(uk).m(function(e,t,n,r){return[rNs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","AssumeRoleWithWebIdentity",{}).n("STSClient","AssumeRoleWithWebIdentityCommand").sc(V1s).build(){}});
export {rNs,AssumeRoleWithWebIdentityCommand,Ocn};
