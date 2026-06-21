// @ts-nocheck
import {b,M} from "../runtime.ts";
import {GD} from "./m1317.ts";
import {H8,uk} from "./m1319.ts";
import {U7,K1s} from "./m1334.ts";
import {yo} from "./m887.ts";
import {oC} from "./m1309.ts";
var oNs,AssumeRootCommand;
var Vvr=b(()=>{GD();H8();U7();oNs=M(yo(),1);AssumeRootCommand=class AssumeRootCommand extends oC.classBuilder().ep(uk).m(function(e,t,n,r){return[oNs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","AssumeRoot",{}).n("STSClient","AssumeRootCommand").sc(K1s).build(){}});
export {oNs,AssumeRootCommand,Vvr};
