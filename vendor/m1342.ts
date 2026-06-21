// @ts-nocheck
import {b,M} from "../runtime.ts";
import {GD} from "./m1317.ts";
import {H8,uk} from "./m1319.ts";
import {U7,X1s} from "./m1334.ts";
import {yo} from "./m887.ts";
import {oC} from "./m1309.ts";
var lNs,GetDelegatedAccessTokenCommand;
var Jvr=b(()=>{GD();H8();U7();lNs=M(yo(),1);GetDelegatedAccessTokenCommand=class GetDelegatedAccessTokenCommand extends oC.classBuilder().ep(uk).m(function(e,t,n,r){return[lNs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","GetDelegatedAccessToken",{}).n("STSClient","GetDelegatedAccessTokenCommand").sc(X1s).build(){}});
export {lNs,GetDelegatedAccessTokenCommand,Jvr};
