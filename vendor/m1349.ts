// @ts-nocheck
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {V5,getTeamByName} from "./m1324.ts";
import {p7,j$s} from "./m1339.ts";
import {yo} from "./m892.ts";
import {lC} from "./m1314.ts";
var s9s,GetSessionTokenCommand;
var wIr=b(()=>{rD();V5();p7();s9s=x(yo(),1);GetSessionTokenCommand=class GetSessionTokenCommand extends lC.classBuilder().ep(getTeamByName).m(function(e,t,n,r){return[s9s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","GetSessionToken",{}).n("STSClient","GetSessionTokenCommand").sc(j$s).build(){}});
export {s9s,GetSessionTokenCommand,wIr};
