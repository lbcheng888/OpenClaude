// @ts-nocheck
import {b,M} from "../runtime.ts";
import {GD} from "./m1317.ts";
import {H8,uk} from "./m1319.ts";
import {U7,Z1s} from "./m1334.ts";
import {yo} from "./m887.ts";
import {oC} from "./m1309.ts";
var uNs,GetSessionTokenCommand;
var Qvr=b(()=>{GD();H8();U7();uNs=M(yo(),1);GetSessionTokenCommand=class GetSessionTokenCommand extends oC.classBuilder().ep(uk).m(function(e,t,n,r){return[uNs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","GetSessionToken",{}).n("STSClient","GetSessionTokenCommand").sc(Z1s).build(){}});
export {uNs,GetSessionTokenCommand,Qvr};
