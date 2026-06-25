// @ts-nocheck
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {V5,getTeamByName} from "./m1324.ts";
import {p7,Y$s} from "./m1339.ts";
import {yo} from "./m892.ts";
import {lC} from "./m1314.ts";
var i9s,GetWebIdentityTokenCommand;
var kIr=b(()=>{rD();V5();p7();i9s=x(yo(),1);GetWebIdentityTokenCommand=class GetWebIdentityTokenCommand extends lC.classBuilder().ep(getTeamByName).m(function(e,t,n,r){return[i9s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","GetWebIdentityToken",{}).n("STSClient","GetWebIdentityTokenCommand").sc(Y$s).build(){}});
export {i9s,GetWebIdentityTokenCommand,kIr};
