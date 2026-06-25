// @ts-nocheck
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {V5,getTeamByName} from "./m1324.ts";
import {p7,V$s} from "./m1339.ts";
import {yo} from "./m892.ts";
import {lC} from "./m1314.ts";
var n9s,GetCallerIdentityCommand;
var AIr=b(()=>{rD();V5();p7();n9s=x(yo(),1);GetCallerIdentityCommand=class GetCallerIdentityCommand extends lC.classBuilder().ep(getTeamByName).m(function(e,t,n,r){return[n9s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","GetCallerIdentity",{}).n("STSClient","GetCallerIdentityCommand").sc(V$s).build(){}});
export {n9s,GetCallerIdentityCommand,AIr};
