// @ts-nocheck
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {V5,getTeamByName} from "./m1324.ts";
import {p7,K$s} from "./m1339.ts";
import {yo} from "./m892.ts";
import {lC} from "./m1314.ts";
var r9s,GetDelegatedAccessTokenCommand;
var RIr=b(()=>{rD();V5();p7();r9s=x(yo(),1);GetDelegatedAccessTokenCommand=class GetDelegatedAccessTokenCommand extends lC.classBuilder().ep(getTeamByName).m(function(e,t,n,r){return[r9s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","GetDelegatedAccessToken",{}).n("STSClient","GetDelegatedAccessTokenCommand").sc(K$s).build(){}});
export {r9s,GetDelegatedAccessTokenCommand,RIr};
