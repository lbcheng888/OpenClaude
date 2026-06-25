// @ts-nocheck
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {V5,getTeamByName} from "./m1324.ts";
import {p7,z$s} from "./m1339.ts";
import {yo} from "./m892.ts";
import {lC} from "./m1314.ts";
var o9s,GetFederationTokenCommand;
var vIr=b(()=>{rD();V5();p7();o9s=x(yo(),1);GetFederationTokenCommand=class GetFederationTokenCommand extends lC.classBuilder().ep(getTeamByName).m(function(e,t,n,r){return[o9s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","GetFederationToken",{}).n("STSClient","GetFederationTokenCommand").sc(z$s).build(){}});
export {o9s,GetFederationTokenCommand,vIr};
