// @ts-nocheck
import {b,M} from "../runtime.ts";
import {GD} from "./m1317.ts";
import {H8,uk} from "./m1319.ts";
import {U7,Y1s} from "./m1334.ts";
import {yo} from "./m887.ts";
import {oC} from "./m1309.ts";
var iNs,GetAccessKeyInfoCommand;
var zvr=b(()=>{GD();H8();U7();iNs=M(yo(),1);GetAccessKeyInfoCommand=class GetAccessKeyInfoCommand extends oC.classBuilder().ep(uk).m(function(e,t,n,r){return[iNs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","GetAccessKeyInfo",{}).n("STSClient","GetAccessKeyInfoCommand").sc(Y1s).build(){}});
export {iNs,GetAccessKeyInfoCommand,zvr};
