// @ts-nocheck
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {V5,getTeamByName} from "./m1324.ts";
import {p7,W$s} from "./m1339.ts";
import {yo} from "./m892.ts";
import {lC} from "./m1314.ts";
var e9s,DecodeAuthorizationMessageCommand;
var EIr=b(()=>{rD();V5();p7();e9s=x(yo(),1);DecodeAuthorizationMessageCommand=class DecodeAuthorizationMessageCommand extends lC.classBuilder().ep(getTeamByName).m(function(e,t,n,r){return[e9s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","DecodeAuthorizationMessage",{}).n("STSClient","DecodeAuthorizationMessageCommand").sc(W$s).build(){}});
export {e9s,DecodeAuthorizationMessageCommand,EIr};
