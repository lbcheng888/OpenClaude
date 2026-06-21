// @ts-nocheck
import {b,M} from "../runtime.ts";
import {GD} from "./m1317.ts";
import {H8,uk} from "./m1319.ts";
import {U7,J1s} from "./m1334.ts";
import {yo} from "./m887.ts";
import {oC} from "./m1309.ts";
var aNs,GetCallerIdentityCommand;
var Yvr=b(()=>{GD();H8();U7();aNs=M(yo(),1);GetCallerIdentityCommand=class GetCallerIdentityCommand extends oC.classBuilder().ep(uk).m(function(e,t,n,r){return[aNs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","GetCallerIdentity",{}).n("STSClient","GetCallerIdentityCommand").sc(J1s).build(){}});
export {aNs,GetCallerIdentityCommand,Yvr};
