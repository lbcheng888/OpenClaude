// @ts-nocheck
import {b,M} from "../runtime.ts";
import {GD} from "./m1317.ts";
import {H8,uk} from "./m1319.ts";
import {U7,Q1s} from "./m1334.ts";
import {yo} from "./m887.ts";
import {oC} from "./m1309.ts";
var cNs,GetFederationTokenCommand;
var Xvr=b(()=>{GD();H8();U7();cNs=M(yo(),1);GetFederationTokenCommand=class GetFederationTokenCommand extends oC.classBuilder().ep(uk).m(function(e,t,n,r){return[cNs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","GetFederationToken",{}).n("STSClient","GetFederationTokenCommand").sc(Q1s).build(){}});
export {cNs,GetFederationTokenCommand,Xvr};
